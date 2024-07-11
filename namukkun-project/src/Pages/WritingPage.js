import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Components/Layout_Components/Header";
import SelectRegions from "../Components/SelectRegion_Components/SelectRegions";
import Writing from "../Components/WritingPage_Components/Writing";
import { loginCheckAPI } from "../API/AxiosAPI";
import { useNavigate } from "react-router-dom";

function WritingPage(){
  const navigate =useNavigate();
  // const [loginCheck, setLoginCheck] =useState(false);

  const checkloginFunc = async () => {
    try {
      const response = await loginCheckAPI();
      if (response.status === 200) {
        // setLoginCheck(true);
      } else {
        navigate('/main')
        // setLoginCheck(false);

      }
    } catch (error) {
      console.error("로그인 체크 중 오류 발생:", error);
    }
  };

  useEffect(()=>{
    checkloginFunc();
  },[]);

  return(
    <div>
      <Writing/>
    </div>
  );
}

export default WritingPage;
