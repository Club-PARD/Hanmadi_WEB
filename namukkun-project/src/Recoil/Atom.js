import { atom } from "recoil";

// recoil Atom 관리 파일

// listall / list 이동을 위함
export const stateListCategory = atom({
  key: 'stateListCategory',
  default: "recent"
});

// 페이지네이션 이동
export const pagenation = atom({
  key: 'pagenation',
  default: 1
});

export const fileState = atom({
  key: 'fileState',
  default: [],
});

// 로그인 테스트 
export const loginTestState = atom({
  key: 'loginTestState',
  default: false,
});

// 서버에서 가져온 유저 정보 로컬스토리지에 저장
export const userinfo = atom({
  key : 'userinfo',
  default:
    {
      nickName: "",
      local: 0,
      profileImage: "",
      postUpList: [
      ],
      commentUpList: [
      ]
    },

  effects: [
    ({ setSelf, onSet }) => {
      const saveSessionData = localStorage.getItem("userData");
      if (saveSessionData) {
        setSelf(JSON.parse(saveSessionData));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem("userData")
          : localStorage.setItem("userData", JSON.stringify(newValue));
      });
    }
  ]
});

//포스트 좋아요 버튼 상태
export const postLikeBtn = atom({
  key: 'postLikeBtn',
  default: {},
});


//인기글 포스트 get
export const getPopularRegion = atom({
  key: 'getPopularRegion',
  default: [],
});

//최신글 포스트 get
export const getRecentRegion = atom({
  key: 'getRecentRegion',
  default: [],
});
// 임시 저장 게시물 상태
export const tempPostState = atom({
  key: 'tempPostState',
  default: null,
});

// 유저 게시물 상태
export const userPostsState = atom({
  key: 'userPostsState',
  default: [],
});

//유저 게시물 삭제시 변화감지
export const deleteCheck = atom({
  key: 'deleteCheck',
  default: false,
});

//지역 선택
export const regionNav = atom({
  key: 'regionNav',
  default: 0
});