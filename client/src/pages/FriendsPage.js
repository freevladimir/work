import React, {useCallback, useContext, useEffect, useState} from 'react'
import '../css/friends.css'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {ImageUpload} from "../components/Upload";


export const FriendsPage = ()=>{
    const { token } = useContext(AuthContext);
    const { loading, request } = useHttp();
    const auth = useContext(AuthContext)
    const history = useHistory()
    const [name, setName] = useState([]);
    const [friends, setFriends] = useState([]);
    const [img, setImg] = useState([])
    const [countOfFriends, setAllFriends] = useState([]);
    const [countOfUsers, setUsers] = useState([]);

    const getUserData = useCallback(async () => {
        try {
            const fetched = await request("/api/auth/allgames", "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            setName(fetched[0].name);
            console.log("data on allgames: ", fetched);
            let _img = require(`../avatars/${fetched[0]._id}.jpg`)
            setImg(_img)
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

    const getAllUsersAndFriends = useCallback(async () =>{
        const result = await request("/api/auth/allusers", "GET", null, {
          Authorization: `Bearer ${token}`,
        });
        console.log('allUsers: ', result)
        setUsers(result.allUsers)
        setAllFriends(result.friends)
    }, [request])

    useEffect(() => {
        getAllFriends();
    }, [getAllFriends]);

    useEffect(() => {
        getAllUsersAndFriends();
    }, [getAllUsersAndFriends]);  
    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <div className="friends">
            // <video id="videoBG" poster="../img/bg.png" autoPlay muted loop>
            //     <source src={require("../img/background.mp4")} type="video/mp4"/>
            // </video>
            <header className="hedaer" id="header">
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
                        <p className="p1">
                            {name}
                        </p>
                        <a href="/" onClick={logoutHandler}><i className="fa fa-sign-out fa-2x" aria-hidden="true"></i></a>
                    </div>
                    <div className="info">
                        <NavLink to="/friends">{countOfFriends} My friends</NavLink>
                        <NavLink to="/people">{countOfUsers} All</NavLink>
                        <input type="text" id="myInput" placeholder="Search for names.." title="Type in a name"/>
                    </div>
                </div>
            </header>

            <section>
                <div className="container">
                    {friends.map((item, index) => (
                        <div className="comp">
                            <div className="elipse_">
                                <div className="elipse3_">
                                    <img src={require(`../avatars/${item._id}.jpg`)}/>
                                </div>
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