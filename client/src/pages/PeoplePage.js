import React, { useCallback, useContext, useEffect, useState } from 'react';
import '../css/people.css';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { ImageUpload } from '../components/Upload';
import { getProfilePic } from '../utils/functions';
import { userImg } from './AllGamesPage';

export const PeoplePage = () => {
	const { token } = useContext(AuthContext);
	const { loading, request } = useHttp();
	const auth = useContext(AuthContext);
	const history = useHistory();
	const [name, setName] = useState([]);
	const [users, setUsers] = useState([]);
	const [countOfFriends, setFriends] = useState([]);
	const [countOfUsers, setAllUsers] = useState([]);
	const [avatars, setAvatars] = useState([]);
	const reader = new FileReader();

	const getUserData = useCallback(async () => {
		try {
			const fetched = await request('/api/auth/allgames', 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setName(fetched[0].name);
			console.log('data on allgames: ', fetched);
		} catch (e) {}
	}, [token, request]);

	useEffect(() => {
		getUserData();
	}, [getUserData]);

	// const getAllUsers = useCallback(async () => {
	//     try {
	//         const fetched = await request("/api/auth/allusers", "GET", null, {
	//             Authorization: `Bearer ${token}`,
	//         });
	//         console.log("data on all Users: ", fetched);
	//         // const listItems = fetched.map((number) =>
	//         //     <li>{number}</li>
	//         // );

	//         setUsers(fetched.allUsers2)
	//     } catch (e) {}
	// }, [token, request]);
	const logoutHandler = (event) => {
		event.preventDefault();
		auth.logout();
		history.push('/');
	};
	const getAllUsersAndFriends = useCallback(async () => {
		const result = await request('/api/auth/allusers', 'GET', null, {
			Authorization: `Bearer ${token}`,
		});
		console.log('allUsers: ', result);
		setAllUsers(result.allUsers);
		setFriends(result.friends);
		setUsers(result.allUsers2);
		for (const user of result.allUsers2) {
			const blob = await getProfilePic(user._id);
			reader.onload = function () {
				const avatar = this.result;
				setAvatars((avatars) => [...avatars, avatar]);
			};
			reader.readAsDataURL(blob);
		}
	}, [request]);

	// useEffect(() => {
	//     getAllUsers();
	// }, [getAllUsers]);

	useEffect(() => {
		getAllUsersAndFriends();
	}, [getAllUsersAndFriends]);

	return (
		<div className="people">
			<header className="header" id="header">
				<div className="container">
					<div className="account">
						<NavLink to="/allgames">
							<img className="left" src={require('../img/left.png')} alt="left" />
						</NavLink>
						<div className="elipse">
							<ImageUpload profilePic={userImg.img} token={token} />
						</div>
						<p className="p1">{name}</p>
						<a href="/" onClick={logoutHandler}>
							<i className="fa fa-sign-out fa-2x" aria-hidden="true"></i>
						</a>
					</div>
					<div className="info">
						<div className="links">
							<NavLink to="/friends">{countOfFriends} My friends</NavLink>
							<NavLink to="/people">{countOfUsers} All</NavLink>
						</div>
						<a href="https://t.me/joinchat/HSApdhx_OO301lltbkyfhw" className="chat" target="_blank">
							<i className="fa fa-telegram" aria-hidden="true"></i>
							<span>Telegram chat</span>
						</a>
						{/* <input type="text" id="myInput" placeholder="Search for names.." title="Type in a name" /> */}
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					{users.map((item, index) => (
						<div className="comp" key={index}>
							<div className="elipse_">
								<div className="elipse3_">
									<img src={avatars[index]} />
								</div>
							</div>
							<div className="text">
								<p className="p3">{item.name}</p>
								<p className="p4">Status</p>
							</div>
							{/* <a href="#">
                                <div className="btn">
                                    <p className="p5">
                                        You are subscribed
                                    </p>
                                </div>
                            </a> */}
						</div>
					))}
				</div>
			</section>
		</div>
	);
};
