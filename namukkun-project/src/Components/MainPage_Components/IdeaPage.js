import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import hanmadiv from '../../Assets/Img/hanmadiv.svg';
import { useRecoilState } from 'recoil';
import { loginTestState, postLikeBtn, userinfo } from '../../Recoil/Atom';
import LoginModal from '../Login_Components/LoginModal';
import { allPostsRecommendGetAPI, checkPostDeleteAPI, checkPostPostAPI, userInfoGetAPI } from '../../API/AxiosAPI';
import { useNavigate } from 'react-router-dom';

function IdeaPage() { 
    const [showModal, setShowModal] = useState(false);

    const [allPopularPosts, setAllPopularPosts] =useState([]);

    // 버튼 클릭 상태
    const [sendBraveClicked, setSendBraveClicked] = useRecoilState(postLikeBtn);

    // 기본적으로 보여줄 유저 데이터
    const [userData, setUserData] = useRecoilState(userinfo);

    // 유저 데이터 불러오는 함수 
    const getUserInfo = async () => {
        try {
            const response = await userInfoGetAPI();
            setUserData({
                nickName: response.data.nickName,
                local: response.data.local,
                profileImage: response.data.profileImage,
                postUpList: response.data.postUpList,
                commentUpList: response.data.commentUpList
            });
            return response.data; // Return user data for useEffect
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    // 초기 sendBraveClicked 상태 설정
    useEffect(() => {
        getUserInfo().then(userData => {
            console.log("유저 데이터", userData);
    
            const initialSendBraveClicked = {};
            if(userData){

            userData.postUpList.forEach(postId => {
            initialSendBraveClicked[postId] = true;
            });
            setSendBraveClicked(initialSendBraveClicked);
            }
        
        });
        }, []);

    //모든 인기게시물 불러오기
    const allPopularFunc = async () => {
        try {
            const response = await allPostsRecommendGetAPI();
            if (Array.isArray(response.data)) {
                setAllPopularPosts(response.data);
            } else {
                console.error('API 응답이 배열 형식이 아닙니다:', response.data);
            }
            console.log(response);
        } catch (error) {
            console.error('Error fetching all popular posts:', error);
        }
    };

    useEffect(()=>{
        allPopularFunc();
    },[sendBraveClicked]);
    
    //글자수 컷
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    // 이미지 링크 추출 함수
    const extractImageLink = (postData) => {
        const fields = ['proBackground', 'solution', 'benefit'];
        
        for (let field of fields) {
        const value = postData[field];
        if (value) { 
            const match = value.match(/\[이미지:\s*(https?:\/\/[^\s\]]+)\]/);
            if (match) {
            return match[1];
            }
        }
        }
        
        return hanmadiv;
    };

    // 포스트 채택
    const checkPostIncrease = async (postId) => {
        const response = await checkPostPostAPI(postId);
        return response.data; 
    }

    // 포스트 채택 삭제
    const checkPostDecrease = async (postId) => {
        const response = await checkPostDeleteAPI(postId);
        return response.data;
    }
    

    // 좋아요 버튼 클릭 처리
    const handleLike = async(postId) => {
        if (sendBraveClicked[postId]) { // 이미 좋아요를 클릭한 상태인 경우
            const newLikeStatus = { ...sendBraveClicked };
            await checkPostDecrease(postId);
            delete newLikeStatus[postId]; // postId에 대한 클릭 상태 삭제
            setSendBraveClicked(newLikeStatus); // 클릭 상태 업데이트

            // 아톰에 저장된 사용자 데이터 업데이트
            setUserData(prevUserData => ({
                ...prevUserData,
                postUpList: prevUserData.postUpList.filter(id => id !== postId), // postId 제거
            }));
        } else { // 좋아요를 클릭하지 않은 상태인 경우
            await checkPostIncrease(postId);
            setSendBraveClicked({ ...sendBraveClicked, [postId]: true }); // postId에 대한 클릭 상태 true로 설정

            // 아톰에 저장된 사용자 데이터 업데이트
            setUserData(prevUserData => ({
                ...prevUserData,
                postUpList: [...prevUserData.postUpList, postId], // postId 추가
            }));
        }
    };
    
    return (
        <Container>
            <GlobalStyle />
            <PopularContentContainer>
                <TextContainer>
                    <LineTextContainer>
                        <TopicText>인기있는 제안</TopicText>
                    </LineTextContainer>
                    <LineTextContainer>
                        <TitleText>이거 괜찮은 의견인데?</TitleText>
                    </LineTextContainer>
                </TextContainer>
                <TwoContentContainer>
                {allPopularPosts.length > 0 && allPopularPosts.slice(0, 2).map((content, index) => (
                    <ImageContent
                    key={index}
                    postId={content.postId}
                    image = {extractImageLink(content)}
                    title={truncateText(content.title,25)}
                    author={content.userName}
                    due={'D-'+content.deadLine}
                    initialLikes={content.upCountPost}
                    setShowModal={setShowModal}
                    isLiked={sendBraveClicked[content.postId]}
                    handleLike={() => handleLike(content.postId)}
                    />
                ))}
                </TwoContentContainer>
            </PopularContentContainer>
            <LoginModal show={showModal} onClose={() => setShowModal(false)} />
        </Container>
    );
}

const ImageContent = ({ postId, image, title, author, due, initialLikes, setShowModal, isLiked, handleLike }) => {

    //로그인 테스트 상태 -추후 서버랑 연결해야함.
    const [isLogin, setIsLogin] = useRecoilState(loginTestState); 
    const navigate = useNavigate();

    const handleClickLike = () => {
        if(isLogin){
            handleLike(postId);
        }
        else{
            setShowModal(true);
        }
    };

    //상세페이지로 이동
    const navigateToPost = (postId) => {
        navigate(`/postit/${postId}`);
    };

    return (
        <ImageContentContainer>
            <img src={image} alt="포스트 이미지" style={{ width: '515px', height:"359px" }} />
            <ContentTitleText onClick={()=>navigateToPost(postId)}>
                {title}
            </ContentTitleText>
            <Details>
                <DetailContainer>
                    <DetailText>작성자</DetailText>
                    <DetailText $color="#5A5A5A">{author}</DetailText>
                </DetailContainer>
                <DetailContainer>
                    <DetailText>종료일</DetailText>
                    <DetailText $color="#5A5A5A">{due}</DetailText>
                </DetailContainer>
                <DetailContainer>
                    <DetailText>추천수</DetailText>
                    <DetailText $color="#5A5A5A">{initialLikes}</DetailText>
                </DetailContainer>
            </Details>
            <BraveButton onClick={handleClickLike} isLiked={isLiked}>
                {isLiked ? '추천하기' : '추천하기'}
            </BraveButton>
        </ImageContentContainer>
    );
};

export default IdeaPage;

const Container = styled.div`
    margin-top: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: white;
`;

const PopularContentContainer = styled.div`
    width: 1130px;
    height: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
`;

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
`;

const LineTextContainer = styled.div`
    display: flex;
    align-items: center;
`;

const TopicText = styled.span`
    color: #005AFF;
    font-family: 'MinSans-Regular';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    margin-bottom: 10px;
`;

const TitleText = styled.div`
    color: #191919;
    font-family: 'MinSans-Regular';
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
`;

const ContentTitleText = styled.div`
    color: #191919;
    font-family: 'MinSans-Regular';
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    padding-top: 28px;
    padding-bottom: 30px;
    white-space: nowrap; /* Prevent text wrapping */
    overflow: hidden; /* Hide overflow */
    text-overflow: ellipsis; /* Show ellipsis for overflowed text */
    &:hover {
        color: #005AFF; 
        cursor: pointer; 
    }
`;

const Details = styled.div`
    width: 100%; /* Ensure Details takes the full width */
    display: flex;
    flex-direction: column;
`;

const DetailText = styled.span`
    color: ${(props) => props.$color || '#9D9D9D'};
    font-family: 'MinSans-Regular';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    padding-right: 34px;
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 18px;
`;

const TwoContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: white;
    line-height: 200%;
`;

const BraveButton = styled.button`
    display: flex;
    width: 100%;
    height: 57px;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: ${(props) => (props.isLiked ? '#E2ECFF' : '#005AFF')};
    color: ${(props) => (props.isLiked ? '#246BEB' : 'white')};
    border: none;
    align-self: stretch;
    font-family: "Min Sans-Regular";
    font-weight: 600;
    cursor: pointer;
    margin-top: 18px;

    &:hover {
        background: ${(props) => (props.isLiked ? '#D1E4FF' : '#0043BE')};
    }

    &:active {
        background: #E2ECFF;  
        color: #246BEB;
    }
`;

const ImageContentContainer = styled.div`
    width: 515px;
    display: flex;
    flex-direction: column;
`;
