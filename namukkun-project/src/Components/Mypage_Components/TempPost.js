import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import mypageduck from '../../Assets/Img/mypageduck.svg';

function TempPost({ posts }) {
    const truncateText = (text, maxLength) => {
  if (!text) return ''; // text가 undefined 또는 null인 경우 빈 문자열 반환
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
                            임시저장
                        </TotalTitleContainer>
                        <TotalContentContainer>
                            <AllContentContainer>
                                <InfoBarContainer>
                                    <InfoTextContainer $paddingright='78px'>번호</InfoTextContainer>
                                    <InfoTextContainer $paddingright='320px'>제목</InfoTextContainer>
                                    <InfoTextContainer>작성일자</InfoTextContainer>
                                </InfoBarContainer>
                                {posts.map((post, index) => (
                                    <ContentContainer key={post.postId}>
                                        <NumberText>{index + 1}</NumberText>
                                        <TitleText>{truncateText(post.title, 13)}</TitleText>
                                        <DateText>{post.postTime}</DateText>
                                        <ButtonContainer>
                                            <AdviseButton>수정</AdviseButton>
                                            <DeleteButton>삭제</DeleteButton>
                                        </ButtonContainer>
                                    </ContentContainer>
                                ))}
                                <SeeAllRecContainer>
                                </SeeAllRecContainer>
                            </AllContentContainer>
                        </TotalContentContainer>
                    </TotalIngContainer>
                </IngContainer>
            </Container>
        </>
    );
}

export default TempPost;

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
    flex-direction: column;
`;

const TotalTitleContainer = styled.div`
    padding-top: 108.83px;
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

const InfoBarContainer = styled.div`
    width: 689px;
    display: flex;
    flex-direction: row;
    padding-bottom: 8px;
    border-bottom: 1px solid #E0E0E0;
`

const InfoTextContainer = styled.div`
    color: #B5B5B5;
    font-family: 'MinSans-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    padding-right: ${(props) => props.$paddingright };
`

const ContentContainer = styled.div`
    height: 32px;
    border-bottom: 1px solid var(--gray-001, #E0E0E0);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 60px;
`

const NumberText = styled.div`
    width: 43px;
    color: var(--gray-007, #393939);
    font-family: 'MinSans-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
`

const TitleText = styled.div`
    width: 286px;
    color: var(--gray-007, #393939);
    font-family: 'MinSans-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
`

const DateText = styled.div`
    width: 96px;
    color: var(--gray-007, #393939);
    font-family: 'MinSans-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
`

const ButtonContainer = styled.div`
    width: 81px;
    display: flex;
    flex-direction: row;
    gap: 5px;
`

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

const SeeAllRecContainer = styled.div`
    padding-top: 14px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding-bottom: 254px;
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
