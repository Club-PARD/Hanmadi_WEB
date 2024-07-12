import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Banner from '../Components/MainPage_Components/Banner';
import IdeaPage from "../Components/MainPage_Components/IdeaPage";
import GreatIdeaPage from "../Components/MainPage_Components/GreatIdeaPage";
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


  const getUserInfo = async () => {
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

  useEffect(() => {
    if (isLogin) {
      getUserInfo();
    }
  }, [isLogin]);

  const scrollToNextPage = () => {
    window.scrollBy({ top: window.innerHeight, left: 0, behavior: 'smooth' });
  };

  return (
    <PageContainer>
      <Banner />
      <IdeaPage />
      <GreatIdeaPage />
      <FixedButton onClick={scrollToNextPage}>
        <Container>
          <img src={DownArrow} alt="downarrow" />
        </Container>
      </FixedButton>
    </PageContainer>
  );
}

export default MainPage;

const PageContainer = styled.div`
  overflow: hidden; /* 가로 스크롤 방지와 세로 스크롤 방지 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FixedButton = styled.div`
  bottom: 2180px;
  position: relative;
  background-color: transparent;
  border: none;
  z-index: 1050;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* 클릭 가능한 커서로 변경 */
`;

const Container = styled.div`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
`;
