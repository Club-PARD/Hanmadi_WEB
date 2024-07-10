import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { GlobalStyle } from "../../Assets/Style/theme";
import { deletePostAPI } from "../../API/AxiosAPI";
import { deleteCheck } from "../../Recoil/Atom";
import { useRecoilState } from "recoil";

// 개발자를 추가, 수정하는 버튼을 눌렀을 때 뜨는 모달
function DeleteModal({ isOpen, closeModal, postId ,setUpdate, update}) {
  const [deUpdate, setDeUpdate] = useRecoilState(deleteCheck
  );
  const navigate = useNavigate();

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

    //삭제 버튼
    const DeletePostFunc = async(postId) =>{
      const response =  await deletePostAPI(postId);
      console.log(response);
      setDeUpdate(!deUpdate);
      closeModal();
  }

  return (
    <Background style={{ display: isOpen ? "block" : "none" }} onClick={closeModal}>
      <GlobalStyle/>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>정말 삭제하시겠어요?</Title>
        <Contents >삭제된 글은 다시 불러올 수 없어요.</Contents>
        <BtnContainer >
          <ContinueBtn onClick={closeModal}>취소하기</ContinueBtn>
          <ContinueBtn onClick={()=>DeletePostFunc(postId)}>확인</ContinueBtn>
        </BtnContainer>
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
  z-index: 2000;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  height: 240px;
  flex-shrink: 0;
  border-radius: 20px;
  background: var(--white-001, #FFF);
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.10);
`;

const Title = styled.div`
  color: var(--gray-008, #191919);
  text-align: center;
  font-family: 'MinSans-Regular';
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 125% */
  margin-top: 38px;
`;

const Contents =styled.div`
  color: var(--gray-005, #707070);
  text-align: center;
  font-family: 'MinSans-Regular';
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  margin-top: 31px;
    white-space: pre-line;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  gap: 7px;
  margin-top: 46px;
  margin-right: 39px;
`;

const ContinueBtn = styled.button`
  display: flex;
    padding: 10px 15px 10px 15px;
    height: 32px;
    font-size: 14px;
    justify-content: center;
    border-radius: var(--Corner-Full, 1000px);
    border: 1px solid var(--gray-002, #C7C7C7);
    color: var(--gray-004, #959595);
    background: var(--white-001, #FFF);
    align-items: center;
    line-height: 20px;
  /* 기본 확인 버튼 색상 */
    &:nth-child(2) {
        background-color: #005aff;
        color: white;
        cursor: pointer;
    }

    &:nth-child(2):hover{
        background: #0047C7;
    }

  /* 취소 버튼 호버 시 색상 변경 */
    &:nth-child(1):hover {
        cursor: pointer;
        background-color: var(--white-005, #F5F5F5);
    }
`;

const OutButton = styled.button`
  display: flex;
  width: 72px;
  height: 34px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--Corner-Full, 1000px);
  background: var(--Main-001, #005AFF);
  margin-right: 20px;
  margin-bottom: 10px;

  color: var(--white-001, #FFF);
  text-align: center;
  font-family: 'MinSans-Regular';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  white-space: nowrap;

  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export default DeleteModal;
