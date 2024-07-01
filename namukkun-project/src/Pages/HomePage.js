import React, { useState } from "react";
import styled from "styled-components";
import Home from "../Components/Home_Components/Home";
import LoginModal from '../Components/LoginModal_Components/LoginModal';

//Home_Components의 컴포넌트들을 여기 불러오면 됨. 화면에 띄울 페이지
function HomePage(){
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return(
    <div>
      <Home />
      <LoginButton onClick = {toggleModal}>
        로그인
      </LoginButton>
      <LoginModal show = {showModal} onClose={toggleModal} />
    </div>
  );
}

const LoginButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #0056b3;
  }
`;

export default HomePage;
