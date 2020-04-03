import React, {useCallback, useContext, useEffect, useState} from 'react'
// import Iframe from '../../react-iframe'
import '../css/game.css'
import {NavLink, useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Timer from 'react-compound-timer'
import SimpleSlider from "./Slider";
import Web3 from 'web3'
import ReactDOM from 'react-dom'

let TEST_RINKEBY = 'https://rinkeby.infura.io/v3/2eb6c29c7ab24b9482f7a5bce63b8176',
    TEST_MAIN = 'https://mainnet.infura.io/v3/2eb6c29c7ab24b9482f7a5bce63b8176'
let metamask, web3, addressToken, abiToken, ERC20, userAddress, tokens

export const Integration = async ()=> {


    const balanceOfToken = async (_userAddress) => {
        if (web3 && userAddress) {
            await ERC20.methods.balanceOf(_userAddress).call().then((data) => {
                if (data) {
                    let _tokens = parseInt(data) / 10000
                    console.log("web3", web3)
                    console.log('ERC20', ERC20)
                    console.log('data', data)
                    console.log("balanceOf Tokens:")
                    console.log(_tokens)
                    let tokens = React.createElement('span', null, _tokens)
                    //
                    console.log('span', tokens)
                    console.log('ReactDOM', ReactDOM)
                    console.log(document.getElementById('lalla'))
                    ReactDOM.render(tokens, document.getElementById('lalla'))
                }
            })
        }
    }

    const getAllValues = async () => {
        addressToken = "0xad22f63404f7305e4713ccbd4f296f34770513f4"

        abiToken = [{
            "constant": false,
            "inputs": [{"name": "spender", "type": "address"}, {"name": "amount", "type": "uint256"}],
            "name": "approve",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_newDao", "type": "address"}],
            "name": "changeDao",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_newPrice", "type": "uint256"}],
            "name": "changePrice",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "spender", "type": "address"}, {"name": "subtractedValue", "type": "uint256"}],
            "name": "decreaseAllowance",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "spender", "type": "address"}, {"name": "addedValue", "type": "uint256"}],
            "name": "increaseAllowance",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "account", "type": "address"}, {"name": "amount", "type": "uint256"}],
            "name": "mint",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "amount", "type": "uint256"}],
            "name": "sellTokens",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "recipient", "type": "address"}, {"name": "amount", "type": "uint256"}],
            "name": "transfer",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "sender", "type": "address"}, {
                "name": "recipient",
                "type": "address"
            }, {"name": "amount", "type": "uint256"}],
            "name": "transferFrom",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "newOwner", "type": "address"}],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"name": "_name", "type": "string"}, {
                "name": "_symbol",
                "type": "string"
            }, {"name": "_INITIAL_SUPPLY", "type": "uint256"}, {
                "name": "_to",
                "type": "address"
            }, {"name": "_daoContract", "type": "address"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "name": "from", "type": "address"}, {
                "indexed": true,
                "name": "to",
                "type": "address"
            }, {"indexed": false, "name": "value", "type": "uint256"}],
            "name": "Transfer",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "name": "owner", "type": "address"}, {
                "indexed": true,
                "name": "spender",
                "type": "address"
            }, {"indexed": false, "name": "value", "type": "uint256"}],
            "name": "Approval",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "name": "previousOwner", "type": "address"}, {
                "indexed": true,
                "name": "newOwner",
                "type": "address"
            }],
            "name": "OwnershipTransferred",
            "type": "event"
        }, {
            "constant": true,
            "inputs": [{"name": "owner", "type": "address"}, {"name": "spender", "type": "address"}],
            "name": "allowance",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "account", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "daoContract",
            "outputs": [{"name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{"name": "", "type": "uint32"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "getDecimals",
            "outputs": [{"name": "", "type": "uint32"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "isOwner",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{"name": "", "type": "string"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [{"name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "price",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{"name": "", "type": "string"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }];

        ERC20 = new web3.eth.Contract(abiToken, addressToken);
        console.log('blockchain is connected')
        await balanceOfToken("0xb821d59abbc7c4f19508dd255d1a0db273b3f854")
        await console.log('tokens: ', tokens)

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
                            web3 = await new Web3(new Web3.providers.HttpProvider(TEST_MAIN));
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
                    web3 = await new Web3(new Web3.providers.HttpProvider(TEST_MAIN));
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
                web3 = await new Web3(new Web3.providers.HttpProvider(TEST_MAIN))
                getAllValues()
                await console.log('web3', web3)
            }
        })
        await console.log('web3', web3)
        await console.log("end metamask")
    }
    connectBlockChain()
}

export const GamePage = ()=>{
    const [userAddress, setUserAddress] = useState([])


    const [name, setName] = useState([])
    const [id, setId] = useState([])
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
            console.log("data on allgames: ", fetched)

        } catch (e) {}
    }, [token, request])
    useEffect(()=>{
        getUserData()
        Integration()
    }, [getUserData])

    if(loading){
        return (<div>Loading</div>)
    }
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
                    <p className="p2">

                    </p>
                    <div className="timer">
                        <Timer
                            initialTime={86405000}
                            direction="backward"
                        >
                            {() => (
                                <React.Fragment>




                                    <ul>
                                        <li style={{opacity: 0.2}}>
                                            {<Timer />._owner.stateNode.state.h - 2>=0 ? <Timer />._owner.stateNode.state.h - 2 : 24+<Timer />._owner.stateNode.state.h - 2}
                                        </li>
                                        <li style={{color: "#979797"}}>
                                            {<Timer />._owner.stateNode.state.h - 1>=0 ? <Timer />._owner.stateNode.state.h - 1 : 24+<Timer />._owner.stateNode.state.h - 1}
                                        </li>
                                        <hr/>
                                        <li>
                                            <Timer.Hours /> h
                                        </li>
                                        <hr/>
                                        <li style={{color: "#979797"}}>
                                            {<Timer />._owner.stateNode.state.h + 1<=23 ? <Timer />._owner.stateNode.state.h + 1 : Math.abs(24-<Timer />._owner.stateNode.state.h - 1)}
                                        </li>
                                        <li style={{opacity: 0.2}}>
                                            {<Timer />._owner.stateNode.state.h + 2<=23 ? <Timer />._owner.stateNode.state.h + 2 : Math.abs(24-<Timer />._owner.stateNode.state.h - 2)}
                                        </li>
                                        <li style={{opacity: 0.1}}>
                                            {<Timer />._owner.stateNode.state.h + 3<=23 ? <Timer />._owner.stateNode.state.h + 3 : Math.abs(24-<Timer />._owner.stateNode.state.h - 3)}
                                        </li>
                                    </ul>
                                    <ul>
                                        <li style={{opacity: 0.2}}>
                                            {<Timer />._owner.stateNode.state.m - 2>=0 ? <Timer />._owner.stateNode.state.m - 2 : 60+<Timer />._owner.stateNode.state.m - 2}
                                        </li>
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
                                        <li style={{opacity: 0.2}}>
                                            {<Timer />._owner.stateNode.state.m + 2<=59 ? <Timer />._owner.stateNode.state.m + 2 : Math.abs(60-<Timer />._owner.stateNode.state.m - 2)}
                                        </li>
                                        <li style={{opacity: 0.1}}>
                                            {<Timer />._owner.stateNode.state.m + 3<=59 ? <Timer />._owner.stateNode.state.m + 3 : Math.abs(60-<Timer />._owner.stateNode.state.m - 3)}
                                        </li>
                                    </ul>

                                    <ul>
                                        <li style={{opacity: 0.2}}>
                                            {<Timer />._owner.stateNode.state.s - 2>=0 ? <Timer />._owner.stateNode.state.s - 2 : 60+<Timer />._owner.stateNode.state.s - 2}
                                        </li>
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
                                        <li style={{opacity: 0.2}}>
                                            {<Timer />._owner.stateNode.state.s + 2<=59 ? <Timer />._owner.stateNode.state.s + 2 : Math.abs(60-<Timer />._owner.stateNode.state.s - 2)}
                                        </li>
                                        <li style={{opacity: 0.1}}>
                                            {<Timer />._owner.stateNode.state.s + 3<=59 ? <Timer />._owner.stateNode.state.s + 3 : Math.abs(60-<Timer />._owner.stateNode.state.s - 3)}
                                        </li>
                                    </ul>
                                </React.Fragment>
                            )}
                        </Timer>
                    </div>
                    <div className="total">
                        <p className="p3">
                            Sum total
                        </p>
                        <div className="sum-total">
                            <div className="total-info">
                                <img src={require("../img/money.png")} alt="money"/>
                                <p className="p4" id="lalla">
                                    <span>100000$</span><br/> Bank
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
                    <SimpleSlider/>
                    {/*<div className="slider">*/}
                    {/*</div>*/}
                </div>
            </section>
            <section className="section" id="section2">
                <div className="container">
                    <div className="section22">
                        <div className="participants">
                            <div className="title">
                                <img src={require("../img/men2.png")} alt="men"/>
                                <p>Total participants<br/> <span>1000000</span></p>
                            </div>
                            <div className="accounts">
                                <div>
                                    <p className="p6">1</p>
                                    <div className="avatar">
                                        <div className="elipse2">
                                            <img src={require("../img/user.jpg")}/>
                                        </div>
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
                            {/*<a onClick={(e)=>methods.sendEther("0x6a2a6cB905957f6cD41AF76EFA883D65B3DbBbfD", 31654894231002000)}>*/}
                            {/*    <div className="btn">*/}
                            {/*        КУПИТЬ*/}
                            {/*    </div>*/}
                            {/*</a>*/}
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