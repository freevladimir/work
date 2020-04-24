import React, {useCallback, useContext, useEffect, useState} from 'react'
import '../css/friends.css'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
export const FriendsPage = ()=>{
    const { token } = useContext(AuthContext);
    const { loading, request } = useHttp();
    const [name, setName] = useState([]);
    const [friends, setFriends] = useState([]);
    const getUserData = useCallback(async () => {
        try {
            const fetched = await request("/api/auth/allgames", "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            setName(fetched[0].name);
            console.log("data on allgames: ", fetched);
        } catch (e) {}
    }, [token, request]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    const getAllFriends = useCallback(async () => {
        try {
            const fetched = await request("/api/auth/friends", "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            console.log("data on all Friends: ", fetched);
            // const listItems = fetched.map((number) =>
            //     <li>{number}</li>
            // );


            setFriends(fetched)
        } catch (e) {}
    }, [token, request]);

    useEffect(() => {
        getAllFriends();
    }, [getAllFriends]);

    return (
        <div className="friends">
            <video id="videoBG" poster="../img/bg.png" autoPlay muted loop>
                <source src={require("../img/background.mp4")} type="video/mp4"/>
            </video>
            <header className="hedaer" id="header">
                <div className="container">
                    <div className="account">
                        <NavLink to="/allgames">
                            <img className="left" src={require("../img/left.png")} alt="left"/>
                        </NavLink>
                        <div className="elipse">
                            <div className="elipse3"></div>
                        </div>
                        <p className="p1">
                            {name}
                        </p>
                        <i className="fa fa-sign-out fa-2x" aria-hidden="true"></i>
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
                    {friends.map((item, index) => (
                        <div className="comp">
                            <div className="elipse_">
                                <div className="elipse3_"></div>
                            </div>
                            <div className="text">
                                <p className="p3">
                                    {item.name}
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

                    ))}
                </div>
            </section>
        </div>
    )
}