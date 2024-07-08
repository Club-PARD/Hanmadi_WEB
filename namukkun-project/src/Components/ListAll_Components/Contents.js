import React, { useState } from "react";
import styled from "styled-components";
import imgcontent from '../../Assets/Img/imgcontent.svg';
import Bigdefault from '../../Assets/Img/Bigdefault.svg';
import sendbrave from '../../Assets/Img/sendbrave.svg';
import onclicksendbrave from '../../Assets/Img/onclicksendbrave.svg';
import hoversendbrave from '../../Assets/Img/hoversendbrave.svg';
import { loginTestState } from "../../Recoil/Atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

function Contents({ content, isClicked, onClick }) {
  const navigate = useNavigate();

  // 글자 컷 함수
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  //서버에서 받은 날짜 형태 변경
  const formatDateString = (dateString) => {
    return dateString.replace(/-/g, '.');
  };

  // 이미지 링크 추출 함수
  const extractImageLink = (postData) => {
    const fields = ['proBackground', 'solution', 'benefit'];
    
    for (let field of fields) {
      const value = postData[field];
      if (value) { 
        const match = value.match(/\[이미지:\s*(https?:\/\/[^\s\]]+)\]/);
        if (match) {
          return match[1];
        }
      }
    }
    
    return Bigdefault;
  };

  //상세페이지로 이동
  const navigateToPost = (postId) => {
    navigate(`/postit/${postId}`);
  };

  return (
    <Div>
      <PostImg src={extractImageLink(content)} alt="게시글 이미지" /> {/* 이미지 placeholder */}
      <ContentsDiv >
        <TitleDiv onClick={()=>navigateToPost(content.postId)}>{truncateText(content.title, 23)}</TitleDiv> 
        <KeyValueWrapper>
          <KeyValueDiv>
            <KeyTextDiv>작성자</KeyTextDiv> 
            <KeyTextDiv>공감수</KeyTextDiv> 
            <KeyTextDiv>응원 한마디</KeyTextDiv> 
            <KeyTextDiv>작성일자</KeyTextDiv> 
          </KeyValueDiv>
          <KeyValueDiv style={{marginLeft:"16px"}}>
            <ValueTextDiv>{content.userName}</ValueTextDiv> 
            <ValueTextDiv>{content.upCountPost}</ValueTextDiv>
            <ValueTextDiv>{content.comments.length}</ValueTextDiv> 
            <ValueTextDiv>{formatDateString(content.postTime)}</ValueTextDiv>
          </KeyValueDiv>
        </KeyValueWrapper>
      </ContentsDiv>
      <SendBraveButton
        onClick={onClick} // 버튼 클릭 이벤트 처리
        isClicked={isClicked} // 버튼 클릭 상태 전달
      >
        <img src={isClicked ? onclicksendbrave : sendbrave} alt="send brave" /> {/* 클릭 상태에 따라 이미지 변경 */}
      </SendBraveButton>
    </Div>
  );
}

const Div = styled.div`
  width: 935px;
  display: flex;
  height: 187px;
  border-bottom: 1px solid #DEDEDE;
`;

const PostImg =styled.img`
  width: 234px;
  height: 160px;
  margin-right: 23px;
`;

const ContentsDiv =styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleDiv =styled.button`
  display: flex;
  width: 539px;
  height: 27px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: #191919;
  font-family: "Min Sans";
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 115.385% */
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;

  &:hover{
    color: #005AFF;
  }
`;

const KeyValueWrapper =styled.div`
  display: flex;
  margin-top: 15px;
`;

const KeyValueDiv =styled.div`
  display: flex;
  flex-direction: column;
  gap:10px;
`;

const KeyTextDiv =styled.div`
  color: #9D9D9D;
  font-family: "Min Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
`;

const ValueTextDiv =styled.div`
  color: #5A5A5A;
  font-family: "Min Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

// send brave 버튼 스타일링을 위한 스타일드 컴포넌트
const SendBraveButton = styled.button`
  width: 134px;
  height: 134px;
  border: none;
  background: transparent;
  cursor: pointer;

  // 버튼이 클릭되지 않았을 때 hover 시 이미지를 변경
  &:hover img {
    ${({ isClicked }) => !isClicked && `content: url(${hoversendbrave});`}
  }
`;

export default Contents;
