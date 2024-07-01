import React, { useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { getSendCodeAPI } from "../../API/AxiosAPI";

//카카오 로그인을 위해 카카오 로그인 페이지에서 인가코드를 추출해 서버에 보내는 함수
function KaKaoLogin(){

  const params = new URL(document.location.toString()).searchParams;

  const code = params.get('code');
  if (code) {
   getSendCodeAPI(code);
  }


  return(
    <div >
      로그인~~
    </div>
  );
}


export default KaKaoLogin; 