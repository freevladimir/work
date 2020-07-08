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
  userAddress, connectBlockChain,
  changeUser
} from "../utils/connectBlockchain";
import {AppStoreContext} from "../App";
import {observer} from "mobx-react";
import getMembers from "../utils/members";
const GamePage = () => {
  const store = useContext(AppStoreContext)

  const [membersName, setMembers] = useState([]);
  const [name, setName] = useState([]);
  const [id, setId] = useState([]);
  const { token } = useContext(AuthContext);
  const { loading, request } = useHttp();
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
        value: web3.utils.toWei(String(value), "ether")
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

  const getUserData = useCallback(async () => {
    console.log("start1");
    try {
      console.log("start2");
      const fetched = await request("/api/auth/allgames", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setName(fetched[0].name);
      setId(fetched[0]._id);
      console.log("data on allgames: ", fetched);
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

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    getMembersName()
  }, [getMembersName]);

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div className="row game">
      <section>
        <div className="container">
          <div className="account">
            <div className="elipse">
              <div className="elipse3"></div>
            </div>
            <p className="p1">{name}</p>
            <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
          </div>
          <div className="info">
            <a href="#">100 My friends</a>
            <a href="#">1000 All</a>
            <a>My ID: {id}</a>
          </div>
          <p className="p2"></p>
          {/*<div className="timer">*/}
          {/*  <Timer initialTime={86405000} direction="backward">*/}
          {/*    {() => (*/}
          {/*      <React.Fragment>*/}
          {/*        <ul>*/}
          {/*          <li style={{ opacity: 0.2 }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.h - 2 >= 0*/}
          {/*              ? (<Timer />)._owner.stateNode.state.h - 2*/}
          {/*              : 24 + (<Timer />)._owner.stateNode.state.h - 2}*/}
          {/*          </li>*/}
          {/*          <li style={{ color: "#979797" }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.h - 1 >= 0*/}
          {/*              ? (<Timer />)._owner.stateNode.state.h - 1*/}
          {/*              : 24 + (<Timer />)._owner.stateNode.state.h - 1}*/}
          {/*          </li>*/}
          {/*          <hr />*/}
          {/*          <li>*/}
          {/*            <Timer.Hours /> h*/}
          {/*          </li>*/}
          {/*          <hr />*/}
          {/*          <li style={{ color: "#979797" }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.h + 1 <= 23*/}
          {/*              ? (<Timer />)._owner.stateNode.state.h + 1*/}
          {/*              : Math.abs(*/}
          {/*                  24 - (<Timer />)._owner.stateNode.state.h - 1*/}
          {/*                )}*/}
          {/*          </li>*/}
          {/*          <li style={{ opacity: 0.2 }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.h + 2 <= 23*/}
          {/*              ? (<Timer />)._owner.stateNode.state.h + 2*/}
          {/*              : Math.abs(*/}
          {/*                  24 - (<Timer />)._owner.stateNode.state.h - 2*/}
          {/*                )}*/}
          {/*          </li>*/}
          {/*          <li style={{ opacity: 0.1 }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.h + 3 <= 23*/}
          {/*              ? (<Timer />)._owner.stateNode.state.h + 3*/}
          {/*              : Math.abs(*/}
          {/*                  24 - (<Timer />)._owner.stateNode.state.h - 3*/}
          {/*                )}*/}
          {/*          </li>*/}
          {/*        </ul>*/}
          {/*        <ul>*/}
          {/*          <li style={{ opacity: 0.2 }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.m - 2 >= 0*/}
          {/*              ? (<Timer />)._owner.stateNode.state.m - 2*/}
          {/*              : 60 + (<Timer />)._owner.stateNode.state.m - 2}*/}
          {/*          </li>*/}
          {/*          <li style={{ color: "#979797" }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.m - 1 >= 0*/}
          {/*              ? (<Timer />)._owner.stateNode.state.m - 1*/}
          {/*              : 60 + (<Timer />)._owner.stateNode.state.m - 1}*/}
          {/*          </li>*/}
          {/*          <hr />*/}
          {/*          <li>*/}
          {/*            <Timer.Minutes /> min*/}
          {/*          </li>*/}
          {/*          <hr />*/}
          {/*          <li style={{ color: "#979797" }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.m + 1 <= 59*/}
          {/*              ? (<Timer />)._owner.stateNode.state.m + 1*/}
          {/*              : Math.abs(*/}
          {/*                  60 - (<Timer />)._owner.stateNode.state.m - 1*/}
          {/*                )}*/}
          {/*          </li>*/}
          {/*          <li style={{ opacity: 0.2 }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.m + 2 <= 59*/}
          {/*              ? (<Timer />)._owner.stateNode.state.m + 2*/}
          {/*              : Math.abs(*/}
          {/*                  60 - (<Timer />)._owner.stateNode.state.m - 2*/}
          {/*                )}*/}
          {/*          </li>*/}
          {/*          <li style={{ opacity: 0.1 }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.m + 3 <= 59*/}
          {/*              ? (<Timer />)._owner.stateNode.state.m + 3*/}
          {/*              : Math.abs(*/}
          {/*                  60 - (<Timer />)._owner.stateNode.state.m - 3*/}
          {/*                )}*/}
          {/*          </li>*/}
          {/*        </ul>*/}

          {/*        <ul>*/}
          {/*          <li style={{ opacity: 0.2 }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.s - 2 >= 0*/}
          {/*              ? (<Timer />)._owner.stateNode.state.s - 2*/}
          {/*              : 60 + (<Timer />)._owner.stateNode.state.s - 2}*/}
          {/*          </li>*/}
          {/*          <li style={{ color: "#979797" }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.s - 1 >= 0*/}
          {/*              ? (<Timer />)._owner.stateNode.state.s - 1*/}
          {/*              : 60 + (<Timer />)._owner.stateNode.state.s - 1}*/}
          {/*          </li>*/}
          {/*          <hr />*/}
          {/*          <li>*/}
          {/*            <Timer.Seconds /> sec*/}
          {/*          </li>*/}
          {/*          <hr />*/}
          {/*          <li style={{ color: "#979797" }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.s + 1 <= 59*/}
          {/*              ? (<Timer />)._owner.stateNode.state.s + 1*/}
          {/*              : Math.abs(*/}
          {/*                  60 - (<Timer />)._owner.stateNode.state.s - 1*/}
          {/*                )}*/}
          {/*          </li>*/}
          {/*          <li style={{ opacity: 0.2 }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.s + 2 <= 59*/}
          {/*              ? (<Timer />)._owner.stateNode.state.s + 2*/}
          {/*              : Math.abs(*/}
          {/*                  60 - (<Timer />)._owner.stateNode.state.s - 2*/}
          {/*                )}*/}
          {/*          </li>*/}
          {/*          <li style={{ opacity: 0.1 }}>*/}
          {/*            {(<Timer />)._owner.stateNode.state.s + 3 <= 59*/}
          {/*              ? (<Timer />)._owner.stateNode.state.s + 3*/}
          {/*              : Math.abs(*/}
          {/*                  60 - (<Timer />)._owner.stateNode.state.s - 3*/}
          {/*                )}*/}
          {/*          </li>*/}
          {/*        </ul>*/}
          {/*      </React.Fragment>*/}
          {/*    )}*/}
          {/*  </Timer>*/}
          {/*</div>*/}
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
          <SimpleSlider />

        </div>
      </section>
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
                        <div className="elipse2"></div>
                      </div>
                      <div className="name">
                        <p className="name">{shortAddress(item)}</p>
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

              {store.winners ?
              <div className="winners_">
                <div className="avatar-win">
                  <div className="elipse4"></div>
                </div>
                <div className="avatar-title">
                  <p className="p11">{shortAddress(store.winners[0])}</p>
                  <div className="place">
                    <img
                      className="place1"
                      src={require("../img/place1.png")}
                      alt="place1"
                    />
                    <p className="p12">
                      1 Place <span>{store.winners ? store.winners[1] : ''} $</span>
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
    </div>
  );
};

export default observer(GamePage)