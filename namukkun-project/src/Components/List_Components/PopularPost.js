import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import sendbrave from '../../Assets/Img/sendbrave.svg';
import onclicksendbrave from '../../Assets/Img/onclicksendbrave.svg';
import hoversendbrave from '../../Assets/Img/hoversendbrave.svg';
import rightarrow from '../../Assets/Img/rightarrow.svg';
import defaultwhite from '../../Assets/Img/defaultwhite.svg';
import nopost from '../../Assets/Img/nopost.svg'; // nopost 이미지 import
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getPopularRegion, loginTestState, postLikeBtn, regionNav, userinfo } from '../../Recoil/Atom';
import LoginModal from '../Login_Components/LoginModal';
import { checkPostDeleteAPI, checkPostPostAPI, loginCheckAPI, popularRegionPostGetAPI, userInfoGetAPI } from '../../API/AxiosAPI';

function PopularPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const localPageId = params.get('localPageId');

    const [isClicked, setIsClicked] = useState(false);
    const [activeButton, setActiveButton] = useState('진행중');
    const [isLogin, setIsLogin] = useRecoilState(loginTestState);  
    const [showModal, setShowModal] = useState(false);
    const [popularData, setPopularData] = useRecoilState(getPopularRegion);
    const [popularFilterData, setPopularFilterData] = useState([]);
    const [userData, setUserData] = useRecoilState(userinfo);
    const [regionselect, setRegionSelect] = useRecoilState(regionNav);
    const [loginCheck, setLoginCheck] = useState(false);
    const [postLike, setPostLike] = useRecoilState(postLikeBtn);
    const [sendBraveClicked, setSendBraveClicked] = useState(postLike);

    const checkloginFunc = useCallback(async () => {
        try {
            const response = await loginCheckAPI();
            if (response.status === 200) {
                setLoginCheck(true);
            } else {
                setLoginCheck(false);
            }
        } catch (error) {
            console.error("로그인 체크 중 오류 발생:", error);
        }
    }, []);

    const getUserInfo = useCallback(async () => {
        try {
            const response = await userInfoGetAPI();
            setUserData({
                ...userData,
                nickName: response.data.nickName,
                local: response.data.local,
                profileImage: response.data.profileImage,
                postUpList: response.data.postUpList,
                commentUpList: response.data.commentUpList
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            return null;
        }
    }, [userData]);

    const getPopularPostFunc = useCallback(async (localPageId) => {
        try {
            if (localPageId) {
                const response = await popularRegionPostGetAPI('?localPageId=' + localPageId);
                // console.log(response);
                setPopularData(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch popular posts:', error);
        }
    }, [setPopularData]);

        // 포스트 채택
        const checkPostIncrease = async (postId) => {
            try {
                const response = await checkPostPostAPI(postId);
                return response.data;
            } catch (error) {
                console.error('Failed to increase post like:', error);
                throw error; // 재시도를 위해 오류를 다시 던집니다.
            }
    
        }
    
        // 포스트 채택 삭제
        const checkPostDecrease = async (postId) => {
            try {
                const response = await checkPostDeleteAPI(postId);
                return response.data;
            } catch (error) {
                console.error('Failed to decrease post like:', error);
                throw error; // 재시도를 위해 오류를 다시 던집니다.
            }
    
        }
    

    const handleSendBraveClick = useCallback(async (index, item) => {
        if (loginCheck) {
            const postId = item.postId;
            const newSendBraveClicked = {
                ...sendBraveClicked,
                [postId]: !sendBraveClicked[postId]
            };
            setSendBraveClicked(newSendBraveClicked);

            try {
                let response;
                if (newSendBraveClicked[postId]) {
                    response = await checkPostIncrease(postId); // 좋아요 증가 API 호출
                } else {
                    response = await checkPostDecrease(postId); // 좋아요 감소 API 호출
                }

                if (response.postId === postId) {
                    setUserData({
                        ...userData,
                        postUpList: response.postId
                    });
                }

            } catch (error) {
                console.error('API 호출 실패:', error);
            }
        } else {
            setShowModal(true);
        }
    }, [loginCheck, sendBraveClicked, userData]);

    const handleButtonClick = useCallback((button) => {
        setActiveButton(button);
    }, []);

    const goToListall = useCallback(() => {
        navigate(`/listall?localPageId=${regionselect}`);
    }, [navigate, regionselect]);

    useEffect(() => {
        checkloginFunc();
    }, [checkloginFunc]);

    useEffect(() => {
        getUserInfo().then(userInfo => {
            // console.log("유저 데이터", userInfo);

            const initialSendBraveClicked = {};
            userInfo.postUpList && userInfo.postUpList.forEach(postId => {
                initialSendBraveClicked[postId] = true;
            });
            setSendBraveClicked(initialSendBraveClicked);
        }).catch(error => {
            console.error("Error fetching user info:", error);
        });
    }, []);

    useEffect(() => {
        getPopularPostFunc(localPageId);
    }, [localPageId, getPopularPostFunc]);

    useEffect(() => {
        if (activeButton === '진행중') {
            let filteredData = popularData.filter(item => item.done === false);
            setPopularFilterData(filteredData);
        } else {
            let filteredData = popularData.filter(item => item.done === true);
            setPopularFilterData(filteredData);
        }
    }, [activeButton, popularData]);

    useEffect(() => {
        getUserInfo().then(response => {
            setPostLike(sendBraveClicked);
        }).catch(error => {
            console.error("Error fetching user info:", error);
        });
    }, [sendBraveClicked, getUserInfo]);

    const extractImageLink = useCallback((postData) => {
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
        return defaultwhite;
    }, []);

    const navigateToPost = useCallback((postId) => {
        navigate(`/postit/${postId}`);
    }, [navigate]);

    const truncateText = useCallback((text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    }, []);

    const filteredPopularFilterData = useMemo(() => {
        return popularFilterData.slice(0, 4);
    }, [popularFilterData]);
    
    return (
        <Container>
            <GlobalStyle />
            <GreatContentContainer>
                <IntroContainer>
                    <MainTitle>우리 지역의 가장 인기있는{' '}<MainTitle $color='#005AFF'>한마디 💬 </MainTitle></MainTitle>
                    <SubTitle>의견만 있다면, 어느 지역이든 한마디 남겨주세요!</SubTitle>
                </IntroContainer>

                <StatusBar>
                    <StatBtuContainer>
                        <StatusButton
                            $isActive={activeButton === '진행중'}
                            onClick={() => handleButtonClick('진행중')}
                        >
                            진행중
                        </StatusButton>
                        <StatusButton
                            $isActive={activeButton === '종료'}
                            onClick={() => handleButtonClick('종료')}
                        >
                            종료
                        </StatusButton>
                    </StatBtuContainer>
                    <AllButton onClick={goToListall}>전체글 보러가기<img src={rightarrow} style={{ width: '6px', height: '12px' }} /></AllButton>
                </StatusBar>

                {filteredPopularFilterData.length > 0 ? ( // 게시물이 있는 경우
                    filteredPopularFilterData.map((item, index) => (
                        <ContentImageContainer key={index}>
                            <ImageContainer>
                                <img src={extractImageLink(item)} alt="프로필 이미지" style={{ width: '209px', height: '134px' }} />
                                <ContentTextContainer>
                                    <ContentTitleText onClick={()=>{navigateToPost(item.postId)}}>
                                        {truncateText(item.title, 52)}
                                    </ContentTitleText>
                                    <DetailContainer>
                                        <DetailText>작성자</DetailText>
                                        <DetailText $color="#5A5A5A">{item.userName}</DetailText>
                                    </DetailContainer>
                                    <DetailContainer>
                                        <DetailText>종료일</DetailText>
                                        <DetailText $color="#5A5A5A">D-{item.deadLine}</DetailText>
                                    </DetailContainer>
                                </ContentTextContainer>
                            </ImageContainer>
                            <SendBraveButton
                                onClick={() => handleSendBraveClick(index, item)}
                                isClicked={sendBraveClicked[item.postId]}
                            >
                                <img src={sendBraveClicked[item.postId] ? onclicksendbrave : sendbrave} alt="send brave" />
                            </SendBraveButton>
                        </ContentImageContainer>
                    ))
                ) : ( // 게시물이 없는 경우
                    <NoPostImageContainer>
                        <img src={nopost} alt="No post available" />
                    </NoPostImageContainer>
                )}
            </GreatContentContainer>
            <LoginModal show={showModal} onClose={() => setShowModal(false)} />
        </Container>
    );
}
export default PopularPost;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: transparent;
    position: relative;
    margin-top: 70px;
`;

const GreatContentContainer = styled.div`
    margin-top: 76px;
    width: 936px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: transparent;
    position: relative;
    z-index: 2;
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
    padding-bottom: 10px;
    white-space: nowrap;
`;

const SubTitle = styled.div`
    color: #191919;
    font-family: "Min Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px; /* 187.5% */
    padding-bottom: 86.5px;
`;

const ContentImageContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    border-bottom: 1px solid #DEDEDE;
    background: transparent;
    &:hover {
        cursor: pointer;
    }
`;

const NoPostImageContainer = styled.div` // 빈 포스트 이미지 컨테이너 추가
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 730.2px;
    border-bottom: 1px solid #DEDEDE;
`;

const DetailText = styled.span`
    color: ${(props) => props.$color || '#9D9D9D'};
    font-family: "Min Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    padding-right: ${(props) => props.$paddingright || '55px'};
    background: transparent;
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-bottom: 14px;
    background: transparent;
`;

const ContentTitleText = styled.div`
    color: #191919;
    font-family: "Min Sans";
    font-size: 20.8px;
    font-style: normal;
    font-weight: 600;
    padding-bottom: 18px;
    background: transparent;
    &:hover {
        color: #005AFF;
        cursor: pointer;
    }
`;

const ContentTextContainer = styled.div`
    display: flex;
    width: 430px;
    padding-left: 31px;
    flex-direction: column;
    justify-content: center;
    background: transparent;
    margin-right: 85px;
`;

const ImageContainer = styled.div`
    height: 182px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: transparent;
`;

const StatusBar = styled.div`
    width: 936px;
    border-bottom: 2px solid #D1D1D1;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: -30px;
`;

const StatusButton = styled.button`
    width: 85px;
    height: 36.5px;
    font-size: 22px;
    font-weight: 600;
    padding-bottom: 20.5px;
    border: none;
    font-family: 'Min Sans';
    background: transparent;
    position: relative;
    cursor: pointer;
    color: ${({ $isActive }) => ($isActive ? '#000000' : '#A6A6A6')};
    transition: color 0.3s ease-in-out;

    &::after {
        content: '';
        position: absolute;
        bottom: -2px; /* StatusBar의 border-bottom과 일치하도록 설정 */
        left: 50%; /* 가운데 정렬을 위해 왼쪽을 50%로 설정 */
        width: 0; /* 초기 너비를 0으로 설정 */
        height: 3px;
        border-radius: 3px;
        background-color: #005AFF;
        transition: width 0.3s ease-in-out, left 0.3s ease-in-out; /* 너비와 위치에 애니메이션 추가 */
    }

    &:hover::after,
    ${({ $isActive }) =>
        $isActive &&
        `
        &::after {
            width: 100%; /* 너비를 100%로 확장 */
            left: 0; /* 왼쪽 위치를 0으로 이동 */
        }
    `}
`;

const StatBtuContainer = styled.div`
    width: 190px;
`;

const AllButton = styled.button`
    display: flex;
    width: 145px;
    height: 36.5px;
    border: none;
    background: transparent;
    font-family: "Min Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    cursor:pointer;
`;

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
