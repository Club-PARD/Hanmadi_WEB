import React, { useState } from "react";
import styled from "styled-components";
import Home from "../Components/Home_Components/Home";

//Home_Components의 컴포넌트들을 여기 불러오면 됨. 화면에 띄울 페이지
function HomePage(){

  return(
    <div>
      <Home />
    </div>
  );
}

export default HomePage;
