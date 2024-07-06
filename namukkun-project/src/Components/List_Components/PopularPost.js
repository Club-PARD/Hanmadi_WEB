import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import sendbrave from '../../Assets/Img/sendbrave.svg';
import onclicksendbrave from '../../Assets/Img/onclicksendbrave.svg';
import hoversendbrave from '../../Assets/Img/hoversendbrave.svg';
import rightarrow from '../../Assets/Img/rightarrow.svg';
import defaultwhite from '../../Assets/Img/defaultwhite.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginTestState } from '../../Recoil/Atom';
import LoginModal from '../Login_Components/LoginModal';

function PopularPost() {
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    //진행중/ 종료 필터 상태 관리 // 진행중이 기본값
    const [activeButton, setActiveButton] = useState('진행중');
    // sendbravebutton 클릭 상태
    const [sendBraveClicked, setSendBraveClicked] = useState([false, false, false, false]); 

    //로그인 테스트 상태 -추후 서버랑 연결해야함.
    const [isLogin, setIsLogin] = useRecoilState(loginTestState);  
    const [showModal, setShowModal] = useState(false);

    //인기글 포스트 
    const [popularData, setPopularData] = useState([]);

    // 더미 데이터 생성
    const dummyData = [
        {
        title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요.",
        author: "김**님",
        endDate: "D-7"
        },
        {
        title: "학교에 자전거 보관소 설치를 요청합니다.",
        author: "이**님",
        endDate: "D-10"
        },
        {
        title: "도서관에 신간 도서 추가를 부탁드립니다.",
        author: "박**님",
        endDate: "D-5"
        },
        {
        title: "공원에 더 많은 벤치를 설치해 주세요.",
        author: "최**님",
        endDate: "D-15"
        },
        {
        title: "지역 주민을 위한 헬스장 건립을 건의합니다.",
        author: "정**님",
        endDate: "D-20"
        }
    ];
  
    useEffect(() => {
      // 더미 데이터를 상태에 설정
      setPopularData(dummyData);
      //버튼 상태 설정
      setSendBraveClicked(new Array(dummyData.length).fill(false));
    }, []);

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    const handleSendBraveClick = (index) => {
        if(isLogin){
        const newSendBraveClicked = [...sendBraveClicked];
        newSendBraveClicked[index] = !newSendBraveClicked[index];
        setSendBraveClicked(newSendBraveClicked);
        }
        else{
            setShowModal(true)
        }
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const goToListall = () =>{
        navigate('/listall');
    }

    return (
        <Container>
            <GlobalStyle />
            <GreatContentContainer>
                <IntroContainer>
                    <MainTitle>가장 인기있는{' '}<MainTitle $color='#005AFF'>한마디 💬 </MainTitle></MainTitle>
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

            {popularData.slice(0, 4).map((item, index) => (
                <ContentImageContainer key={index}>
                <ImageContainer>
                    <img src={defaultwhite} alt="content image" style={{ width: '209px', height: '134px' }} />
                    <ContentTextContainer>
                    <ContentTitleText>
                        {truncateText(item.title, 52)}
                    </ContentTitleText>
                    <DetailContainer>
                        <DetailText>작성자</DetailText>
                        <DetailText $color="#5A5A5A">{item.author}</DetailText>
                    </DetailContainer>
                    <DetailContainer>
                        <DetailText>종료일</DetailText>
                        <DetailText $color="#5A5A5A">{item.endDate}</DetailText>
                    </DetailContainer>
                    </ContentTextContainer>
                </ImageContainer>
                <SendBraveButton
                    onClick={() => handleSendBraveClick(index)}
                    isClicked={sendBraveClicked[index]}
                >
                    <img src={sendBraveClicked[index] ? onclicksendbrave : sendbrave} alt="send brave" />
                </SendBraveButton>
                </ContentImageContainer>
            ))}
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
    padding-bottom: 17px;
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
`;

const StatusButton = styled.button`
    width: 85px;
    height: 36.5px;
    font-size: 22px;
    font-weight: 400;
    padding-bottom: 20.5px;
    border: none;
    font-family: 'Min Sans';
    background: transparent;
    position: relative;
    cursor: pointer;
    color: ${({ $isActive }) => ($isActive ? '#000000' : '#A6A6A6')};
    &:hover::after,
    ${({ $isActive }) =>
        $isActive &&
        `
        &::after {
            content: '';
            position: absolute;
            bottom: -2px; /* StatusBar의 border-bottom과 일치하도록 설정 */
            left: 0;
            right: 0;
            height: 2px;
            background-color: #005AFF;
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
