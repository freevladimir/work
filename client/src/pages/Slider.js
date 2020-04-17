import React, {useContext, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/game.css";
import { AppStoreContext } from "../App";


const SimpleSlider = () => {
  const store = useContext(AppStoreContext)

  const arrayOfSlides = [
    { value: "1 $" },
    { value: "2 $" },
    { value: "5 $" },
    { value: "15 $" },
    { value: "30 $" },
    { value: "50 $" },
    { value: "100 $" },
    { value: "300 $" },
    { value: "500 $" },
    { value: "1000 $" },
  ];

  const setting = {
    centerMode: true,
    slidesToShow: 1,
    dots: false,
    autoplay: false,
    beforeChange: (oldInd, newInd) => {
      store.contractChange(newInd)
      console.group('slider current value')
      console.log(store.contractIndex, arrayOfSlides[store.contractIndex].value)
      console.groupEnd()
    },
  };

  return (
    <div className="slider">
      <Slider {...setting}>
        {arrayOfSlides.map((item, index) => (
          <a href="#" className="item">
            <p>{item.value}</p>
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
