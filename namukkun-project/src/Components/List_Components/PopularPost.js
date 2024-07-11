import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import rightpagearrow from '../../Assets/Img/rightpagearrow.svg';
import leftpagearrow from '../../Assets/Img/leftpagearrow.svg';
import defaultblue from '../../Assets/Img/defaultblue.svg';
import nopost from '../../Assets/Img/nopost.svg';
import { useRecoilState } from 'recoil';
import { getRecentRegion, loginTestState, postLikeBtn, userinfo } from '../../Recoil/Atom';
import LoginModal from '../Login_Components/LoginModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkPostDeleteAPI, checkPostPostAPI, recentRegionPostGetAPI } from '../../API/AxiosAPI';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function PopularPost() {
    const [isClicked, setIsClicked] = useState(false);
    const [activeButton, setActiveButton] = useState('진행중'); 
    const [sendBraveClicked, setSendBraveClicked] = useRecoilState(postLikeBtn);
    const [isLogin, setIsLogin] = useRecoilState(loginTestState); 
    const [recentData, setRecentData] = useRecoilState(getRecentRegion); 
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useRecoilState(userinfo);
    const location = useLocation();
    const getPathRegion = location.search;

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    useEffect(()=>{
        const recent = async() =>{
            const response = await recentRegionPostGetAPI(getPathRegion);
            setRecentData(response.data);
        };
        recent();
    },[getPathRegion, sendBraveClicked]);

    const checkPostIncrease = async (postId) => {
        const response = await checkPostPostAPI(postId);
        return response.data; 
    }

    const checkPostDecrease = async (postId) => {
        const response = await checkPostDeleteAPI(postId);
        return response.data;
    }

    const handleLike = async(post) => {
        if (isLogin) {
            const postId = post.postId;
            const newSendBraveClicked = { ...sendBraveClicked };

            try {
                let response;
                if (newSendBraveClicked[postId]) {
                    response = await checkPostDecrease(postId);
                    delete newSendBraveClicked[postId];
                } else {
                    response = await checkPostIncrease(postId);
                    newSendBraveClicked[postId] = true;
                }

                setSendBraveClicked(newSendBraveClicked);

                setUserData(prevUserData => ({
                    ...prevUserData,
                    postUpList: Object.keys(newSendBraveClicked).map(key => parseInt(key)),
                }));

                const updatedPostData = recentData.map(post => {
                    if (post.postId === postId) {
                        return {
                            ...post,
                            upCountPost: response.postUpCount
                        };
                    }
                    return post;
                });
    
                setRecentData(updatedPostData);

            } catch (error) {
                console.error('API 호출 실패:', error);
                
            }

        } else {
            setShowModal(true);
        }
    };

    const extractImageLink = (postData) => {
        const fields = ['proBackground', 'solution', 'benefit'];

        for (let field of fields) {
            const value = postData[field];
            if (value) {
                const match = value.match(/\[이미지:\s*(https?:\/\/[^\s\]]+)\]/);
                if (match) {
                    return match[1];
                }
            }
        }

        return defaultblue;
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <Container>
            <GlobalStyle />
            <PageMoveContent>
                <SliderContainer>
                    <Slider {...settings}>
                        {recentData.length > 0 ? (
                            recentData.map((post, index) => (
                                <ImageContent
                                    key={index}
                                    postImage= {extractImageLink(post)}
                                    title={post.title}
                                    author={post.userName}
                                    due={'D-'+post.deadLine}
                                    initialLikes={post.upCountPost}
                                    truncateText={truncateText}
                                    isLogin ={isLogin}
                                    setShowModal ={setShowModal}
                                    handleLike={() => handleLike(post)} 
                                    isLiked={sendBraveClicked[post.postId]} 
                                    postId = {post.postId}
                                />
                            ))
                        ) : (
                            <NoPostImageContainer>
                                <img src={nopost} alt="No post available" />
                            </NoPostImageContainer>
                        )}
                    </Slider>
                </SliderContainer>
            </PageMoveContent>
            <LoginModal show={showModal} onClose={() => setShowModal(false)} />
        </Container>
    );
}

export default PopularPost;

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <RightArrowButton className={className} onClick={onClick}>
            <img src={rightpagearrow} style={{ width: '22px', height: '45px' }}></img>
        </RightArrowButton>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <LeftArrowButton className={className} onClick={onClick}>
            <img src={leftpagearrow} style={{ width: '22px', height: '45px' }}></img>
        </LeftArrowButton>
    );
}

const ImageContent = ({ postImage, title, author, due, initialLikes, truncateText,handleLike, isLiked ,postId }) => {
    const navigate = useNavigate();
    
    const navigateToPost = (postId) => {
        navigate(`/postit/${postId}`);
    };

    return (
        <ImageContentContainer>
            <img src={postImage} alt="게시글 이미지" style={{ width: '424px', height: '300px' }} />
            <ContentTitleText onClick={()=>{navigateToPost(postId)}}>
                {truncateText(title, 43)}
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
                <DetailText>추천수</DetailText>
                <DetailText $color="#5A5A5A">{initialLikes}</DetailText>
            </DetailContainer>
            <BraveButton onClick={handleLike} isLiked={isLiked}>
                {isLiked ? '추천하기' : '추천하기'}
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

const PageMoveContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const SliderContainer = styled.div`
    width: 936px;
    .slick-next, .slick-prev {
        z-index: 1;
    }
`;

const LeftArrowButton = styled.div`
    cursor: pointer;
`;

const RightArrowButton = styled.div`
    cursor: pointer;
`;

const ContentTitleText = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    font-family: "Min Sans-Regular";
    font-weight: 600;
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

const NoPostImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 460px;
    margin-bottom: 119px;
`;
