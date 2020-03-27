import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import {AuthContext} from "../context/AuthContext"
import '../css/main.css'

export const StartPage = ()=> {
    return (
        <div className="row startpage">
            <video id="videoBG" autoPlay muted loop>
                <source src={require("../img/background.mp4")} type="video/mp4"/>
            </video>
            <header className="header" id="header">
                <div className="container">
                    <a href="#">
                        <div className="personal">
                            <img className="men" src={require("../img/men.png")} alt="men-icon"/>
                            <p>
                                Personal Area
                            </p>
                        </div>
                    </a>
                    <div className="logo">
                        <img src={require("../img/img1.png")} alt="logo"/>
                    </div>

                    <div className="buttons">
                        <a className="entrance" href="#">
                            Entrance
                        </a>
                        <a className="login" href="/login">
                            Login
                        </a>
                    </div>
                    <div className="video">
                        <iframe
                            src="https://www.youtube.com/embed/tgbNymZ7vqY">
                        </iframe>
                    </div>
                </div>
            </header>

            <section className="section1" id="section1">
                <div className="container">
                    <div className="div"></div>
                    <h2>
                        КАК ЭТО РАБОТАЕТ
                    </h2>
                    <div className="work">
                        <div className="left">
                            <p className="p1">
                                Децентрализованная блок чейн лотерея На смарт контракте с гарантированными большими
                                выигрышами
                            </p>
                            <p className="p2">
                                Суперигра будет проходить каждый месяц и каждый год <br/>Где сумма выигрыша могут превысить
                                более
                                500 000$
                            </p>
                            <p className="p3">
                                Рандомным образом смарт контракт выберет одного если участников менее 10 или двух
                                победителей если участников более 10 и автоматически распределит средства победителям
                            </p>
                        </div>
                        <img src={require("../img/section1.png")} alt="work"/>
                        <div className="right">
                            <p className="p1">
                                Розыгрыши проводятся каждые 5 мин каждый час каждые три часа и так далее
                            </p>
                            <p className="p2">
                                Приобретая билет вы получаете номер в списке участников из таких же участников как и вы
                            </p>
                            <p className="p3">
                                В 7top вы можете собрать множество реферальных друзей и получать 5 % от выигрыша вашего
                                реферального друга
                            </p>
                        </div>
                    </div>
                    <div className="div2"></div>
                </div>
            </section>
            <section className="section2" id="section2">
                <div className="container">
                    <h2>
                        ПРЕИМУЩЕСТВА
                    </h2>
                    <div className="priem">
                        <div className="top">
                            <p className="p1">
                                Абсолютно нет рисков
                            </p>

                            <p className="p2">
                                Открытый код смарт-контракта выложен на блокчейн Ethereum. Криптовалюта − международна и
                                децентрализована
                            </p>

                            <p className="p3">
                                Моментальные выплаты, обман исключен
                            </p>
                        </div>
                        <div className="bottom">
                            <p className="p1">
                                Кошельки анонимны Все транзакции 100% с кошельков участников.
                            </p>

                            <p className="p2">
                                Невозможно изменить алгоритм или удалить кабинеты участников.
                            </p>
                            <p className="p3">
                                Смарт-контракт простой
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section3" id="section3">
                <div className="container">
                    <div className="icon">
                        <a href="#" className="telegram">
                            <i className="fa fa-telegram" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="fb">
                            <i className="fa fa-facebook-official" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="tube">
                            <i className="fa fa-youtube-play" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div className="nav">
                        <a href="#">
                            Условия использования
                        </a>
                        <a href="#">
                            Адрес
                        </a>
                        <a href="#">
                            Открытый источник
                        </a>
                    </div>
                </div>
            </section>
            <footer className="footer" id="footer">
                <div className="container">
                    <p className="footer-text">
                        Адрес смарт-контракта: 7top
                    </p>
                </div>
            </footer>
        </div>
    )
}