import React, { useState } from "react";
import styled from "styled-components";

function DetailContent(){

    return(
    <div>
        <Container>
            <TitleContainer>
                <TitleText>포항시 전동킥보드 헬멧 단속 시스템 도입하면 좋을 듯용?</TitleText>
            </TitleContainer>
            <StateContainer>
                <StateBox>
                    <StateInfoContainer>
                        <StateName>작성자</StateName>
                        <StateContent>나무꾼</StateContent>
                    </StateInfoContainer>
                    <StateInfoContainer>
                        <StateName>지역</StateName>
                        <StateContent>포항시</StateContent>
                    </StateInfoContainer>
                    <StateInfoContainer>
                        <StateName>종료기간</StateName>
                        <StateContent>D-7</StateContent>
                    </StateInfoContainer>
                    <StateInfoContainer>
                        <StateName>한마디 수</StateName>
                        <StateContent>32</StateContent>
                    </StateInfoContainer>
                    <StateInfoContainer>
                        <StateName>용기 수</StateName>
                        <StateContent>413</StateContent>
                    </StateInfoContainer>
                </StateBox>
            </StateContainer>
        </Container>
    </div>
    );
}

export default DetailContent;

const Container = styled.div`
    width: 684px;
    display: flex;
    flex-direction: column;
`

const TitleContainer = styled.div`
    margin-top: 67px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TitleText = styled.div`
    width: 403px;
    height: 62px;
    color: #191919;
    text-align: center;
    font-family: "Min Sans";
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
`

const StateContainer = styled.div`
    margin-top: 67px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StateBox = styled.div`
    width: 505px;
    display: flex;
    padding: 24px 40px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: #F8FBFF;
    gap: 60px;
`

const StateName = styled.div`
    color: #A4BAE1;
    font-family: 'MinSans-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
`

const StateContent = styled.div`
    color: #738EBF;
    font-family: 'MinSans-Regular';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
`

const StateInfoContainer = styled.div`
    gap: 13px;
    display: flex;
    flex-direction: column;
`

const BackgroundContainer = styled.div`
    margin-top: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BackgroundContent = styled.div`

`