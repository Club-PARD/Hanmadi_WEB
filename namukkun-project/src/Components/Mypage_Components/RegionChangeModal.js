import React, { useEffect, useRef, useState } from 'react';
import { GlobalStyle } from '../../Assets/Style/theme';
import styled from 'styled-components';
import Cancel from '../../Assets/Img/Cancel.svg';
import { useNavigate } from 'react-router-dom';
import test1 from '../../Assets/Img/test1.png';
import changeProfile from '../../Assets/Img/changeProfile.svg';
import { userPofilePatchAPI } from '../../API/AxiosAPI';
import { userinfo } from '../../Recoil/Atom';
import { useRecoilState } from 'recoil';
import { intToRegion, regionToInt } from '../SelectRegion_Components/IntToRegion';

const RegionChangeModal = ({ isOpen, closeModal }) => {
  //기본적으로 보여줄 유저 데이터
  const [userData, setUserData] = useRecoilState(userinfo);
  const [selectedButton, setSelectedButton] = useState(intToRegion[userData.local]);
  // const navigate = useNavigate();
  const imageInput =useRef();

  //프로필 인풋값 입력 및 변경을 위함
  const [info, setInfo] =useState({
    id : 1, //나중에 서버 연결 후 수정 필요
    nickName: userData.nickName,
    local: selectedButton,
    profileImage : userData.profileImage
    });

  useEffect(()=>{
    setInfo({
      ...info,
      nickName: userData.nickName,
      local: intToRegion[userData.local],
      profileImage : userData.profileImage
    })
  },[userData])

  //지역 선택 버튼
  const handleButtonClick = (e, local) => {
    e.stopPropagation();
    e.preventDefault()
    setSelectedButton((prevSelected) => (prevSelected === local ? null : local));
  };

  //이벤트 핸들러 
  const handleInputName = (e) =>{
    e.stopPropagation();
    setInfo({
      ...info,
      nickName: e.target.value
    });
  }

  //이벤트 핸들러 파일 업로드
  const handleProfileimg = (e) =>{
    e.stopPropagation();
    const file = e.target.files[0];
    if (file){
      const imgURL = URL.createObjectURL(file);
      setInfo({
        ...info,
        profileImage: imgURL
      })
    }
  }

  //파일 입력을 위함
  const onClickBtn = (e) =>{
    e.preventDefault()
    imageInput.current.click();
  }

  
  useEffect(() => {
    if(isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if(!isOpen) {
    return null;
  }

  //유저 데이터 수정하는 함수 
  const patchUserInfo = async () =>{
    const data ={
      id : 1, //나중에 서버 연결 후 수정 필요
      nickName: userData.nickName,
      local: regionToInt[selectedButton],
      profileImage : userData.profileImage
    }
    const response =await userPofilePatchAPI(data);
    setUserData({
      ...userData,
        nickName: info.nickName,
        local: regionToInt[selectedButton],
        profileImage : info.profileImage
    })
    console.log(response);
  };

  const profileEditChagne =(e)=>{
    e.preventDefault();
    patchUserInfo(info);
    closeModal();
    console.log(info);
  }

  return (
    <Background style={{ display: isOpen ? "block" : "none" }} onClick={closeModal}>
      <GlobalStyle/>
      <Container onClick={(e) => e.stopPropagation()}>
        <ModalDiv> 
        <Title>프로필 수정하기</Title>
        <ContentsDiv>
          <ImgDiv>  
            <ProfileBtn onClick={(e)=>onClickBtn(e)}>
              <img src={changeProfile} alt='이미지 변경 아이콘'></img>
            </ProfileBtn>
            <img src={info.profileImage} 
            style={{ width: '140px', height: '140px', borderRadius:'50%' }} 
            alt="profile" />
            <input type="file" accept='.png' ref={imageInput}  name="profileimg" onChange={handleProfileimg}></input>
          </ImgDiv>
          <div style={{margin: "0px", padding: "0"}}> 
            <NameChagne>이름 변경하기</NameChagne>
            <NameInput type='text' onChange={handleInputName} value={info.nickName}></NameInput>
            <RegionChagne>지역 변경하기</RegionChagne>
            <ButtonContainer>
            {['경산시', '경주시', '구미시', '김천시', '문경시', '상주시', '안동시', '영주시', '영천시', '포항시'].map((local) => (
              <LocalButton
                key={local}
                onClick={(e) => handleButtonClick(e, local)}
                selected={selectedButton === local}
              >
                {local}
              </LocalButton>
            ))}
          </ButtonContainer>
          </div>
        </ContentsDiv>
        <BtnDiv>
          <OutBtn onClick={closeModal}>나가기</OutBtn>
          <CheckBtn onClick={profileEditChagne}>확인</CheckBtn>
        </BtnDiv>
        </ModalDiv>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.30);
  z-index: 1100;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 747px;
  height: 559px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #F9F9F9;
  /* 모달 그림자 */
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.10);

`;

const ModalDiv =styled.div`
  display: flex;
  margin: 56px 61px;
  flex-direction: column;
`;


const Title = styled.div`
  color: var(--gray-008, #191919);
  font-family: "MinSans-Regular";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;

`;

const ContentsDiv =styled.div`
  display: flex;
  gap: 60px;
  margin-top: 35px;
`;

const ImgDiv =styled.div`
  display: flex;
  position: relative;
  > img{
    border-radius: 604.118px;
    border: 2px solid #E5E5E5;
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;
    box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.05);
  }
  > input{
    display: none;
  }
`;

const ProfileBtn = styled.button`
  width: 29px;
  height: 29px;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-left: 103px;
  cursor: pointer;
`;

const NameChagne = styled.div`
  color: var(--gray-007, #393939);
  font-family: "MinSans-Regular";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 166.667% */
`;

const NameInput = styled.input`
  width: 245px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid var(--gray-001, #E0E0E0);
  background: var(--white-005, #F5F5F5);
  margin-top: 20px;

  color: var(--gray-005, #707070);
  font-family: "MinSans-Regular";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  /* line-height: 30px; 187.5% */
  outline: none;
  padding: 0;
  padding-left: 22px;
  padding-right: 22px;
`;

const RegionChagne = styled.div`
  color: var(--gray-007, #393939);
  font-family: "MinSans-Regular";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin-top: 27px;
  
/* line-height: 30px; 166.667% */

`;

const ButtonContainer = styled.div`
  display: flex;
  width: 425px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8.236px;
  flex-wrap: wrap;
  margin-top: 9px;

  display: flex;
  width: 425px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8.236px;
  flex-wrap: wrap;
`;

const LocalButton = styled.button`
  display: flex;
  width: 100px;
  height: 50px;
  padding: 0px;
  justify-content: center;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #D6D6D6;
  background: ${(props) => (props.selected ? 'rgba(0, 90, 255, 0.06)' : 'rgba(255, 255, 255, 0.60)')};
  font-family: "MinSans-Regular";
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: background 0.3s, border 0.3s;

  color: #9D9D9D;
  font-family: "MinSans-Regular";
  font-size: 13.178px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.709px; /* 187.5% */

  ${(props) =>
    !props.selected &&
    `
    &:hover {
      background: rgba(236, 236, 236, 0.60);
      border: 1px solid #D6D6D6;
    }
  `}

  ${(props) =>
    props.selected &&
    `
    border: 1px solid #005AFF;
    background: rgba(0, 90, 255, 0.06);
    color: #005AFF;
  `}
`;

const BtnDiv =styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  justify-content: end;
  margin-top: 33.53px;
`;

const OutBtn =styled.button`
  display: flex;
  width: 86px;
  height: 36px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: var(--Main-001, #005AFF);
  text-align: center;
  font-family: "Min Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 214.286% */

  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const CheckBtn =styled.button`
  display: flex;
  width: 63px;
  height: 36px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: var(--Corner-Full, 1000px);
  background: var(--Main-001, #005AFF);
  border: none;

  color: var(--white-001, #FFF);
  text-align: center;
  font-family: "MinSans-Regular";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 214.286% */
  margin-right: 61px;
  cursor: pointer;
`;

export default RegionChangeModal;