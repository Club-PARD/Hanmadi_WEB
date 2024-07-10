import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { pagenation, regionNav, stateListCategory, userinfo } from "../../Recoil/Atom";
import { recentRegionPostGetAPI } from "../../API/AxiosAPI";

function FixList() {
  const navigate = useNavigate();
  const [chagnePage, setChagnePage] = useRecoilState(stateListCategory);
  const [currentPage, setCurrentPage] = useRecoilState(pagenation);
  const [selectedCategory, setSelectedCategory] = useState(null);
  //유저 기본 정보 아톰에 저장
  const [userData, setUserData] = useRecoilState(userinfo);
  const [regionselect, setRegionSelect] = useRecoilState(regionNav);

  const onClickListMenu = (category) => {
    setChagnePage(category);
    setSelectedCategory(category);

    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤링 효과
    });
    setCurrentPage(1);

    if (category === 'recent') {
      navigate(`/listall?localPageId=${regionselect}`);
      // recentRegionPostGetAPI('?localPageId=' + userData.local);
    } else if (category === 'popular') {
      navigate(`/list?localPageId=${regionselect}`);
    }
  }

  return (
    <FixedButtonContainer>
      <FixedButton
        onClick={() => onClickListMenu('recent')}
        isSelected={selectedCategory === 'recent'}
      >
        ✏️ 전체글 모아보기
      </FixedButton>
      <FixedButton
        onClick={() => onClickListMenu('popular')}
        isSelected={selectedCategory === 'popular'}
      >
        🌟 인기글 모아보기
      </FixedButton>
    </FixedButtonContainer>
  );
}

const FixedButtonContainer = styled.div`
  width: 180px;
  position: fixed;
  left: 60px;
  top: 448px;
  background-color: rgba(0, 90, 255, 0.06);
  padding: 16px 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  gap: 13px;
  z-index: 1000; /* 가장 앞으로 오도록 설정 */
`;

const FixedButton = styled.button`
  width: 145px;
  height: 30px;
  align-items: center;
  border: none;
  background: ${({ isSelected }) => (isSelected ? 'rgba(0, 90, 255, 0.06)' : 'transparent')};
  border-radius: 5px;
  font-family: "Min Sans";
  font-size: 18px;
  white-space: nowrap;
  color: #4B6FB2;
  cursor: pointer;
  &:hover {
    background: rgba(0, 90, 255, 0.06);
  }
`;

export default FixList;
