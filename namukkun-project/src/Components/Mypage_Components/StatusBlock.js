import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from '../../Assets/Style/theme';

function Banner() {
    return (
        <>
            <GlobalStyle/>
            <Container>
                <AllStatusContainer>
                    <BlockContainer>
                        <StatusBlock>
                            <StatusNumber number={3}>3</StatusNumber>
                            <StatusTitle>진행중</StatusTitle>
                        </StatusBlock>
                        <StatusBlock>
                            <StatusNumber number={3}>3</StatusNumber>
                            <StatusTitle>종료</StatusTitle>
                        </StatusBlock>
                        <StatusBlock>
                            <StatusNumber number={0}>0</StatusNumber>
                            <StatusTitle>임시저장</StatusTitle>
                        </StatusBlock>
                    </BlockContainer>
                </AllStatusContainer>
                
            </Container>
        </>
    );
}

export default Banner;

const Container = styled.div`
    width: 100%;
    display: flex;
    background: #FAFAFA;
    justify-content: center;
`;

const AllStatusContainer = styled.div`
    margin-top: 126px;
    width: 920px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 37px;
`;

const BlockContainer = styled.div`
    width: 706px;
    display: flex;
    flex-direction: row;
    gap: 38px;
`;

const StatusBlock = styled.button`
    width: 210px;
    height: 146px;
    border-radius: 20px;
    background: var(--white-004, #FDFDFD);
    box-shadow: 0px 0px 20px 0px #F6F6F6;
    border: none;
`;

const StatusTitle = styled.div`
    color: var(--gray-007, #393939);
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
`;

const StatusNumber = styled.div`
    color: ${(props) => (props.number === 0 ? '#DBDBDB' : 'var(--Main-001, #005AFF)')};
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 42px;
    font-style: normal;
    font-weight: 300;
`;

const SectionLine = styled.div`
    width: 708px;
    height: 0.849px;
    background: #DBDBDB;
`;
