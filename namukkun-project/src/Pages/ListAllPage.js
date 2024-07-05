import React from "react";
import styled from "styled-components";
import ListSelectRegion from "../Components/List_Components/ListSelectRegion";
import { GlobalStyle } from '../Assets/Style/theme';
import ShowList from "../Components/ListAll_Components/ShowList";
import FixList from "../Components/Layout_Components/FixList";
function ListAllPage() {
  return (
    <Div>
      <GlobalStyle/>
      <ListSelectRegion path='listall'/>
        <FixList/>
      <ShowList/>
    </Div>
  );
}

const Div = styled.div`
  justify-content: center;
  
`;

export default ListAllPage;
