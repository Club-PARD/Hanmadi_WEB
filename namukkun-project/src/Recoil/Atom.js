import { atom } from "recoil";

//recoil Atom 관리 파일

//추천순/최신순 이동할 때 값 전달을 위함
export const stateListCategory = atom({
  key : 'stateListCategory',
  default: "recent"
});