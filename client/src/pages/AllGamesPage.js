import React, {useCallback, useContext, useEffect, useState} from 'react'
// import Iframe from '../../react-iframe'
import '../css/allGames.css'
import {NavLink, useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Timer from 'react-compound-timer'
import path from 'path'
import config from "../config/default";
import Web3 from "web3";

let TEST_RINKEBY = 'https://rinkeby.infura.io/v3/2eb6c29c7ab24b9482f7a5bce63b8176',
    TEST_MAIN = 'https://mainnet.infura.io/v3/2eb6c29c7ab24b9482f7a5bce63b8176'
export let metamask, web3, addressLottery, abi, LotteryLimit, userAddress


    const countOfTickets = async () => {
        if (web3 && userAddress) {
            await LotteryLimit.methods.getTicketsLength().call({}, (err, res)=>{
                if(res){
                    let count = parseInt(res)
                    console.log("web3", web3)
                    console.log('LotteryLimit', LotteryLimit)
                    console.log('data', res)
                    console.log("Count Of Tickets:")
                    console.log(count)
                    // let tokens = React.createElement('span', null, _tokens)
                    // //
                    // console.log('span', tokens)
                    // console.log('ReactDOM', ReactDOM)
                    // console.log(document.getElementById('lalla'))
                    // ReactDOM.render(tokens, document.getElementById('lalla'))
                } else if(err){
                    console.log("This is error: ", err)
                }
            })
        }
    }

    const getAllValues = async () => {
    console.log(config.limitLottery10$.address)
        console.log(config.limitLottery10$.abi)
        addressLottery = config.limitLottery10$.address
        abi = config.limitLottery10$.abi

        LotteryLimit = new web3.eth.Contract(abi, addressLottery);
        console.log('blockchain is connected')
        await countOfTickets()

    }

    const connectBlockChain = async () => {
        // console.log(wallet);
        console.log("start metamask");
        window.addEventListener('load', async () => {

            if (window.ethereum) {
                metamask = await new Web3(window.ethereum);
                console.log("connect MetaMask");
                window.ethereum.on('accountsChanged', function (accounts) {
                    userAddress = accounts[0];
                    // Time to reload your interface with accounts[0]!
                    console.log("change account: ", userAddress);

                })
                try {
                    window.ethereum.enable().then(async function () {
                        // User has allowed account access to DApp...
                        console.log("step2")
                        if (metamask) {
                            if (window.ethereum.selectedAddress !== undefined) {
                                userAddress = (window.ethereum.selectedAddress)
                            } else if (web3.givenProvider.MetamaskInpageProvider !== undefined) {
                                userAddress = (web3.givenProvider.MetamaskInpageProvider)
                            } else if (metamask.givenProvider.selectedAddress !== undefined) {
                                userAddress = (metamask.givenProvider.selectedAddress)
                            }
                            web3 = await new Web3(new Web3.providers.HttpProvider(TEST_RINKEBY));
                            await console.log('web3', web3)
                            getAllValues()
                            console.log('userAddress: ', userAddress)
                        }
                    });
                } catch (e) {
                    // User has denied account access to DApp...
                    console.log(e)
                }
            }
            // Legacy DApp Browsers
            else if (window.web3) {
                metamask = await new Web3(web3.currentProvider);
                console.log(metamask);
                console.log("connect MetaMask");
                if (metamask) {
                    if (window.ethereum.selectedAddress !== undefined) {
                        userAddress = (window.ethereum.selectedAddress)
                    } else if (web3.givenProvider.MetamaskInpageProvider !== undefined) {
                        userAddress = (web3.givenProvider.MetamaskInpageProvider)
                    } else if (metamask.givenProvider.selectedAddress !== undefined) {
                        userAddress = (metamask.givenProvider.selectedAddress)
                    }
                    web3 = await new Web3(new Web3.providers.HttpProvider(TEST_RINKEBY));
                    await console.log('web3', web3)
                    getAllValues()
                    console.log('userAddress: ', userAddress)
                }
                window.ethereum.on('accountsChanged', function (accounts) {
                    // Time to reload your interface with accounts[0]!
                    userAddress = (accounts[0])
                    console.log("change account: ", userAddress)
                })
            }
            // Non-DApp Browsers
            else {
                console.log('You have to install MetaMask !')
                web3 = await new Web3(new Web3.providers.HttpProvider(TEST_RINKEBY))
                getAllValues()
                await console.log('web3', web3)
            }
        })
        await console.log('web3', web3)
        await console.log("end metamask")
    }
    connectBlockChain()

export const AllGamesPage = ()=>{
    const [name, setName] = useState([])
    const [id, setId] = useState([])
    const [fileImg, setImg] = useState([])
    const {token} = useContext(AuthContext)
    const {loading, request} = useHttp()

    // let test = "Name"
    console.log(token)
    const getUserData = useCallback(async () =>{
        console.log("start1")
        try{
            console.log("start2")
            const fetched = await request('/api/auth/allgames', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log("start3")
            setName(fetched[0].name)
            setId(fetched[0]._id)
            setImg(fetched[0].userImg)
            console.log("data on allgames: ", fetched)
        } catch (e) {}
    }, [token, request])

    const uploadAvatar = useCallback(async(req, res)=>{
        await request('/api/auth/upload', 'POST', fileImg)

    })

    useEffect(()=>{
        getUserData()
    }, [getUserData])

    const changeHandler = async event => {
        setImg(event.target.value)
        await request('/api/auth/upload', 'POST', fileImg)
        console.log(fileImg)

    }

    // const updateAvatarHandler = async () =>{
    //     try{
    //         const data = await request('/api/auth/avatar', 'POST', {...form})
    //         message(data.message)
    //         console.log('Data', data)
    //         await loginHandler()
    //     } catch (e) {}
    // }

    if(loading){
        return (<div>Loading</div>)
    }
    return (
        <div className="allgames">
            <video id="videoBG" poster={require("../img/bg.png")} autoPlay muted loop>
                <source src={require("../img/background.mp4")} type="video/mp4"/>
            </video>
            <header className="header" id="header">
                <div className="container">
                    <div className="account">
                        <div className="elipse">

                            <div className="elipse3">
                                <input type="file" name="file" id="file" onChange={changeHandler}/>

                            </div>
                        </div>
                        <p className="p1">
                            {name}
                        </p>
                        <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
                    </div>
                    <div className="info">

                        <a href="#">
                            100 My friends
                        </a>
                        <a href="#">
                            1000 All
                        </a>
                        <a href="#">
                            My ID: {id}
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
                                        PLAY 45$
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
                                <Timer
                                    initialTime={65000}
                                    direction="backward"
                                >
                                    {() => (
                                        <React.Fragment>
                                            <ul>
                                                <li style={{color: "#979797"}}>
                                                    {<Timer />._owner.stateNode.state.m - 1>=0 ? <Timer />._owner.stateNode.state.m - 1 : 60+<Timer />._owner.stateNode.state.m - 1}
                                                </li>
                                                <hr/>
                                                <li>
                                                    <Timer.Minutes /> min
                                                </li>
                                                <hr/>
                                                <li style={{color: "#979797"}}>
                                                    {<Timer />._owner.stateNode.state.m + 1<=59 ? <Timer />._owner.stateNode.state.m + 1 : Math.abs(60-<Timer />._owner.stateNode.state.m - 1)}
                                                </li>
                                            </ul>
                                            <ul>
                                                <li style={{color: "#979797"}}>
                                                    {<Timer />._owner.stateNode.state.s - 1>=0 ? <Timer />._owner.stateNode.state.s - 1 : 60+<Timer />._owner.stateNode.state.s - 1}
                                                </li>
                                                <hr/>
                                                <li>
                                                    <Timer.Seconds /> sec
                                                </li>
                                                <hr/>
                                                <li style={{color: "#979797"}}>
                                                    {<Timer />._owner.stateNode.state.s + 1<=59 ? <Timer />._owner.stateNode.state.s + 1 : Math.abs(60-<Timer />._owner.stateNode.state.s - 1)}
                                                </li>
                                            </ul>
                                        </React.Fragment>
                                    )}
                                </Timer>

                            </div>
                            <div className="blok2">
                                <div className="title3">
                                    <img src={require("../img/minute2.png")} alt="minute"/>
                                    <p className="p6">
                                        Every 5 minutes
                                    </p>
                                </div>
                                <NavLink to="/game">
                                    <div className="btn">
                                        <p className="p3">
                                            PLAY 45$
                                        </p>
                                    </div>
                                </NavLink>
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
                                <Timer
                                    initialTime={1800000}
                                    direction="backward"
                                >
                                    {() => (
                                        <React.Fragment>
                                            <ul>
                                                <li style={{color: "#979797"}}>
                                                    {<Timer />._owner.stateNode.state.m - 1>=0 ? <Timer />._owner.stateNode.state.m - 1 : 60+<Timer />._owner.stateNode.state.m - 1}
                                                </li>
                                                <hr/>
                                                <li>
                                                    <Timer.Minutes /> min
                                                </li>
                                                <hr/>
                                                <li style={{color: "#979797"}}>
                                                    {<Timer />._owner.stateNode.state.m + 1<=59 ? <Timer />._owner.stateNode.state.m + 1 : Math.abs(60-<Timer />._owner.stateNode.state.m - 1)}
                                                </li>
                                            </ul>
                                            <ul>
                                                <li style={{color: "#979797"}}>
                                                    {<Timer />._owner.stateNode.state.s - 1>=0 ? <Timer />._owner.stateNode.state.s - 1 : 60+<Timer />._owner.stateNode.state.s - 1}
                                                </li>
                                                <hr/>
                                                <li>
                                                    <Timer.Seconds /> sec
                                                </li>
                                                <hr/>
                                                <li style={{color: "#979797"}}>
                                                    {<Timer />._owner.stateNode.state.s + 1<=59 ? <Timer />._owner.stateNode.state.s + 1 : Math.abs(60-<Timer />._owner.stateNode.state.s - 1)}
                                                </li>
                                            </ul>
                                        </React.Fragment>
                                    )}
                                </Timer>

                            </div>
                            <div className="blok2">
                                <div className="title3">
                                    <img src={require("../img/hour2.png")} alt="minute"/>
                                    <p className="p6">
                                        Each hour
                                    </p>
                                </div>
                                <NavLink to="/game">
                                    <div className="btn">
                                        <p className="p3">
                                            PLAY 45$
                                        </p>
                                    </div>
                                </NavLink>
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
                            <Timer
                                initialTime={3605000}
                                direction="backward"
                            >
                                {() => (
                                    <React.Fragment>
                                        <ul>
                                            <li style={{color: "#979797"}}>
                                                {<Timer />._owner.stateNode.state.h - 1>=0 ? <Timer />._owner.stateNode.state.h - 1 : 24+<Timer />._owner.stateNode.state.h - 1}
                                            </li>
                                            <hr/>
                                            <li>
                                                <Timer.Hours /> day
                                            </li>
                                            <hr/>
                                            <li style={{color: "#979797"}}>
                                                {<Timer />._owner.stateNode.state.h + 1<=23 ? <Timer />._owner.stateNode.state.h + 1 : Math.abs(24-<Timer />._owner.stateNode.state.h - 1)}
                                            </li>
                                        </ul>
                                        <ul>
                                            <li style={{color: "#979797"}}>
                                                {<Timer />._owner.stateNode.state.m - 1>=0 ? <Timer />._owner.stateNode.state.m - 1 : 60+<Timer />._owner.stateNode.state.m - 1}
                                            </li>
                                            <hr/>
                                            <li>
                                                <Timer.Minutes /> min
                                            </li>
                                            <hr/>
                                            <li style={{color: "#979797"}}>
                                                {<Timer />._owner.stateNode.state.m + 1<=59 ? <Timer />._owner.stateNode.state.m + 1 : Math.abs(60-<Timer />._owner.stateNode.state.m - 1)}
                                            </li>
                                        </ul>
                                    </React.Fragment>
                                )}
                            </Timer>

                        </div>
                        <div className="blok2">
                            <div className="title3">
                                <img src={require("../img/calendar.png")} alt="minute"/>
                                <p className="p6">
                                    Every day
                                </p>
                            </div>
                            <NavLink to="/game">
                                <div className="btn">
                                    <p className="p3">
                                        PLAY 45$
                                    </p>
                                </div>
                            </NavLink>
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
                            <Timer
                                initialTime={86405000}
                                direction="backward"
                            >
                                {() => (
                                    <React.Fragment>
                                        <ul>
                                            <li style={{color: "#979797"}}>
                                                {<Timer />._owner.stateNode.state.d - 1>=0 ? <Timer />._owner.stateNode.state.d - 1 : 0}
                                            </li>
                                            <hr/>
                                            <li>
                                                <Timer.Days /> day
                                            </li>
                                            <hr/>
                                            <li style={{color: "#979797"}}>
                                                {<Timer />._owner.stateNode.state.d + 1}
                                            </li>
                                        </ul>
                                        <ul>
                                            <li style={{color: "#979797"}}>
                                                {<Timer />._owner.stateNode.state.h - 1>=0 ? <Timer />._owner.stateNode.state.h - 1 : 24+<Timer />._owner.stateNode.state.h - 1}
                                            </li>
                                            <hr/>
                                            <li>
                                                <Timer.Hours /> hour
                                            </li>
                                            <hr/>
                                            <li style={{color: "#979797"}}>
                                                {<Timer />._owner.stateNode.state.h + 1<=23 ? <Timer />._owner.stateNode.state.h + 1 : Math.abs(60-<Timer />._owner.stateNode.state.h - 1)}
                                            </li>
                                        </ul>
                                    </React.Fragment>
                                )}
                            </Timer>

                        </div>
                        <div className="blok2">
                            <div className="title3">
                                <img src={require("../img/day2.png")} alt="minute"/>
                                <p className="p6">
                                    Every week
                                </p>
                            </div>
                            <NavLink to="/game">
                                <div className="btn">
                                    <p className="p3">
                                        PLAY 45$
                                    </p>
                                </div>
                            </NavLink>
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
                            <Timer
                                initialTime={86405000}
                                direction="backward"
                            >
                                {() => (
                                    <React.Fragment>
                                        <ul>
                                            <li style={{color: "#979797"}}>
                                                {<Timer />._owner.stateNode.state.d - 1>=0 ? <Timer />._owner.stateNode.state.d - 1 : 0}
                                            </li>
                                            <hr/>
                                            <li>
                                                <Timer.Days /> day
                                            </li>
                                            <hr/>
                                            <li style={{color: "#979797"}}>
                                                {<Timer />._owner.stateNode.state.d + 1}
                                            </li>
                                        </ul>
                                        <ul>
                                            <li style={{color: "#979797"}}>
                                                {<Timer />._owner.stateNode.state.h - 1>=0 ? <Timer />._owner.stateNode.state.h - 1 : 24+<Timer />._owner.stateNode.state.h - 1}
                                            </li>
                                            <hr/>
                                            <li>
                                                <Timer.Hours /> hour
                                            </li>
                                            <hr/>
                                            <li style={{color: "#979797"}}>
                                                {<Timer />._owner.stateNode.state.h + 1<=23 ? <Timer />._owner.stateNode.state.h + 1 : Math.abs(60-<Timer />._owner.stateNode.state.h - 1)}
                                            </li>
                                        </ul>
                                    </React.Fragment>
                                )}
                            </Timer>

                        </div>
                        <div className="blok2">
                            <div className="title3">
                                <img src={require("../img/calendar2.png")} alt="minute"/>
                                <p className="p6">
                                    Every month
                                </p>
                            </div>
                            <NavLink to="/game">
                                <div className="btn">
                                    <p className="p3">
                                        PLAY 45$
                                    </p>
                                </div>
                            </NavLink>
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
                                    Every year
                                </p>
                            </div>
                            <div className="timer">
                                <Timer
                                    initialTime={86405000}
                                    direction="backward"
                                >
                                    {() => (
                                        <React.Fragment>
                                            <ul>
                                                <li style={{color: "#979797"}}>
                                                    {<Timer />._owner.stateNode.state.d - 1>=0 ? <Timer />._owner.stateNode.state.d - 1 : 0}
                                                </li>
                                                <hr/>
                                                <li>
                                                    <Timer.Days /> day
                                                </li>
                                                <hr/>
                                                <li style={{color: "#979797"}}>
                                                    {<Timer />._owner.stateNode.state.d + 1}
                                                </li>
                                            </ul>
                                            <ul>
                                                <li style={{color: "#979797"}}>
                                                    {<Timer />._owner.stateNode.state.h - 1>=0 ? <Timer />._owner.stateNode.state.h - 1 : 24+<Timer />._owner.stateNode.state.h - 1}
                                                </li>
                                                <hr/>
                                                <li>
                                                    <Timer.Hours /> hour
                                                </li>
                                                <hr/>
                                                <li style={{color: "#979797"}}>
                                                    {<Timer />._owner.stateNode.state.h + 1<=23 ? <Timer />._owner.stateNode.state.h + 1 : Math.abs(60-<Timer />._owner.stateNode.state.h - 1)}
                                                </li>
                                            </ul>
                                        </React.Fragment>
                                    )}
                                </Timer>

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
                            <NavLink to="/game">
                                <div className="btn">
                                    <p className="p3">
                                        PLAY 45$
                                    </p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <div className="video">
                        <iframe
                            src="https://www.youtube.com/embed/tgbNymZ7vqY">
                        </iframe>
                    </div>

                </div>
            </section>
        </div>
    )
}