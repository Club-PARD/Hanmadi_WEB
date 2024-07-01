import axios from "axios";

const server = process.env.SERVER;


export const getSendCodeAPI = async (code) => {
  try {
    console.log(code);
    const response = await axios.get(`${server}?code=${code}`,{withCredentials: true,});
    return response;
  } catch (err) {
    console.error(err);
  }
};
