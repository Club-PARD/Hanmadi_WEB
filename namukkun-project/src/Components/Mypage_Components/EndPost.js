import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import mypageduck from '../../Assets/Img/mypageduck.svg';
import uploadarrow from '../../Assets/Img/uploadarrow.svg';
import nopost from '../../Assets/Img/nopost.svg'; // nopost 이미지 import
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';

function EndPost({ posts }) {
    const navigate = useNavigate();
    const [isWModalOpen, setIsWModalOpen] = useState(false);
    const [getpostid, setGetPostid] = useState(null);
    const url = "https://www.epeople.go.kr/index.jsp"


    const truncateText = (text, maxLength) => {
        if (!text) return ''; // text가 undefined 또는 null인 경우 빈 문자열 반환
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const navigateEndall = () =>{
        navigate('/mypage/endall')
    }
  
    //삭제모달
    const handleWModalOpen = (postId) => {
      setIsWModalOpen(!isWModalOpen);
      setGetPostid(postId);
      };

    //상세페이지로 이동
    const navigateToPost = (postId) => {
        navigate(`/postit/${postId}`);
    };

    //수정 버튼
    const navigateModify = (postId) =>{
          navigate(`/modify/${postId}`);
      }

    //종료날짜
    function addDaysToDate(dateStr) {
        const date = new Date(dateStr);
        date.setDate(date.getDate() + 7);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}.${month}.${day}`;
      }

    return (
        <>
            <GlobalStyle />
            <Container>
                <IngContainer>
                    <TotalIngContainer>
                        <TotalTitleContainer>
                            <img src={mypageduck} style={{ width: '28.551px', height: '25.232px' }} alt="duck" />
                            종료된 한마디
                        </TotalTitleContainer>
                        <TotalContentContainer>
                            {posts.length > 0 ? ( // 게시물이 있는 경우
                                <AllContentContainer>
                                    {posts.slice(0, 3).map(post => ( // 게시물을 최대 3개만 보여줌
                                        <ContentContainer key={post.postId}>
                                            <TitleInfoContainer>
                                                <TitleFunctionContainer>
                                                    <EndButton>종료</EndButton>
                                                    <ContentTitle onClick={()=>navigateToPost(post.postId)}>{truncateText(post.title, 11)}</ContentTitle>
                                                    <AdviseButton onClick={()=>navigateModify(post.postId)}>수정</AdviseButton>
                                                    <DeleteButton onClick={()=>handleWModalOpen(post.postId)}>삭제</DeleteButton>
                                                </TitleFunctionContainer>
                                                <InfoContainer>
                                                    <InfoTextContainer>
                                                        <InfoText>용길이 수</InfoText>
                                                        <InfoText>{post.upCountPost}</InfoText>
                                                    </InfoTextContainer>
                                                    <InfoTextContainer>
                                                        <InfoText>한마디 수</InfoText>
                                                        <InfoText>{post.postitCount}</InfoText>
                                                    </InfoTextContainer>
                                                    <InfoTextContainer>
                                                        <InfoText>종료 일자</InfoText>
                                                        <InfoText >{addDaysToDate(post.postTime)}</InfoText>
                                                    </InfoTextContainer>
                                                    <InfoTextContainer>
                                                        <InfoText>작성일자</InfoText>
                                                        <InfoText>{post.postTime}</InfoText>
                                                    </InfoTextContainer>
                                                </InfoContainer>
                                            </TitleInfoContainer>
                                            <UploadButton onClick={() => { window.open(url) }}>
                                                국민신문고
                                                <img src={uploadarrow} style={{ width: '14.4px', height: '4.9px' }} ></img>
                                            </UploadButton>
                                        </ContentContainer>
                                    ))}
                                    <SeeAllRecContainer>
                                        <SeeAllRecord onClick={navigateEndall}>
                                            &nbsp;&nbsp;&nbsp;&nbsp;전체글 보러가기 --> 
                                        </SeeAllRecord>
                                    </SeeAllRecContainer>
                                </AllContentContainer>
                            ) : ( // 게시물이 없는 경우
                                <NoPostImageContainer>
                                    <img src={nopost} alt="No post available" />
                                </NoPostImageContainer>
                            )}
                        </TotalContentContainer>
                    </TotalIngContainer>
                </IngContainer>
            </Container>
            <DeleteModal
                isOpen={isWModalOpen}
                closeModal={handleWModalOpen}
                postId ={getpostid}
            ></DeleteModal>
        </>
    );
}

export default EndPost;

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
    white-space: nowrap; /* 줄 바꿈 방지 */
`;

const TotalContentContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    flex-direction: column;
    gap: 14px;
    align-items: flex-end; /* 오른쪽 정렬 */
    white-space: nowrap; /* 줄 바꿈 방지 */
`;

const AllContentContainer = styled.div`
    display: flex;
    width: 680px;
    flex-direction: column;
    white-space: nowrap; /* 줄 바꿈 방지 */
`;

const NoPostImageContainer = styled.div` // 빈 포스트 이미지 컨테이너 추가
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
`;

const ContentContainer = styled.div`
    width: 100%;
    height: 98px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    border-top: 1px solid var(--gray-001, #E0E0E0);
    border-bottom: 1px solid var(--gray-001, #E0E0E0);
    white-space: nowrap; /* 줄 바꿈 방지 */
`;

const ContentTitle = styled.div`
    display: flex;
    width: 152px;
    flex-direction: column;
    justify-content: center;
    color: var(--gray-006, #575757);
    font-family: 'MinSans-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    white-space: nowrap; /* 줄 바꿈 방지 */
    cursor: pointer;
`;

const EndButton = styled.button`
    display: flex;
    width: 42px;
    height: 20px;
    justify-content: center;
    align-items: center;
    font-family: 'MinSans-Regular';
    color: var(--gray-006, #575757);
    border-radius: 200px;
    background: var(--gray-001, #E0E0E0);
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    border: none;
    white-space: nowrap; /* 줄 바꿈 방지 */
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
    white-space: nowrap; /* 줄 바꿈 방지 */
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
    white-space: nowrap; /* 줄 바꿈 방지 */
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
    white-space: nowrap; /* 줄 바꿈 방지 */
`;

const TitleFunctionContainer = styled.div`
    display: flex;
    align-items: center; /* 중앙 정렬 */
    gap: 10px; /* 요소 간격 추가 */
    white-space: nowrap; /* 줄 바꿈 방지 */
`;

const InfoTextContainer = styled.div`
    display: flex;
    /* width: 56px; */
    height: 35px;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    border-radius: var(--Corner-Extra-small, 4px);
    margin-right: ${(props) => props.$marginright || '0px'};
    white-space: nowrap; /* 줄 바꿈 방지 */
`;

const InfoContainer = styled.div`
    padding-top: 15.5px;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    gap: 16px;
    white-space: nowrap; /* 줄 바꿈 방지 */
`;

const InfoText = styled.div`
    color: var(--gray-006, #575757);
    font-family: 'MinSans-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    white-space: nowrap; /* 줄 바꿈 방지 */
`;

const TitleInfoContainer = styled.div`
    width: 328px;
    white-space: nowrap; /* 줄 바꿈 방지 */
`;

const SeeAllRecContainer = styled.div`
    padding-top: 14px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    white-space: nowrap; /* 줄 바꿈 방지 */
`;

const SeeAllRecord = styled.div`
    color: var(--gray-007, #393939);
    font-family: 'MinSans-Regular';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    cursor: pointer;
    white-space: nowrap; /* 줄 바꿈 방지 */
`;
