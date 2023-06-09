import { useState } from 'react';
import './Auth.css';
import AuthLogic from './AuthLogic';

function Register({ setDisplayedPage, setUserInfo }) {
	// shows error message if cannot register
	const [successFlag, setSuccessFlag] = useState(true)
	const { login } = AuthLogic()

	function handleSubmit(event) {
		event.preventDefault();
		setSuccessFlag(true)

		const reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: event.target.elements.username.value,
				password: event.target.elements.password.value,
			}),
		};

		fetch('https://blabberbox-backend.vercel.app/createUser', reqOptions).then((res) =>
		res.json().then((data) => {
			// if registration successful, login
			if (data.success === true) {
				const username = event.target.elements.username.value;
				const password = event.target.elements.password.value
				login(username, password, setUserInfo, setDisplayedPage, setSuccessFlag)
			} else // else display error message
			{
				setSuccessFlag(false)
			}
		})
	);
	}

	return (
		<main className="auth">
			<h1>REGISTER</h1>
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
			<button onClick={() => setDisplayedPage('Login')}>Back</button>
			{successFlag ? "" : <p>An account using this username already exists</p>}
		</main>
	);
}

export default Register;
