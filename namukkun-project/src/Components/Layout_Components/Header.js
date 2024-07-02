import styled from 'styled-components';
import logo from '../../Assets/Img/logo.svg';
import { useState } from 'react';
import LoginModal from '../Login_Components/LoginModal';

function Header() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Container>
      <Head>
        <Logo>
          <img width='94px' height='46px' src={logo} alt="Logo" />
        </Logo>
        <Menu>
          <MenuButton>
            <MenuText>자유게시판</MenuText>
          </MenuButton>
          <MenuButton>
            <MenuText>사이트 소개</MenuText>
          </MenuButton>
        </Menu>
        <Login>
          <LoginButton onClick={toggleModal}>로그인</LoginButton>
          <LoginModal show={showModal} onClose={toggleModal} />
        </Login>
      </Head>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: lightgray;
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
`;

const Logo = styled.div`
  margin-left: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Menu = styled.div`
  display: flex;
  gap: 30px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 16px;
  cursor: pointer;
`;

const MenuText = styled.div`
  color: #191919;
  text-align: center;
  font-family: "Min Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 90% */
  &:hover {
    color: #005AFF;
  }
`;

const Login = styled.div`
  margin-right: 60px;
  display: flex;
  height: 29px;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.button`
  color: #000;
  text-align: right;
  font-family: "Min Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  background: none;
  border: none;
  cursor: pointer;
`;
