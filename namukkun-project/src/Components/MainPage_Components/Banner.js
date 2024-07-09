import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from '../../Assets/Style/theme';

function Banner() {
    return (
        <>
            <GlobalStyle/>
            <Container>
                <WhiteduckContainer>
                    <WhiteduckImg src={blueduck} />
                </WhiteduckContainer>
                <BannerTextContainer>
                    <LineTextContainer>
                        <BannerText>나의{' '}<BannerText $color='#005AFF'>한마디</BannerText><BannerText>가 만드는</BannerText></BannerText>
                    </LineTextContainer>
                    <LineTextContainer>
                        <BannerText>우리 지역</BannerText><BannerText>의 변화</BannerText>
                    </LineTextContainer>
                </BannerTextContainer>
                <BlueduckContainer>
                    <BlueduckImg src={whiteduck} />
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
    height: 559px;
    width: 621px;
    align-items: flex-start
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
    width: 600px;
    height: 529px;
`;

const BannerText = styled.span`
    color: ${(props) => props.$color || '#191919'};
    font-size: 60px;
    font-style: normal;
    font-family: 'UhBeeJJIBBABBA';
    font-weight: 400;
    line-height: 70.89px;
    letter-spacing: -1.84px;
    white-space: nowrap;

`;
