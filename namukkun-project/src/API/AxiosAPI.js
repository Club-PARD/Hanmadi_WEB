import axios from "axios";

const kakaoserver = process.env.REACT_APP_KAKAO_SERVER;
const server = process.env.REACT_APP_SERVER;

// const post = process.env.REACT_APP_SERVER4;

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

    const response = await axios.post(`${server}/post/upload/img`, formData, {
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

    const response = await axios.post(`${server}/post/upload/file`, formData, {
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
    const response = await axios.post(`${server}/post/upload/post`, postData, {
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
    const response = await axios.post(`${server}/post/upload/temppost`, postData, {
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
    const response = await axios.post(`${server}/post/delete/file?fileName=${encodeURIComponent(fileName)}`, null, {
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

//댓글 부분

// comment 읽어오기
export const fetchComments = async (postId) => {
    try {
        const response = await axios.get(`${server}/post/comment?postid=${postId}`);
        console.log('get comment', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

// comment 삭제
export const deleteComment = async (userid, commentid) => {
  try {
    const response = await axios.delete(`${server}/post/comment`, {
      params: {
        userid: userid,
        commentid: commentid
      }
    });
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

// comment 생성
export const createComment = async (postid, userid, content) => {
  try {
      console.log('Creating comment with:', { postid, userid, content }); // 요청 데이터 로그
      const response = await axios.post(`${server}/post/comment`, { userId: userid, content: content }, {
          params: {
              postid,
              userid
          }
      });
      // 상태 코드와 전체 응답 출력
      console.log('Response status:', response.status);
      console.log('Full response:', response);

      // 응답 데이터 로그
      if (response.data) {
          console.log('Response data:', response.data);
      } else {
          console.log('No data in response.');
      }

      // 생성된 댓글의 content 로그 출력
      if (response.data && response.data.content) {
          console.log('Created comment content:', response.data.content);
      } else {
          console.log('No content found in the created comment.');
      }

      return response.data;
  } catch (error) {
      console.error('Error creating comment:', error);
      if (error.response) {
          // 서버 응답이 있으면 상태 코드와 응답 데이터 출력
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
      }
      throw error;
  }
};


// comment 좋아요
export const toggleLikeComment = async (commentid, userid, up) => {
  try {
    const response = await axios.patch(`${server}/post/comment/up`, null, {
      params: {
        commentid,
        userid,
        up
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error toggling like comment:', error);
    throw error;
  }
};

export const getUserInfo = async (userid) => {
  try {
    const response = await axios.get(`${server}/user/info`, {
      params: {
        userid
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};


//comment 채택
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
      console.log(`get comment: ${commentid}, ${userid}, ${take}`);
      return response.data;
  } catch (error) {
      console.error('Error toggling take comment:', error);
      throw error;
  }
};

// 포스티잇 부분

// 포스티잇 읽어오기
export const fetchPostits = async (postId) => {
  try {
    const response = await axios.get(`${server}/post/postit/read`, {
      params: {
        postid: postId
      }
    });
    console.log('postit data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postits:', error);
    throw error;
  }
};

// 포스티잇 생성
export const createPostit = async (dto, userId) => {
  console.log('DTO being sent:', dto); // DTO를 로그로 출력
  try {
    const response = await axios.post(`${server}/post/postit/create`, dto, {
      params: {
        userid: userId
      },
      headers: {
        'Content-Type': 'application/json' // 요청 헤더에 Content-Type 추가
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating postit:', error);
    throw error;
  }
};

// 포스티잇 삭제 함수 추가
export const deletePostit = async (userId, postitId) => {
  try {
      console.log(`Deleting postit with userId: ${userId}, postitId: ${postitId}`);
      const response = await axios.delete(`${server}/post/postit/delete`, {
          params: {
              userid: userId,
              postitid: postitId
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error deleting postit:', error);
      throw error;
  }
};

// 포스티잇 위치 이동
export const movePostit = async (userId, postitData) => {
  console.log(`Move Postit: ${userId}, ${JSON.stringify(postitData)}`);
  try {
      const response = await axios.patch(`${server}/post/postit/move`, postitData, {
          params: {
              userid: userId
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error moving postit:', error);
      throw error;
  }
};

//postit section이동
export const movePostitSection = async (userId, postitId, section) => {
  console.log(`Move Postit Section: ${userId}, ${postitId}, ${section}`);
  try {
      const response = await axios.patch(`${server}/post/postit/sectionmove`, null, {
          params: {
              userid: userId,
              postitid: postitId,
              section: section
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error moving postit section:', error);
      throw error;
  }
};

//유저

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

// 유저 프로필 이미지 수정
export const userPofileImagePatchAPI = async(data) =>{
  try {
    const userid = 1; // 디버그용

    const response = await axios.patch(`${server}/user/update/profile?profileImage=${data}&userId=${userid}`);
    return response;
  } catch (err) {
    console.error(err);
    throw err ;
  }
}

// 유저 정보 가져오기
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

//모든 게시물 추천순
export const allPostsRecommendGetAPI =async () =>{
  try{

    const response = await axios.get(`${server}/post/read/by-Upcount`);
    return response;
  }
  catch(err){
    console.error(err);
  }
}

//모든 게시물
export const allPostsGetAPI =async () =>{
  try{
    const response = await axios.get(`${server}/post/read/all`);
    return response;
  }
  catch(err){
    console.error(err);
  }
}

//마이페이지

// 마이페이지 유저 정보 가져오기
export const getUserAllInfoAPI = async() => {
  try {
    const userid = 1; // 디버그용

    const response = await axios.get(`${server}/user/info/all?userid=${userid}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching all user info:', err);
    throw err;
  }
}

// 마이페이지 포스트 삭제
export const deletePostAPI = async(postId) => {
  try {
    const response = await axios.delete(`${server}/post/delete?postId=${postId}`);
    return response.data;
  } catch (err) {
    console.error( err);
  }
}

