import styled from 'styled-components';
import logo from '../../Assets/Img/logo.svg';
import { useEffect, useState } from 'react';
import LoginModal from '../Login_Components/LoginModal';
import ProfileImg from '../../Assets/Img/ProfileImg.svg';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loginTestState, postLikeBtn, userinfo } from '../../Recoil/Atom';
import { useRecoilState } from 'recoil';
import { intToRegion } from '../SelectRegion_Components/IntToRegion';
import { loginCheckAPI, recentRegionPostGetAPI, userInfoGetAPI } from '../../API/AxiosAPI';


function Header() {
  const [showModal, setShowModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  // //로그인 테스트 상태 - 추후 서버랑 연결해야함.
  // const [isLogin, setIsLogin] = useRecoilState(loginTestState);
  //유저 기본 정보 아톰에 저장
  const [userData, setUserData] = useRecoilState(userinfo);
  //로그인 체크
  const [loginCheck, setLoginCheck] =useState(false);

  const path = new URL(document.location.toString()).pathname;

  //버튼 상태지정 
  const [postLike, setPostLike] = useRecoilState(postLikeBtn);

  //로그인 체크
  const checkloginFunc = async () => {
    try {
      const response = await loginCheckAPI();
      if (response.status === 200) {
        setLoginCheck(true);

        //추후 로그인 모달 이후 작동할 로직
        const response =  await userInfoGetAPI();
        setUserData({
          ...userData,
          nickName: response.data.nickName,
          local: response.data.local,
          profileImage: response.data.profileImage,
          postUpList: response.data.postUpList,
          commentUpList: response.data.commentUpList
        });
        setPostLike(response.data.postUpList);

      console.log("로긴",postLike);
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

  //로그인 버튼
  const handleLoginClick = async () => {

    if(!loginCheck){
      setShowModal(true);
    }

  };

  //로그아웃
  const handleLogoutClick = () => {
    setLoginCheck(false);
    //로그아웃 했을 때 로컬 스토리지에 있는 유저의 정보를 제거함. 
    localStorage.removeItem("userData");
    if(path ==='/mypage'||path==='/writing'){
    navigate('/');
    }
    window.location.reload();
  };

  //제안 게시판 클릭 -> 제안 게시판 페이지로 이동
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    //제안 게시판
    if(menu==='board'){
    navigate('/listall');
    // recentRegionPostGetAPI('?localPageId=' + userData.local);
    }
    //사이트 소개
    else if (menu ==='about'){
      navigate('/about');
    }
  };

  //로고 클릭 -> 메인페이지로 이동
  const handleLogoClick = () => {
    setActiveMenu(null);
    navigate('/');
  };

  //글쓰기 페이지로 이동
  const handleWriting = () => {
    if(loginCheck){
      navigate('/writing');
    }
  }

  //마이 페이지로 이동
  const handleMypage = () => {
    if(loginCheck){
      navigate('/mypage');
    }
  }

  return (
    <Container>
      <Head> 
        <Logo onClick={handleLogoClick}>
          <img src={logo} alt="Logo" />
        </Logo>
        <Menu>
          <MenuButton>
            <MenuTextContainer>
              <MenuText
                onClick={() => handleMenuClick('about')}
                isActive={path==='/about'&&activeMenu === 'about'}
              >
                사이트소개
              </MenuText>
              <Underline isActive={path==='/about'&&activeMenu === 'about'} />
            </MenuTextContainer>
            <MenuTextContainer>
              <MenuText
                onClick={() => handleMenuClick('board')}
                isActive={(path==='/list'||path==='/listall'||path==='/postit')
                  &&activeMenu === 'board'}
              >
                제안게시판
              </MenuText>
              <Underline isActive={(path==='/list'||path==='/listall'||path==='/postit') && activeMenu === 'board'}  />
            </MenuTextContainer>
          </MenuButton>
        </Menu>
        <Login>
          {loginCheck ? (
            <LoggedInContainer>
              <ProposalButton onClick={handleWriting}>제안하러가기</ProposalButton>
              <UserInfo>
                <ProfileImage src={userData.profileImage} alt="Profile" />
                {userData.nickName}님 / {intToRegion[userData.local]}
              </UserInfo>
              <MyPage onClick={handleMypage}>
                마이페이지
              </MyPage>
              <Logout onClick={handleLogoutClick}>
                로그아웃
              </Logout>
            </LoggedInContainer>
          ) : (
            <LoginButtonContainer>
              <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
            </LoginButtonContainer>
          )}
          <LoginModal show={showModal} onClose={() => setShowModal(false)} />
        </Login>
      </Head>
      <Outlet/>
    </Container>
  );
}

const Container = styled.div`
`;

const Head = styled.div`
  width: 100%;
  height: 84px;
  border-bottom: 1px solid #E4E4E4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  /* padding: 0 20px; */
  position: relative;
`;

const Logo = styled.div`
  margin-left: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Menu = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 30px;
  align-items: center;
`;

const MenuButton = styled.div`
  display: inline-flex;
  gap: 32px;
  padding: 49px 0 21px 0;
  white-space: nowrap;
`;

const MenuTextContainer = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0; /* 기존 값에서 4px을 0으로 수정 */
`;

const MenuText = styled.div`
  color: ${props => (props.isActive ? '#005AFF' : '#191919')};
  text-align: center;
  font-family: "Min Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: #0045CE;
  }
`;

const Underline = styled.div`
  position: absolute;
  bottom: -20px; /* 헤더 높이와 경계선을 고려한 값 */
  width: ${props => (props.isActive ? '100%' : '0')};
  height: 4px;
  background-color: #005AFF;
  transition: width 0.3s;
`;

const Login = styled.div`
  margin-right: 60px;
  display: flex;
  align-items: center;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 49px 0 21px 0; /* add padding to match LoggedInContainer */
`;

const LoginButton = styled.button`
  color: #000;
  font-family: "Min Sans";
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: inline-block;
  position: relative; /* 클릭 영역 문제를 해결하기 위해 추가 */
`;

const LoggedInContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 49px 0 21px 0; /* match the padding */
  color: #000;
  text-align: right;
  font-family: "Min Sans-Regular";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  background: none;
  border: none;
  white-space: nowrap;
  line-height: 18px;
`;

const ProposalButton = styled.button`
  display: flex;
  width: 110px;
  height: 35px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  border-radius: var(--Corner-Extra-small, 4px);
  border: none;
  background: #E5F1CA;

  color: var(--Black-main, #191919);
  text-align: center;
  font-family: "Min Sans";
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;

  &:hover {
    background: #CCDCAB;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  color: var(--Black-main, #191919);
  text-align: right;
  font-family: "Min Sans";
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

const ProfileImage = styled.img`
  width: 29px;
  height: 29px;
  cursor: pointer;
  border-radius:50%;
`;

const MyPage = styled.button`
  display: flex;
  height: 29px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
  background: none;
  cursor: pointer;

  color: var(--Black-main, #191919);
  text-align: right;
  font-family: "Min Sans";
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

const Logout = styled.button`
  display: flex;
  height: 29px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
  background: none;
  cursor: pointer;

  color: var(--Black-main, #191919);
  text-align: right;
  font-family: "Min Sans";
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

export default Header;