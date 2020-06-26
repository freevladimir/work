import React, { useCallback, useContext, useEffect, useState } from "react";
import "../css/game.css";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import SimpleSlider from "./Slider";
import config from "../config/default";
import getAllValues, {
    metamask,
    web3,
    SevenTOP,
    userAddress,
    changeUser,
    loadingBlockchain,
    connectMetaMask
} from "../utils/connectBlockchain";
import {AppStoreContext} from "../App";
import {observer} from "mobx-react";
import TimerGame from "../components/Timer";
import {NavLink, useHistory} from "react-router-dom";
import Slider from "react-slick";
import {ImageUpload} from "../components/Upload";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const OneMonth = () => {
    const store = useContext(AppStoreContext)

    const auth = useContext(AuthContext)
    const history = useHistory()
    const arrayOfSlides = [
        { value: "5 $" }
    ];
    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
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
    }
  const generateHash = (string)=> {
    let hash = 0;
    if (string.length == 0)
        return hash;
    for (let i = 0; i < string.length; i++) {
        var charCode = string.charCodeAt(i);
        hash = ((hash << 7) - hash) + charCode;
        hash = hash & hash;
    }
    return Math.abs(hash);
  }
    const [membersName, setMembers] = useState([]);
    const [name, setName] = useState([]);
    const [id, setId] = useState([]);
    const { token } = useContext(AuthContext);
    const { loading, request } = useHttp();
    const [referal, setReferal] = useState([]);
    const [img, setImg] = useState([])
    const [countOfFriends, setFriends] = useState([]);
    const [countOfUsers, setUsers] = useState([]);
    const [showResults, setShowResults] = useState(false)
    const show = () => setShowResults(true)
    const hide = () => setShowResults(false)
    const [contractAddress, setContractAddress] = useState([]);
    const [ticketPrice, setTicketPrice] = useState([]);
    
//    if(userAddress){
//        window.ethereum.on("accountsChanged", function (accounts) {
 //           changeUser(accounts[0])
            // Time to reload your interface with accounts[0]!
