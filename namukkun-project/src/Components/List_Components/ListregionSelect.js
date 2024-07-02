import React from "react";
import styled from "styled-components";
import ListBanner from "../../Assets/Img/ListBanner.svg";

//제안게시판 컴포넌트
function ListregionSelect(){

  return(
    <Div>
      <BannerImgDiv src={ListBanner}></BannerImgDiv>
      <ListRegionSelectDiv>
        <RegionTitle>지역 선택하기</RegionTitle>
        <RegionSubText>의견만 있다면, 어느 지역이든 한마디 남겨주세요!</RegionSubText>
      </ListRegionSelectDiv>
    </Div>
  );
}

const Div =styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  
`;

const BannerImgDiv = styled.img`
  height: 301px;
  flex-shrink: 0;
`;

const ListRegionSelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 359px;
  background: #FAFAFA;
`;

const RegionTitle =styled.div`
  color: #005AFF;
  font-family: "Min Sans";
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 100% */
`;

const RegionSubText =styled.div`
  color: #191919;
  font-family: "Min Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 166.667% */
`;

export default ListregionSelect;