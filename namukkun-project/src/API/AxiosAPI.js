import axios from "axios";

const server = process.env.REACT_APP_SERVER;


export const getSendCodeAPI = async (code) => {
  try {
    const response = await axios.get(`${server}?code=${code}`,{withCredentials: true,});

    // 쿠키 읽기
    // const allCookies = document.cookie;
    // console.log('All Cookies:', allCookies);

    return response;
  } catch (err) {
    console.error(err);
  }
};
