import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginTestState, userinfo } from '../../Recoil/Atom';
import { intToRegion, regionToInt } from '../SelectRegion_Components/IntToRegion';
import { useNavigate } from 'react-router-dom';

function ListSelectRegion() {
  //기본적으로 보여줄 유저 데이터
  const [userData, setUserData] = useRecoilState(userinfo);
  //로그인 테스트 상태 -추후 서버랑 연결해야함.
  const [isLogin, setIsLogin] = useRecoilState(loginTestState); 
  //로그인 했을 때 안 했을 때 디폴트 로그인상태 변화
  const defaultRegion = isLogin? intToRegion[userData.local]: intToRegion[0]
  const [selectedButton, setSelectedButton] = useState(defaultRegion); 
  const navigate =useNavigate();

  const handleButtonClick = (region) => {
    setSelectedButton((prevSelected) => (prevSelected === region ? prevSelected : region));
    if (region) {
      navigate(`?localPageId=${regionToInt[region]}`);
    }
  };

  useEffect(()=>{
    //로그인 했을 때 안 했을 때 디폴트 로그인상태 변화
    const defaultRegion = isLogin? intToRegion[userData.local]: intToRegion[0]
    
    setSelectedButton(defaultRegion);

    navigate(`?localPageId=${regionToInt[defaultRegion]}`);

  },[isLogin])

  return (
    <Container>
      <GlobalStyle />
      {/* <BannerImgDiv src={ListBanner}></BannerImgDiv> */}
      <MainContainer>
        <ContentContainer>
          <IntroContainer>
            <MainTitle>지역 선택하기</MainTitle>
            <SubTitle>의견만 있다면, 어느 지역이든 한마디 남겨주세요!</SubTitle>
          </IntroContainer>
          <ButtonContainer>
            {['경산시', '경주시', '구미시', '김천시', '문경시', '상주시', '안동시', '영주시', '영천시', '포항시'].map((region) => (
              <LocalButton
                key={region}
                onClick={() => handleButtonClick(region)}
                selected={selectedButton === region}
              >
                {region}
              </LocalButton>
            ))}
          </ButtonContainer>
        </ContentContainer>
      </MainContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex-direction: column;
`;

// const BannerImgDiv = styled.img`
//   height: 301px;
//   flex-shrink: 0;
// `;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 63px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 38px;
`;

const IntroContainer = styled.div`
  display: flex;
  width: 377px;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
`;

const MainTitle = styled.div`
  align-self: stretch;
  color: #005AFF;
  font-family: 'MinSans-Regular';
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
`;

const SubTitle = styled.div`
  color: #191919;
  font-family: 'MinSans-Regular';
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 187.5% */
  white-space: nowrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 936px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px;
  flex-shrink: 0;
  flex-wrap: wrap;
`;

const LocalButton = styled.button`
  display: flex;
  width: 176px;
  height: 64px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  font-family: 'MinSans-Regular';
  gap: 14px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #D6D6D6;
  background: ${(props) => (props.selected ? 'rgba(0, 90, 255, 0.06)' : 'rgba(255, 255, 255, 0.60)')};
  font-size: 18px;
  color: #333;
  cursor: pointer;
  transition: background 0.3s, border 0.3s;
  line-height: 150%;

  ${(props) =>
    !props.selected &&
    `
    &:hover {
      background: rgba(236, 236, 236, 0.60);
      border: 1px solid #D6D6D6;
    }
  `}

  ${(props) =>
    props.selected &&
    `
    border: 1px solid #005AFF;
    background: rgba(0, 90, 255, 0.06);
    color: #005AFF;
  `}
`;

export default ListSelectRegion;
