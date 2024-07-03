import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Components/Layout_Components/Header";
import StatusBlock from '../Components/Mypage_Components/StatusBlock';
import IngPost from '../Components/Mypage_Components/IngPost';
import EndPost from '../Components/Mypage_Components/EndPost';
import TempPost from '../Components/Mypage_Components/TempPost';
import face from '../Assets/Img/face.svg';
import advisepen from '../Assets/Img/advisepen.svg';

function MyPage() {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 225) { // 400px 스크롤 시 상단에 고정
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Header />
      <StatusBlock />
      <IngPost />
      <EndPost />
      <TempPost />
      <FixedButton $isSticky={isSticky}>
        <img src={face} style={{ width: '144px', height: '144px' }} alt="face" />
        <InfoContainer>
            <InfoName>이름</InfoName>
            <InfoContent>나무꾼과선녀도끼와선</InfoContent>
        </InfoContainer>
        <InfoContainer>
            <InfoName>지역</InfoName>
            <InfoContent>포항시</InfoContent>
        </InfoContainer>
        <ProfileAdviseButton>
            프로필 수정하기&nbsp;&nbsp;&nbsp;
            <img src={advisepen} style={{ width: '9px', height: '9px' }} alt="advisepen"/> 
        </ProfileAdviseButton>
      </FixedButton>
    </div>
  );
}

export default MyPage;

const FixedButton = styled.div.attrs(props => ({
  style: {
    position: props.$isSticky ? 'fixed' : 'absolute',
    top: props.$isSticky ? '0' : '230px'
  }
}))`
  left: calc(50% - 400px);
  transform: translateX(-50%);
  width: 144px;
  height: 269px;
  border: none;
  display: flex;
  flex-direction: column;
  background: white;
  z-index: 1000;
  background: transparent;
`;

const InfoContainer = styled.div`
    width: 100%;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const InfoName = styled.div`
    padding-right: 7px;
    color: var(--gray-007, #393939);
    font-family: "Min Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
`

const InfoContent = styled.div`
    color: var(--gray-006, #575757);
    font-family: 'MinSans-Regular';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
`

const ProfileAdviseButton = styled.div`
    margin-top: 14px;
    display: flex;
    width: 100px;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    background: var(--gray-001, #E0E0E0);
    color: var(--gray-008, #191919);
    font-family: 'MinSans-Regular';
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
`
