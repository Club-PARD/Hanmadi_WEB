import React, { useState } from "react";
import styled from "styled-components";
import ListSelectRegion from "../Components/List_Components/ListSelectRegion";
import Header from "../Components/Layout_Components/Header"
import PopularPost from "../Components/List_Components/PopularPost";
import NewPost from '../Components/List_Components/NewPost';

function ListPage(){

  return(
    <Div>
      <Header/>
      <ListSelectRegion/>
      <PopularPost/>
      <NewPost/>
    </Div>
  );
}

const Div =styled.div`
  justify-content: center;
`

export default ListPage;
