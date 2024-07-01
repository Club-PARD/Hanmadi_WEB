import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import imgcontent from '../../Assets/Img/imgcontent.svg';

function IdeaPage() {
    return (
        <Container>
            <GlobalStyle/>
            <ContentContainer>
                <TextContainer>
                    <LineTextContainer>
                        <Dot></Dot><TopicText>인기있는 제안</TopicText>
                    </LineTextContainer>
                    <LineTextContainer>
                        <TitleText>이거...좋은 의견인데?</TitleText>
                    </LineTextContainer>
                </TextContainer>
                <TwoContentContainer>
                    <ImageContentContainer>
                    <img src={imgcontent} alt="content image" style={{ width: '515px' }} />
                        <ContentTitleText>
                            포항시 생태공원조성 사업 제안합니다.
                        </ContentTitleText>
                        <DetailContainer>
                            <DetailText>작성자</DetailText>
                            <DetailText Color="#5A5A5A">김**님</DetailText>
                        </DetailContainer>
                        <DetailContainer>
                            <DetailText>종료일</DetailText>
                            <DetailText Color="#5A5A5A">D-1</DetailText>
                        </DetailContainer>
                        <DetailContainer>
                            <DetailText>공감수</DetailText>
                            <DetailText Color="#5A5A5A">143</DetailText>
                        </DetailContainer>
                        <BraveButton>용기 보내기</BraveButton>
                    </ImageContentContainer>

                    <ImageContentContainer>
                    <img src={imgcontent} alt="content image" style={{ width: '515px' }} />
                        <ContentTitleText>
                            포항시 생태공원조성 사업 제안합니다.
                        </ContentTitleText>
                        <DetailContainer>
                            <DetailText>작성자</DetailText>
                            <DetailText Color="#5A5A5A">김**님</DetailText>
                        </DetailContainer>
                        <DetailContainer>
                            <DetailText>종료일</DetailText>
                            <DetailText Color="#5A5A5A">D-1</DetailText>
                        </DetailContainer>
                        <DetailContainer>
                            <DetailText>공감수</DetailText>
                            <DetailText Color="#5A5A5A">143</DetailText>
                        </DetailContainer>
                        <BraveButton>용기 보내기</BraveButton>
                    </ImageContentContainer>

                </TwoContentContainer>
            </ContentContainer>
        </Container>
    );
}

export default IdeaPage;

const Container = styled.div`
    width: 100%;
    height: 800px;
    display: flex;
    justify-content: center;
    background-color: white;
`;

const ContentContainer = styled.div`
    width: 70%;
    height: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
`;

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction:column;
    padding-bottom: 50px;
`;

const LineTextContainer = styled.div`
    display: flex;
    align-items: center;
`;

const TopicText = styled.span`
    color: #005AFF;
    font-family: "Min Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    margin-bottom: 10px;
`;

const Dot = styled.span`
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background-color: #005AFF;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 13px;
`;

const TitleText = styled.div`
    color: #191919;
    font-family: "Min Sans";
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
`;

const ContentTitleText = styled.div`
    color: #191919;
    font-family: "Min Sans";
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    padding-top: 28px;
    padding-bottom: 30px;
`;

const DetailText = styled.span`
    color: ${(props) => props.Color || '#9D9D9D'};
    font-family: "Min Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    padding-right:34px;
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-bottom: 18px;
`;

const TwoContentContainer = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: row;
    color: white;
`;

const BraveButton = styled.div`
    display: flex;
    width: 100%;
    height: 57px;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: #005AFF;
    align-self: stretch;
    font-family: 'UhBeeJJIBBABBA';
`
const ImageContentContainer = styled.div`
    width: 515px;
    padding-right: 200px;
`;
