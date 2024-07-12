import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Components/Layout_Components/Header";
import StatusBlock from '../Components/Mypage_Components/StatusBlock';
import IngPost from '../Components/Mypage_Components/IngPost';
import EndPost from '../Components/Mypage_Components/EndPost';
import TempPost from '../Components/Mypage_Components/TempPost';
import advisepen from '../Assets/Img/advisepen.svg';
import WritingModal from "../Components/WritingPage_Components/WritingModal";
import RegionChangeModal from "../Components/Mypage_Components/RegionChangeModal";
import { getUserAllInfoAPI, loginCheckAPI } from "../API/AxiosAPI";
import { deleteCheck, loginTestState, userinfo } from "../Recoil/Atom";
import { useRecoilState } from "recoil";
import { intToRegion } from "../Components/SelectRegion_Components/IntToRegion";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const [isSticky, setIsSticky] = useState(false);
  // 유저 기본 정보 아톰에 저장
  const [userData, setUserData] = useRecoilState(userinfo);
  // const [isLogin, setIsLogin] = useRecoilState(loginTestState);
  const [deUpdate, setDeUpdate] = useRecoilState(deleteCheck);
  const [loginCheck, setLoginCheck] =useState(false);
  
  // New state to manage posts
  const [posts, setPosts] = useState({
    ingPosts: [],
    endPosts: [],
    tempPosts: [],
  });

  //변경사항 체크
  const [update, setUpdate] =useState(false);

  // 모달창 끌지 켤지 다루는 usestate
  const [isWModalOpen, setIsWModalOpen] = useState(false);


  //로그인 체크 
  const navigate =useNavigate();

  const checkloginFunc = async () => {
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
  };

  useEffect(()=>{
    checkloginFunc();
  },[]);

  // 모달창 관리하는 함수
  const handleWModalOpen = () => {
    setIsWModalOpen(!isWModalOpen);
  };

  const handleScroll = () => {
    if (window.scrollY >= 225) { // 400px 스크롤 시 상단에 고정
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

  // 유저 데이터 불러오는 함수 
  const getUserInfo = async () => {
    try {
      const response = await getUserAllInfoAPI();
      console.log('API Response:', response);
      // 아톰에 유저 정보 저장
      setUserData({
        ...userData,
        nickName: response.userInfoDTO.nickName,
        local: response.userInfoDTO.local,
        profileImage: response.userInfoDTO.profileImage
      });

      // Categorize posts based on their properties
      const ingPosts = [];
      const endPosts = [];
      const tempPosts = [];

      response.posts.forEach(post => {
        console.log(post);  // 여기에서 post의 실제 값을 출력해봅시다.
        if (!post.return) {
          tempPosts.push(post);
        } else if (post.return && !post.done) {
          ingPosts.push(post);
        } else if (post.return && post.done) {
          endPosts.push(post);
        }
      });

      console.log('ingPosts:', ingPosts);
      console.log('endPosts:', endPosts);
      console.log('tempPosts:', tempPosts);

      setPosts({ ingPosts, endPosts, tempPosts });
      
      console.log(response);
    } catch (error) {
      console.error('Error fetching user info:', error);
      navigate('/main');
    }
  };

  useEffect(() => {
    // 로그인이 됐을 때 유저 정보를 불러옴.
      getUserInfo();

  }, [deUpdate]);

  return (
    <div>
      <StatusBlock 
        ingCount={posts.ingPosts.length} 
        endCount={posts.endPosts.length} 
        tempCount={posts.tempPosts.length} 
      />
      <IngPost posts={posts.ingPosts} setUpdate={setUpdate} update={update} />
      <EndPost posts={posts.endPosts} setUpdate ={setUpdate} update={update}/>
      <TempPost posts={posts.tempPosts} setUpdate={setUpdate} update={update}/>
      <FixedButton $isSticky={isSticky}>
        <ImgContainer>
        <img src={userData.profileImage} style={{ width: '144px', height: '144px', borderRadius: '50%' }} alt="face" />
        </ImgContainer>
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
    </div>
  );
}

export default MyPage;

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

const ImgContainer = styled.div`
  margin-bottom: 10px;
`

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
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
`

const ProfileAdviseButton = styled.button`
    margin-top: 14px;
    display: flex;
    width: 130px;
    height: 30px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    background: var(--gray-001, #E0E0E0);
    color: var(--gray-008, #191919);
    font-family: 'MinSans-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
    border: none;
`
