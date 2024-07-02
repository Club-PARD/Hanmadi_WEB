import React, { useState } from "react";
import styled from "styled-components";
import Banner from '../Components/MainPage_Components/Banner';
import pointer from '../Assets/Img/pointer.svg';
import minilogo from '../Assets/Img/minilogo.svg';
import IdeaPage from "../Components/MainPage_Components/IdeaPage";
import Header from "../Components/Layout_Components/Header";
import GreatIdeaPage from "../Components/MainPage_Components/GreatIdeaPage";
import onclickminilogo from '../Assets/Img/onclickminilogo.svg';
import onclickpointer from '../Assets/Img/onclickpointer.svg';

function MainPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <Header />
      <Banner />
      <IdeaPage />
      <GreatIdeaPage />
      <FixedButton
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
