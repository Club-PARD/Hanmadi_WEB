import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider1 from "../../Assets/Img/Slider1.png";
import Slider2 from "../../Assets/Img/Slider2.svg";
import Slider3 from "../../Assets/Img/Slider3.svg";
import Slider4 from "../../Assets/Img/Slider4.png";
import styled from 'styled-components';

const Slick = () => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <SlickContainer>
      <Slider {...settings}>
        <SlickSlide>
          <img src={Slider1} alt='Slider1' />
        </SlickSlide>
        <SlickSlide>
          <img src={Slider2} alt='Slider2' />
        </SlickSlide>
        <SlickSlide>
          <img src={Slider3} alt='Slider3' />
        </SlickSlide>
        <SlickSlide>
          <img src={Slider4} alt='Slider4' />
        </SlickSlide>
      </Slider>
    </SlickContainer>
  );
};

export default Slick;

const SlickContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden; /* 슬라이드 영역에서 스크롤 방지 */
`;

const SlickSlide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 슬라이드 영역에서 스크롤 방지 */

  img {
    width: 100%;
    height: auto;
  }
`;