//            console.log("change account: ", userAddress);
//            getAllValues(store.currentLotteryName, store.contractIndex).then((data) => {
//                window.data = data;
//            });
//        });
//    }
    const getLotteryName = useCallback(async ()=>{
        store.changeGame('month')
    }, [store])

    useEffect(() => {
        getLotteryName()
    }, [getLotteryName])

    const getEtherPrice = async () => {
        if (web3) {
            let result
            await SevenTOP.methods.ethPrice().call({}, (err, res) => {
                if (res) {
                    result = res;
                } else if (err) {
                    console.log("This is error: ", err);
                    result = null;
                }
            })
            return result
        }
    }

    const buyTicket = async () => {
        await connectMetaMask()
        console.log(config[store.currentLotteryName].addresses[store.contractIndex].addressValue)
        console.log(config[store.currentLotteryName].addresses[store.contractIndex].amount)
        const ethPrice  = await getEtherPrice()
        const value = config[store.currentLotteryName].addresses[store.contractIndex].amount/ethPrice
        if(metamask){
            // let referral = await request('/api/auth/ref', 'GET', {members})
            metamask.eth.sendTransaction(
                {
                    to: config[store.currentLotteryName].addresses[store.contractIndex].addressValue,
                    from: userAddress,
                    value: web3.utils.toWei(String(Math.ceil((value)*10000)/10000), "ether"),
                    data: referal?referal:''
                },
                function (error, res) {
                    console.log(error)
                    console.log(res)
                }
            )
        } else {
            setTicketPrice(String(Math.ceil((value)*10000)/10000).replace(".",","))
            setContractAddress(config[store.currentLotteryName].addresses[store.contractIndex].addressValue)
            show()
            // alert(`Copy address of lottery: ${config[store.currentLotteryName].addresses[store.contractIndex].addressValue}\n\Ticket price: ${Math.ceil((value)*10000)/10000} ETH`)
        }
    };

    function shortAddress(address) {
        if (address) return address.substr(0, 6) + "..." + address.substr(38, 4)
    }

    const getUserData = useCallback(async () => {
        console.log("start1");
        try {
            console.log("start2");
            const fetched = await request("/api/auth/allgames", "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            setName(fetched[0].name);
            setId(fetched[0].wallet.substr(0, 6) + "..." + fetched[0].wallet.substr(38, 4));
            setReferal(fetched[0].friendId)
            changeUser(fetched[0].wallet)
            let _img = require(`../avatars/${fetched[0]._id}.jpg`)
            setImg(_img)
            console.log("data on allgames: ", fetched);
            console.log('referal: ', referal)
        } catch (e) {}
    }, [token, request]);

    const getMembersName = useCallback(async () => {

        try {
            const members = store.members
            await console.log(members)
            //const members = ["0x2778c6f33a0c9a20866cce84beb3e78b9dd26ae5", "0xa61427fc8cc3bed4b6c73e19abff44397f79b0e5"]
            const result = await request('/api/auth/members', 'POST', {members})
            console.log("START3");
            // setName(fetched[0].name);
            // setId(fetched[0]._id);
            console.log("MEMBERSNAMES: ", result);
            setMembers(result)
            console.log(window.data.members)
        } catch (e) {}
    }, [request]);

    const getAllUsersAndFriends = useCallback(async () =>{
        const result = await request("/api/auth/allusers", "GET", null, {
          Authorization: `Bearer ${token}`,
        });
        console.log('allUsers: ', result)
        setUsers(result.allUsers)
        setFriends(result.friends)
    }, [request])

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    useEffect(() => {
        getMembersName()
    }, [getMembersName]);

    useEffect(() => {
        getAllUsersAndFriends();
    }, [getAllUsersAndFriends]);  


    if (!store.timeEndGame) {
        return <div className="holder">
          <div className="preloader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>;
      }
    return (
        <div className="row game">
        {
            showResults?
            <div id="dataForSend">
                <p>Copy address of lottery:<i class="fa fa-times-circle copy-wallet" onClick={hide}></i></p>

                <div class="copy">
                    <input id="myWallet" type="text" value={contractAddress} readonly=""/>
                <CopyToClipboard text={contractAddress}>
                    <i class="fa fa-copy copy-wallet"></i>
                </CopyToClipboard>
                    
                </div>
                <div class="copy">
                    <p>Ticket price:</p> 
                    <input id="myWallet" type="text" value={ticketPrice} readonly=""/>
                    <CopyToClipboard text={ticketPrice}>
                        <i class="fa fa-copy copy-wallet"></i>
                    </CopyToClipboard>
                    
                </div>

            </div>:''
        }
            <section>
                <div className="container">
                    <div className="account">
                        <NavLink to="/allgames">
                            <img className="left" src={require("../img/left.png")} alt="left"/>
                        </NavLink>
                        <div className="elipse">
                            {img.length>0?
                              <div className="elipse3">
                              <input className="fileInput" name="avatar" id="fileInput"
                                />
                                <div className="imgPreview">
                                  <img src={img} />
                                </div>
                             </div>:
                             <ImageUpload/>
                            }
                        </div>
                        <p className="p1">{name}</p>
                        <a href="/" onClick={logoutHandler}><i className="fa fa-sign-out fa-2x" aria-hidden="true"></i></a>
                    </div>
                    <div className="info">
                        <NavLink to="/friends">{countOfFriends} My friends</NavLink>
                        <NavLink to="/people">{countOfUsers} All</NavLink>
                        <a>My ID: {id}</a>
                    </div>
                    <p className="p2"></p>

                    {TimerGame(store.timeEndGame)}

                    <div className="total">
                        <p className="p3">Sum total</p>
                        <div className="sum-total">
                            <div className="total-info">
                                <img src={require("../img/money.png")} alt="money" />
                                <p className="p4" id="lalla">
                                    <span>{store.balanceOfContract} $</span>
                                    <br /> Bank
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="slider-title">
                        <img src={require("../img/chelovek.png")} alt="chelovek" />
                        <p className="p5">Every month</p>
                    </div>
                    <div className="slider">
                        <Slider {...setting}>
                            {arrayOfSlides.map((item, index) => (
                                <a href="#" className="item">
                                    <p>{item.value}</p>
                                </a>
                            ))}
                        </Slider>
                    </div>

                </div>
            </section>
            {store.balanceOfContract===undefined?
            <div className="holder" style={{
                position: 'relative',
                top: 'initial',
                'margin-top': '100px'
              }}>
              <div className="preloader">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>:
            <section className="section" id="section2">
                <div className="container">
                    <div className="section22">
                        <div className="participants">
                            <div className="title">
                                <img src={require("../img/men2.png")} alt="men" />
                                <p>
                                    Total participants
                                    <br /> <span>{store.ticketsCount}</span>
                                </p>
                            </div>
                            <div className="accounts">
                                {web3 ? store.members.map((item, index) =>(
                                    <div>
                                        <p className="p6">{index+1}</p>
                                        <div className="avatar">
                                            <div className="elipse2">
                                                <img src={require(`../avatars/${store.members[index].id}.jpg`)}/>
                                            </div>
                                        </div>
                                        <div className="name">
                                            <p className="name">{item.name}</p>
                                            {/*<p className="status">Status</p>*/}
                                        </div>
                                    </div>

                                )): ''}
                            </div>
                        </div>
                        <div className="tickets">
                            <a onClick={buyTicket}>
                                <div className="btn">BUY</div>
                            </a>
                            <div className="ticket-title">
                                <img src={require("../img/ticket.png")} alt="ticket" />
                                <p className="p7">My tickets</p>
                            </div>
                            <div className="tickets_">


                                {store.myTickets ? store.myTickets.map((item, index) =>(
                                    <div>
                                        <p className="p8">№ {item}</p>
                                        <p className="p9">
                                            {store.addressName.substr(7,3)} <span> My bids</span>
                                        </p>
                                    </div>
                                )) : ''}

                            </div>
                            <hr />
                            <div className="winners">
                                <img src={require("../img/win.png")} alt="winner" />
                                <p className="p10">List of winners</p>
                            </div>

                            {store.winners[0] ?
                              <div className="winners_">
                                <div className="avatar-win">
                                  <div className="elipse4">
                                    <img src={require(`../avatars/${store.winners[0].id}.jpg`)}/>
                                  </div>
                                </div>
                                <div className="avatar-title">
                                  <p className="p11">{store.winners[0].name}</p>
                                  <div className="place">
                                    <img
                                      className="place1"
                                      src={require("../img/place1.png")}
                                      alt="place1"
                                    />
                                    <p className="p12">
                                      1 Place <span>{store.winners ? store.winners[0].sum : ''} $</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                                  : ''}

                            {store.winners[1] && store.winners[0].time===store.winners[1].time?
                                <div className="winners_">
                                    <div className="avatar-win">
                                        <div className="elipse4">
                                            <img src={require(`../avatars/${store.winners[1].id}.jpg`)}/>
                                        </div>
                                    </div>
                                    <div className="avatar-title">
                                        <p className="p11">{store.winners[0].name}</p>
                                        <div className="place">
                                            <img
                                                className="place2"
                                                src={require("../img/place2.png")}
                                                alt="place1"
                                            />
                                            <img
                                                className="place2"
                                                src={require("../img/place2.png")}
                                                alt="place1"
                                            />
                                            <p className="p12">
                                                2 Place <span>{store.winners ? store.winners[1].sum : ''} $</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                : ''}



                        </div>
                    </div>
                </div>
            </section>
            }
        </div>
    );
};

export default observer(OneMonth)
