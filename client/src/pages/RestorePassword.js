import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import '../css/register.css';

export default () => {
	const [email, setEmail] = useState('');
	const [isSent, setIsSent] = useState(false);
	const [timeLeft, setTime] = useState(0);

	const message = useMessage();
	const { loading, request, error, clearError } = useHttp();

	useEffect(() => {
		message(error);
		clearError();
	}, [error, message, clearError]);

	useEffect(() => {
		let interval = null;
		if (isSent) {
			interval = setInterval(() => {
				setTime((time) => {
					if (time > 0) return time - 1;
					else {
						setIsSent(false);
						clearInterval(interval);
						return 0;
					}
				});
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isSent]);

	const handleClick = async (e) => {
		e.preventDefault();
		if (!loading) {
			if (timeLeft === 0) {
				try {
					const data = await request('/api/auth/restore-password', 'POST', { email });
					if (data.ok) {
						message('Email with password reset link was sent. Check your mailbox.');
						setTime(60);
						setIsSent(true);
					}
				} catch (err) {
					console.error(err);
				}
			} else {
				message(`Please, wait ${timeLeft} seconds before requesting a new email`);
			}
		}
	};
	const handleChange = (e) => setEmail(e.target.value);

	return (
		<div className="register">
			<header className="header" id="header">
				<div className="container">
					<img className="logo-mob" src={require('../img/img1.png')} alt="logo-mobile" />
					<div className="content" style={{ height: '360px' }}>
						<img className="logo2" src={require('../img/logo.png')} alt="logo" />
						<form>
							<div className="input-container">
								<i className="fa fa-user icon1"></i>
								<input className="input-field" type="text" placeholder="Email" name="name" value={email} onChange={handleChange} />
							</div>
							<button type="submit" className="btn" onClick={handleClick}>
								{loading ? 'Sending you an email...' : 'Reset password'}
							</button>
							<div className="register">
								<a href="/login" className="forget">
									Login
								</a>
							</div>
						</form>
					</div>
				</div>
			</header>
		</div>
	);
};
