import { atom } from "recoil";

//recoil Atom 관리 파일

//listall / lista 이동을 위함
export const stateListCategory = atom({
  key : 'stateListCategory',
  default: "recent"
});

//페이지네이션 이동
export const pagenation = atom({
  key : 'pagenation',
  default: 1
});

export const fileState = atom({
  key: 'fileState',
  default: [],
});