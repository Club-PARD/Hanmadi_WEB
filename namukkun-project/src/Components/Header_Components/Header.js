import styled from 'styled-components';
import logo from '../../Assets/Img/logo.svg';

function Header() {
    return (
        <Container>
            <Head>
                <Logo>
                    <img width='94px' height='46px' src={logo} alt="Logo" />
                </Logo>
                <MenuButtonLeft>
                  <MenuText>자유게시판</MenuText>
                </MenuButtonLeft>
                <MenuButtonRight>
                  <MenuText>사이트 소개</MenuText>
                </MenuButtonRight>
                <Login>
                  <LoginButton>로그인</LoginButton>
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
    justify-content: center;
    background-color: white;
`;

const Logo = styled.button`
    background: none;
    border: none;
    color: black;
    font-size: 16px;
    cursor: pointer;
`;

const MenuButtonLeft = styled.button`
    background: none;
    border: none;
    color: black;
    font-size: 16px;
    margin-left: 500px;
    margin-right: 30px;
    cursor: pointer;
`;

const MenuButtonRight = styled.button`
    background: none;
    border: none;
    color: black;
    font-size: 16px;
    margin-left: ${(props) => props.marginleft || "0px"};
    margin-right: 500px;
    cursor: pointer;
`;

const MenuText = styled.div`
  color: #191919;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: "Min Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 90% */
`;

const Login = styled.div`
  display: flex;
  height: 29px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const LoginButton = styled.button`
  color: #000;
  text-align: right;
  leading-trim: both;
  text-edge: cap;
  font-family: "Min Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  background: none;
  border: none;
  cursor: pointer;
`;