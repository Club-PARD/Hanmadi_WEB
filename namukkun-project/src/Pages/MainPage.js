import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Banner from '../Components/MainPage_Components/Banner';
import pointer from '../Assets/Img/pointer.svg';
import minilogo from '../Assets/Img/minilogo.svg';
import IdeaPage from "../Components/MainPage_Components/IdeaPage";
import Header from "../Components/Layout_Components/Header";
import GreatIdeaPage from "../Components/MainPage_Components/GreatIdeaPage";
import onclickminilogo from '../Assets/Img/onclickminilogo.svg';
import onclickpointer from '../Assets/Img/onclickpointer.svg';
import { useRecoilState } from "recoil";
import { loginTestState, postLikeBtn, userinfo } from "../Recoil/Atom";
import { useNavigate } from 'react-router-dom';
import LoginModal from "../Components/Login_Components/LoginModal";
import { userInfoGetAPI } from "../API/AxiosAPI";

function MainPage() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  //로그인 모달 상태 관리
  const [showModal, setShowModal] = useState(false);
  //로그인 테스트
  const [isLogin, setIsLogin] = useRecoilState(loginTestState);
  //유저 기본 정보 아톰에 저장
  const [userData, setUserData] = useRecoilState(userinfo);

  const writingBtn = () =>{
    if(isLogin){
      navigate('/writing');
    }
    else{
      setShowModal(true);
    }
  }

  //유저 데이터 불러오는 함수 
  const getUserInfo = async () =>{
    const response =await userInfoGetAPI();
    //아톰에 유저 정보 저장
    setUserData({
      ...userData,
      nickName: response.data.nickName,
      local: response.data.local,
      profileImage: response.data.profileImage,
      postUpList: response.data.postUpList,
      commentUpList: response.data.commentUpList
    })
    console.log(response.data);
  };

  useEffect(()=>{
    //로그인이 됐을 때 유저 정보를 불러옴.
    if(isLogin){
      const response =getUserInfo();
      console.log(isLogin, response.data);
    }
  },[isLogin]);

  return (
    <div>
      {/* <Header /> */}
      <Banner />
      <IdeaPage />
      <GreatIdeaPage />
      <FixedButton
        onClick={writingBtn}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Container>
          <img src={isHovered ? onclickpointer : pointer} alt="pointer" />
        </Container>
        <Container>
          <img src={isHovered ? onclickminilogo : minilogo} alt="minilogo" />
          &nbsp;한마디 해보기
        </Container>
      </FixedButton>
      <LoginModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default MainPage;

const FixedButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 50%; /* 가운데 정렬을 위해 left 50% 설정 */
  transform: translateX(-50%); /* left 50% 위치에서 왼쪽으로 버튼 너비의 반만큼 이동 */
  padding: 10px 20px;
  background-color: transparent;
  color: #191919;
  border: none;
  font-weight: 600;
  font-size: 34.71px;
  cursor: pointer;
  z-index: 1000;
  &:hover {
    color: #005AFF; 
    cursor: pointer; 
  }
`;

const Container = styled.div`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
