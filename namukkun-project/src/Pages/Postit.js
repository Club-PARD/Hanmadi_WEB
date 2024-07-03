import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Components/Layout_Components/Header";
import DetailContent from "../Components/Postit_Components/DetailContent";

function Postit(){

    return(
    <div>
        {/* <Header/> */}
        <Container>
        <PostitSectionContainer>
            <PostitSection/>
        </PostitSectionContainer>
        <DetailContent/>
        <PostitSectionContainer>
            <PostitSection/>
        </PostitSectionContainer>
        </Container>
        
    </div>
    );
}

export default Postit;

const Container = styled.div`
    display: flex;
    flex-direction: row;
`

const PostitSectionContainer = styled.div`
    width: 378px;
    height: 2940.89px;
    display: flex;
    align-items: flex-end;
`
const PostitSection = styled.div`
    width: 378px;
    height: 2885px;
    background: #F8F8F8;
`
