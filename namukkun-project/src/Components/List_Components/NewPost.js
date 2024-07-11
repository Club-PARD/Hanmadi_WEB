import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import rightpagearrow from '../../Assets/Img/rightpagearrow.svg';
import leftpagearrow from '../../Assets/Img/leftpagearrow.svg';
import defaultblue from '../../Assets/Img/defaultblue.svg';
import nopost from '../../Assets/Img/nopost.svg'; // nopost 이미지 import
import { useRecoilState } from 'recoil';
import { getRecentRegion, loginTestState, postLikeBtn, userinfo } from '../../Recoil/Atom';
import LoginModal from '../Login_Components/LoginModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkPostDeleteAPI, checkPostPostAPI, loginCheckAPI, recentRegionPostGetAPI, userInfoGetAPI } from '../../API/AxiosAPI';

function PopularPost() {
    const [isClicked, setIsClicked] = useState(false);
    // 진행중이 기본값
    const [activeButton, setActiveButton] = useState('진행중'); 
    // sendbravebutton 클릭 상태
    // const [sendBraveClicked, setSendBraveClicked] = useRecoilState(postLikeBtn);
    // const [sendBraveClicked, setSendBraveClicked] = useState({});
    const [activeDot, setActiveDot] = useState(0); // pagination 상태

    const [recentData, setRecentData] = useRecoilState(getRecentRegion); 
   
    const [showModal, setShowModal] = useState(false);

    // 기본적으로 보여줄 유저 데이터
    const [userData, setUserData] = useRecoilState(userinfo);

    const location = useLocation();
    const getPathRegion = location.search;

    const [loginCheck, setLoginCheck] =useState(false);

      //누른 버튼 상태
    const [postLike, setPostLike] = useRecoilState(postLikeBtn);


    // 유저 데이터 불러오는 함수 
    const getUserInfo = async () => {
        try {
            const response = await userInfoGetAPI();
            setUserData({
                ...userData,
                nickName: response.data.nickName,
                local: response.data.local,
                profileImage: response.data.profileImage,
                postUpList: response.data.postUpList,
                commentUpList: response.data.commentUpList
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            return null;
        }
    };

    // 초기 sendBraveClicked 상태 설정
    useEffect(() => {
        getUserInfo().then(userInfo => {
            console.log("유저 데이터", userInfo);
    
            const initialSendBraveClicked = {};
            userInfo.postUpList&& userInfo.postUpList.forEach(postId => {
            initialSendBraveClicked[postId] = true;
            });
            setSendBraveClicked(initialSendBraveClicked);
            setPostLike(initialSendBraveClicked);
        }).catch(error => {
            console.error("Error fetching user info:", error);
        });
    }, [postLike]);


    // 버튼 클릭 상태 관리
    const [sendBraveClicked, setSendBraveClicked] = useState(postLike)

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

  // 버튼 클릭 이벤트 핸들러
  const handleSendBraveClick = async (post) => {

    const postId = post.postId;

    if(loginCheck){
      const newSendBraveClicked = {
        ...sendBraveClicked,
        [postId]: !sendBraveClicked[postId]
      };
      setSendBraveClicked(newSendBraveClicked);
  
      try {
        let response;
        if (newSendBraveClicked[postId]) {
          response = await checkPostIncrease(postId); // 좋아요 증가 API 호출
        } else {
          response = await checkPostDecrease(postId); // 좋아요 감소 API 호출
        }
      
      if(response.postId ===postId){
        // 유저 데이터 업데이트
        setUserData({
          ...userData,
          postUpList: response.postId
        });

      }

      // postId에 해당하는 포스트의 upCount 추출
      const upcount = response.find(post => post.postId === postId)?.postUpCount;

      // 포스트 데이터 업데이트
      const updatedPostData = recentData.map(post => {
        if (post.postId === postId) {
          return {
            ...post,
            upCountPost: upcount || 0
          };
        }
        return post;
      });
  
      setRecentData(updatedPostData);
      console.log("hi", sendBraveClicked);
  
      } catch (error) {
        console.error("Error updating post:", error);
        // setShowModal(true);
      }
    }
      else{
        setShowModal(true);
      }
    
  };

    useEffect(() => {
        getUserInfo().then(response => {
        console.log("유저 데이터", response);
        setPostLike(sendBraveClicked);
        }).catch(error => {
        console.error("Error fetching user info:", error);
        });
  }, [sendBraveClicked, postLike]);


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
                        {postsToDisplay.length > 0 ? (
                            postsToDisplay.map((post, index) => (
                                <ImageContent
                                    key={index}
                                    postImage= {extractImageLink(post)}
                                    title={post.title}
                                    author={post.userName}
                                    due={'D-'+post.deadLine}
                                    initialLikes={post.upCountPost}
                                    truncateText={truncateText}
                                    setShowModal ={setShowModal}
                                    handleLike={() => handleSendBraveClick(post)} 
                                    isLiked={sendBraveClicked[post.postId]} 
                                    postId = {post.postId}
                                />
                            ))
                        ) : (
                            <NoPostImageContainer>
                                <img src={nopost} alt="No post available" />
                            </NoPostImageContainer>
                        )}
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
                <DetailText>추천수</DetailText>
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

const NoPostImageContainer = styled.div` // 빈 포스트 이미지 컨테이너 추가
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 460px;
    margin-bottom: 119px;
`;
