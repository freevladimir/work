import React, { useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import Languages from '../components/Languages';
import '../css/main.css';
import '../css/preloader.css';

export const StartPage = () => {
	const languages = [
		{ lang: 'german', margin: 205 },
		{ lang: 'russian', margin: 185 },
		{ lang: 'spanish', margin: 205 },
		{ lang: 'english', margin: 245 },
		{ lang: 'chinese', margin: 160 },
	];
	const [currentLanguage, setCurrentLanguage] = useState(null);
	const { request } = useHttp();
	const changeLanguage = async (lang) => {
		if (currentLanguage === null || lang !== currentLanguage.language) {
			try {
				const data = await request(`/api/language/${lang}`);
				if (data.ok) setCurrentLanguage(data.result);
			} catch (err) {
				console.error(err);
			}
		}
	};
	useEffect(() => {
		changeLanguage('english');
	}, []);
	if (currentLanguage === null)
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
	return (
		<div className="row startpage">
			<header className="header" id="header">
				<div className="container">
					<div className="logo">
						<img src={require('../img/img1.png')} alt="logo" />
					</div>

					<div className="buttons">
						<a className="entrance" href="/register">
							Create new
						</a>
						<a className="login" href="/login">
							Login
						</a>
					</div>
					<div className="video">
						<iframe src="https://www.youtube.com/embed/PkkV1vLHUvQ"></iframe>
					</div>
				</div>
			</header>

			<section className="section1" id="section1">
				<div className="container">
					<Languages changeLanguage={changeLanguage} languages={languages} />
					<div className="div"></div>
					<h2>{currentLanguage.translation.header.text}</h2>
					<div className="work">
						<div className="left">
							{currentLanguage.translation.header.left.map((text, i) => (
								<p key={i} className={'p' + (i + 1)}>
									{text}
								</p>
							))}
						</div>
						<img
							src={currentLanguage.language === 'chinese' ? require('../img/section2.png') : require('../img/section1.png')}
							alt="work"
						/>
						<div className="right">
							{currentLanguage.translation.header.right.map((text, i) => (
								<p
									key={i}
									className={'p' + (i + 1)}
									style={i === 2 ? { marginTop: languages.filter((o) => o.lang === currentLanguage.language)[0].margin } : {}}
								>
									{text}
								</p>
							))}
						</div>
					</div>
					<div className="work_">
						{currentLanguage.translation.header.left.map((text, i) => {
							return [
								<p key={i} className="p1">
									{text}
								</p>,
								<p key={i + 1} className="p2">
									{currentLanguage.translation.header.right[i]}
								</p>,
							];
						})}
					</div>
					<div className="div2"></div>
				</div>
			</section>
			<section className="section2" id="section2">
				<div className="container">
					<h2>{currentLanguage.translation.guarantee.text}</h2>
					<div className="priem">
						<div className="top">
							{currentLanguage.translation.guarantee.left.map((text, i) => (
								<div key={i}>
									<p className={'p' + (i + 1)}>{text}</p>
								</div>
							))}
						</div>
						<div className="bottom">
							{currentLanguage.translation.guarantee.right.map((text, i) => (
								<div key={i}>
									<p className={'p' + (i + 1)}>{text}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
			<section className="section3" id="section3">
				<div className="container">
					<div className="icon">
						<a href="#" className="telegram">
							<i className="fa fa-telegram" aria-hidden="true"></i>
						</a>
						<a href="#" className="fb">
							<i className="fa fa-facebook-official" aria-hidden="true"></i>
						</a>
						<a href="#" className="tube">
							<i className="fa fa-youtube-play" aria-hidden="true"></i>
						</a>
					</div>
					<a href="https://prostocash.com/obmen-sberbank-na-ethereum.html?R=15947311895867" className="banner" target="_blank">
						<img src={require('../img/banner.jpeg')} alt="banner" />
					</a>
					{/* <div className="nav">
						<a href="#">Условия использования</a>
						<a href="#">Адрес</a>
						<a href="#">Открытый источник</a>
					</div> */}
				</div>
			</section>
			<footer className="footer" id="footer">
				<div className="container">
					<p className="footer-text">Адрес смарт-контракта: 7top</p>
				</div>
			</footer>
		</div>
	);
};
