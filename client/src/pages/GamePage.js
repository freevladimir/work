import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import {AuthContext} from "../context/AuthContext"
import '../css/game.css'
import {data} from './LoginPage'
import load from 'little-loader'
import $ from 'jquery'
import {useAuth} from "../hooks/auth.hook";
// load('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js', function(err){
//     load('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', function(err){
//         $(".slider").slick({
//             centerMode: true,
//             slidesToShow: 2,
//             dots: false,
//             autoplay: false,
//         });
//     })
// })
//

console.log('Data on gamePage', data);
export const GamePage = ()=>{
    // const User = require('../models/User')
    // const {userId} = useAuth()
    // const userName = User.findOne({id: userId})
    return(
        <div className="row game">
            <video id="videoBG" poster={require("../img/bg.png")} autoPlay muted loop>
                <source src={require("../img/background.mp4")} type="video/mp4"/>
            </video>

            <section>
                <div className="container">
                    <div className="account">
                        <div className="elipse">
                            <div className="elipse3"></div>
                        </div>
                        <p className="p1">
                            {/*{data.name}*/}
                        </p>
                        <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
                    </div>
                    <div className="info">
                        <a href="#">
                            5 мин
                        </a>
                        <a href="#">
                            100 My friends
                        </a>
                        <a href="#">
                            1000 All
                        </a>
                        <a href="#">
                            My ID: 12344
                        </a>
                    </div>
                    <p className="p2">
                        Second wash time report
                    </p>
                    <div className="timer">
                        <ul>
                            <li style={{opacity: 0.2}}>
                                0
                            </li>
                            <li style={{color: "#979797"}}>
                                1
                            </li>
                            <hr/>
                            <li>
                                2 ч
                            </li>
                            <hr/>
                            <li style={{color: "#979797"}}>
                                3
                            </li>
                            <li style={{opacity: 0.2}}>
                                4
                            </li>
                            <li style={{opacity: 0.1}}>
                                5
                            </li>
                        </ul>
                        <ul>
                            <li style={{opacity: 0.2}}>
                                03
                            </li>
                            <li style={{color: "#979797"}}>
                                04
                            </li>
                            <hr/>
                            <li>
                                05 мин
                            </li>
                            <hr/>
                            <li style={{color: "#979797"}}>
                                06
                            </li>
                            <li style={{opacity: 0.2}}>
                                07
                            </li>
                            <li style={{opacity: 0.1}}>
                                08
                            </li>
                        </ul>

                        <ul>
                            <li style={{opacity: 0.2}}>
                                07
                            </li>
                            <li style={{color: "#979797"}}>
                                08
                            </li>
                            <hr/>
                            <li>
                                09 сек
                            </li>
                            <hr/>
                            <li style={{color: "#979797"}}>
                                10
                            </li>
                            <li style={{opacity: 0.2}}>
                                11
                            </li>
                            <li style={{opacity: 0.1}}>
                                12
                            </li>
                        </ul>
                    </div>
                    <div className="total">
                        <p className="p3">
                            Sum total
                        </p>
                        <div className="sum-total">
                            <div className="total-info">
                                <img src={require("../img/money.png")} alt="money"/>
                                <p className="p4">
                                    <span>100 000 $</span><br/> Bank
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="slider-title">
                        <img src={require("../img/chelovek.png")} alt="chelovek"/>
                        <p className="p5">
                            Every 10 people
                        </p>
                    </div>
                    <div className="slider">
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
                            <p>50 $</p>
                        </a>
                    </div>
                </div>
            </section>
            <section className="section" id="section2">
                <div className="container">
                    <div className="section22">
                        <div className="participants">
                            <div className="title">
                                <img src={require("../img/men2.png")} alt="men"/>
                                <p>Total participants<br/> <span>15 000</span></p>
                            </div>
                            <div className="accounts">
                                <div>
                                    <p className="p6">1</p>
                                    <div className="avatar">
                                        <div className="elipse2"></div>
                                    </div>
                                    <div className="name">
                                        <p className="name">
                                            Account name
                                        </p>
                                        <p className="status">
                                            Status
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <p className="p6">2</p>
                                    <div className="avatar">
                                        <div className="elipse2"></div>
                                    </div>
                                    <div className="name">
                                        <p className="name">
                                            Account name
                                        </p>
                                        <p className="status">
                                            Status
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <p className="p6">3</p>
                                    <div className="avatar">
                                        <div className="elipse2"></div>
                                    </div>
                                    <div className="name">
                                        <p className="name">
                                            Account name
                                        </p>
                                        <p className="status">
                                            Status
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <p className="p6">4</p>
                                    <div className="avatar">
                                        <div className="elipse2"></div>
                                    </div>
                                    <div className="name">
                                        <p className="name">
                                            Account name
                                        </p>
                                        <p className="status">
                                            Status
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <p className="p6">5</p>
                                    <div className="avatar">
                                        <div className="elipse2"></div>
                                    </div>
                                    <div className="name">
                                        <p className="name">
                                            Account name
                                        </p>
                                        <p className="status">
                                            Status
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <p className="p6">6</p>
                                    <div className="avatar">
                                        <div className="elipse2"></div>
                                    </div>
                                    <div className="name">
                                        <p className="name">
                                            Account name
                                        </p>
                                        <p className="status">
                                            Status
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <p className="p6">7</p>
                                    <div className="avatar">
                                        <div className="elipse2"></div>
                                    </div>
                                    <div className="name">
                                        <p className="name">
                                            Account name
                                        </p>
                                        <p className="status">
                                            Status
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="tickets">
                            <a href="#">
                                <div className="btn">
                                    КУПИТЬ
                                </div>
                            </a>
                            <div className="ticket-title">
                                <img src={require("../img/ticket.png")} alt="ticket"/>
                                <p className="p7">
                                    My tickets
                                </p>
                            </div>
                            <div className="tickets_">
                                <div>
                                    <p className="p8">№ 1</p>
                                    <p className="p9">3 $ <span>My bids</span></p>
                                </div>
                                <div>
                                    <p className="p8">№ 6</p>
                                    <p className="p9">4 $ <span>My bids</span></p>
                                </div>
                                <div>
                                    <p className="p8">№ 6</p>
                                    <p className="p9">4 $ <span>My bids</span></p>
                                </div>
                                <div>
                                    <p className="p8">№ 7</p>
                                    <p className="p9">5 $ <span>My bids</span></p>
                                </div>
                                <div>
                                    <p className="p8">№ 8</p>
                                    <p className="p9">5 $ <span>My bids</span></p>
                                </div>
                            </div>
                            <hr/>
                            <div className="winners">
                                <img src={require("../img/win.png")} alt="winner"/>
                                <p className="p10">
                                    List of winners
                                </p>
                            </div>
                            <div className="winners_">
                                <div className="avatar-win">
                                    <div className="elipse4"></div>
                                </div>
                                <div className="avatar-title">
                                    <p className="p11">
                                        Account name №6
                                    </p>
                                    <div className="place">
                                        <img className="place1" src={require("../img/place1.png")} alt="place1"/>
                                        <p className="p12">
                                            1 Place <span>1000 $</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="winners_">
                                <div className="avatar-win">
                                    <div className="elipse4"></div>
                                </div>
                                <div className="avatar-title">
                                    <p className="p11">
                                        Account name №1
                                    </p>
                                    <div className="place">
                                        <img className="place2" src={require("../img/place2.png")} alt="place1"/>
                                        <img className="place2" src={require("../img/place2.png")} alt="place1"/>
                                        <p className="p12">
                                            1 Place <span>1000 $</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>



    )
}
