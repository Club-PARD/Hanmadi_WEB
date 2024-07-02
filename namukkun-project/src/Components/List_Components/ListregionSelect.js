import React from "react";
import styled from "styled-components";
import ListBanner from "../../Assets/Img/ListBanner.svg";

function ListregionSelect(){

  return(
    <Div>
      <BannerImgDiv src={ListBanner}></BannerImgDiv>
    </Div>
  );
}

const Div =styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  
`;

const BannerImgDiv = styled.img`
  height: 301px;
  flex-shrink: 0;
`;

export default ListregionSelect;