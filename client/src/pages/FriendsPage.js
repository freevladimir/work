import React, {useContext, useEffect, useState} from 'react'
import '../css/friends.css'
import {NavLink, useHistory} from 'react-router-dom'
export const FriendsPage = ()=>{
    return (
        <div className="friends">
            <video id="videoBG" poster="../img/bg.png" autoPlay muted loop>
                <source src={require("../img/background.mp4")} type="video/mp4"/>
            </video>
            <header className="hedaer" id="header">
                <div className="container">
                    <div className="account">
                        <a href="#">
                            <img className="left" src={require("../img/left.png")} alt="left"/>
                        </a>
                        <div className="elipse">
                            <div className="elipse3"></div>
                        </div>
                        <p className="p1">
                            Nick_2314
                        </p>
                        <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
                    </div>
                    <div className="info">
                        <a className="selected" href="#">
                            100 My friends
                        </a>
                        <a href="#">
                            1000 All
                        </a>
                        <input type="text" id="myInput" placeholder="Search for names.." title="Type in a name"/>
                    </div>
                </div>
            </header>
            <section>
                <div className="container">
                    <div className="comp">
                        <div className="elipse_">
                            <div className="elipse3_"></div>
                        </div>
                        <div className="text">
                            <p className="p3">
                                Account name
                            </p>
                            <p className="p4">
                                Status
                            </p>
                        </div>
                        <a href="#">
                            <div className="btn">
                                <p className="p5">
                                    You are subscribed
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="comp">
                        <div className="elipse_">
                            <div className="elipse3_"></div>
                        </div>
                        <div className="text">
                            <p className="p3">
                                Account name
                            </p>
                            <p className="p4">
                                Status
                            </p>
                        </div>
                        <a href="#">
                            <div className="btn">
                                <p className="p5">
                                    You are subscribed
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="comp">
                        <div className="elipse_">
                            <div className="elipse3_"></div>
                        </div>
                        <div className="text">
                            <p className="p3">
                                Account name
                            </p>
                            <p className="p4">
                                Status
                            </p>
                        </div>
                        <a href="#">
                            <div className="btn">
                                <p className="p5">
                                    You are subscribed
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="comp">
                        <div className="elipse_">
                            <div className="elipse3_"></div>
                        </div>
                        <div className="text">
                            <p className="p3">
                                Account name
                            </p>
                            <p className="p4">
                                Status
                            </p>
                        </div>
                        <a href="#">
                            <div className="btn">
                                <p className="p5">
                                    You are subscribed
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="comp">
                        <div className="elipse_">
                            <div className="elipse3_"></div>
                        </div>
                        <div className="text">
                            <p className="p3">
                                Account name
                            </p>
                            <p className="p4">
                                Status
                            </p>
                        </div>
                        <a href="#">
                            <div className="btn">
                                <p className="p5">
                                    You are subscribed
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="comp">
                        <div className="elipse_">
                            <div className="elipse3_"></div>
                        </div>
                        <div className="text">
                            <p className="p3">
                                Account name
                            </p>
                            <p className="p4">
                                Status
                            </p>
                        </div>
                        <a href="#">
                            <div className="btn">
                                <p className="p5">
                                    You are subscribed
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="comp">
                        <div className="elipse_">
                            <div className="elipse3_"></div>
                        </div>
                        <div className="text">
                            <p className="p3">
                                Account name
                            </p>
                            <p className="p4">
                                Status
                            </p>
                        </div>
                        <a href="#">
                            <div className="btn">
                                <p className="p5">
                                    You are subscribed
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="comp">
                        <div className="elipse_">
                            <div className="elipse3_"></div>
                        </div>
                        <div className="text">
                            <p className="p3">
                                Account name
                            </p>
                            <p className="p4">
                                Status
                            </p>
                        </div>
                        <a href="#">
                            <div className="btn">
                                <p className="p5">
                                    You are subscribed
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="comp">
                        <div className="elipse_">
                            <div className="elipse3_"></div>
                        </div>
                        <div className="text">
                            <p className="p3">
                                Account name
                            </p>
                            <p className="p4">
                                Status
                            </p>
                        </div>
                        <a href="#">
                            <div className="btn">
                                <p className="p5">
                                    You are subscribed
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="comp">
                        <div className="elipse_">
                            <div className="elipse3_"></div>
                        </div>
                        <div className="text">
                            <p className="p3">
                                Account name
                            </p>
                            <p className="p4">
                                Status
                            </p>
                        </div>
                        <a href="#">
                            <div className="btn">
                                <p className="p5">
                                    You are subscribed
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}