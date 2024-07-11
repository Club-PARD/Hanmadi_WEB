import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import Slick from '../../Components/Slick_Components/Slick';
import WhiteArrow from '../../Assets/Img/WhiteArrow.svg';
import { useNavigate } from "react-router-dom";
import { loginCheckAPI } from "../../API/AxiosAPI";
import LoginModal from "../Login_Components/LoginModal";

function Banner() {

  const [loginCheck, setLoginCheck] =useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate =useNavigate();

  const checkloginFunc = async () => {
    try {
      const response = await loginCheckAPI();
      if (response.status === 200) {
        setLoginCheck(true);  
      } else {
        setLoginCheck(false);
        navigate('/main')
      }
    } catch (error) {
      console.error("로그인 체크 중 오류 발생:", error);
    }
  };

  useEffect(()=>{
    checkloginFunc();
  },[loginCheck]);
  
  const navigateFunc = () =>{
    if(loginCheck){
      setShowModal(true);
    }
    else{
      navigate('/writing');
    }
  }

  return (
    <Container>
      <SlickWrapper>
        <SlickContainer>
          <Slick />
        </SlickContainer>
        <BannerDiv>
          <Ment>
            더 나은 우리지역을 위한 <br /><BoldText>용기낸 한마디</BoldText>
          </Ment>
          <BannerBtn onClick={navigateFunc}>
            의견 제안하기 <img src={WhiteArrow} alt="WhiteArrow" />
          </BannerBtn>
        </BannerDiv>
      </SlickWrapper>
      <LoginModal show={showModal} onClose={() => setShowModal(false)} />
    </Container>
  );
}

export default Banner;

const Container = styled.div`
  width: 100%;
  height: 758px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden; /* 배너 영역에서 스크롤 방지 */
`;

const SlickWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden; /* 배너 영역에서 스크롤 방지 */
`;

const SlickContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0; /* Ensure this is behind the BannerDiv */
`;

const BannerDiv = styled.div`
  display: flex;
  width: 434px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  position: absolute;
  top: 40%;
  left: 25%;
  transform: translateX(-50%);
  z-index: 1; /* Ensure this is above the Slick images */
  padding: 20px;
  border-radius: 10px;
`;

const Ment = styled.div`
  color: #FFF;
  font-family: "Min Sans-Regular";
  font-size: 46px;
  font-style: normal;
  font-weight: 500;
  line-height: 64px;
  white-space: nowrap;
`;

const BoldText = styled.span`
  font-weight: 700;
`;

const BannerBtn = styled.button`
  width: 238.496px;
  height: 74.476px;
  border-radius: 9.714px;
  border: none;
  background: rgba(0, 90, 255, 0.80);
  color: #FFF;
  font-family: "Min Sans-Regular";
  font-size: 28.098px;
  font-style: normal;
  font-weight: 500;
  line-height: 32.415px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;
