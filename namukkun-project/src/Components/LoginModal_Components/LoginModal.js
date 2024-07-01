import React from 'react';
import styled from 'styled-components';

const LoginModal = ({ show, onClose}) => {
  if(!show) {
    return null;
  }

  return (
    <Modal onClick = {onClose}>
      <ModalWindow onClick = {e => e.stopPropagation()}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>한마디 로그인</ModalTitle>
            <ModalSub>한마디는 지역 발전과 활성화를 위해 목소리를 내고자 하지만 <br />확신이 부족한 사람들을 위한 공간이에요.</ModalSub>
          </ModalHeader>
          <ModalBody>
            <LoginGuide>
              <Content>지역발전에 대한 내 의견과 사람들의 지지를 얻고 싶어요.</Content>
            </LoginGuide>
            <LoginGuide>
              <Content>완벽하지 않지만 우리 지역을 위한 의견을 내고 싶어요.</Content>
            </LoginGuide>
            <LoginGuide>
              <Content>다른 사람들의 의견도 들어보고 싶어요.</Content>
            </LoginGuide>
          </ModalBody>
          <ModalFooter>
            <CloseButton onClick = {onClose}>카카오계정으로 계속하기</CloseButton>
          </ModalFooter>
        </ModalContent>
      </ModalWindow>
    </Modal>
  );
};


const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWindow = styled.div`
  display: flex;
  width: 564px;
  padding: 71.5px 87px 72.5px 87px;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border-radius: 20px;
  background: #FFF;
`;

const ModalContent = styled.div`
  display: flex;
  width: 390px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 31px;
  flex-shrink: 0;`

const ModalHeader = styled.div`
  display: flex;
  width: 390px;
  flex-direction: column;
  align-items: center;
  gap: 36px;
`;

const ModalTitle = styled.div`
  align-self: stretch;

  color: #191919;
  text-align: center;
  font-family: "Min Sans";
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 28.008px;
`;

const ModalSub = styled.div`
  align-self: stretch;
  
  color: #626262;
  text-align: center;
  font-family: "Min Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

const ModalBody = styled.div`
  display: flex;
  width: 390px;
  flex-direction: column;
  align-items: flex-start;
  gap: 26px;
`;

const LoginGuide = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  
  border-radius: 200px;
  background: #E4ECF9;
`;

const Content = styled.div`
  color: #191919;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: "Min Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  display: flex;
  width: 390px;
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #FFDC27;
  border: none;
`;

export default LoginModal;