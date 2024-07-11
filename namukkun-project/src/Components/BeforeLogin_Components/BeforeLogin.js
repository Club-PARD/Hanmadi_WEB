import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BeforeLoginLogo from '../../Assets/Img/BeforeLoginLogo.svg';
import ThumbsMan from '../../Assets/Img/ThumbsMan.svg';
import Door from '../../Assets/Img/Door.svg';
import Navigation from '../../Assets/Img/Navigation.svg';
import TextImage from '../../Assets/Img/TextImage.svg';
import PostIt from '../../Assets/Img/PostIt.svg';
import Comment from '../../Assets/Img/Comment.svg';
import WhiteArrow from '../../Assets/Img/WhiteArrow.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginModal from '../Login_Components/LoginModal';
import { loginCheckAPI } from '../../API/AxiosAPI';
import { useRecoilState } from 'recoil';
import { postLikeBtn, regionNav } from '../../Recoil/Atom';
// import  {loginCheckAPI} from "../../API/AxiosAPI";

function BeforeLogin() {
  const [showModal, setShowModal] = useState(false);
  const navigate =useNavigate();
  const [loginCheck, setLoginCheck] =useState(false);
  const [regionselect, setRegionSelect] = useRecoilState(regionNav);

  const checkloginFunc = async () => {
    try {
      const response = await loginCheckAPI();
      if (response.status === 200) {
        setLoginCheck(true);
      } else {
        setLoginCheck(false);
      }
    } catch (error) {
      console.error("로그인 체크 중 오류 발생:", error);
    }
  };

  useEffect(()=>{
    checkloginFunc();
  },[]);


  const handleLogin = async () =>{
    if(!loginCheck){
      setShowModal(true);
    }
    else{
      navigate('/main'); //메인페이지로 수정 필여
    }
  }

  const navigateRegionList = (region) =>{
    console.log("하이", regionselect);
    setRegionSelect(region);
    navigate(`/listall?localPageId=${region}`);
  }

  //의견 제안하기 버튼
  const handleWritingfunc = () =>{
    if(!loginCheck){
      setShowModal(!showModal);
    }
    else{
      navigate('/writing');
    }
  }

  return (
    <SideContainer>
      <SideBar>
        <SideBarContainer>
          <Logo><img src={BeforeLoginLogo} alt="SemiLogo" /></Logo>
          <LoginButton onClick={handleLogin}>카카오계정 로그인</LoginButton>
          <RegionList>
            <Title>우리지역 게시판 둘러보기</Title>
            {[
              '경산시', '경주시', '구미시', '김천시', '문경시',
              '상주시', '안동시', '영주시', '영천시', '포항시'
            ].map((region, index) => (
              <RegionItem key={index} onClick={() => navigateRegionList(index)}>
                {region}
              </RegionItem>
            ))}
          </RegionList>
        </SideBarContainer>
      </SideBar>
      <Content>
        <Header>
          <ThumbMan>
            <img src={ThumbsMan} alt="Good" />
          </ThumbMan>
          <Ment>
            <MainTitle>
              더 나은 우리 지역을 위한 <br />
              <BoldText>용기낸 한마디</BoldText>
            </MainTitle>
            <SubTitle>
              평소 우리지역을 위해 생각해본 아이디어가 있다면 <br />한마디에 의견을 제안해주세요.
            </SubTitle>
            <SuggestionButton onClick={handleWritingfunc}>
              의견 제안하기 <img src={WhiteArrow} alt="WhiteArrow" />
            </SuggestionButton>
          </Ment>
        </Header>
        <SecondHeader>
          <RegionBoard>
            지역별 게시판
          </RegionBoard>
          <SubMent>
            우리지역만의 커뮤니티 공간에서 <br />이웃들과 함께 자유롭게 의견을 공유해보세요!
          </SubMent>
          <Discription>
            <FirstDisc>
              <Pic>
                <img src={Door} alt="door" />
              </Pic>
              <How>
                <UpTitle>
                  로그인
                </UpTitle>
                <DownTitle>
                  카카오계정으로 간편하게 로그인하면 <br />바로 의견을 제안할 수 있어요.
                </DownTitle>
              </How>
            </FirstDisc>
            <FirstDisc>
              <Pic>
                <img src={Navigation} alt="way" />
              </Pic>
              <How>
                <UpTitle>
                  지역선택
                </UpTitle>
                <DownTitle>
                  내가 사는 지역을 선택하고, <br />우리지역의 이야기를 확인하세요.
                </DownTitle>
              </How>
            </FirstDisc>
          </Discription>
        </SecondHeader>
        <ThirdHeader>
          <MainTitle>
            의견제안은 
            <BoldText> 쉽고, 빠르게</BoldText>
          </MainTitle>
          <SubTitle>
            제안배경, 해결방법, 기대효과
            <BoldText> 3가지만 작성하면 끝!</BoldText> 
            <br />"이걸 제안해도 될까?" 싶은 의견들도 얼마든지 작성해주세요.
          </SubTitle>
          <ThirdImage> <img src={TextImage} alt="Third" /></ThirdImage>
        </ThirdHeader>
        <FourthHeader>
          <FirstDiv>
            <LeftDiv>
              <MainTitle>
                <BoldText>재미있게 </BoldText> 
                소통하자!
              </MainTitle>
              <SubTitle>
                작성한 글을 이웃들과 공유하며 <br />추천과 댓글을 주고받아 보세요.
                <br /><br />괜찮은 댓글은 '포스트잇up' 버튼을 통해 <br />더 많은 사람이 볼 수 있게 고정해보세요.
              </SubTitle>
            </LeftDiv>
            <RightDiv>
              <img src={PostIt} alt="PostIt" />
            </RightDiv>
          </FirstDiv>
          <SecondDiv>
            <img src={Comment} alt="Comment" />
          </SecondDiv>
        </FourthHeader>
      </Content>
      <LoginModal show={showModal} onClose={() => setShowModal(false)} />
      <LoginModal show={showModal} onClose={() => setShowModal(false)} />
    </SideContainer>
  );
}

