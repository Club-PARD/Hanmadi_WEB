import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { pagenation, stateListCategory } from "../../Recoil/Atom";

function FixList(){
  const navigate = useNavigate();
  const [chagnePage, setChagnePage] = useRecoilState(stateListCategory);
  const [currentPage, setCurrentPage] =useRecoilState(pagenation);

  const onClcikListMenu = (category)=>{
    setChagnePage(category);

    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤링 효과
    });
    setCurrentPage(1);

    if(category ==='recent'){
      navigate('/listall');
    }
    else if('popular'){
      navigate('/list');
    }
  }

  return(
    <FixedButtonContainer>
      <FixedButton onClick={()=>onClcikListMenu('recent')}>
        ✏️ 전체글 모아보기
      </FixedButton>
      <FixedButton onClick={()=>onClcikListMenu('popular')}>
        🌟 인기글 모아보기
      </FixedButton>
  </FixedButtonContainer>
  );
}

const FixedButtonContainer = styled.div`
  position: fixed;
  left: 60px;
  top: 448px;
  background-color: rgba(0, 90, 255, 0.06);
  padding: 19px 7.5px 19px 8.5px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  gap: 13px;
  z-index: 1000; /* 가장 앞으로 오도록 설정 */
`;

const FixedButton = styled.button`
  width: 129px;
  height: 30px;
  align-items: center;
  border: none;
  background: transparent;
  border-radius: 5px;
  font-family: "Min Sans";
  font-size: 14px;
  color: #4B6FB2;
  cursor: pointer;
  &:hover{
    background: rgba(0, 90, 255, 0.06);
  }
`

export default FixList;
