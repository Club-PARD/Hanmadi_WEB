import React, { useState } from "react";
import styled from "styled-components";
import ListregionSelect from "../Components/List_Components/ListregionSelect";
import SelectRegion from "../Components/SelectRegion_Components/SelectRegion";
import Header from "../Components/Layout_Components/Header";

function RegionPage(){

  return(
    <div>
      <Header/>
      <SelectRegion/>
    </div>
  );
}

export default RegionPage;
