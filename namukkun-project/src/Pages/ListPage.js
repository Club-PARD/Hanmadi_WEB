import React from "react";
import styled from "styled-components";
import ListSelectRegion from "../Components/List_Components/ListSelectRegion";
import Header from "../Components/Layout_Components/Header";
import PopularPost from "../Components/List_Components/PopularPost";
import NewPost from "../Components/List_Components/NewPost";
import { GlobalStyle } from '../Assets/Style/theme';

function ListPage() {
  return (
    <Div>
      <GlobalStyle/>
      <Header />
      <ListSelectRegion />
      <PopularPost />
      <NewPost />
      <FixedButtonContainer>
        <FixedButton>
          ✏️ 전체글 모아보기
        </FixedButton>
        <FixedButton>
          🌟 인기글 모아보기
        </FixedButton>
      </FixedButtonContainer>
    </Div>
  );
}

const Div = styled.div`
  justify-content: center;
`;

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
  &:hover{
    background: rgba(0, 90, 255, 0.06);
  }
`

export default ListPage;
