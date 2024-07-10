import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import rightpagearrow from '../../Assets/Img/rightpagearrow.svg';
import leftpagearrow from '../../Assets/Img/leftpagearrow.svg';
import defaultblue from '../../Assets/Img/defaultblue.svg';
import { useRecoilState } from 'recoil';
import { getRecentRegion, loginTestState, postLikeBtn, userinfo } from '../../Recoil/Atom';
import LoginModal from '../Login_Components/LoginModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkPostDeleteAPI, checkPostPostAPI, loginCheckAPI, recentRegionPostGetAPI } from '../../API/AxiosAPI';

function PopularPost() {
    const [isClicked, setIsClicked] = useState(false);
    // 진행중이 기본값
    const [activeButton, setActiveButton] = useState('진행중'); 
    // sendbravebutton 클릭 상태
    const [sendBraveClicked, setSendBraveClicked] = useRecoilState(postLikeBtn);
    // const [sendBraveClicked, setSendBraveClicked] = useState({});
    const [activeDot, setActiveDot] = useState(0); // pagination 상태

    //로그인 테스트 상태 -추후 서버랑 연결해야함.
    const [isLogin, setIsLogin] = useRecoilState(loginTestState); 
    
    const [recentData, setRecentData] = useRecoilState(getRecentRegion); 
   
    const [showModal, setShowModal] = useState(false);

    // 기본적으로 보여줄 유저 데이터
    const [userData, setUserData] = useRecoilState(userinfo);

    const location = useLocation();
    const getPathRegion = location.search;

    const [loginCheck, setLoginCheck] =useState(false);

    const checkloginFunc = async () => {
      try {
        const response = await loginCheckAPI();
        if (response.status === 200) {
          setLoginCheck(true);
        } else {
          setLoginCheck(false);
        }
      } catch (error) {
        console.error("로그인 체크 중 오류 발생:", error);
      }
    };
  
    useEffect(()=>{
      checkloginFunc();
    },[]);

    const handleDotClick = (index) => {
        setActiveDot(index);
    };

    const handleRightArrowClick = () => {
        setActiveDot((prevActiveDot) => (prevActiveDot + 1) % 3);
    };

    const handleLeftArrowClick = () => {
        setActiveDot((prevActiveDot) => (prevActiveDot - 1 + 3) % 3);
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    useEffect(()=>{
        const recent = async() =>{
            console.log("Newpost", getPathRegion)
            const response = await recentRegionPostGetAPI(getPathRegion);
            setRecentData(response.data);
        };
        recent();
        

    },[getPathRegion, sendBraveClicked]);

    // 현재 페이지에 해당하는 게시글들만 선택
    const postsToDisplay = recentData.slice(activeDot * 2, activeDot * 2 + 2);


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

    const handleLike = async(post) => {
        if (loginCheck) {
            const postId = post.postId;
            console.log(postId);
            const newSendBraveClicked = { ...sendBraveClicked };

            try {
                let response;
                if (newSendBraveClicked[postId]) {
                    const response = await checkPostDecrease(postId); // 좋아요 감소 API 호출
                    delete newSendBraveClicked[postId]; // postId에 대한 클릭 상태 삭제
                } else {
                    const response = await checkPostIncrease(postId); // 좋아요 증가 API 호출
                    newSendBraveClicked[postId] = true; // postId에 대한 클릭 상태 true로 설정
                }

                setSendBraveClicked(newSendBraveClicked); // 상태 업데이트

                console.log("배열확인",userData);
                setUserData(prevUserData => ({
                    ...prevUserData,
                    postUpList: Object.keys(newSendBraveClicked).map(key => parseInt(key)), // 클릭된 postId들을 배열로 저장
                }));

                const updatedPostData = recentData.map(post => {
                    if (post.postId === postId) {
                        return {
                            ...post,
                            upCountPost: response.postUpCount
                        };
                    }
                    return post;
                });
    
                setRecentData(updatedPostData);

            } catch (error) {
                console.error('API 호출 실패:', error);
                
            }

        } else {
            setShowModal(true);
        }
    };


    // 이미지 링크 추출 함수
    const extractImageLink = (postData) => {
    const fields = ['proBackground', 'solution', 'benefit'];

    for (let field of fields) {
        const value = postData[field];
        if (value) { // value가 undefined나 null이 아닌 경우에만 match 메서드 호출
            const match = value.match(/\[이미지:\s*(https?:\/\/[^\s\]]+)\]/);
            if (match) {
            return match[1];
            }
        }
        }

    return defaultblue;
    };
        
    return (
        <Container>
            <GlobalStyle />
            <PageMoveContent>
                <LeftArrowContainer>
                    <LeftArrowButton onClick={handleLeftArrowClick}>
                        <img src={leftpagearrow} style={{ width: '22px', height: '45px' }}></img>
                    </LeftArrowButton>
                </LeftArrowContainer>
                <PopularContentContainer>
                    <IntroContainer>
                        <MainTitle>새로운 한마디들, 이거 어때? 🤔</MainTitle>
                        <SubTitle>새로운 제안이 들어왔어요</SubTitle>
                    </IntroContainer>
                    <Pagination>
                        <PaginationDotContainer>
                            {[...Array(3)].map((_, index) => (
                                <Dot
                                    key={index}
                                    active={activeDot === index}
                                    onClick={() => handleDotClick(index)}
                                />
                            ))}
                        </PaginationDotContainer>
                    </Pagination>
                    <TwoContentContainer>
                        {postsToDisplay &&postsToDisplay.map((post, index) => (
                            <ImageContent
                                key={index}
                                postImage= {extractImageLink(post)}
                                title={post.title}
                                author={post.userName}
                                due={'D-'+post.deadLine}
                                initialLikes={post.upCountPost}
                                truncateText={truncateText}
                                isLogin ={isLogin}
                                setShowModal ={setShowModal}
                                handleLike={() => handleLike(post)} 
                                isLiked={sendBraveClicked[post.postId]} 
                                postId = {post.postId}
                            />
                        ))}
                    </TwoContentContainer>
                </PopularContentContainer>
                <RightArrowContainer>
                    <RightArrowButton onClick={handleRightArrowClick}>
                        <img src={rightpagearrow} style={{ width: '22px', height: '45px' }}></img>
                    </RightArrowButton>
                </RightArrowContainer>
            </PageMoveContent>
            <LoginModal show={showModal} onClose={() => setShowModal(false)} />
        </Container>
    );
}

