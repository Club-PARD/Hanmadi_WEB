import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from '../../Assets/Style/theme';
import sendbrave from '../../Assets/Img/sendbrave.svg';
import onclicksendbrave from '../../Assets/Img/onclicksendbrave.svg';
import hoversendbrave from '../../Assets/Img/hoversendbrave.svg';
import fileimg from '../../Assets/Img/fileimg.svg';
import { getPost, increaseUpCount, decreaseUpCount, getUserInfo } from '../../API/AxiosAPI'; // API 가져오기

// 이미지 URL을 추출하여 <img> 태그로 변환하는 함수
const convertTextToImages = (text) => {
    const regex = /\[이미지: (https?:\/\/[^\]]+)\]/g;
    const parts = text.split(regex);
    console.log("Regex: ", regex);
    console.log("Parts: ", parts);
    return parts.map((part, index) =>
        part.startsWith('http') ? <img key={index} src={part} alt={`content-${index}`} style={{ width: '100%', height: 'auto' }} /> : <span key={index}>{part}</span>
    );
};

function DetailContent() {
    // URL 파라미터에서 postId를 가져옴
    const { postId } = useParams();

    // State variables
    const [isClicked, setIsClicked] = useState(false);
    const [activeButton, setActiveButton] = useState('진행중'); // 기본값을 '진행중'으로 설정
    const [sendBraveClicked, setSendBraveClicked] = useState(false); // sendbravebutton 클릭 상태
    const [commentsCount, setCommentsCount] = useState(0); // 한마디 수 상태 추가, 초기값을 0으로 설정
    const [postData, setPostData] = useState(null); // API 데이터를 저장할 상태 추가
    const [userId] = useState(1); // 사용자 ID (예시로 1로 설정)

    // API 호출을 통해 데이터를 가져옴
    useEffect(() => {
        async function fetchData() {
            const data = await getPost(postId); // URL 파라미터로 ID를 설정
            setPostData(data); // 가져온 데이터를 상태에 저장
            setCommentsCount(data.upCountPost); // postData.upCountPost로 한마디 수 설정

            const userInfo = await getUserInfo(userId);
            if (userInfo.postUpList.includes(Number(postId))) {
                setSendBraveClicked(true); // 좋아요를 누른 상태로 설정
            }
        }
        fetchData(); // fetchData 함수 호출
    }, [postId, userId]);

    // 버튼 클릭 핸들러
    const handleButtonClick = (button) => {
        setActiveButton(button); // 클릭된 버튼을 활성화 상태로 설정
    };

    // sendBrave 버튼 클릭 핸들러
    const handleSendBraveClick = async () => {
        try {
            let response;
            if (sendBraveClicked) {
                // 좋아요 취소
                response = await decreaseUpCount(postId, userId);
                if (response[0].state) {
                    setPostData(prevData => ({
                        ...prevData,
                        upCountPost: response[0].postUpCount
                    }));
                    setCommentsCount(prevCount => prevCount - 1); // 한마디 수 업데이트
                }
            } else {
                // 좋아요 추가
                response = await increaseUpCount(postId, userId);
                if (response[0].state) {
                    setPostData(prevData => ({
                        ...prevData,
                        upCountPost: response[0].postUpCount
                    }));
                    setCommentsCount(prevCount => prevCount + 1); // 한마디 수 업데이트
                }
            }
            setSendBraveClicked(!sendBraveClicked); // 좋아요 상태 토글
        } catch (error) {
            console.error("Error updating up count:", error);
        }
    };

    // 텍스트 길이를 줄여주는 함수
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const intToRegion = {
        0: '경산시',
        1: '경주시',
        2: '구미시',
        3: '김천시',
        4: '문경시',
        5: '상주시',
        6: '안동시',
        7: '영주시',
        8: '영천시',
        9: '포항시'
    };

    return (
        <div>
            <Container>
                <GlobalStyle />
                {postData && ( // postData가 존재할 때만 렌더링
                    <>
                        <TitleContainer>
                            <TitleText>{postData.title}</TitleText> {/* 제목 표시 */}
                            <DateText>{postData.postTime}</DateText> {/* 날짜 표시 */}
                        </TitleContainer>
                        <StateContainer>
                            <StateBox>
                                <StateInfoContainer>
                                    <StateName>작성자</StateName>
                                    <StateContent>{truncateText(postData.userName, 4)}</StateContent> {/* 작성자 표시 */}
                                </StateInfoContainer>
                                <StateInfoContainer>
                                    <StateName>지역</StateName>
                                    <StateContent>{intToRegion[postData.postLocal]}</StateContent> {/* 지역 표시 */}
                                </StateInfoContainer>
                                <StateInfoContainer>
                                    <StateName>종료기간</StateName>
                                    <StateContent>D-{postData.deadLine}</StateContent> {/* 종료기간 표시 */}
                                </StateInfoContainer>
                                <StateInfoContainer>
                                    <StateName>한마디 수</StateName>
                                    <StateContent>{commentsCount}</StateContent> {/* 한마디 수 표시 */}
                                </StateInfoContainer>
                                <StateInfoContainer>
                                    <StateName>용기 수</StateName>
                                    <StateContent>{postData.upCountPost}</StateContent> {/* 용기 수 표시 */}
                                </StateInfoContainer>
                            </StateBox>
                        </StateContainer>
                        <BackgroundContainer>
                            <BackgroundContent>
                                <BackgroundTitle>제안배경</BackgroundTitle>
                                <BackgroundWriting>
                                    {convertTextToImages(postData.proBackground)} {/* 제안배경 표시 */}
                                </BackgroundWriting>
                            </BackgroundContent>
                        </BackgroundContainer>
                        <BackgroundContainer>
                            <BackgroundContent>
                                <BackgroundTitle>해결방안</BackgroundTitle>
                                <BackgroundWriting>
                                    {convertTextToImages(postData.solution)} {/* 해결방안 표시 */}
                                </BackgroundWriting>
                            </BackgroundContent>
                        </BackgroundContainer>
                        <BackgroundContainer>
                            <BackgroundContent>
                                <BackgroundTitle>기대효과</BackgroundTitle>
                                <BackgroundWriting>
                                    {convertTextToImages(postData.benefit)} {/* 기대효과 표시 */}
                                </BackgroundWriting>
                            </BackgroundContent>
                        </BackgroundContainer>
                        <FileContainer>
                            <FileContent>
                                <img src={fileimg} style={{ width: '17px', height: '18px' }} alt="fileimg" />&nbsp;
                                차량 부품 제조할 때 살생물제만 씁니다.(보도자료).hwpx {/* 파일 이름 표시 */}
                            </FileContent>
                        </FileContainer>
                        <BraveBtuContainer>
                            <SendBraveButton
                                onClick={handleSendBraveClick} // sendBrave 버튼 클릭 시 함수 호출
                                isClicked={sendBraveClicked}
                            >
                                <img src={sendBraveClicked ? onclicksendbrave : sendbrave} alt="send brave" /> {/* sendBrave 버튼 이미지 변경 */}
                            </SendBraveButton>
                        </BraveBtuContainer>
                    </>
                )}
            </Container>
        </div>
    );
}

export default DetailContent;

// 스타일 컴포넌트 정의
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
    flex-direction: column;
`

const TitleText = styled.div`
    width: 403px;
    height: 62px;
    color: #191919;
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
`

const DateText = styled.div`
    margin-top: 15px;
    color: var(--gray-006, #575757);
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 18px */
`

const StateContainer = styled.div`
    margin-top: 8px;
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
    width: 62px;
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
    color: var(--gray-005, #707070);
    font-family: 'MinSans-Regular';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    text-decoration-line: underline;
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
