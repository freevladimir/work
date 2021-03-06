import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppStoreContext } from '../App';
import { observer } from 'mobx-react';
import '../css/allGames.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import Timer from 'react-compound-timer';
import countOfTickets from '../utils/countOfTickets';
import { getAllValues, userAddress, loadingBlockchain } from '../utils/connectBlockchain';
import { ImageUpload } from '../components/Upload';
import { getProfilePic } from '../utils/functions';
export let userId;
export let userImg = { img: '' };

const AllGamesPage = () => {
	const store = useContext(AppStoreContext);
	const auth = useContext(AuthContext);
	const history = useHistory();
	const [name, setName] = useState([]);
	const [id, setId] = useState([]);
	const { token } = useContext(AuthContext);
	const { loading, request } = useHttp();
	const [countOfFriends, setFriends] = useState([]);
	const [countOfUsers, setUsers] = useState([]);
	const reader = new FileReader();
	const [avatar, setAvatar] = useState('');

	const generateHash = (string) => {
		let hash = 0;
		if (string.length == 0) return hash;
		for (let i = 0; i < string.length; i++) {
			var charCode = string.charCodeAt(i);
			hash = (hash << 7) - hash + charCode;
			hash = hash & hash;
		}
		return Math.abs(hash);
	};
	const getUserData = useCallback(async () => {
		store.setValueForAll();
		try {
			const fetched = await request('/api/auth/allgames', 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			console.log('start3');
			userId = fetched[0]._id;
			setName(fetched[0].name);
			setId(fetched[0].wallet.substr(0, 6) + '...' + fetched[0].wallet.substr(38, 4));
		} catch (e) {}
	}, [token, request]);

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
		setUsers(result.allUsers);
		setFriends(result.friends);
	}, [request]);

	useEffect(() => {
		getUserData();
	}, [getUserData]);

	useEffect(() => {
		getAllUsersAndFriends();
	}, [getAllUsersAndFriends]);

	useEffect(() => {
		(async () => {
			const blob = await getProfilePic(userId);
			reader.onload = function () {
				setAvatar(this.result);
				userImg.img = this.result;
			};
			reader.readAsDataURL(blob);
		})();
	}, [userId, userImg.img]);

	if (store.allTimesEnd[1] === undefined) {
		return (
			<div className="holder">
				<div className="preloader">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="allgames">
				<header className="header" id="header">
					<div className="container">
						<div className="account">
							<div className="elipse">{<ImageUpload token={token} profilePic={avatar} />}</div>
							<p className="p1">{name}</p>
							<a href="/" onClick={logoutHandler}>
								<i className="fa fa-sign-out fa-2x" aria-hidden="true"></i>
							</a>
						</div>
						<div className="info">
							<NavLink to="/friends">{countOfFriends} My friends</NavLink>
							<NavLink to="/people">{countOfUsers} All</NavLink>
							<a>My wallet: {id}</a>
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
									<img src={require('../img/chelovek.png')} alt="chelovek" />
								</div>
								<NavLink to="/limitGame">
									<div className="btn">
										<p className="p3">PLAY {store.bankForLimit[0] ? (store.bankForLimit[0] / 1e18).toFixed(0) : 0}$</p>
									</div>
								</NavLink>
								<div className="title2">
									<div className="top">
										<img src={require('../img/men2.png')} alt="men" />
										<p className="p4">{store.allTickets ? store.allTickets[0] : 0}</p>
									</div>
									<p className="p5">Human</p>
								</div>
							</div>
						</div>
						<div className="comp2">
							<div className="timer">
								<Timer initialTime={store.allTimesEnd[0]} direction="backward">
									{() => (
										<React.Fragment>
											<ul>
												<li style={{ color: '#979797' }}>
													{(<Timer />)._owner.stateNode.state.d - 1 >= 0 ? (<Timer />)._owner.stateNode.state.d - 1 : 0}
												</li>
												<hr />
												<li>
													<Timer.Days /> day
												</li>
												<hr />
												<li style={{ color: '#979797' }}>{(<Timer />)._owner.stateNode.state.d + 1}</li>
											</ul>
											<ul>
												<li style={{ color: '#979797' }}>
													{(<Timer />)._owner.stateNode.state.h - 1 >= 0
														? (<Timer />)._owner.stateNode.state.h - 1
														: 24 + (<Timer />)._owner.stateNode.state.h - 1}
												</li>
												<hr />
												<li>
													<Timer.Hours /> hour
												</li>
												<hr />
												<li style={{ color: '#979797' }}>
													{(<Timer />)._owner.stateNode.state.h + 1 <= 23
														? (<Timer />)._owner.stateNode.state.h + 1
														: Math.abs(60 - (<Timer />)._owner.stateNode.state.h - 1)}
												</li>
											</ul>
										</React.Fragment>
									)}
								</Timer>
							</div>
							<div className="blok2">
								<div className="title3">
									<img src={require('../img/day2.png')} alt="minute" />
									<p className="p6">Every week</p>
								</div>
								<NavLink to="/oneWeek">
									<div className="btn">
										<p className="p3">PLAY {store.bankForLimit[1] ? (store.bankForLimit[1] / 1e18).toFixed(0) : 0}$</p>
									</div>
								</NavLink>
							</div>
							<div className="title2">
								<div className="top">
									<img src={require('../img/men2.png')} alt="men" />
									<p className="p4">{store.allTickets ? store.allTickets[1] : 0}</p>
								</div>
								<p className="p5">Human</p>
							</div>
						</div>
						<div className="comp2">
							<div className="timer">
								<Timer initialTime={store.allTimesEnd[1]} direction="backward">
									{() => (
										<React.Fragment>
											<ul>
												<li style={{ color: '#979797' }}>
													{(<Timer />)._owner.stateNode.state.d - 1 >= 0 ? (<Timer />)._owner.stateNode.state.d - 1 : 0}
												</li>
												<hr />
												<li>
													<Timer.Days /> day
												</li>
												<hr />
												<li style={{ color: '#979797' }}>{(<Timer />)._owner.stateNode.state.d + 1}</li>
											</ul>
											<ul>
												<li style={{ color: '#979797' }}>
													{(<Timer />)._owner.stateNode.state.h - 1 >= 0
														? (<Timer />)._owner.stateNode.state.h - 1
														: 24 + (<Timer />)._owner.stateNode.state.h - 1}
												</li>
												<hr />
												<li>
													<Timer.Hours /> hour
												</li>
												<hr />
												<li style={{ color: '#979797' }}>
													{(<Timer />)._owner.stateNode.state.h + 1 <= 23
														? (<Timer />)._owner.stateNode.state.h + 1
														: Math.abs(60 - (<Timer />)._owner.stateNode.state.h - 1)}
												</li>
											</ul>
										</React.Fragment>
									)}
								</Timer>
							</div>
							<div className="blok2">
								<div className="title3">
									<img src={require('../img/calendar3.png')} alt="minute" />
									<p className="p6">Every month</p>
								</div>
								<NavLink to="/oneMonth">
									<div className="btn">
										<p className="p3">PLAY {store.bankForLimit[2] ? (store.bankForLimit[2] / 1e18).toFixed(0) : 0}$</p>
									</div>
								</NavLink>
							</div>
							<div className="title2">
								<div className="top">
									<img src={require('../img/men2.png')} alt="men" />
									<p className="p4">{store.allTickets ? store.allTickets[2] : 0}</p>
								</div>
								<p className="p5">Human</p>
							</div>
						</div>
						<div className="comp2 comp3">
							<div className="blok2">
								<div className="title3 title_">
									<img src={require('../img/calendar2.png')} alt="minute" />
									<p className="p6">Every year</p>
								</div>
								<div className="timer">
									<Timer initialTime={store.allTimesEnd[2]} direction="backward">
										{() => (
											<React.Fragment>
												<ul>
													<li style={{ color: '#979797' }}>
														{(<Timer />)._owner.stateNode.state.d - 1 >= 0 ? (<Timer />)._owner.stateNode.state.d - 1 : 0}
													</li>
													<hr />
													<li>
														<Timer.Days /> day
													</li>
													<hr />
													<li style={{ color: '#979797' }}>{(<Timer />)._owner.stateNode.state.d + 1}</li>
												</ul>
												<ul>
													<li style={{ color: '#979797' }}>
														{(<Timer />)._owner.stateNode.state.h - 1 >= 0
															? (<Timer />)._owner.stateNode.state.h - 1
															: 24 + (<Timer />)._owner.stateNode.state.h - 1}
													</li>
													<hr />
													<li>
														<Timer.Hours /> hour
													</li>
													<hr />
													<li style={{ color: '#979797' }}>
														{(<Timer />)._owner.stateNode.state.h + 1 <= 23
															? (<Timer />)._owner.stateNode.state.h + 1
															: Math.abs(60 - (<Timer />)._owner.stateNode.state.h - 1)}
													</li>
												</ul>
											</React.Fragment>
										)}
									</Timer>
								</div>
							</div>
							<div className="blok3">
								<div className="title3">
									<img src={require('../img/gavat.png')} alt="gavat" />
									<p className="p6">Super game</p>
									<p className="p5 p5_">Human</p>
									<div className="top">
										<img className="men_" src={require('../img/men2.png')} alt="men" />
										<p className="p4">{store.allTickets ? store.allTickets[3] : 0}</p>
									</div>
								</div>
								<NavLink to="/oneYear">
									<div className="btn btn-2">
										<p className="p3">PLAY {store.bankForLimit[3] ? (store.bankForLimit[3] / 1e18).toFixed(0) : 0}$</p>
									</div>
								</NavLink>
							</div>
						</div>
						<div className="video">
							<iframe src="https://www.youtube.com/embed/1Ht2k1DvV_8?rel=0" allowFullScreen={true}></iframe>
						</div>
						<div className="banner-wrapper">
							<a href="https://prostocash.com/obmen-sberbank-na-ethereum.html?R=15947311895867" className="banner" target="_blank">
								<img src={require('../img/banner.jpeg')} alt="banner" />
							</a>
						</div>
					</div>
				</section>
			</div>
		);
	}
};

export default observer(AllGamesPage);
