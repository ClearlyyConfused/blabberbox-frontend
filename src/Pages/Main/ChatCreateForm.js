function ChatCreateForm({ userInfo, fetchUserChats }) {
	function handleSubmit(event) {
		event.preventDefault();
		const reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: event.target.elements.chatName.value,
				password: event.target.elements.password.value,
				user: userInfo.userID,
			}),
		};
		// create a new chat then updates the userInfo
		fetch('https://blabberbox-backend.vercel.app/createChat', reqOptions).then((res) =>
			res.json().then((data) => {
				fetchUserChats();
			})
		);
	}

	return (
		<section className="chat-form">
			<h1>Create Chat</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="chat-name">Chat Name</label>
					<input id="chatName" type="text" />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input id="password" type="password" />
				</div>
				<button type="submit">Submit</button>
			</form>
		</section>
	);
}

export default ChatCreateForm;
