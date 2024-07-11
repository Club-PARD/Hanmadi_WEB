import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import logo from "../../Assets/Img/logo.svg";
import AboutPageBG from "../../Assets/Img/AboutPageBG.svg";
import Idea from "../../Assets/Img/Idea.svg";
import Chat from "../../Assets/Img/Chat.svg";
import Mail from "../../Assets/Img/Mail.svg";
import Arrow from "../../Assets/Img/Arrow.svg";
import HowAbout from "../../Assets/Img/HowAbout.svg";
import SupportYonggil from "../../Assets/Img/SupportYou.svg";
import TextAnimation from './TextAnimation';

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
    margin: 0; /* 기본 margin 제거 */
  }
`;

function AboutPage() {
  return (
    <div>
      <GlobalStyle />
      <Intro>
        <BackgroundImage src={AboutPageBG} alt="Background" />
        <ContentWrapper>
          <Logo src={logo} alt="logo" draggable="false" />
          <Title>
            <TextAnimation fadeinTime={1}>
              <LogoContianer>
                <Logo src={logo} alt="logo" />
              </LogoContianer>
              <ColoredText>한마디</ColoredText>가 <ColoredText>두마디</ColoredText>로 <br />
            </TextAnimation>
            <TextAnimation fadeinTime={1.5}>
              <span>
              내 의견에 확신을 얻는,
              </span>
            </TextAnimation>
          </Title>
          <Body>
            <TextAnimation fadeinTime={2}>
              한마디는 지역발전과 활성화를 꿈꾸는 사람들이 <br />자신있게 아이디어를 제안할 수 있는 공간을 제공합니다.
              <br />
            </TextAnimation>
            <TextAnimation fadeinTime={2.5}>
            <br />
            한마디가 두마디로, 두마디가 세마디로, <br />우리는 지역을 위한 '한마디'의 힘을 믿습니다.
            </TextAnimation>
          </Body>
        </ContentWrapper>
      </Intro>
      <Icons>
        <IconBox>
          <Icon src={Idea} alt="Idea" />
          <IconTitle>아이디어 제안</IconTitle>
          <IconText>우리 지역을 위해<br />용기내어 목소리를 내주세요</IconText>
        </IconBox>
        <ArrowIcon src={Arrow} alt="Arrow" />
        <IconBox>
          <Icon src={Chat} alt="Chat" />
          <IconTitle>주민들과 소통</IconTitle>
          <IconText>주민들과 한마디씩 주고받으며<br />내 의견에 확신을 얻어요</IconText>
        </IconBox>
        <ArrowIcon src={Arrow} alt="Arrow" />
        <IconBox>
          <Icon src={Mail} alt="Mail" />
          <IconTitle>국민신문고 투고</IconTitle>
          <IconText>사람들의 한마디로 힘을 얻은<br />아이디어를 국민신문고에 전달해요</IconText>
        </IconBox>
      </Icons>
      <MentYonggilWrapper>
        <MentWrapper>
          <MentTitle>
            용길이로 <ColoredText>용기얻고</ColoredText> <br />
            우리지역 발전까지!
          </MentTitle>
          <MentBody>
            용길이는 용기낼 때 에너지가 생기는 오리입니다.
            <br />
            같은 지역 주민들에게 용길이를 보내주세요.
            <br />
            여러분이 보낸 용길이가 우리지역 소통의 활력이 됩니다!
          </MentBody>
        </MentWrapper>
        <SendYonggilImage src={HowAbout} alt="Send Yonggil" />
      </MentYonggilWrapper>
      <SupportYouWrapper>
        <SupportYouImage src={SupportYonggil} alt="Support Yonggil" />
      </SupportYouWrapper>
    </div>
  );
}

const Intro = styled.div`
  height: 822px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden; /* 가로 스크롤 방지 */
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 384px;
  left: 0;
  width: 100%;
  object-fit: cover;
  z-index: -1;
`;

const ContentWrapper = styled.div`
  z-index: 1;
  margin-right: 653px;
  margin-left: 260px;
  max-width: calc(100% - 913px); /* 부모 요소를 넘어가지 않도록 설정 */
  box-sizing: border-box;
  white-space: nowrap; /* Prevent text wrapping */
`;

const Logo = styled.img`
  width: 107px;
  height: 88px;
  margin-bottom: 7px;
`;

const Title = styled.div`
  font-family: "Min Sans-Regular";
  font-size: 60px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  margin-bottom: 73px;
  white-space: nowrap; /* Prevent text wrapping */
`;

const LogoContianer = styled.div`
  width: 100%;
`

const ColoredText = styled.span`
  color: #005AFF;
`;

const Body = styled.div`
  font-family: "Min Sans-Regular";
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  white-space: nowrap; /* Prevent text wrapping */
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 157.65px;
  flex-wrap: nowrap; /* 줄바꿈 안되도록 설정 */
  width: 100%;
  box-sizing: border-box;
  overflow: hidden; /* 가로 스크롤 방지 */
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 20px;
  white-space: nowrap;
`;

const Icon = styled.img`
  width: 134px;
  height: 134px;
  margin-bottom: 10px;
`;

const IconTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: "Min Sans-Regular";
  font-size: 24px;
  font-weight: 600;
  font-style: normal;
  margin-bottom: 10px;
`;

const IconText = styled.div`
  color: #000;
  text-align: center;
  font-family: "Min Sans-Regular";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ArrowIcon = styled.img`
  width: 147px;
  height: 16px;
  margin: 0 10px;
`;

const MentYonggilWrapper = styled.div`
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  margin-top: 121px;
  box-sizing: border-box;
  white-space: nowrap; /* Prevent text wrapping */
  padding: 0 260px; /* 좌우 여백 동일하게 설정 */
`;

const MentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-right: 20px;
  max-width: 600px; /* 최대 너비 설정 */
  white-space: nowrap; /* Prevent text wrapping */
`;

const MentTitle = styled.div`
  font-family: "Min Sans-Regular";
  font-size: 60px;
  font-weight: 500;
  color: #393939;
  font-style: normal;
  white-space: nowrap; /* Prevent text wrapping */
`;

const MentBody = styled.div`
  font-family: "Min Sans-Regular";
  font-size: 22px;
  font-weight: 500;
  line-height: 180%;
  color: #191919;
  font-style: normal;
  margin-top: 73px;
  white-space: nowrap; /* Prevent text wrapping */
`;

const SendYonggilImage = styled.img`
  height: 553px;
  max-width: 344px;
`;

const SupportYouWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 356px;
  max-width: 100%;
`;

const SupportYouImage = styled.img`
  height: auto;
  max-width: 100%;
`;

export default AboutPage;
