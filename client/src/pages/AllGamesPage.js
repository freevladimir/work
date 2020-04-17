import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppStoreContext } from "../App";
import { observer } from "mobx-react";
import "../css/allGames.css";
import { NavLink, useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Timer from "react-compound-timer";
import countOfTickets from "../utils/countOfTickets";
import {getAllValues, userAddress} from "../utils/connectBlockchain";
import path from "path";



const AllGamesPage = () => {
  const store = useContext(AppStoreContext);

  const [name, setName] = useState([]);
  const [id, setId] = useState([]);
  const [fileImg, setImg] = useState([]);
  const { token } = useContext(AuthContext);
  const { loading, request } = useHttp();
  const getUserData = useCallback(async () => {
    store.changeGame('limitLottery')
    console.log("start1");
    try {
      console.log("start2");
      const fetched = await request("/api/auth/allgames", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("start3");
      setName(fetched[0].name);
      setId(fetched[0]._id);
      setImg(fetched[0].userImg);
      console.log("data on allgames: ", fetched);
    } catch (e) {}
  }, [token, request, store]);

  const uploadAvatar = useCallback(async (req, res) => {
    await request("/api/auth/upload", "POST", fileImg);
  });

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const changeHandler = async (event) => {
    setImg(event.target.value);
    await request("/api/auth/upload", "POST", fileImg);
    console.log(fileImg);
  };
  // const updateAvatarHandler = async () =>{
  //     try{
  //         const data = await request('/api/auth/avatar', 'POST', {...form})
  //         message(data.message)
  //         console.log('Data', data)
  //         await loginHandler()
  //     } catch (e) {}
  // }

  if (loading) {
    return <div>Loading</div>;
  }
  return (
      <div className="allgames">
        <video id="videoBG" poster={require("../img/bg.png")} autoPlay muted loop>
          <source src={require("../img/background.mp4")} type="video/mp4" />
        </video>
        <header className="header" id="header">
          <div className="container">
            <div className="account">
              <div className="elipse">
                <div className="elipse3">
                  <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={changeHandler}
                  />
                </div>
              </div>
              <p className="p1">{name}</p>
              <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
            </div>
            <div className="info">
              <a href="#">100 My friends</a>
              <a href="#">1000 All</a>
              <a href="#">My ID: {id}</a>
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
                  <img src={require("../img/chelovek.png")} alt="chelovek" />
                </div>
                <NavLink to="/limitGame">
                  <div className="btn">
                    <p className="p3">PLAY {store.bankForLimit[0]?(store.bankForLimit[0]/1e18).toFixed(0):0 }$</p>
                  </div>
                </NavLink>
                <div className="title2">
                  <div className="top">
                    <img src={require("../img/men2.png")} alt="men" />
                    <p className="p4">{store.allTickets[0]?store.allTickets[0]:''}</p>
                  </div>
                  <p className="p5">Human</p>
                </div>
              </div>
              <div className="comp2">
                <div className="timer">
                  <Timer initialTime={65000} direction="backward">
                    {() => (
                        <React.Fragment>
                          <ul>
                            <li style={{ color: "#979797" }}>
                              {(<Timer />)._owner.stateNode.state.m - 1 >= 0
                                  ? (<Timer />)._owner.stateNode.state.m - 1
                                  : 60 + (<Timer />)._owner.stateNode.state.m - 1}
                            </li>
                            <hr />
                            <li>
                              <Timer.Minutes /> min
                            </li>
                            <hr />
                            <li style={{ color: "#979797" }}>
                              {(<Timer />)._owner.stateNode.state.m + 1 <= 59
                                  ? (<Timer />)._owner.stateNode.state.m + 1
                                  : Math.abs(
                                      60 - (<Timer />)._owner.stateNode.state.m - 1
                                  )}
                            </li>
                          </ul>
                          <ul>
                            <li style={{ color: "#979797" }}>
                              {(<Timer />)._owner.stateNode.state.s - 1 >= 0
                                  ? (<Timer />)._owner.stateNode.state.s - 1
                                  : 60 + (<Timer />)._owner.stateNode.state.s - 1}
                            </li>
                            <hr />
                            <li>
                              <Timer.Seconds /> sec
                            </li>
                            <hr />
                            <li style={{ color: "#979797" }}>
                              {(<Timer />)._owner.stateNode.state.s + 1 <= 59
                                  ? (<Timer />)._owner.stateNode.state.s + 1
                                  : Math.abs(
                                      60 - (<Timer />)._owner.stateNode.state.s - 1
                                  )}
                            </li>
                          </ul>
                        </React.Fragment>
                    )}
                  </Timer>
                </div>
                <div className="blok2">
                  <div className="title3">
                    <img src={require("../img/minute2.png")} alt="minute" />
                    <p className="p6">Every 5 minutes</p>
                  </div>
                  <NavLink to="/5minutes">
                    <div className="btn">
                      <p className="p3">PLAY {store.bankForLimit[1]?(store.bankForLimit[1]/1e18).toFixed(0) :0 }$</p>
                    </div>
                  </NavLink>
                </div>
                <div className="title2">
                  <div className="top">
                    <img src={require("../img/men2.png")} alt="men" />
                    <p className="p4">{store.allTickets[1]?store.allTickets[1]:''}</p>
                  </div>
                  <p className="p5">Human</p>
                </div>
              </div>
              <div className="comp2">
                <div className="timer">
                  <Timer initialTime={1800000} direction="backward">
                    {() => (
                        <React.Fragment>
                          <ul>
                            <li style={{ color: "#979797" }}>
                              {(<Timer />)._owner.stateNode.state.m - 1 >= 0
                                  ? (<Timer />)._owner.stateNode.state.m - 1
                                  : 60 + (<Timer />)._owner.stateNode.state.m - 1}
                            </li>
                            <hr />
                            <li>
                              <Timer.Minutes /> min
                            </li>
                            <hr />
                            <li style={{ color: "#979797" }}>
                              {(<Timer />)._owner.stateNode.state.m + 1 <= 59
                                  ? (<Timer />)._owner.stateNode.state.m + 1
                                  : Math.abs(
                                      60 - (<Timer />)._owner.stateNode.state.m - 1
                                  )}
                            </li>
                          </ul>
                          <ul>
                            <li style={{ color: "#979797" }}>
                              {(<Timer />)._owner.stateNode.state.s - 1 >= 0
                                  ? (<Timer />)._owner.stateNode.state.s - 1
                                  : 60 + (<Timer />)._owner.stateNode.state.s - 1}
                            </li>
                            <hr />
                            <li>
                              <Timer.Seconds /> sec
                            </li>
                            <hr />
                            <li style={{ color: "#979797" }}>
                              {(<Timer />)._owner.stateNode.state.s + 1 <= 59
                                  ? (<Timer />)._owner.stateNode.state.s + 1
                                  : Math.abs(
                                      60 - (<Timer />)._owner.stateNode.state.s - 1
                                  )}
                            </li>
                          </ul>
                        </React.Fragment>
                    )}
                  </Timer>
                </div>
                <div className="blok2">
                  <div className="title3">
                    <img src={require("../img/hour2.png")} alt="minute" />
                    <p className="p6">Each hour</p>
                  </div>
                  <NavLink to="/oneHour">
                    <div className="btn">
                      <p className="p3">PLAY {store.bankForLimit[2]?(store.bankForLimit[2]/1e18).toFixed(0):0 }$</p>
                    </div>
                  </NavLink>
                </div>
                <div className="title2">
                  <div className="top">
                    <img src={require("../img/men2.png")} alt="men" />
                    <p className="p4">{store.allTickets[2]?store.allTickets[2]:''}</p>
                  </div>
                  <p className="p5">Human</p>
                </div>
              </div>
            </div>
            <div className="comp2">
              <div className="timer">
                <Timer initialTime={3605000} direction="backward">
                  {() => (
                      <React.Fragment>
                        <ul>
                          <li style={{ color: "#979797" }}>
                            {(<Timer />)._owner.stateNode.state.h - 1 >= 0
                                ? (<Timer />)._owner.stateNode.state.h - 1
                                : 24 + (<Timer />)._owner.stateNode.state.h - 1}
                          </li>
                          <hr />
                          <li>
                            <Timer.Hours /> day
                          </li>
                          <hr />
                          <li style={{ color: "#979797" }}>
                            {(<Timer />)._owner.stateNode.state.h + 1 <= 23
                                ? (<Timer />)._owner.stateNode.state.h + 1
                                : Math.abs(
                                    24 - (<Timer />)._owner.stateNode.state.h - 1
                                )}
                          </li>
                        </ul>
                        <ul>
                          <li style={{ color: "#979797" }}>
                            {(<Timer />)._owner.stateNode.state.m - 1 >= 0
                                ? (<Timer />)._owner.stateNode.state.m - 1
                                : 60 + (<Timer />)._owner.stateNode.state.m - 1}
                          </li>
                          <hr />
                          <li>
                            <Timer.Minutes /> min
                          </li>
                          <hr />
                          <li style={{ color: "#979797" }}>
                            {(<Timer />)._owner.stateNode.state.m + 1 <= 59
                                ? (<Timer />)._owner.stateNode.state.m + 1
                                : Math.abs(
                                    60 - (<Timer />)._owner.stateNode.state.m - 1
                                )}
                          </li>
                        </ul>
                      </React.Fragment>
                  )}
                </Timer>
              </div>
              <div className="blok2">
                <div className="title3">
                  <img src={require("../img/calendar.png")} alt="minute" />
                  <p className="p6">Every day</p>
                </div>
                <NavLink to="/oneDay">
                  <div className="btn">
                    <p className="p3">PLAY {store.bankForLimit[3]?(store.bankForLimit[3]/1e18).toFixed(0):0 }$</p>
                  </div>
                </NavLink>
              </div>
              <div className="title2">
                <div className="top">
                  <img src={require("../img/men2.png")} alt="men" />
                  <p className="p4">{store.allTickets[3]?store.allTickets[3]:''}</p>
                </div>
                <p className="p5">Human</p>
              </div>
            </div>
            <div className="comp2">
              <div className="timer">
                <Timer initialTime={86405000} direction="backward">
                  {() => (
                      <React.Fragment>
                        <ul>
                          <li style={{ color: "#979797" }}>
                            {(<Timer />)._owner.stateNode.state.d - 1 >= 0
                                ? (<Timer />)._owner.stateNode.state.d - 1
                                : 0}
                          </li>
                          <hr />
                          <li>
                            <Timer.Days /> day
                          </li>
                          <hr />
                          <li style={{ color: "#979797" }}>
                            {(<Timer />)._owner.stateNode.state.d + 1}
                          </li>
                        </ul>
                        <ul>
                          <li style={{ color: "#979797" }}>
                            {(<Timer />)._owner.stateNode.state.h - 1 >= 0
                                ? (<Timer />)._owner.stateNode.state.h - 1
                                : 24 + (<Timer />)._owner.stateNode.state.h - 1}
                          </li>
                          <hr />
                          <li>
                            <Timer.Hours /> hour
                          </li>
                          <hr />
                          <li style={{ color: "#979797" }}>
                            {(<Timer />)._owner.stateNode.state.h + 1 <= 23
                                ? (<Timer />)._owner.stateNode.state.h + 1
                                : Math.abs(
                                    60 - (<Timer />)._owner.stateNode.state.h - 1
                                )}
                          </li>
                        </ul>
                      </React.Fragment>
                  )}
                </Timer>
              </div>
              <div className="blok2">
                <div className="title3">
                  <img src={require("../img/day2.png")} alt="minute" />
                  <p className="p6">Every week</p>
                </div>
                <NavLink to="/oneWeek">
                  <div className="btn">
                    <p className="p3">PLAY {store.bankForLimit[4]?(store.bankForLimit[4]/1e18).toFixed(0):0 }$</p>
                  </div>
                </NavLink>
              </div>
              <div className="title2">
                <div className="top">
                  <img src={require("../img/men2.png")} alt="men" />
                  <p className="p4">{store.allTickets[4]?store.allTickets[4]:''}</p>
                </div>
                <p className="p5">Human</p>
              </div>
            </div>
            <div className="comp2">
              <div className="timer">
                <Timer initialTime={86405000} direction="backward">
                  {() => (
                      <React.Fragment>
                        <ul>
                          <li style={{ color: "#979797" }}>
                            {(<Timer />)._owner.stateNode.state.d - 1 >= 0
                                ? (<Timer />)._owner.stateNode.state.d - 1
                                : 0}
                          </li>
                          <hr />
                          <li>
                            <Timer.Days /> day
                          </li>
                          <hr />
                          <li style={{ color: "#979797" }}>
                            {(<Timer />)._owner.stateNode.state.d + 1}
                          </li>
                        </ul>
                        <ul>
                          <li style={{ color: "#979797" }}>
                            {(<Timer />)._owner.stateNode.state.h - 1 >= 0
                                ? (<Timer />)._owner.stateNode.state.h - 1
                                : 24 + (<Timer />)._owner.stateNode.state.h - 1}
                          </li>
                          <hr />
                          <li>
                            <Timer.Hours /> hour
                          </li>
                          <hr />
                          <li style={{ color: "#979797" }}>
                            {(<Timer />)._owner.stateNode.state.h + 1 <= 23
                                ? (<Timer />)._owner.stateNode.state.h + 1
                                : Math.abs(
                                    60 - (<Timer />)._owner.stateNode.state.h - 1
                                )}
                          </li>
                        </ul>
                      </React.Fragment>
                  )}
                </Timer>
              </div>
              <div className="blok2">
                <div className="title3">
                  <img src={require("../img/calendar2.png")} alt="minute" />
                  <p className="p6">Every month</p>
                </div>
                <NavLink to="/oneMonth">
                  <div className="btn">
                    <p className="p3">PLAY {store.bankForLimit[5]?(store.bankForLimit[5]/1e18).toFixed(0):0 }$</p>
                  </div>
                </NavLink>
              </div>
              <div className="title2">
                <div className="top">
                  <img src={require("../img/men2.png")} alt="men" />
                  <p className="p4">{store.allTickets[5]?store.allTickets[5]:''}</p>
                </div>
                <p className="p5">Human</p>
              </div>
            </div>
            <div className="comp2 comp3">
              <div className="blok2">
                <div className="title3 title_">
                  <img src={require("../img/calendar2.png")} alt="minute" />
                  <p className="p6">Every year</p>
                </div>
                <div className="timer">
                  <Timer initialTime={86405000} direction="backward">
                    {() => (
                        <React.Fragment>
                          <ul>
                            <li style={{ color: "#979797" }}>
                              {(<Timer />)._owner.stateNode.state.d - 1 >= 0
                                  ? (<Timer />)._owner.stateNode.state.d - 1
                                  : 0}
                            </li>
                            <hr />
                            <li>
                              <Timer.Days /> day
                            </li>
                            <hr />
                            <li style={{ color: "#979797" }}>
                              {(<Timer />)._owner.stateNode.state.d + 1}
                            </li>
                          </ul>
                          <ul>
                            <li style={{ color: "#979797" }}>
                              {(<Timer />)._owner.stateNode.state.h - 1 >= 0
                                  ? (<Timer />)._owner.stateNode.state.h - 1
                                  : 24 + (<Timer />)._owner.stateNode.state.h - 1}
                            </li>
                            <hr />
                            <li>
                              <Timer.Hours /> hour
                            </li>
                            <hr />
                            <li style={{ color: "#979797" }}>
                              {(<Timer />)._owner.stateNode.state.h + 1 <= 23
                                  ? (<Timer />)._owner.stateNode.state.h + 1
                                  : Math.abs(
                                      60 - (<Timer />)._owner.stateNode.state.h - 1
                                  )}
                            </li>
                          </ul>
                        </React.Fragment>
                    )}
                  </Timer>
                </div>
              </div>
              <div className="blok3">
                <div className="title3">
                  <img src={require("../img/gavat.png")} alt="gavat" />
                  <p className="p6">Super game</p>
                  <p className="p5 p5_">Human</p>
                  <div className="top">
                    <img
                        className="men_"
                        src={require("../img/men2.png")}
                        alt="men"
                    />
                    <p className="p4">{store.allTickets[6]?store.allTickets[6]:''}</p>
                  </div>
                </div>
                <NavLink to="/oneYear">
                  <div className="btn">
                    <p className="p3">PLAY {store.bankForLimit[6]?(store.bankForLimit[6]/1e18).toFixed(0):0 }$</p>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="video">
              <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
            </div>
          </div>
        </section>
      </div>
  );
};

export default observer(AllGamesPage);
