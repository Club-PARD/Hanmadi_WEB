import styled from 'styled-components';
import logo from '../../Assets/Img/logo.svg';
import { useState } from 'react';
import LoginModal from '../Login_Components/LoginModal';
import ProfileImg from '../../Assets/Img/ProfileImg.svg';
import { Outlet } from 'react-router-dom';

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
    setShowModal(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleLogoClick = () => {
    setActiveMenu(null);
  };

  return (
    <Container>
      <Head>
        <Logo onClick={handleLogoClick}>
          <img width='94px' height='46px' src={logo} alt="Logo" />
        </Logo>
        <Menu>
          <MenuButton>
            <MenuTextContainer>
              <MenuText
                onClick={() => handleMenuClick('board')}
                isActive={activeMenu === 'board'}
              >
                자유게시판
              </MenuText>
              <Underline isActive={activeMenu === 'board'} />
            </MenuTextContainer>
            <MenuTextContainer>
              <MenuText
                onClick={() => handleMenuClick('about')}
                isActive={activeMenu === 'about'}
              >
                사이트소개
              </MenuText>
              <Underline isActive={activeMenu === 'about'} />
            </MenuTextContainer>
          </MenuButton>
        </Menu>
        <Login>
          {isLoggedIn ? (
            <LoggedInContainer>
              <ProposalButton>제안하러가기</ProposalButton>
              <UserInfo>
                <ProfileImage src={ProfileImg} alt="Profile" />
                나무꾼님 / 포항시
              </UserInfo>
              <MyPage>
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
  padding: 0 20px;
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
    color: #005AFF;
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
  font-size: 14px;
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
  font-family: "Min Sans";
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
  width: 101px;
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
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  color: var(--Black-main, #191919);
  text-align: right;
  font-family: "Min Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

const ProfileImage = styled.img`
  width: 29px;
  height: 29px;
  cursor: pointer;
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
  font-size: 14px;
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
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

export default Header;
