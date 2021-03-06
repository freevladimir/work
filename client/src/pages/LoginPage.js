import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import '../css/login.css';
import { useHistory } from 'react-router-dom';

export const LoginPage = () => {
	const history = useHistory();
	const auth = useContext(AuthContext);
	const message = useMessage();

	const { loading, request, error, clearError } = useHttp();
	const [form, setForm] = useState({
		name: '',
		password: '',
	});
	useEffect(() => {
		message(error);
		clearError();
	}, [error, message, clearError]);

	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...form });
			message(data.message);
			auth.login(data.token, data.userId, data.name);
			console.log('Data', data);
			history.push('/allgames');
		} catch (e) {}
	};

	return (
		<div className="loginpage">
			<header className="header" id="header">
				<div className="container">
					<img className="logo-mob" src={require('../img/img1.png')} alt="logo-mobile" />
					<div className="content">
						<img className="logo2" src={require('../img/logo.png')} alt="logo" />
						<form action="#">
							<div className="input-container">
								<i className="fa fa-user icon1"></i>
								<input className="input-field" type="text" placeholder="Name" name="name" onChange={changeHandler} />
							</div>

							<div className="input-container">
								<i className="fa fa-key icon1"></i>
								<input className="input-field" type="password" placeholder="Password" name="password" onChange={changeHandler} />
							</div>

							<button type="submit" className="btn" onClick={loginHandler} disabled={loading}>
								Login
							</button>
							<div className="register">
								<a href="/restore-password" className="forget">
									Forget Password
								</a>
								<a href="/register">Create an account</a>
							</div>
						</form>
					</div>
				</div>
			</header>
		</div>
	);
};
