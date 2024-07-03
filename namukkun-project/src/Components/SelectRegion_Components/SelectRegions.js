import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import React, { useState } from 'react';

function SelectRegions() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (region) => {
    setSelectedButton((prevSelected) => (prevSelected === region ? null : region));
  };

  return (
    <Container>
      <GlobalStyle />
      <MainContainer>
        <ContentContainer>
          <IntroContainer>
            <MainTitle>지역 선택하기</MainTitle>
            <SubTitle>한마디 건네고 싶은 지역을 골라주세요.</SubTitle>
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
            <SelectContainer>
              <BackButton>뒤로가기</BackButton>
              <SelectButton disabled={!selectedButton}>확인</SelectButton>
            </SelectContainer>
      </MainContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const MainContainer = styled.div`
  display: flex;
  width: 695px;
  padding: 63px 72px 62px 73px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;

  border-radius: 20px;
  background: #FAFAFA;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 38px;
`;

const IntroContainer = styled.div`
  display: flex;
  width: 245px;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
`;

const MainTitle = styled.div`
  align-self: stretch;
  color: #191919;
  font-family: "Min Sans";
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 83.333% */
`;

const SubTitle = styled.div`
  align-self: stretch;
  color: #191919;
  font-family: "Min Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 187.5% */
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 550px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px;
  flex-shrink: 0;
  flex-wrap: wrap;
  margin-bottom: 52px;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: flex-end;
`;

const BackButton = styled.button`
  display: flex;
  width: 86px;
  height: 36px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
  background: none;
  cursor: pointer;

  color: #005AFF;
  text-align: center;
  font-family: "Min Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 214.286% */
`;

const SelectButton = styled.button`
  display: flex;
  width: 63px;
  height: 36px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;

  color: #FFF;
  text-align: center;
  font-family: "Min Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 214.286% */

  border-radius: var(--Corner-Full, 1000px);
  background: ${(props) => (props.disabled ? '#ccc' : '#005aff')}; /* 비활성화 상태일 때 회색 배경 */
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')}; /* 비활성화 상태일 때 커서 변경 */
`;

const LocalButton = styled.button`
  display: flex;
  width: 130px;
  height: 62px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #D6D6D6;
  background: ${(props) => (props.selected ? 'rgba(0, 90, 255, 0.06)' : 'rgba(255, 255, 255, 0.60)')};
  font-family: "Min Sans";
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: background 0.3s, border 0.3s;

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

export default SelectRegions;