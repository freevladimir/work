import React, {useContext, useEffect, useState} from 'react'
// import Iframe from '../../react-iframe'
import '../css/allGames.css'
import {data} from './LoginPage'
import {NavLink, useHistory} from 'react-router-dom'
console.log("data on allgames: ", data)
export const AllGamesPage = ()=>{

    return (
        <div className="allgames">
            <video id="videoBG" poster={require("../img/bg.png")} autoPlay muted loop>
                <source src={require("../img/background.mp4")} type="video/mp4"/>
            </video>
            <header className="header" id="header">
                <div className="container">
                    <div className="account">
                        <div className="elipse">
                            <div className="elipse3"></div>
                        </div>
                        <p className="p1">
                            {/*{data}*/}
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
                </div>
            </header>
            <section className="section1" id="section1">
                <div className="container">
                    <div className="component">
                        <div className="comp1">
                            <div className="title">
                                <p className="p2">
                                    <span>Max</span> 10
                                </p>
                                <img src={require("../img/chelovek.png")} alt="chelovek"/>
                            </div>
                            <NavLink to="/game">
                                <div className="btn">
                                    <p className="p3">
                                        45 $
                                    </p>
                                </div>
                            </NavLink>
                            <div className="title2">
                                <div className="top">
                                    <img src={require("../img/men2.png")} alt="men"/>
                                    <p className="p4">
                                        9
                                    </p>
                                </div>
                                <p className="p5">
                                    Human
                                </p>
                            </div>
                        </div>
                        <div className="comp2">
                            <div className="timer">
                                <ul>
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
                                </ul>
                                <ul>
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
                                </ul>
                            </div>
                            <div className="blok2">
                                <div className="title3">
                                    <img src={require("../img/minute2.png")} alt="minute"/>
                                    <p className="p6">
                                        Every 5 minutesr
                                    </p>
                                </div>
                                <a href="#">
                                    <div className="btn">
                                        <p className="p3">
                                            5 $
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div className="title2">
                                <div className="top">
                                    <img src={require("../img/men2.png")} alt="men"/>
                                    <p className="p4">
                                        10
                                    </p>
                                </div>
                                <p className="p5">
                                    Human
                                </p>
                            </div>
                        </div>
                        <div className="comp2">
                            <div className="timer">
                                <ul>
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
                                </ul>
                                <ul>
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
                                </ul>
                            </div>
                            <div className="blok2">
                                <div className="title3">
                                    <img src={require("../img/hour2.png")} alt="minute"/>
                                    <p className="p6">
                                        Each hour
                                    </p>
                                </div>
                                <a href="#">
                                    <div className="btn">
                                        <p className="p3">
                                            5 $
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div className="title2">
                                <div className="top">
                                    <img src={require("../img/men2.png")} alt="men"/>
                                    <p className="p4">
                                        10
                                    </p>
                                </div>
                                <p className="p5">
                                    Human
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="comp2">
                        <div className="timer">
                            <ul>
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
                            </ul>
                            <ul>
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
                            </ul>
                        </div>
                        <div className="blok2">
                            <div className="title3">
                                <img src={require("../img/calendar.png")} alt="minute"/>
                                <p className="p6">
                                    Every day
                                </p>
                            </div>
                            <a href="#">
                                <div className="btn">
                                    <p className="p3">
                                        5 $
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div className="title2">
                            <div className="top">
                                <img src={require("../img/men2.png")} alt="men"/>
                                <p className="p4">
                                    10
                                </p>
                            </div>
                            <p className="p5">
                                Human
                            </p>
                        </div>
                    </div>
                    <div className="comp2">
                        <div className="timer">
                            <ul>
                                <li style={{color: "#979797"}}>
                                    05
                                </li>
                                <hr/>
                                <li>
                                    06 day
                                </li>
                                <hr/>
                                <li style={{color: "#979797"}}>
                                    07
                                </li>
                            </ul>
                            <ul>
                                <li style={{color: "#979797"}}>
                                    22
                                </li>
                                <hr/>
                                <li>
                                    23 hour
                                </li>
                                <hr/>
                                <li style={{color: "#979797"}}>
                                    24
                                </li>
                            </ul>
                        </div>
                        <div className="blok2">
                            <div className="title3">
                                <img src={require("../img/day2.png")} alt="minute"/>
                                <p className="p6">
                                    Every week
                                </p>
                            </div>
                            <a href="#">
                                <div className="btn">
                                    <p className="p3">
                                        5 $
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div className="title2">
                            <div className="top">
                                <img src={require("../img/men2.png")} alt="men"/>
                                <p className="p4">
                                    10
                                </p>
                            </div>
                            <p className="p5">
                                Human
                            </p>
                        </div>
                    </div>
                    <div className="comp2">
                        <div className="timer">
                            <ul>
                                <li style={{color: "#979797"}}>
                                    10
                                </li>
                                <hr/>
                                <li>
                                    11 month
                                </li>
                                <hr/>
                                <li style={{color: "#979797"}}>
                                    12
                                </li>
                            </ul>
                            <ul>
                                <li style={{color: "#979797"}}>
                                    22
                                </li>
                                <hr/>
                                <li>
                                    23 hour
                                </li>
                                <hr/>
                                <li style={{color: "#979797"}}>
                                    24
                                </li>
                            </ul>
                        </div>
                        <div className="blok2">
                            <div className="title3">
                                <img src={require("../img/calendar2.png")} alt="minute"/>
                                <p className="p6">
                                    Every month
                                </p>
                            </div>
                            <a href="#">
                                <div className="btn">
                                    <p className="p3">
                                        5 $
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div className="title2">
                            <div className="top">
                                <img src={require("../img/men2.png")} alt="men"/>
                                <p className="p4">
                                    10
                                </p>
                            </div>
                            <p className="p5">
                                Human
                            </p>
                        </div>
                    </div>
                    <div className="comp2 comp3">
                        <div className="blok2">
                            <div className="title3 title_">
                                <img src={require("../img/calendar2.png")} alt="minute"/>
                                <p className="p6">
                                    Every month
                                </p>
                            </div>
                            <div className="timer">
                                <ul>
                                    <li style={{color: "#979797"}}>
                                        05
                                    </li>
                                    <hr/>
                                    <li>
                                        06 day
                                    </li>
                                    <hr/>
                                    <li style={{color: "#979797"}}>
                                        07
                                    </li>
                                </ul>
                                <ul>
                                    <li style={{color: "#979797"}}>
                                        22
                                    </li>
                                    <hr/>
                                    <li>
                                        23 hour
                                    </li>
                                    <hr/>
                                    <li style={{color: "#979797"}}>
                                        24
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="blok3">
                            <div className="title3">
                                <img src={require("../img/gavat.png")} alt="gavat"/>
                                <p className="p6">
                                    Super game
                                </p>
                                <p className="p5 p5_">
                                    Human
                                </p>
                                <div className="top">
                                    <img className="men_" src={require("../img/men2.png")} alt="men"/>
                                    <p className="p4">
                                        10
                                    </p>
                                </div>
                            </div>
                            <a href="#">
                                <div className="btn btn-2">
                                    <p className="p3">
                                        5 $
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>


                </div>
            </section>
        </div>
    )
}