import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams , useNavigate} from "react-router-dom";
import { getSendCodeAPI } from "../../API/AxiosAPI";
import { useRecoilState } from "recoil";
import { myCode } from "../../Recoil/Atom";
import exspinner from '../../Assets/Img/exspinner.svg';
import styled from "styled-components";

//카카오 로그인을 위해 카카오 로그인 페이지에서 인가코드를 추출해 서버에 보내는 함수
function KaKaoLogin(){
  const navigate = useNavigate();
  const [hasSentCode, setHasSentCode] = useState(false);

  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');

  const sendCode = async (code) => {
    try {
      const response = await getSendCodeAPI(code);
      console.log("성공",response);
      if (response.status === 201) {
        navigate('/selectregion');  // 201 상태 코드일 때 이동할 경로
      } else {
        navigate('/');  // (로그인) 성공했을 때 이동할 경로
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    if (code && (!hasSentCode)) {
      sendCode(code);
      setHasSentCode(true);
    }
  },[hasSentCode])

  //아래에 스피너 등의 화면이 보여야 할 것 같음
  return(
    <div >
      <SpinnerContainer>
        <img src={exspinner} alt='exspinner' style={{ width: '80px', height: '80px' }}></img>
      </SpinnerContainer>
    </div>
  );
}


export default KaKaoLogin; 

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`