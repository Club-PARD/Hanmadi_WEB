import axios from "axios";

const kakaoserver = process.env.REACT_APP_KAKAO_SERVER;
const server = process.env.REACT_APP_SERVER;

const post = process.env.REACT_APP_SERVER3;

// CORS 요청 시 쿠키를 포함하도록 설정
//로그인시 서버로부터 쿠키를 받음
axios.defaults.withCredentials = true; 

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
export const postRegisterRegion = async (region) =>{
  try{
    const response = await axios.get(`${server}/login/create/user?local=${region}`, { withCredentials: true } 
    ); 
    
    return response;
  }
  catch(err){
    console.error(err);
  }
}

// 이미지를 보냈다가 Url로 return 받음
export const uploadImageAPI = async (file) => {
  try {
    const formData = new FormData();
    formData.append('files', file);

    const response = await axios.post(`${post}/post/upload/img`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.imageUrl;
  } catch (error) {
    console.error('Image upload failed:', error);
    return null;
  }
};

// 첨부파일 보냈다가 다시 돌려받음
export const uploadFileFetch = async (file) => {
  const formData = new FormData();
  formData.append('files', file);

  try {
    const response = await fetch(`${post}/post/upload/file`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    const data = await response.json();
    return {
      fileName: data.fileName,
      fileType: data.fileType,
      base64Data: data.base64Data,
    };
  } catch (error) {
    console.error('File upload failed:', error);
    return null;
  }
};

// export const uploadFileFetch = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append('files', file);

//     const response = await axios.post(`${post}/post/upload/file`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return {
//       fileName: response.data.fileName,
//       filtType: response.data.fileType,
//       base64Data: response.data.base64Data
//     };
//   } catch (error) {
//     console.error('File upload failed:', error);
//     return null;
//   }
// };

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


// 유저 프로필 수정
export const userPofilePatchAPI = async(data) =>{
  try {
    const userid =4; //디버그용
    
    const response = await axios.patch(`${server}/user/update?userid=${userid}`, data);
    return response;
  } catch (err) {
    console.error(err);
    throw err ;
  }
}

// 유저 정보 전달
export const userInfoGetAPI = async() =>{
  try {
    const userid =4; //디버그용

    const response = await axios.get(`${server}/user/info?userid=${userid}`);
    return response;
  } catch (err) {
    console.error(err);
    throw err ;
  }
}