import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import defaultwhite from '../../Assets/Img/defaultwhite.svg';
import { useRecoilState } from 'recoil';
import { loginTestState } from '../../Recoil/Atom';
import LoginModal from '../Login_Components/LoginModal';

function IdeaPage() { 
    const [showModal, setShowModal] = useState(false);
    
    return (
        <Container>
            <GlobalStyle />
            <PopularContentContainer>
                <TextContainer>
                    <LineTextContainer>
                        <Dot></Dot><TopicText>인기있는 제안</TopicText>
                    </LineTextContainer>
                    <LineTextContainer>
                        <TitleText>이거...좋은 의견인데?</TitleText>
                    </LineTextContainer>
                </TextContainer>
                <TwoContentContainer>
                    <ImageContent 
                    title="포항시 생태공원조성 사업 제안합니다." 
                    author="김**님" 
                    due="D-1" 
                    initialLikes={143} 
                    setShowModal ={setShowModal} />
                    <ImageContent 
                    title="포항시 생태공원조성 사업 제안합니다." 
                    author="김**님" 
                    due="D-1" 
                    initialLikes={143}
                    setShowModal ={setShowModal} />
                </TwoContentContainer>
            </PopularContentContainer>
            <LoginModal show={showModal} onClose={() => setShowModal(false)} />
        </Container>
    );
}

const ImageContent = ({ title, author, due, initialLikes, setShowModal }) => {
    const [likeCount, setLikeCount] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);

    //로그인 테스트 상태 -추후 서버랑 연결해야함.
    const [isLogin, setIsLogin] = useRecoilState(loginTestState); 

    const handleLike = () => {
        if(isLogin){
            if (isLiked) {
                setLikeCount(likeCount - 1);
            } else {
                setLikeCount(likeCount + 1);
            }
            setIsLiked(!isLiked);
        }
        else{
            setShowModal(true);
        }
    };

    return (
        <ImageContentContainer>
            <img src={defaultwhite} alt="content image" style={{ width: '515px' }} />
            <ContentTitleText>
                {title}
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
                {isLiked ? '용길이 보내기' : '용길이 보내기'}
            </BraveButton>
        </ImageContentContainer>
    );
};

export default IdeaPage;

const Container = styled.div`
    margin-top: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: white;
`;

const PopularContentContainer = styled.div`
    width: 1130px;
    height: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
`;

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
`;

const LineTextContainer = styled.div`
    display: flex;
    align-items: center;
`;

const TopicText = styled.span`
    color: #005AFF;
    font-family: 'MinSans-Regular';
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    margin-bottom: 10px;
`;

const Dot = styled.span`
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background-color: #005AFF;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 13px;
`;

const TitleText = styled.div`
    color: #191919;
    font-family: 'MinSans-Regular';
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
`;

const ContentTitleText = styled.div`
    color: #191919;
    font-family: 'MinSans-Regular';
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    padding-top: 28px;
    padding-bottom: 30px;
    &:hover {
        color: #005AFF; 
        cursor: pointer; 
    }
`;

const DetailText = styled.span`
    color: ${(props) => props.$color || '#9D9D9D'};
    font-family: 'MinSans-Regular';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    padding-right: 34px;
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-bottom: 18px;
`;

const TwoContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: white;
`;

const BraveButton = styled.button`
    display: flex;
    width: 100%;
    height: 57px;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    gap: 10px;
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
    width: 515px;
    display: flex;
    flex-direction: column;
`;
