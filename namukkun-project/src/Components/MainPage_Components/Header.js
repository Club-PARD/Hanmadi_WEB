import styled from 'styled-components';
import logo from '../../Assets/Img/logo.svg';

function Header() {
    return (
        <Container>
            <Head>
                <MenuButton>
                    <img width='94px' height='46px' src={logo} alt="Logo" />
                </MenuButton>
                <MenuButtonLeft><MenuText>자유게시판</MenuText></MenuButtonLeft>
                <MenuButtonRight><MenuText>소개</MenuText></MenuButtonRight>
                <LoginButton>로그인</LoginButton>
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

const MenuButton = styled.button`
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

const MenuText = styled.p`
    font-size: 20px;
    color: black;
    font-weight: 600;
    &:hover {
        color: #005AFF;
    }
`;

const LoginButton = styled.button`
    width: 100px;
    height: 40px;
    font-size: 17px;
    border-radius: 5px;
    background: none;
    color: #191919;
    border: none;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        color: white;
        background-color: #005AFF;
    }
`;

