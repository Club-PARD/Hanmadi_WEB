import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import defaultblue from '../../Assets/Img/defaultblue.svg';
import bottomimgwd from '../../Assets/Img/bottomimgwd.svg';
import bottomimgbd from '../../Assets/Img/bottomimgbd.svg';
import { useEffect, useState } from 'react';
import { allPostsGetAPI } from '../../API/AxiosAPI';
import { useNavigate } from 'react-router-dom';

//하단 부분
function GreatIdeaPage() {

    const [allPosts, setAllPosts] =useState([]);
    const navigate = useNavigate();

    const allPostsFunc = async () =>{
        const response = await allPostsGetAPI();
        if (response.data.length>99){
            setAllPosts(response.data[0]);
        }
        else{
            setAllPosts(response.data);    
        }
        console.log('포스트 내놔', response.data);
    }

    useEffect(()=>{
        allPostsFunc();
        console.log('메인페이지 하단' , allPosts);
    },[])

    // 글자 컷 함수
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
        }
        return text;
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
        
        return defaultblue;
    };

    //상세페이지로 이동
    const navigateToPost = (postId) => {
        navigate(`/postit/${postId}`);
    };


    return (
        <Container>
            <GlobalStyle/>
            <GreatContentContainer>
                <TextContainer>
                    <LineTextContainer>
                        <TopicText>지역 한마디</TopicText>
                    </LineTextContainer>
                    <LineTextContainer>
                        <TitleText>다른 지역의 한마디도 함께</TitleText>
                    </LineTextContainer>
                </TextContainer>
                {allPosts.length > 0&& allPosts.slice(0, 2).map((content, index) => (
                    <ContentImageContainer key={index}>
                    <ContentTextContainer>
                        <ContentTitleText onClick={()=>navigateToPost(content.postId)}>{truncateText(content.title,25)}</ContentTitleText>
                        <DetailContainer>
                        <DetailText>작성자</DetailText>
                        <DetailText $color="#5A5A5A">{content.userName}</DetailText>
                        </DetailContainer>
                        <DetailContainer>
                        <DetailText>추천수</DetailText>
                        <DetailText $color="#5A5A5A">{content.upCountPost}</DetailText>
                        </DetailContainer>
                        <DetailContainer>
                        <DetailText $paddingright='16px'>응원 한마디</DetailText>
                        <DetailText $color="#5A5A5A">{content.comments.length}</DetailText>
                        </DetailContainer>
                    </ContentTextContainer>
                    <ImageContainer>
                        <img src={extractImageLink(content)} alt="content image" style={{ width: '234px' }}/>
                    </ImageContainer>
                    </ContentImageContainer>
                ))}
            </GreatContentContainer>
            <DuckContainer>
                <BottomBlueDuck>
                    <img src={bottomimgbd} alt="bottomimg" />
                </BottomBlueDuck>
                <BottomWhiteDuck>
                    <img src={bottomimgwd} alt="bottomimg" />
                </BottomWhiteDuck>
            </DuckContainer>
        </Container>
    );
}

export default GreatIdeaPage;

const Container = styled.div`
    margin-top: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: transparent;
    position: relative;
`;

const GreatContentContainer = styled.div`
    width: 1130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: transparent;
    position: relative;
    z-index: 2;
`;

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
`;

const LineTextContainer = styled.div`
    display: flex;
    align-items: center;
    background: transparent;
`;

const TopicText = styled.span`
    color: #005AFF;
    font-family: 'MinSans-Regular';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    margin-bottom: 10px;
`;

const TitleText = styled.div`
    color: #191919;
    font-family: 'MinSans-Regular';
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    background: transparent;
`;

const ContentImageContainer = styled.div`
    width: 100%;
    height: 210px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    border-bottom: 1px solid #DEDEDE;
    background: transparent;
    &:hover{
        cursor: pointer; 
    }
`;

const DetailText = styled.span`
    color: ${(props) => props.$color || '#9D9D9D'};
    font-family: 'MinSans-Regular';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    padding-right: ${(props) => props.$paddingright || '55px'};
    background: transparent;
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-bottom: 11px;
    background: transparent;
`;

const ContentTitleText = styled.div`
    color: #191919;
    font-family: 'MinSans-Regular';
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    padding-bottom: 18px;
    background: transparent;
    &:hover{
        color: #005AFF; 
        cursor: pointer; 
    }
`;

const ContentTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: transparent;
`;

const ImageContainer = styled.div`
    height: 210px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: transparent;
`;

const BottomBlueDuck = styled.div`
    background: transparent;
`;

const BottomWhiteDuck = styled.div`
    margin-right: 28px;
    background: transparent;
`;

const DuckContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    position: absolute;
    top: calc(100%);  
    z-index: 1;
    background: transparent;
`;
