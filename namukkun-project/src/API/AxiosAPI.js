import axios from "axios";

const kakaoserver = process.env.REACT_APP_KAKAO_SERVER;
const server = process.env.REACT_APP_SERVER;

const post = process.env.REACT_APP_SERVER4;

// CORS 요청 시 쿠키를 포함하도록 설정
// 로그인시 서버로부터 쿠키를 받음
axios.defaults.withCredentials = true; 

// 로그인 성공/실패 했을 때 페이지 이동이 필요함
export const getSendCodeAPI = async (code) => {
  try {
    const response = await axios.get(`${kakaoserver}?code=${code}`, { withCredentials: true });
    return response;
  } catch (err) {
    console.error(err);
    console.log('1차');
    throw err ;
  }
};

// 회원가입하고 서버에 쿠키를 받음
export const postRegisterRegion = async (region) =>{
  try{
    const response = await axios.get(`${server}/login/create/user?local=${region}`, { withCredentials: true }); 
    
    return response;
  }
  catch(err){
    console.error(err);
  }
}

// 이미지를 먼저 서버로 보냄
export const uploadImageAPI = async (file) => {
  try {
    const formData = new FormData();
    formData.append('img', file);

    const response = await axios.post(`${post}/post/upload/img`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.error('Image upload failed:', error);
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

// 임시저장
export const saveTempPostAPI = async (postData) => {
  try {
    const response = await axios.post(`${post}/post/upload/temppost`, postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Temporary post save failed:', error);
    throw error;
  }
}

// 첨부파일 '제거' 버튼을 눌렀을 때, 제거하기
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

// comment 읽어오기
export const fetchComments = async (postId) => {
    try {
        const response = await axios.get(`${server}/post/comment?postid=${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

// comment 삭제
export const deleteComment = async (userid, commentid) => {
    try {
        await axios.delete(`${server}/post/comment`, {
            params: {
                userid,
                commentid
            }
        });
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};

// comment 생성
export const createComment = async (postid, userid, content) => {
  try {
      const response = await axios.post(`${server}/post/comment`, { userId: userid, content: content }, {
          params: {
              postid,
              userid
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
  }
};

// comment 좋아요
export const toggleLikeComment = async (commentid, userid) => {
  try {
      const response = await axios.patch(`${server}/post/comment/up`, null, {
          params: {
              commentid,
              userid
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error toggling like comment:', error);
      throw error;
  }
};

// comment 채택
export const toggleTakeComment = async (commentid, userid, take) => {
  try {
      const response = await axios.patch(`${server}/post/comment/take`, null, {
          params: {
              commentid,
              userid,
              take
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error toggling take comment:', error);
      throw error;
  }
};

// 유저 프로필 수정
export const userPofilePatchAPI = async(data) =>{
  try {
    const userid = 1; // 디버그용

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
    const userid = 1; // 디버그용

    const response = await axios.get(`${server}/user/info?userid=${userid}`);
    return response;
  } catch (err) {
    console.error(err);
    throw err ;
  }
}

// 선택된 지역 게시물 중 최신순으로 나열 
export const recentRegionPostGetAPI =async (gerPathRegion) =>{
  try{
    const response = await axios.get(`${server}/post/read/by-local${gerPathRegion}`);
    return response;
  } 
  catch(err){
    console.error(err);
  }
}

// 선택된 지역 게시물 중 인기순으로 나열 
export const popularRegionPostGetAPI =async (gerPathRegion) =>{
  try{
    const response = await axios.get(`${server}/post/read/by-local/by-up-count${gerPathRegion}`);
    return response;
  }
  catch(err){
    console.error(err);
  }
}

//게시물 채택
export const checkPostPostAPI =async (postId) =>{
  try{

    const userid =1; //디버그용

    const response = await axios.post(`${server}/post/increase/UpCount?postId=${postId}&userId=${userid}`);
    return response;
  }
  catch(err){
    console.error(err);
  }
}

//게시물 채택 삭제
export const checkPostDeleteAPI =async (postId) =>{
  try{

    const userid =1; //디버그용

    const response = await axios.post(`${server}/post/decrease/UpCount?postId=${postId}&userId=${userid}`);
    return response;
  }
  catch(err){
    console.error(err);
  }
}