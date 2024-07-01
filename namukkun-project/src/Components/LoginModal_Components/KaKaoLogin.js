import React, { useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { getSendCodeAPI } from "../../API/AxiosAPI";

function KaKaoLogin(){

  const params = new URL(document.location.toString()).searchParams;

  const code = params.get('code');
  if (code) {
   const con = getSendCodeAPI(code);
  }


  return(
    <div >
      로그인~~
    </div>
  );
}


export default KaKaoLogin; 