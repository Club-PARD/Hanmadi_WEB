import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { GlobalStyle } from "../../Assets/Style/theme";

// 개발자를 추가, 수정하는 버튼을 눌렀을 때 뜨는 모달
function WritingModal({ isOpen, closeModal, method }) {
  const navigate = useNavigate();

  const onClcikPath = () =>{
    navigate('/');
  }

  const modalcon = method ==='out' ? {title: '정말 나가시겠어요?', content: "저장하지 않은 내용은 날라갈 수 있어요."} : {title: '글이 저장되었어요', content: `임시저장된 글은\n내프로필에서 확인할 수 있어요.`} 

  return (
    <Background style={{ display: isOpen ? "block" : "none" }} onClick={closeModal}>
      <GlobalStyle/>
      <Container>
        <Title>{modalcon.title}</Title>
        <Contents method ={method}>{modalcon.content}</Contents>
        <BtnContainer  method ={method}>
          <ContinueBtn onClick={closeModal}>계속작성하기</ContinueBtn>
          <OutButton onClick={onClcikPath}>나가기</OutButton>
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
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
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
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 125% */
  margin-top: 38px;
`;

const Contents =styled.div`
  color: var(--gray-005, #707070);
  text-align: center;
  font-family: 'MinSans-Regular';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 187.5% */
  margin-top: ${(props)=> props.method ==='out'? 31: 15}px;
    white-space: pre-line;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  gap: 4px;
  margin-top: ${(props)=> props.method ==='out'? 46: 25}px;
  margin-right: 29px;
`;

const ContinueBtn = styled.button`
  display: flex;
  width: 100px;
  height: 32px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--Corner-Full, 1000px);
  border: 1px solid var(--gray-002, #C7C7C7);
  background: var(--white-001, #FFF);

  color: var(--gray-004, #959595);
  text-align: center;
  font-family: 'MinSans-Regular';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  &:hover {
    cursor: pointer;
  }
`;

const OutButton = styled.button`
  display: flex;
  width: 62px;
  height: 32px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--Corner-Full, 1000px);
  background: var(--Main-001, #005AFF);

  color: var(--white-001, #FFF);
  text-align: center;
  font-family: 'MinSans-Regular';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export default WritingModal;
