import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from '../../Assets/Style/theme';
import mypageduck from '../../Assets/Img/mypageduck.svg';
import uploadarrow from '../../Assets/Img/uploadarrow.svg';

function IngPost() {
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <IngContainer>
                    <TotalIngContainer>
                        <TotalTitleContainer>
                            <img src={mypageduck} style={{ width: '28.551px', height: '25.232px' }} alt="duck" />
                            진행중인 한마디
                        </TotalTitleContainer>
                        <TotalContentContainer>
                            <AllContentContainer>
                                <ContentContainer>
                                    <TitleInfoContainer>
                                        <TitleFunctionContainer>
                                            <IngButton>진행중</IngButton>
                                            <ContentTitle>{truncateText('포항시 문화생태마을 조성', 13)}</ContentTitle>
                                            <AdviseButton>수정</AdviseButton>
                                            <DeleteButton>삭제</DeleteButton>
                                        </TitleFunctionContainer>
                                        <InfoContainer>
                                            <InfoTextContainer>
                                                <InfoText>용길이 수</InfoText>
                                                <InfoText>15</InfoText>
                                            </InfoTextContainer>
                                            <InfoTextContainer>
                                                <InfoText>한마디 수</InfoText>
                                                <InfoText>6</InfoText>
                                            </InfoTextContainer>
                                            <InfoTextContainer>
                                                <InfoText>남은 기간</InfoText>
                                                <InfoText>D-5</InfoText>
                                            </InfoTextContainer>
                                            <InfoTextContainer>
                                                <InfoText>작성일자</InfoText>
                                                <InfoText>2024.07.02</InfoText>
                                            </InfoTextContainer>
                                        </InfoContainer>
                                    </TitleInfoContainer>
                                    <UploadButton>
                                        국민신문고
                                        <img src={uploadarrow} style={{ width: '14.4px', height: '4.9px' }} ></img>
                                    </UploadButton>
                                </ContentContainer>
                                <SeeAllRecContainer>
                                    <SeeAllRecord>
                                        1 / 1&nbsp;&nbsp;&nbsp;&nbsp;전체글 보러가기 --> 
                                    </SeeAllRecord>
                                </SeeAllRecContainer>
                            </AllContentContainer>
                        </TotalContentContainer>
                    </TotalIngContainer>
                </IngContainer>
            </Container>
        </>
    );
}

export default IngPost;

const Container = styled.div`
    width: 100%;
    display: flex;
    background: #FAFAFA;
    justify-content: center;
`;

const IngContainer = styled.div`
    width: 920px;
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* 오른쪽 정렬 */
`;

const TotalIngContainer = styled.div`
    width: 708px;
    display: flex;
    border-top: 0.849px solid #DBDBDB;
    flex-direction: column;
`;

const TotalTitleContainer = styled.div`
    padding-top: 40px;
    padding-bottom: 35px;
    display: flex;
    width: 100%;
    gap: 7px;
    color: #191919;
    font-family: 'MinSans-Regular';
    font-size: 22.189px;
    font-style: normal;
    font-weight: 600;
    flex-direction: row;
`;

const TotalContentContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    flex-direction: column;
    gap: 14px;
    align-items: flex-end; /* 오른쪽 정렬 */
`;

const AllContentContainer = styled.div`
    display: flex;
    width: 680px;
    flex-direction:column;
`;

const ContentContainer = styled.div`
    width: 100%;
    height: 98px;
    display: flex;
    align-items:center;
    justify-content: space-between;
    flex-direction: row;
    border-top: 1px solid var(--gray-001, #E0E0E0);
    border-bottom: 1px solid var(--gray-001, #E0E0E0);
`;

const ContentTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--gray-006, #575757);
    font-family: 'MinSans-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
`;

const IngButton = styled.button`
    display: flex;
    width: 42px;
    height: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 200px;
    background: var(--Main-002, #E5F1CA);
    font-family: 'MinSans-Regular';
    color: var(--gray-006, #575757);
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    border: none;
`;

const AdviseButton = styled.button`
    display: flex;
    width: 38px;
    height: 20px;
    padding: 5.849px;
    justify-content: center;
    align-items: center;
    gap: 5.849px;
    border-radius: var(--Corner-Extra-small, 4px);
    background: var(--white-006, #E8E8E8);
    border: none;
    color: var(--gray-005, #707070);
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    cursor: pointer;
`;

const DeleteButton = styled.button`
    display: flex;
    width: 38px;
    height: 20px;
    padding: 5.849px;
    justify-content: center;
    align-items: center;
    gap: 5.849px;
    border-radius: var(--Corner-Extra-small, 4px);
    background: rgba(0, 90, 255, 0.06);
    border: none;
    color: var(--Main-001, #005AFF);
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    cursor: pointer;
`;

const UploadButton = styled.button`
    display: flex;
    width: 118px;
    height: 70px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: var(--Corner-Extra-small, 4px);
    border: 1px solid var(--Main-001, #005AFF);
    background: rgba(0, 90, 255, 0.06);
    color: var(--Main-001, #005AFF);
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    cursor: pointer;
`;

const TitleFunctionContainer = styled.div`
    display: flex;
    align-items: center; /* 중앙 정렬 */
    gap: 10px; /* 요소 간격 추가 */
`;

const InfoTextContainer = styled.div`
    display: flex;
    width: 56px;
    height: 35px;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    border-radius: var(--Corner-Extra-small, 4px);
`;

const InfoContainer = styled.div`
    padding-top: 15.5px;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    gap: 16px;
`;

const InfoText = styled.div`
    color: var(--gray-006, #575757);
    font-family: 'MinSans-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
`;

const TitleInfoContainer = styled.div`
    width: 328px;
`;

const SeeAllRecContainer = styled.div`
    padding-top: 14px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const SeeAllRecord = styled.div`
    color: var(--gray-007, #393939);
    font-family: 'MinSans-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    cursor: pointer;
`