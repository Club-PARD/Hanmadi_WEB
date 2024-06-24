import React from "react";
import styled from "styled-components";

function Home(){

  return(
    <div>
      <ThemeDiv>처음입니다.</ThemeDiv>
    </div>
  );
}

const ThemeDiv = styled.div`
  //theme 세팅 다 해놔서 props로 해당 형식으로 부르기만 하면 됨. style 폴더에 thmee.js 파일 참고
  color: ${(props)=> props.theme.colors.secondary}; 
`;

export default Home;