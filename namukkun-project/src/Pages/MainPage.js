import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Banner from '../Components/MainPage_Components/Banner';
import pointer from '../Assets/Img/pointer.svg';
import minilogo from '../Assets/Img/minilogo.svg';
import IdeaPage from "../Components/MainPage_Components/IdeaPage";
import GreatIdeaPage from "../Components/MainPage_Components/GreatIdeaPage";
import onclickminilogo from '../Assets/Img/onclickminilogo.svg';
import onclickpointer from '../Assets/Img/onclickpointer.svg';
import { useRecoilState } from "recoil";
import { loginTestState, userinfo } from "../Recoil/Atom";
import { useNavigate } from 'react-router-dom';
import LoginModal from "../Components/Login_Components/LoginModal";
import { userInfoGetAPI } from "../API/AxiosAPI";
import DownArrow from '../Assets/Img/DownArrow.svg';

function MainPage() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(loginTestState);
  const [userData, setUserData] = useRecoilState(userinfo);

  const writingBtn = () =>{
    if(isLogin){
      navigate('/writing');
    }
    else{
      setShowModal(true);
    }
  }

  const getUserInfo = async () =>{
    const response = await userInfoGetAPI();
    setUserData({
      ...userData,
      nickName: response.data.nickName,
      local: response.data.local,
      profileImage: response.data.profileImage,
      postUpList: response.data.postUpList,
      commentUpList: response.data.commentUpList
    });
    console.log(response.data);
  };

  useEffect(()=>{
    if(isLogin){
      getUserInfo();
    }
  },[isLogin]);

  return (
    <PageContainer>
      <Banner />
      <IdeaPage />
      <GreatIdeaPage />
      <FixedButton
        onClick={writingBtn}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Container>
          <img src={DownArrow} alt="downarrow" />
        </Container>
      </FixedButton>
      <LoginModal show={showModal} onClose={() => setShowModal(false)} />
    </PageContainer>
  );
}

export default MainPage;

const PageContainer = styled.div`
  overflow-x: hidden; /* 가로 스크롤 방지 */
`;

const FixedButton = styled.button`
  bottom: 1850px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: transparent;
  color: #191919;
  border: none;
  font-weight: 600;
  font-size: 34.71px;
  cursor: pointer;
  z-index: 1050;
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
