import React, { useState } from "react";
import styled from "styled-components";
import ListregionSelect from "../Components/List_Components/ListregionSelect";

function ListPage(){

  return(
    <Div>
      <ListregionSelect/>
    </Div>
  );
}

const Div =styled.div`
  justify-content: center;
`

export default ListPage;
