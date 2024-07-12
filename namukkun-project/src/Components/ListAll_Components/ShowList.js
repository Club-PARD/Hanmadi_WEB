import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Contents from "./Contents";
import arrowleft from '../../Assets/Img/Arrowleft.svg';
import arrowright from '../../Assets/Img/Arrowright.svg';
import { useRecoilState } from "recoil";
import { getPopularRegion, getRecentRegion, loginTestState, pagenation, postLikeBtn, userinfo } from "../../Recoil/Atom";
import LoginModal from "../Login_Components/LoginModal";
import { useLocation } from "react-router-dom";
import { checkPostDeleteAPI, checkPostPostAPI, loginCheckAPI, popularRegionPostGetAPI, recentRegionPostGetAPI, userInfoGetAPI } from "../../API/AxiosAPI";

function ShowList() {
  // 필터 버튼 값 설정 [추천/최신]
  const [filter, setFilter] = useState('recommend');
  const [currentPage, setCurrentPage] = useRecoilState(pagenation);
  // 선택한 지역별 상태 확인
  const location = useLocation();
  const gerPathRegion = location.search;
  // 기본적으로 보여줄 유저 데이터
  const [userData, setUserData] = useRecoilState(userinfo);
  //누른 버튼 상태
  const [postLike, setPostLike] = useRecoilState(postLikeBtn);

  // 로그인 테스트 상태 - 추후 서버랑 연결해야 함.
  // const [isLogin, setIsLogin] = useRecoilState(loginTestState);  
  const [showModal, setShowModal] = useState(false);

  // 포스트 데이터 저장
  const [getpostData, setGetPostData] = useState([]);

  //포스트 데이터
  const [PopularData, setPopularData] = useRecoilState(getPopularRegion);
  const [recentData, setRecentData] = useRecoilState(getRecentRegion); 

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
    }, []);

  // 전체 글에 대한 추천/최신 필터 버튼ㄴ
  const onClickFilterBtn = (filterValue) => {
    setCurrentPage(1);
    setFilter(filterValue);
  }

  // 포스트 채택
  const checkPostIncrease = async (postId) => {
    try {
      const response = await checkPostPostAPI(postId);
      return response.data;
    } catch (error) {
      console.error("Error increasing post:", error);
      throw error;
    }
  }

  // 포스트 채택 삭제
  const checkPostDecrease = async (postId) => {
    try {
      const response = await checkPostDeleteAPI(postId);
      return response.data;
    } catch (error) {
      console.error("Error decreasing post:", error);
      throw error;
    }
  }

  // 버튼 클릭 상태 관리
  const [sendBraveClicked, setSendBraveClicked] = useState(postLike)
  ;



  // 유저가 클릭한 포스트와 비교 후 setSendBraveClicked 일부 true로 변경
  // 버튼 클릭 이벤트 핸들러
  const handleSendBraveClick = async (postId, content) => {

    if(loginCheck){
      const newSendBraveClicked = {
        ...sendBraveClicked,
        [postId]: !sendBraveClicked[postId]
      };
      setSendBraveClicked(newSendBraveClicked);
  
      try {
        let response;
        if (newSendBraveClicked[postId]) {
          response = await checkPostIncrease(content.postId); // 좋아요 증가 API 호출
          console.log("up", response);
        } else {
          response = await checkPostDecrease(content.postId); // 좋아요 감소 API 호출
          console.log("Down", response);
        }
      
      if(response.postId ===postId){
        // 유저 데이터 업데이트
        setUserData({
          ...userData,
          postUpList: response.postId
        });

      }

      // // postId에 해당하는 포스트의 upCount 추출
      const upcount = response.find(post => post.postId == postId)?.postUpCount;

      console.log("upcount", upcount);
      console.log("post")
      // 포스트 데이터 업데이트
      const updatedPostData = getpostData.map(post => {
        if (post.postId === postId) {
          return {
            ...post,
            // upCountPost: upcount || 0
            upCountPost: upcount || 0
          };
        }
        return post;
      });
  
      setGetPostData(updatedPostData);
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

  // 버튼 상태 변화 시 서버에서 유저 데이터를 가져옴
  // 유저 데이터 불러오는 함수 
  const getUserInfo = async () => {
    try {
      const response = await userInfoGetAPI();
      // 아톰에 유저 정보 저장
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
      console.error("Error fetching user info:", error);
      throw error;
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

  // 지역별 최신순
  const getPostsListallrecent = async (gerPathRegion) => {
    try {
      const response = await recentRegionPostGetAPI(gerPathRegion);
      setGetPostData(response.data);
      setRecentData(response.data);
      console.log("데이터 확인", getpostData);
    } catch (error) {
      console.error("Error fetching recent posts:", error);
    }
  }

  // 지역별 인기순
  const getPostsListallPopular = async (gerPathRegion) => {
    try {
      const response = await popularRegionPostGetAPI(gerPathRegion);
      setGetPostData(response.data);
      setPopularData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching popular posts:", error);
    }
  }

  useEffect(() => {

    if (filter === 'recent') {
      console.log("최신");
      getPostsListallrecent(gerPathRegion);
    } else if (filter === 'recommend') {
      console.log("인기");
      getPostsListallPopular(gerPathRegion);
    }
  }, [gerPathRegion, filter]);

  const itemsPerPage = 6; // 한 페이지당 보여지는 컨텐츠 갯수
  // 총 페이지 갯수
  const totalPages = Math.ceil(getpostData.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  // 현재 페이지에 해당하는 콘텐츠 배열
  const paginatedContents = getpostData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Div>
      <TopHeader>
        <Title>✏️ 전체글 모아보기</Title>
        <BtnDiv>
          <FilterBtn onClick={() => onClickFilterBtn('recommend')} isSelected={filter === 'recommend'}>추천</FilterBtn>
          <FilterBtn onClick={() => onClickFilterBtn('recent')} isSelected={filter === 'recent'}>최신</FilterBtn>
        </BtnDiv>
      </TopHeader>
      <PostListContentsDiv>
        {paginatedContents.length > 0 && paginatedContents.map((content, index) => (
          <Contents
            key={index}
            content={content}
            isClicked={sendBraveClicked[content.postId]}
            onClick={() => handleSendBraveClick(content.postId, content)}
          />
        ))}
      </PostListContentsDiv>
      <Pagenation>
        <PagenationButton onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1}>
          <img src={arrowleft}></img>
        </PagenationButton>
        {[...Array(totalPages)].map((_, i) => (
          <PagenationButton key={i} onClick={() => handleChangePage(i + 1)} isSelected={currentPage === i + 1}>
            {i + 1}
          </PagenationButton>
        ))}
        <PagenationButton onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages}>
          <img src={arrowright}></img>
        </PagenationButton>
      </Pagenation>
      <LoginModal show={showModal} onClose={() => setShowModal(false)} />
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 96px;
  width: 935px;
  margin-bottom: 66px;
`;

const Title = styled.div`
  color: var(--gray-008, #191919);
  font-family: 'MinSans-Regular';
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
`;

const BtnDiv = styled.div`
  display: flex;
`;

const FilterBtn = styled.button`
  display: flex;
  height: 36px;
  padding: 9.685px;
  justify-content: center;
  align-items: center;
  gap: 9.685px;
  border-radius: 6.623px;

  color: var(--Main-001, #005AFF);
  text-align: center;
  font-family: "Min Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 29.054px; /* 214.286% */
  border: none;
  background-color:  ${(props) => (props.isSelected ? '#DBE8FF' : 'transparent')}; 
  cursor: pointer;
`;

const PostListContentsDiv = styled.div`
  width: 935px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Pagenation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 69px;
  margin-bottom: 63px;
  gap: 10px;
`;

const PagenationButton = styled.button`
  display: flex;
  width: 31px;
  height: 31px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;

  border-radius: var(--Corner-Full, 1000px);
  background-color: ${(props) => (props.isSelected ? '#F5F5F5' : 'transparent')};
  cursor: pointer
  `

export default ShowList;
