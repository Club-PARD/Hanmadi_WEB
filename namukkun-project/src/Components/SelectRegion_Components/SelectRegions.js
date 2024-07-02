import BackGround from '../../Assets/Img/BackGround.svg';
import styled from 'styled-components';

function SelectRegions() {
  return (
    <Container>
      <MainContainer>
        <ContentContainer>
          <IntroContainer>
            <MainTitle fontWeight='bold'>거의 다 왔어요!</MainTitle>
            <SubTitle fontSize='18px'>한마디 건네고 싶은 지역을 골라주세요.</SubTitle>
          </IntroContainer>
            <ButtonContainer>
              <LocalButton>경산시</LocalButton>
              <LocalButton>경주시</LocalButton>
              <LocalButton>구미시</LocalButton>
              <LocalButton>김천시</LocalButton>
              <LocalButton>문경시</LocalButton>
              <LocalButton>상주시</LocalButton>
              <LocalButton>안동시</LocalButton>
              <LocalButton>영주시</LocalButton>
              <LocalButton>영천시</LocalButton>
              <LocalButton>포항시</LocalButton>
            </ButtonContainer>
            <SelectContainer>
              <BackButton>뒤로가기</BackButton>
              <SelectButton>선택완료</SelectButton>
            </SelectContainer>
          </ContentContainer>
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

  background-image: url(${BackGround});
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: bottom;
`;

const MainContainer = styled.div`
  display: flex;
  width: 744px;
  padding: 92px 80px 91px 81px;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border-radius: 20px;
  background: #FAFAFA;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 583px;
  flex-direction: column;
  gap: 86px;
  flex-shrink: 0;
`;

const IntroContainer = styled.div`
  display: flex;
  width: 245px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
`;

const MainTitle = styled.div`
  align-self: stretch;
  color: #191919;
  font-family: "Min Sans";
  font-size: 36px;
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
  width: 583px;
  height: 228px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 21px;
  flex-shrink: 0;
  flex-wrap: wrap;
`;

const SelectContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
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
`;

const SelectButton = styled.button`
  display: flex;
  width: 86px;
  height: 36px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;

  border-radius: var(--Corner-Full, 1000px);
  background: #005AFF;
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
  background: rgba(255, 255, 255, 0.60);
`;

export default SelectRegions;