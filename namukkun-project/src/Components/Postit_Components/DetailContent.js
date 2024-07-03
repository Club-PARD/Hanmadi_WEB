import React, { useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from '../../Assets/Style/theme';
import exsuggest from '../../Assets/Img/exsuggest.svg';
import sendbrave from '../../Assets/Img/sendbrave.svg';
import onclicksendbrave from '../../Assets/Img/onclicksendbrave.svg';
import hoversendbrave from '../../Assets/Img/hoversendbrave.svg';
import fileimg from '../../Assets/Img/fileimg.svg';

function DetailContent(){
    const [isClicked, setIsClicked] = useState(false);
    const [activeButton, setActiveButton] = useState('진행중'); // 진행중이 기본값
    const [sendBraveClicked, setSendBraveClicked] = useState([false, false, false, false]); // sendbravebutton 클릭 상태

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    const handleSendBraveClick = (index) => {
        const newSendBraveClicked = [...sendBraveClicked];
        newSendBraveClicked[index] = !newSendBraveClicked[index];
        setSendBraveClicked(newSendBraveClicked);
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };
    return(
    <div>
        <Container>
            <GlobalStyle/>
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
            <BackgroundContainer>
                <BackgroundContent>
                    <BackgroundTitle>제안배경</BackgroundTitle>
                    <BackgroundWriting>포항에서 요즘 전동킥보드 사고가 급증하고 있습니다. 여기서 심각한 문제는 음주운전과 헬멧 등 안전장구 미착용 사례로 전체 67건 중 10건이 음주운전 중 발생(15%)했고, 헬멧 미 착용률은 100%에 달하고 있다는 것입니다. 따라서, 헬멧을 단속할 수 있는 시스템이 필요하다고 생각합니다.</BackgroundWriting>
                    <img src={exsuggest} style={{ width: '585px', height: '301px' }} alt="ex1"/>
                </BackgroundContent>
            </BackgroundContainer>
            <BackgroundContainer>
                <BackgroundContent>
                    <BackgroundTitle>해결방안</BackgroundTitle>
                    <BackgroundWriting>포항에서 요즘 전동킥보드 사고가 급증하고 있습니다. 여기서 심각한 문제는 음주운전과 헬멧 등 안전장구 미착용 사례로 전체 67건 중 10건이 음주운전 중 발생(15%)했고, 헬멧 미 착용률은 100%에 달하고 있다는 것입니다. 따라서, 헬멧을 단속할 수 있는 시스템이 필요하다고 생각합니다.</BackgroundWriting>
                    <img src={exsuggest} style={{ width: '585px', height: '301px' }} alt="ex2"/>
                </BackgroundContent>
            </BackgroundContainer>
            <BackgroundContainer>
                <BackgroundContent>
                    <BackgroundTitle>기대효과</BackgroundTitle>
                    <BackgroundWriting>포항에서 요즘 전동킥보드 사고가 급증하고 있습니다. 여기서 심각한 문제는 음주운전과 헬멧 등 안전장구 미착용 사례로 전체 67건 중 10건이 음주운전 중 발생(15%)했고, 헬멧 미 착용률은 100%에 달하고 있다는 것입니다. 따라서, 헬멧을 단속할 수 있는 시스템이 필요하다고 생각합니다.</BackgroundWriting>
                    <img src={exsuggest} style={{ width: '585px', height: '301px' }} alt="ex3"/>
                </BackgroundContent>
            </BackgroundContainer>
            <FileContainer>
                <FileContent>
                    <img src={fileimg} style={{ width: '17px', height: '18px' }} alt="fileimg"/>&nbsp;
                    차량 부품 제조할 때 살생물제만 씁니다.(보도자료).hwpx
                </FileContent>
            </FileContainer>
            <BraveBtuContainer>
                <SendBraveButton
                    onClick={() => handleSendBraveClick(2)}
                    isClicked={sendBraveClicked[2]}
                >
                    <img src={sendBraveClicked[2] ? onclicksendbrave : sendbrave} alt="send brave" />
                </SendBraveButton>
            </BraveBtuContainer>
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
    margin-top: 76px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const BackgroundContent = styled.div`
    width: 585px;
    display: flex;
    flex-direction: column;
`

const BackgroundTitle = styled.div`
    padding-bottom: 30px;
    color: var(--gray-007, #393939);
    font-family: 'MinSans-Regular';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
`

const BackgroundWriting = styled.div`
    padding-bottom: 26px;
    color: var(--gray-006, #575757);
    font-family: 'MinSans-Regular';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
`

const BraveBtuContainer = styled.div`
    margin-top: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const FileContainer = styled.div`
    margin-top: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const FileContent = styled.div`
    width: 585px;
    height: 38px;
    display: flex;
    align-items: center;
`

const SendBraveButton = styled.button`
    width: 134px;
    height: 134px;
    border: none;
    background: transparent;
    cursor: pointer;

    &:hover img {
        ${({ isClicked }) => !isClicked && `content: url(${hoversendbrave});`}
    }
`;