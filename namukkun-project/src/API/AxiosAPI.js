import axios from "axios";

const kakaoserver = process.env.REACT_APP_KAKAO_SERVER;
const server = process.env.REACT_APP_SERVER;

const post = process.env.REACT_APP_SERVER3;

// CORS 요청 시 쿠키를 포함하도록 설정
axios.defaults.withCredentials = true;

// 로그인 성공/실패 했을 때 페이지 이동이 필요함
export const getSendCodeAPI = async (code) => {
  try {
    const response = await axios.get(`${kakaoserver}?code=${code}`, { withCredentials: true });
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 회원가입하고 서버에 쿠키를 받음
export const postRegisterRegion = async (region) => {
  try {
    const response = await axios.get(`${server}/login/create/user?local=${region}`, { withCredentials: true });
    return response;
  } catch (err) {
    console.error(err);
  }
};

// 이미지를 보냈다가 랜덤값을 return 받음
export const uploadImageAPI = async (file) => {
  try {
    const formData = new FormData();
    formData.append('files', file);

    const response = await axios.post(`${post}/post/upload/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.fileNames;
  } catch (error) {
    console.error('Image upload failed:', error);
    return null;
  }
};

// 첨부파일 보냈다가 다시 돌려받음
export const uploadFileFetch = async (file) => {
  try {
    const formData = new FormData();
    formData.append('files', file);

    const response = await axios.post(`${post}/post/upload/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.fileNames;
  } catch (error) {
    console.error('File upload failed:', error);
    return null;
  }
};

// '게시하기' 버튼을 눌렀을 때, 서버로 전송.
export const submitPostAPI = async (postData) => {
  try {
    const response = await axios.post(`${post}/post/upload/post`, postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Post submission failed:', error);
    throw error;
  }
};

export const deleteFileAPI = async (fileName) => {
  try {
    const response = await axios.post(`${post}/post/delete/file?fileName=${encodeURIComponent(fileName)}`, null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('File deletion failed:', error);
    throw error;
  }
};
