import { useState } from "react";

function ChatCreateForm({ userInfo, fetchUserChats }) {
	// shows error message if chat cannot be created
	const [successFlag, setSuccessFlag] = useState(true)

	function handleSubmit(event) {
		event.preventDefault();
		setSuccessFlag(true)

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
				if (data.success === true) {
					fetchUserChats();
					event.target.elements.chatName.value = '';
					event.target.elements.password.value = '';
				} else {
					setSuccessFlag(false)
				}
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
			{successFlag ? <p></p> : <p>Chat name already exists</p>}
		</section>
	);
}

export default ChatCreateForm;
