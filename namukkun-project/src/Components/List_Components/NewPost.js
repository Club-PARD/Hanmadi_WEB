import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import imgcontent from '../../Assets/Img/imgcontent.svg';
import rightpagearrow from '../../Assets/Img/rightpagearrow.svg';
import leftpagearrow from '../../Assets/Img/leftpagearrow.svg';

function PopularPost() {
    const [isClicked, setIsClicked] = useState(false);
    const [activeButton, setActiveButton] = useState('진행중'); // 진행중이 기본값
    const [sendBraveClicked, setSendBraveClicked] = useState([false, false, false]); // sendbravebutton 클릭 상태
    const [activeDot, setActiveDot] = useState(0); // pagination 상태

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    const handleSendBraveClick = (index) => {
        const newSendBraveClicked = [...sendBraveClicked];
        newSendBraveClicked[index] = !newSendBraveClicked[index];
        setSendBraveClicked(newSendBraveClicked);
    };

    const handleDotClick = (index) => {
        setActiveDot(index);
    };

    const handleRightArrowClick = () => {
        setActiveDot((prevActiveDot) => (prevActiveDot + 1) % 3);
    };

    const handleLeftArrowClick = () => {
        setActiveDot((prevActiveDot) => (prevActiveDot - 1 + 3) % 3);
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <Container>
            <GlobalStyle />
            <PageMoveContent>
                <LeftArrowContainer>
                    <LeftArrowButton onClick={handleLeftArrowClick}>
                        <img src={leftpagearrow} style={{ width: '22px', height: '45px' }}></img>
                    </LeftArrowButton>
                </LeftArrowContainer>
                <PopularContentContainer>
                    <IntroContainer>
                        <MainTitle>새로운 한마디들, 이거 어때? 🤔</MainTitle>
                        <SubTitle>새로운 제안이 들어왔어요</SubTitle>
                    </IntroContainer>
                    <Pagination>
                        <PaginationDotContainer>
                            {[...Array(3)].map((_, index) => (
                                <Dot
                                    key={index}
                                    active={activeDot === index}
                                    onClick={() => handleDotClick(index)}
                                />
                            ))}
                        </PaginationDotContainer>
                    </Pagination>
                    <TwoContentContainer>
                        <ImageContent title="포항시 생태공원조성 사업 제안합니다. 포항시 생태공원조성 사업 제안합니다. 어디까지가 끝일까요" author="김**님" due="D-1" initialLikes={143} truncateText={truncateText} />
                        <ImageContent title="포항시 생태공원조성 사업 제안합니다." author="김**님" due="D-1" initialLikes={143} truncateText={truncateText} />
                    </TwoContentContainer>
                </PopularContentContainer>
                <RightArrowContainer>
                    <RightArrowButton onClick={handleRightArrowClick}>
                        <img src={rightpagearrow} style={{ width: '22px', height: '45px' }}></img>
                    </RightArrowButton>
                </RightArrowContainer>
            </PageMoveContent>
        </Container>
    );
}

export default PopularPost;

const ImageContent = ({ title, author, due, initialLikes, truncateText }) => {
    const [likeCount, setLikeCount] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        if (isLiked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <ImageContentContainer>
            <img src={imgcontent} alt="content image" style={{ width: '424px', height: '300px' }} />
            <ContentTitleText>
                {truncateText(title, 43)} {/* title을 truncateText로 잘라내기 */}
            </ContentTitleText>
            <DetailContainer>
                <DetailText>작성자</DetailText>
                <DetailText $color="#5A5A5A">{author}</DetailText>
            </DetailContainer>
            <DetailContainer>
                <DetailText>종료일</DetailText>
                <DetailText $color="#5A5A5A">{due}</DetailText>
            </DetailContainer>
            <DetailContainer>
                <DetailText>공감수</DetailText>
                <DetailText $color="#5A5A5A">{likeCount}</DetailText>
            </DetailContainer>
            <BraveButton onClick={handleLike} isLiked={isLiked}>
                {isLiked ? '용기 보내기' : '용기 보내기'}
            </BraveButton>
        </ImageContentContainer>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: transparent;
    position: relative;
`;

const PopularContentContainer = styled.div`
    margin-top: 171px;
    width: 936px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: transparent;
    position: relative;
    z-index: 2;
`;

const PageMoveContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const LeftArrowContainer = styled.div`
    height: 617px;
    width: 253px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

const LeftArrowButton = styled.div`
    margin-right: 56px;
    margin-bottom: 20px;
    cursor: pointer;
`;

const RightArrowContainer = styled.div`
    height: 617px;
    width: 253px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
`;

const RightArrowButton = styled.div`
    margin-left: 56px;
    margin-bottom: 20px;
    cursor: pointer;
`;

const IntroContainer = styled.div`
    display: flex;
    width: 377px;
    flex-direction: column;
    align-items: flex-start;
`;

const MainTitle = styled.span`
    align-self: stretch;
    color: ${(props) => props.$color || '#191919'};
    font-family: "Min Sans";
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 83.333% */
    padding-bottom: 17px;
`;

const SubTitle = styled.div`
    color: #191919;
    font-family: "Min Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px; /* 187.5% */
`;

const Pagination = styled.div`
    width: 100%;
    height: 71px;
    display: flex;
    justify-content: flex-end;
`;

const PaginationDotContainer = styled.div`
    height: 71px;
    display: flex;
    align-items: center;
    justify-content: flex-end; /* 오른쪽 끝으로 정렬 */
`;

const Dot = styled.span`
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: ${(props) => (props.active ? 'rgba(0, 90, 255, 1)' : 'rgba(0, 90, 255, 0.30)')};
    display: inline-block;
    margin-right: 11px;
    cursor: pointer;
`;

const ContentTitleText = styled.div`
    height: 49px;
    color: #191919;
    font-family: "Min Sans";
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    padding-top: 28px;
    padding-bottom: 26px;
    &:hover {
        color: #005AFF; 
        cursor: pointer; 
    }
`;

const DetailText = styled.span`
    color: ${(props) => props.$color || '#9D9D9D'};
    font-family: "Min Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    padding-right: 34px;
    gap: 18px;
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-bottom: 14px;
`;

const TwoContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: white;
    margin-bottom: 190px;
`;

const BraveButton = styled.button`
    display: flex;
    width: 100%;
    height: 57px;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    border-radius: 4px;
    background: ${(props) => (props.isLiked ? '#E2ECFF' : '#005AFF')};
    color: ${(props) => (props.isLiked ? '#246BEB' : 'white')};
    border: none;
    align-self: stretch;
    font-family: 'UhBeeJJIBBABBA';
    cursor: pointer;

    &:hover {
        background: ${(props) => (props.isLiked ? '#D1E4FF' : '#0043BE')};
    }

    &:active {
        background: #E2ECFF;  
        color: #246BEB;
    }
`;

const ImageContentContainer = styled.div`
    width: 424px;
    display: flex;
    flex-direction: column;
`;
