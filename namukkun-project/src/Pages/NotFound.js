import React from "react";
import styled from "styled-components";
import Header from "../Components/Layout_Components/Header";
import notfoundimg from '../Assets/Img/notfoundimg.svg';

function NotFound(){
  return(
    <div>
      <Header/>
      <Div>
        <ImgContainer>
          <StyledImg src={notfoundimg} alt='notfoundimg'></StyledImg>
        </ImgContainer>
      </Div>
    </div>
  );
}

export default NotFound;

const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 6px solid var(--gray-007, #393939);
  position: relative;
  padding-top: 281px;
  justify-content: center;
`

const StyledImg = styled.img`
  position: relative;
  top: 70px;
`
