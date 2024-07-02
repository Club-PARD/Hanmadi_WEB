import styled, { createGlobalStyle } from 'styled-components';
import blueduck from '/Users/ion-yu/Desktop/나무꾼/Jigaesa_WEB/namukkun-project/src/Assets/Img/blueduck.svg';
import whiteduck from '/Users/ion-yu/Desktop/나무꾼/Jigaesa_WEB/namukkun-project/src/Assets/Img/whiteduck.svg';

import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from '../../Assets/Style/theme';

function Banner() {
    return (
        <>
            <GlobalStyle/>
            <Container>
                <WhiteduckContainer>
                    <WhiteduckImg src={whiteduck} />
                </WhiteduckContainer>
                <BannerTextContainer>
                    <LineTextContainer>
                        <BannerText>나의 용기낸{' '}<BannerText $color='blue'>한마디</BannerText><BannerText>가</BannerText></BannerText>
                    </LineTextContainer>
                    <LineTextContainer>
                        <BannerText $color='blue'>우리 지역</BannerText><BannerText>의 변화를,</BannerText>
                    </LineTextContainer>
                </BannerTextContainer>
                <BlueduckContainer>
                    <BlueduckImg src={blueduck} />
                </BlueduckContainer>
            </Container>
        </>
    );
}

export default Banner;

const Container = styled.div`
    width: 100%;
    height: 818px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(50% 50% at 50% 50%, #FFF 0%, #EAEAEA 100%);
    overflow: hidden; /* Add this line */
`;

const WhiteduckContainer = styled.div`
    width: 33%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
    margin: 0;
`;

const WhiteduckImg = styled.img`
    height: 489.595px;
    margin-right: 400px;
`;

const BannerTextContainer = styled.div`
    width: 33%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center; /* 텍스트 세로 가운데 정렬을 위해 */
`;

const LineTextContainer = styled.div`
    justify-content: center;
`;

const BlueduckContainer = styled.div`
    width: 33%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
`;

const BlueduckImg = styled.img`
    height: 652px; /* 비율 유지를 위해 */
    margin-left: 300px; 
`;

const BannerText = styled.span`
    color: ${(props) => props.$color || '#191919'};
    font-size: 46px;
    font-style: normal;
    font-family: 'UhBeeJJIBBABBA';
    font-weight: 400;
    line-height: 70.89px;
    letter-spacing: -1.84px;
`;
