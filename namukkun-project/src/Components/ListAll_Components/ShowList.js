import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Contents from "./Contents";
import arrowleft from '../../Assets/Img/Arrowleft.svg';
import arrowright from '../../Assets/Img/Arrowright.svg';
import { useRecoilState } from "recoil";
import { loginTestState, pagenation, stateListCategory, userinfo } from "../../Recoil/Atom";
import LoginModal from "../Login_Components/LoginModal";
import Bigdefault from '../../Assets/Img/Bigdefault.svg';
import { useLocation } from "react-router-dom";
import { intToRegion } from "../SelectRegion_Components/IntToRegion";
import { popularRegionPostGetAPI, recentRegionPostGetAPI } from "../../API/AxiosAPI";

function ShowList() {
  // 필터 버튼 값 설정 [추천/최신]
  const [filter, setFilter] = useState('recent');
  const [currentPage, setCurrentPage] =useRecoilState(pagenation);
  //선택한 지역별 상태 확인
  const location = useLocation();
  const gerPathRegion =location.search;
  //기본적으로 보여줄 유저 데이터
  const [userData, setUserData] = useRecoilState(userinfo);

  console.log("Path 위치",location.search);

   //로그인 테스트 상태 -추후 서버랑 연결해야함.
   const [isLogin, setIsLogin] = useRecoilState(loginTestState);  
   const [showModal, setShowModal] = useState(false);

   //포스트 데이터 저장
  const [getpostData, setGetPostData] = useState([]);

  //전체글에 대한 추천/최신 필터 버튼
  const onClickFilterBtn = (filterValue) => {
    setCurrentPage(1);
    setFilter(filterValue);
  }

 // 버튼 클릭 상태 관리 (버튼 수를 초기값 false로 설정) - 13은 임시 버튼 수
  const [sendBraveClicked, setSendBraveClicked] = useState(Array(13).fill(false));

  // 버튼 클릭 이벤트 핸들러
  const handleSendBraveClick = (index) => {
    if(isLogin){
      const newSendBraveClicked = [...sendBraveClicked];
      newSendBraveClicked[index] = !newSendBraveClicked[index];
      setSendBraveClicked(newSendBraveClicked);
    }
    else{
      setShowModal(true);
    }
  };

  //지역별 최신순
  const getPostsListallrecent = async(gerPathRegion) =>{
    const response = await recentRegionPostGetAPI(gerPathRegion);
    setGetPostData(response.data);
    console.log(response.data);
  }

  //지역별 인기순
  const getPostsListallPopular = async(gerPathRegion) =>{
    const response = await popularRegionPostGetAPI(gerPathRegion);
    setGetPostData(response.data);
    console.log(response.data);
  }

  useEffect(()=>{
    if (filter ==='recent'){
      console.log("최신");
      getPostsListallrecent(gerPathRegion);
    }
    else{
      console.log("인기");
      getPostsListallPopular(gerPathRegion);
    }
  },[gerPathRegion, filter]);

  const itemsPerPage = 6; //한 페이지당 보여지는 컨텐츠 갯수
  //총 페이지 갯수
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
        <Title>✏️ {filter === 'recommend' ? '추천' : '전체'}글 모아보기</Title>
        <BtnDiv>
          <FilterBtn onClick={() => onClickFilterBtn('recommend')} isSelected={filter === 'recommend'}>추천</FilterBtn>
          <FilterBtn onClick={() => onClickFilterBtn('recent')} isSelected={filter === 'recent'}>최신</FilterBtn>
        </BtnDiv>
      </TopHeader>
      <PostListContentsDiv>
        {paginatedContents.map((content, index) => (
          <Contents
            key={index}
            content={content}
            isClicked={sendBraveClicked[(currentPage - 1) * itemsPerPage + index]}
            onClick={() => handleSendBraveClick((currentPage - 1) * itemsPerPage + index)}
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
