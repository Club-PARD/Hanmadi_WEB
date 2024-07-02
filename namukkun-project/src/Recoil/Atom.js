import { atom } from "recoil";

//recoil Atom 관리 파일

export const myCode = atom({
    key : 'myCode',
    default:
    {   
      code: ""
    }
});