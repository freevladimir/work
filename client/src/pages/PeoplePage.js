import React, {useCallback, useContext, useEffect, useState} from 'react'
import '../css/people.css'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
export const PeoplePage = ()=>{
    const { token } = useContext(AuthContext);
    const { loading, request } = useHttp();
    const [name, setName] = useState([]);
    const [users, setUsers] = useState([]);
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

    const getAllUsers = useCallback(async () => {
        try {
            const fetched = await request("/api/link/allusers", "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            console.log("data on all Users: ", fetched);
            // const listItems = fetched.map((number) =>
            //     <li>{number}</li>
            // );


            setUsers(fetched)
        } catch (e) {}
    }, [token, request]);

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);
    return (
        <div className="people">
            <video id="videoBG" poster="../img/bg.png" autoPlay muted loop>
                <source src={require("../img/background.mp4")} type="video/mp4"/>
            </video>
            <header className="header" id="header">
                <div className="container">
                    <div className="account">
                        <a href="#">
                            <img className="left" src={require("../img/left.png")} alt="left"/>
                        </a>
                        <div className="elipse">
                            <div className="elipse3"></div>
                        </div>
                        <p className="p1">
                            {name}
                        </p>
                        <i className="fa fa-sign-out fa-2x" aria-hidden="true"></i>
                    </div>
                    <div className="info">
                        <a href="#">
                            100 My friends
                        </a>
                        <a className="selected" href="#">
                            1000 All
                        </a>
                        <input type="text" id="myInput" placeholder="Search for names.." title="Type in a name"/>
                    </div>
                </div>
            </header>
            <section>
                <div className="container">
                    {users.map((item, index) => (
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