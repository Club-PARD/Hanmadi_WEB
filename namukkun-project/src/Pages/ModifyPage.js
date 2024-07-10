import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Components/Layout_Components/Header";
import SelectRegions from "../Components/SelectRegion_Components/SelectRegions";
import Writing from "../Components/WritingPage_Components/Writing";
import Modify from "../Components/Modify_Components/Modify";
import { useNavigate } from "react-router-dom";
import { loginCheckAPI } from "../API/AxiosAPI";

function ModifyPage(){

  const [loginCheck, setLoginCheck] =useState(false);
  const navigate =useNavigate();

  const checkloginFunc = async () => {
    try {
      const response = await loginCheckAPI();
      if (response.status === 200) {
        setLoginCheck(true);  
      } else {
        setLoginCheck(false);
        navigate('/main')
      }
    } catch (error) {
      console.error("로그인 체크 중 오류 발생:", error);
    }
  };

  useEffect(()=>{
    checkloginFunc();
  },[loginCheck]);

  return(
    <div>
      <Modify/>
    </div>
  );
}

export default ModifyPage;
