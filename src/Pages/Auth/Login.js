import { useState } from 'react';
import './Auth.css';
import AuthLogic from './AuthLogic';
import logo from '../../images/logo.svg';
import chevron from '../../images/chevron-down-outline-svgrepo-com.svg';

function Login({ setUserInfo, setDisplayedPage }) {
	// shows error message if cannot login
	const [successFlag, setSuccessFlag] = useState(true);
	const { login } = AuthLogic();

	function handleSubmit(event) {
		event.preventDefault();
		const username = event.target.elements.username.value;
		const password = event.target.elements.password.value;
		login(username, password, setUserInfo, setDisplayedPage, setSuccessFlag);
	}

	return (
		<main className="login">
			<section className="logo-display">
				<div className="img-container">
					<img src={logo} alt="" />
				</div>
				<h1>BlabberBox</h1>
				<img
					src={chevron}
					alt=""
					onClick={() => {
						window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
					}}
				/>
			</section>
			<section className="auth">
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username">USERNAME</label>
						<input id="username" type="text" />
					</div>
					<div>
						<label htmlFor="password">PASSWORD</label>
						<input id="password" type="text" />
					</div>
					<button
						onClick={() => {
							setDisplayedPage('Register');
						}}
					>
						Create an account
					</button>
					<button type="submit">SUBMIT</button>
				</form>

				{successFlag ? '' : <p>Incorrect Password</p>}
			</section>
		</main>
	);
}

export default Login;
