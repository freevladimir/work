import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { LoginPage } from './pages/LoginPage';
import { StartPage } from './pages/StartPage';
import load from 'little-loader';
import LimitGame from './pages/LimitGame';
import OneHour from './pages/OneHour';
import AllGamesPage from './pages/AllGamesPage';
import { FriendsPage } from './pages/FriendsPage';
import { PeoplePage } from './pages/PeoplePage';
import FiveMinutes from './pages/5minutes';
import OneDay from './pages/OneDay';
import OneWeek from './pages/OneWeek';
import OneMonth from './pages/OneMonth';
import OneYear from './pages/OneYear';
import RestorePassword from './pages/RestorePassword';
import NewPassword from './pages/NewPassword';
load('https://use.fontawesome.com/b4135a5a57.js', function (err) {});

export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/people" exact>
					<PeoplePage />
				</Route>
				<Route path="/friends" exact>
					<FriendsPage />
				</Route>
				<Route path="/limitGame" exact>
					<LimitGame />
				</Route>
				<Route path="/oneYear" exact>
					<OneYear />
				</Route>
				<Route path="/oneMonth" exact>
					<OneMonth />
				</Route>
				<Route path="/oneWeek" exact>
					<OneWeek />
				</Route>
				<Route path="/oneDay" exact>
					<OneDay />
				</Route>
				<Route path="/oneHour" exact>
					<OneHour />
				</Route>
				<Route path="/5minutes" exact>
					<FiveMinutes />
				</Route>
				<Route path="/" exact>
					<AllGamesPage />
				</Route>
				<Route path="/allgames" exact>
					<Redirect to="/" />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	}
	return (
		<Switch>
			<Route path="/" exact>
				<StartPage />
			</Route>
			<Route path="/login" exact>
				<LoginPage />
			</Route>
			<Route path="/register" exact>
				<AuthPage />
			</Route>
			<Route path="/new-password">
				<NewPassword />
			</Route>
			<Route path="/restore-password" exact>
				<RestorePassword />
			</Route>
			{/* <Redirect to="/" /> */}
		</Switch>
	);
};
