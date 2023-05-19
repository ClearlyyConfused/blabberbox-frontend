function Login({ setUserInfo, setDisplayedPage }) {
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

		fetch('https://chatterbox-api.onrender.com/getUser', reqOptions)
			.then((res) => res.json())
			.then((user) => {
				if (user.length !== 0) {
					setUserInfo({
						userID: user[0]._id,
						username: user[0].username,
						password: user[0].password,
						chats: user[0].chats,
					});
					setDisplayedPage('Main');
				}
			});
	}

	return (
		<main>
			<section className="login">
				<h1>Login</h1>
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
			</section>
		</main>
	);
}

export default Login;
