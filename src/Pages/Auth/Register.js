import './Auth.css';

function Register({ setDisplayedPage }) {
	function handleSubmit(event) {
		event.preventDefault();

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

		fetch('https://blabberbox-backend.vercel.app/createUser', reqOptions).then(
			setDisplayedPage('Login')
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
		</main>
	);
}

export default Register;
