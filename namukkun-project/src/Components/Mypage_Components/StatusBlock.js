import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';

function StatusBlockComponent({ ingCount, endCount, tempCount }) {
    return (
        <>
            <GlobalStyle/>
            <Container>
                <AllStatusContainer>
                    <BlockContainer>
                        <StatusItem>
                            <StatusNumber number={ingCount}>{ingCount}</StatusNumber>
                            <StatusTitle>진행중</StatusTitle>
                        </StatusItem>
                        <StatusItem>
                            <StatusNumber number={endCount}>{endCount}</StatusNumber>
                            <StatusTitle>종료</StatusTitle>
                        </StatusItem>
                        <StatusItem>
                            <StatusNumber number={tempCount}>{tempCount}</StatusNumber>
                            <StatusTitle>임시저장</StatusTitle>
                        </StatusItem>
                    </BlockContainer>
                </AllStatusContainer>
                
            </Container>
        </>
    );
}

export default StatusBlockComponent;

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

const StatusItem = styled.button`
    width: 210px;
    height: 146px;
    border-radius: 20px;
    background: var(--white-004, #FDFDFD);
    box-shadow: 0px 0px 20px 0px #F6F6F6;
    border: none;
`;

const StatusTitle = styled.div`
    color: var(--gray-007, #575757);
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