export default PopularPost;

const ImageContent = ({ postImage, title, author, due, initialLikes, truncateText,handleLike, isLiked ,postId }) => {

    const navigate = useNavigate();
    
    //상세페이지로 이동
    const navigateToPost = (postId) => {
        navigate(`/postit/${postId}`);
    };

    return (
        <ImageContentContainer>
            <img src={postImage} alt="게시글 이미지" style={{ width: '424px', height: '300px' }} />
            <ContentTitleText onClick={()=>{navigateToPost(postId)}}>
                {truncateText(title, 43)} {/* title을 truncateText로 잘라내기 */}
            </ContentTitleText>
            <DetailContainer>
                <DetailText>작성자</DetailText>
                <DetailText $color="#5A5A5A">{author}</DetailText>
            </DetailContainer>
            <DetailContainer>
                <DetailText>종료일</DetailText>
                <DetailText $color="#5A5A5A">{due}</DetailText>
            </DetailContainer>
            <DetailContainer>
                <DetailText>공감수</DetailText>
                <DetailText $color="#5A5A5A">{initialLikes}</DetailText>
            </DetailContainer>
            <BraveButton onClick={handleLike} isLiked={isLiked}>
                {isLiked ? '추천하기' : '추천하기'}
            </BraveButton>
        </ImageContentContainer>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: transparent;
    position: relative;
`;

const PopularContentContainer = styled.div`
    margin-top: 171px;
    width: 936px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: transparent;
    position: relative;
    z-index: 2;
`;

const PageMoveContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const LeftArrowContainer = styled.div`
    height: 617px;
    width: 253px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

const LeftArrowButton = styled.div`
    margin-right: 56px;
    margin-bottom: 20px;
    cursor: pointer;
`;

const RightArrowContainer = styled.div`
    height: 617px;
    width: 253px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
`;

const RightArrowButton = styled.div`
    margin-left: 56px;
    margin-bottom: 20px;
    cursor: pointer;
`;

const IntroContainer = styled.div`
    display: flex;
    width: 377px;
    flex-direction: column;
    align-items: flex-start;
`;

const MainTitle = styled.span`
    align-self: stretch;
    color: ${(props) => props.$color || '#191919'};
    font-family: "Min Sans";
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 83.333% */
    padding-bottom: 10px;
`;

const SubTitle = styled.div`
    color: #191919;
    font-family: "Min Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px; /* 187.5% */
`;

const Pagination = styled.div`
    width: 100%;
    height: 71px;
    display: flex;
    justify-content: flex-end;
`;

const PaginationDotContainer = styled.div`
    height: 71px;
    display: flex;
    align-items: center;
    justify-content: flex-end; /* 오른쪽 끝으로 정렬 */
`;

const Dot = styled.span`
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: ${(props) => (props.active ? 'rgba(0, 90, 255, 1)' : 'rgba(0, 90, 255, 0.30)')};
    display: inline-block;
    margin-right: 11px;
    cursor: pointer;
`;

const ContentTitleText = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 49px;
    color: #191919;
    font-family: "Min Sans";
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    padding-top: 28px;
    padding-bottom: 26px;
    &:hover {
        color: #005AFF; 
        cursor: pointer; 
    }
`;

const DetailText = styled.span`
    color: ${(props) => props.$color || '#9D9D9D'};
    font-family: "Min Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    padding-right: 34px;
    gap: 18px;
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-bottom: 14px;
`;

const TwoContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: white;
    margin-bottom: 190px;
`;

const BraveButton = styled.button`
    display: flex;
    width: 100%;
    height: 57px;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    border-radius: 4px;
    background: ${(props) => (props.isLiked ? '#E2ECFF' : '#005AFF')};
    color: ${(props) => (props.isLiked ? '#246BEB' : 'white')};
    border: none;
    align-self: stretch;
    font-family: "Min Sans-Regular";
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: ${(props) => (props.isLiked ? '#D1E4FF' : '#0043BE')};
    }

    &:active {
        background: #E2ECFF;  
        color: #246BEB;
    }
`;

const ImageContentContainer = styled.div`
    width: 424px;
    display: flex;
    flex-direction: column;
`;
