import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Layout_Components/Header";
import StatusBlock from '../Mypage_Components/StatusBlock';
import EndPost from '../Mypage_Components/EndAllPost';
import advisepen from '../../Assets/Img/advisepen.svg';
import WritingModal from "../WritingPage_Components/WritingModal";
import RegionChangeModal from "../Mypage_Components/RegionChangeModal";
import { getUserAllInfoAPI } from "../../API/AxiosAPI";
import { deleteCheck, loginTestState, userinfo } from "../../Recoil/Atom";
import { useRecoilState } from "recoil";
import { intToRegion } from "../SelectRegion_Components/IntToRegion";
import arrowleft from '../../Assets/Img/Arrowleft.svg';
import arrowright from '../../Assets/Img/Arrowright.svg';

// 종료된 한마디 전체를 보여주는 페이지
function EndAll() {
  const [isSticky, setIsSticky] = useState(false);
  const [userData, setUserData] = useRecoilState(userinfo);
  const [isLogin, setIsLogin] = useRecoilState(loginTestState);
  const [page, setPage] =useState(0);
  const [deUpdate, setDeUpdate] = useRecoilState(deleteCheck
  );
  const [posts, setPosts] = useState({
    ingPosts: [],
    endPosts: [],
    tempPosts: [],
  });
  const [isWModalOpen, setIsWModalOpen] = useState(false);

  const handleWModalOpen = () => {
    setIsWModalOpen(!isWModalOpen);
  };

  const handleScroll = () => {
    if (window.scrollY >= 225) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await getUserAllInfoAPI();
      setUserData({
        ...userData,
        nickName: response.userInfoDTO.nickName,
        local: response.userInfoDTO.local,
        profileImage: response.userInfoDTO.profileImage
      });

      const endPosts = response.posts.filter(post => post.return && post.done);
      setPosts({ ingPosts: [], endPosts, tempPosts: [] });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    if (isLogin) {
      getUserInfo();
    }
  }, [isLogin, deUpdate]);

  const itemsPerPage = 8; // 한 페이지당 보여지는 컨텐츠 갯수
  // 총 페이지 갯수
  const totalPages = Math.ceil(posts.endPosts.length / itemsPerPage);

  return (
    <PageContainer>
      <EndPost posts={posts.endPosts} />
      <FixedButton $isSticky={isSticky}>
        <img src={userData.profileImage} style={{ width: '144px', height: '144px', borderRadius: '50%' }} alt="face" />
        <InfoContainer>
            <InfoName>이름</InfoName>
            <InfoContent>{userData.nickName}</InfoContent>
        </InfoContainer>
        <InfoContainer>
            <InfoName>지역</InfoName>
            <InfoContent>{intToRegion[userData.local]}</InfoContent>
        </InfoContainer>
        <ProfileAdviseButton onClick={handleWModalOpen}>
            프로필 수정하기&nbsp;&nbsp;&nbsp;
            <img src={advisepen} style={{ width: '9px', height: '9px' }} alt="advisepen"/> 
        </ProfileAdviseButton>
      </FixedButton>
      <RegionChangeModal
          isOpen={isWModalOpen}
          closeModal={handleWModalOpen}
      ></RegionChangeModal>
    </PageContainer>
  );
}

export default EndAll;

const PageContainer = styled.div`
  background-color: #FAFAFA;
  min-height: 100vh; /* 페이지의 최소 높이를 화면 전체 높이로 설정 */
`;

const FixedButton = styled.div.attrs(props => ({
  style: {
    position: props.$isSticky ? 'fixed' : 'absolute',
    top: props.$isSticky ? '0' : '230px'
  }
}))`
  left: calc(50% - 400px);
  transform: translateX(-50%);
  width: 144px;
  height: 269px;
  border: none;
  display: flex;
  flex-direction: column;
  background: white;
  z-index: 1000;
  background: transparent;
`;

const InfoContainer = styled.div`
    width: 100%;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const InfoName = styled.div`
    padding-right: 7px;
    color: var(--gray-007, #393939);
    font-family: "Min Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
`

const InfoContent = styled.div`
    color: var(--gray-006, #575757);
    font-family: 'MinSans-Regular';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
`

const ProfileAdviseButton = styled.button`
    margin-top: 14px;
    display: flex;
    width: 100px;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    background: var(--gray-001, #E0E0E0);
    color: var(--gray-008, #191919);
    font-family: 'MinSans-Regular';
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
    border: none;
`
const Pagenation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 69px;
  margin-bottom: 63px;
  gap: 10px;
`;

const PagenationButton = styled.button`
  display: flex;
  width: 31px;
  height: 31px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;

  border-radius: var(--Corner-Full, 1000px);
  background-color: ${(props) => (props.isSelected ? '#F5F5F5' : 'transparent')};
  cursor: pointer
  `