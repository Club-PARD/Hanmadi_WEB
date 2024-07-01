import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Components/Layout_Components/Header";
import SelectRegions from "../Components/SelectRegion_Components/SelectRegions";

function RegionPage(){

  return(
    <div>
      <Header/>
      <SelectRegions/>
    </div>
  );
}

export default RegionPage;
