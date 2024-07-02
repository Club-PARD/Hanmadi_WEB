import axios from "axios";

const kakaoserver = process.env.REACT_APP_KAKAO_SERVER;
const server = process.env.REACT_APP_SERVER;

//로그인 성공/실패 했을 때 페이지 이동이 필요함
export const getSendCodeAPI = async (code) => {
  try {
    const response = await axios.get(`${kakaoserver}?code=${code}`,{withCredentials: true,});
    return response;
  } catch (err) {
    console.error(err);
    console.log('1차');
    throw err ;
  }
};

//회원가입하고 서버에 쿠키를 받음
export const postRegisterRegion = async (code, region) =>{
  try{
    const response = await axios.post(`${server}/login/create/user?code=${code}&local=${region}`); 

    return response;
  }
  catch(err){
    console.error(err);
  }
}