function ChatJoinForm({ userInfo, fetchUserChats }) {
	function handleSubmit(event) {
		event.preventDefault();
		const reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chatName: event.target.elements.chatName.value,
				chatPassword: event.target.elements.password.value,
				userID: userInfo.userID,
			}),
		};
		// create a new chat then updates the userInfo
		fetch('https://chatterbox-api.onrender.com/joinChat', reqOptions).then((res) =>
			res.json().then((data) => {
				fetchUserChats();
			})
		);
	}

	return (
		<section className="create-chat-form">
			<h1>Join Chat</h1>
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

export default ChatJoinForm;
