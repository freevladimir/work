import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/game.css"
export default class SimpleSlider extends React.Component{
    render (){
        const setting ={
            centerMode: true,
            slidesToShow: 1,
            dots: false,
            autoplay: false
        }
        return(
            <div className="slider">
                    <Slider {...setting}>

                            <a href="#" className="item">
                                <p>1 $</p>
                            </a>
                            <a href="#" className="item">
                                <p>2 $</p>
                            </a>
                            <a href="#" className="item">
                                <p>5 $</p>
                            </a>
                            <a href="#" className="item">
                                <p>15 $</p>
                            </a>
                            <a href="#" className="item">
                                <p>30 $</p>
                            </a>
                            <a href="#" className="item">
                                <p>50 $</p>
                            </a>
                            <a href="#" className="item">
                                <p>100 $</p>
                            </a>
                            <a href="#" className="item">
                                <p>300 $</p>
                            </a>
                            <a href="#" className="item">
                                <p>500 $</p>
                            </a>
                            <a href="#" className="item">
                                <p>1000 $</p>
                            </a>
                    </Slider>
            </div>

        )
    }
}
