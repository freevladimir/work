import React, { useCallback, useContext, useEffect, useState } from "react";
// import Iframe from '../../react-iframe'
import "../css/game.css";
import { NavLink, useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Timer from "react-compound-timer";
import SimpleSlider from "./Slider";
import Web3 from "web3";
import config from "../config/default";
import ReactDOM from "react-dom";
import getAllValues, {
  metamask,
  web3,
  addressLottery,
  abi,
  Lottery,
  SevenTOP,
  userAddress,
  changeUser,
  loadingBlockchain
} from "../utils/connectBlockchain";
import {AppStoreContext} from "../App";
import {observer} from "mobx-react";
import getMembers from "../utils/members";
import Slider from "react-slick";
import {ImageUpload} from "../components/Upload";

  

const LimitGame = () => {
  const store = useContext(AppStoreContext)

  const auth = useContext(AuthContext)
  const history = useHistory()
  const arrayOfSlides = [
    { value: "5 $" },
    { value: "15 $" },
    { value: "50 $" }
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


  const [membersStruct, setMembers] = useState([]);
  const [name, setName] = useState([]);
  const [id, setId] = useState([]);
  const { token } = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [referal, setReferal] = useState([]);
  const [img, setImg] = useState([])
  const [avatars, setAvatars] = useState([])
  const [countOfFriends, setFriends] = useState([]);
  const [countOfUsers, setUsers] = useState([]);
  
if(userAddress){
  window.ethereum.on("accountsChanged", function (accounts) {
    changeUser(accounts[0])
    // Time to reload your interface with accounts[0]!
    console.log("change account: ", userAddress);
    getAllValues(store.currentLotteryName, store.contractIndex).then((data) => {
      window.data = data;
    });
  });
}



  const getLotteryName = useCallback(async ()=>{
    store.changeGame('limitLottery')
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
    console.log(config[store.currentLotteryName].addresses[store.contractIndex].addressValue)
    console.log(config[store.currentLotteryName].addresses[store.contractIndex].amount)
    const ethPrice  = await getEtherPrice()
    const value = config[store.currentLotteryName].addresses[store.contractIndex].amount/ethPrice
    metamask.eth.sendTransaction(
      {
        to: config[store.currentLotteryName].addresses[store.contractIndex].addressValue,
        from: metamask.givenProvider.selectedAddress,
        value: web3.utils.toWei(String(value), "ether"),
        data: referal?referal:''
      },
      function (error, res) {
        console.log(error)
        console.log(res)
      }
    )
  };

  function shortAddress(address) {
    if (address) return address.substr(0, 6) + "..." + address.substr(38, 4)
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
  
  const getUserData = useCallback(async () => {
    console.log("start1");
    try {
      console.log("start2");
      const fetched = await request("/api/auth/allgames", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setName(fetched[0].name);
      setId(generateHash(fetched[0]._id));
      setReferal(fetched[0].friendId)
      let _img = require(`../avatars/${fetched[0]._id}.jpg`)
      setImg(_img)
      console.log("data on allgames: ", fetched);

    } catch (e) {}
  }, [token, request]);

  const getMembersName = useCallback(async () => {
    let members = store.members
    if(members==false){
      members = store.members
      console.log("try again")
      setTimeout(getMembersName, 1000)
    } else{
      try {
        console.log(members==false)
        console.log(members)
        const result = await request('/api/auth/members', 'POST', {members})
        console.log("START3");
        console.log("result: ", result)

        for(let i = 0; i<result.length; i++){
          membersStruct.push(result[i]);
          setMembers(membersStruct)

        }
        console.log('membersStruct: ', membersStruct)
      } catch (e) {}
    }

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
    getMembersName();
  }, [getMembersName]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    getAllUsersAndFriends();
  }, [getAllUsersAndFriends]);




  if (!store.addressName) {
    return <div className="holder">
      <div className="preloader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>;
  }
  return (
    <div className="row game">
      <video id="videoBG" poster={require("../img/bg.png")} autoPlay muted loop>
        <source src={require("../img/background.mp4")} type="video/mp4" />
      </video>
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
            <a href="#">My ID: {id}</a>
          </div>
          <p className="p2"></p>
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
            <p className="p5">Every 10 people</p>
          </div>
          <Slider {...setting}>
            {arrayOfSlides.map((item, index) => (
                <a href="#" className="item">
                  <p>{item.value}</p>
                </a>
            ))}
          </Slider>

        </div>
      </section>
      {loadingBlockchain?
        <div className="holder">
          <div className="preloader" style={{
            left: '50%',
            bottom: '8%',
            top: 'initial'
          }}>
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
                {membersStruct ? membersStruct.map((item, index) =>(
                    <div>
                      <p className="p6">{index+1}</p>
                      <div className="avatar">
                        <div className="elipse2">
                          <img src={require(`../avatars/${membersStruct[index].id}.jpg`)}/>
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
                <div className="btn">КУПИТЬ</div>
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
                  <div className="elipse4"></div>
                </div>
                <div className="avatar-title">
                  <p className="p11">{shortAddress(store.winners[0][0])}</p>
                  <div className="place">
                    <img
                      className="place1"
                      src={require("../img/place1.png")}
                      alt="place1"
                    />
                    <p className="p12">
                      1 Place <span>{store.winners ? store.winners[0][2] : ''} $</span>
                    </p>
                  </div>
                </div>
              </div>
                  : ''}

              {/*<div className="winners_">*/}
              {/*  <div className="avatar-win">*/}
              {/*    <div className="elipse4"></div>*/}
              {/*  </div>*/}
              {/*  <div className="avatar-title">*/}
              {/*    <p className="p11">Account name №1</p>*/}
              {/*    <div className="place">*/}
              {/*      <img*/}
              {/*        className="place2"*/}
              {/*        src={require("../img/place2.png")}*/}
              {/*        alt="place1"*/}
              {/*      />*/}
              {/*      <img*/}
              {/*        className="place2"*/}
              {/*        src={require("../img/place2.png")}*/}
              {/*        alt="place1"*/}
              {/*      />*/}
              {/*      <p className="p12">*/}
              {/*        1 Place <span>1000 $</span>*/}
              {/*      </p>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}


            </div>
          </div>
          </div>
      </section>
      }
      
    </div>
  );
};

export default observer(LimitGame)