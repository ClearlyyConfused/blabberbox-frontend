import { useState } from 'react';
import './Auth.css';
import AuthLogic from './AuthLogic';

function Login({ setUserInfo, setDisplayedPage }) {
	// shows error message if cannot login
	const [successFlag, setSuccessFlag] = useState(true)
	const { login } = AuthLogic()

	function handleSubmit(event) {
		event.preventDefault();
		const username = event.target.elements.username.value;
		const password = event.target.elements.password.value
		login(username, password, setUserInfo, setDisplayedPage, setSuccessFlag)
	}

	return (
		<main className="auth">
			<h1>LOGIN</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username</label>
					<input id="username" type="text" />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input id="password" type="text" />
				</div>
				<button type="submit">Submit</button>
			</form>
			<button
				onClick={() => {
					setDisplayedPage('Register');
				}}
			>
				Create an account
			</button>
			{successFlag ? "" : <p>Incorrect Password</p>}
		</main>
	);
}

export default Login;