const SideContainer = styled.div`
  display: flex;
  height: 3097px;
  background-color: #F5F5F5;
`;

const SideBar = styled.div`
  width: 406px;
  background-color: #FFF;
  height: 3097px;
  margin-right: 40px;
`;

const SideBarContainer = styled.div`
  display: flex;
  width: 308px;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 60px;
  margin-right: 38px;
  margin-bottom: 100px;
  position: sticky;
  top: 0;
`;

const Logo = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 213px;
`;

const LoginButton = styled.button`
  display: flex;
  height: 67px;
  width: 307px;
  padding: 18px;
  margin-bottom: 56px;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  color: #FFF;
  text-align: center;
  font-family: "Min Sans-Regular";
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;

  border: none;
  border-radius: var(--Corner-Large, 16px);
  background: #005AFF;
  cursor: pointer;

  &:hover {
    background: #004FDE;
  }
`;

const RegionList = styled.div`
  display: flex;
  width: 308px;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  color: #000;
  font-family: "Min Sans-Regualr";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 28.636px;
  margin-bottom: 18px;
`;

const RegionItem = styled.button`
  display: flex;
  width: 308px;
  height: 50px;
  padding: 10px 20px;
  align-items: center;
  gap: 10px;

  color: #707070;
  font-family: "Min Sans-Regular";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  background: #FFF;
  border: none;
  cursor: pointer;

  &:hover {
    background: #F8F8F8;
    color: #005AFF;
    border-radius: 16px;
    
  }
`;

const Content = styled.div`
  width: 100%;
  height: 3096px;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 100px 0 0 0;
`;

const Header = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 100px;
  margin-bottom: 230px;
  margin-top: 600px;
`;

const ThumbMan = styled.div`
  width: 311px;
  height: 262px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Ment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
`;

const MainTitle = styled.div`
  color: #393939;
  font-family: "Min Sans-Regular";
  font-size: 52px;
  font-style: normal;
  font-weight: 500;
  line-height: var(--Display-Large-Line-Height, 64px);
  white-space: nowrap;
`;

const BoldText = styled.span`
  font-weight: 700;
`;

const SubTitle = styled.div`
  color: #191919;
  font-family: "Min Sans-Regular";
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  white-space: nowrap;

  margin-bottom: 30px;
`;

const SuggestionButton = styled.button`
  width: 238px;
  height: 74.476px;

  border-radius: 9.714px;
  background: #005AFF;
  border: none;

  color: #FDFDFD;
  font-family: "Min Sans-Regular";
  font-size: 28.089px;
  font-style: normal;
  font-weight: 500;
  line-height: 23.415px;
  cursor: pointer;
  
  &:hover {
    background: #004FDE;
  }
`;

const SecondHeader = styled.div`
  display: flex;
  width: 777px;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
  margin-bottom: 311px;
`;

const RegionBoard = styled.div`
  color: #393939;
  font-family: "Min Sans-Regular";
  font-size: 52px;
  font-style: normal;
  font-weight: 700;
  line-height: 64px;
`;

const SubMent = styled.div`
  color: #191919;
  font-family: "Min Sans-Regular";
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const Discription = styled.div`
  display: flex;
  align-items: center;
  gap: 23px;
  align-self: stretch;
  margin-top: 35px;
`;

const FirstDisc = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;
`;

const Pic = styled.div`
  width: 113px;
  height: 113px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const How = styled.div`
`;

const UpTitle = styled.div`
  color: #191919;
  font-family: "Min Sans-Regular";
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const DownTitle = styled.div`
  color: #393939;
  font-family: "Min Sans-Regular";
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
`;

const ThirdHeader = styled.div`
  display: flex;
  width: 777px;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
`;

const ThirdImage = styled.div`
  width: 817px;
  height: 483px;
`;

const FourthHeader = styled.div`
  display: flex;
  width: 736.774px;
  flex-direction: column;
  align-items: flex-start;
  gap: 78px;
  margin-top: 311px;
  margin-bottom: 500px;
`;

const FirstDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 45px;
  align-items: stretch;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
  margin-right: 100px;
`;

const RightDiv = styled.div`
  width: 248.699px;
  height: 244.258px;
`;

const SecondDiv = styled.div`
  width: 763.774px;
  height: 213.468px;
`;


export default BeforeLogin;
