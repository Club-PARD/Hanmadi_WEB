import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider1 from "../../Assets/Img/Slider1.svg";
import Slider2 from "../../Assets/Img/Slider2.svg";
import Slider3 from "../../Assets/Img/Slider3.svg";
import Slider4 from "../../Assets/Img/Slider4.svg";
import Slider5 from "../../Assets/Img/Slider5.svg";
import Slider6 from "../../Assets/Img/Slider6.svg";

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
    <div>
      <Slider {...settings}>
        <div>
          <img src={Slider1} alt='Slider1' />
        </div>
        <div>
          <img src={Slider2} alt='Slider2' />
        </div>
        <div>
          <img src={Slider3} alt='Slider3' />
        </div>
        <div>
          <img src={Slider4} alt='Slider4' />
        </div>
        <div>
          <img src={Slider5} alt='Slider5' />
        </div>
        <div>
          <img src={Slider6} alt='Slider6' />
        </div>
      </Slider>
    </div>
  );
};

export default Slick;