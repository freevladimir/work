import React, {useCallback, useContext, useEffect, useState} from 'react'
import '../css/people.css'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {ImageUpload} from "../components/Upload";

export const PeoplePage = ()=>{
    const { token } = useContext(AuthContext);
    const { loading, request } = useHttp();
    const auth = useContext(AuthContext)
    const history = useHistory()
    const [name, setName] = useState([]);
    const [users, setUsers] = useState([]);
    const [img, setImg] = useState([])
    const [countOfFriends, setFriends] = useState([]);
    const [countOfUsers, setAllUsers] = useState([]);

    const getUserData = useCallback(async () => {
        try {
            const fetched = await request("/api/auth/allgames", "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            setName(fetched[0].name);
            let _img = require(`../avatars/${fetched[0]._id}.jpg`)
            setImg(_img)
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
    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    const getAllUsersAndFriends = useCallback(async () =>{
        const result = await request("/api/auth/allusers", "GET", null, {
          Authorization: `Bearer ${token}`,
        });
        console.log('allUsers: ', result)
        setAllUsers(result.allUsers)
        setFriends(result.friends)
    }, [request])

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    useEffect(() => {
        getAllUsersAndFriends();
    }, [getAllUsersAndFriends]);  

    return (
        <div className="people">
            <header className="header" id="header">
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
                    {users.map((item, index) => (
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