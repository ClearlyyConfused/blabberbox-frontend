import { useState } from "react";

function ChatJoinForm({ userInfo, fetchUserChats, setFormDisplay }) {
	// shows error message if cannot join chat
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
				chatName: event.target.elements.chatName.value,
				chatPassword: event.target.elements.password.value,
				userID: userInfo.userID,
			}),
		};
		// create a new chat then updates the userInfo
		fetch('https://blabberbox-backend.vercel.app/joinChat', reqOptions).then((res) =>
			res.json().then((data) => {
				if (data.success === true) {
					fetchUserChats();
					event.target.elements.chatName.value = '';
					event.target.elements.password.value = '';
					setFormDisplay("")
				} else if (data.success === false) {
					setSuccessFlag(false)
				} else {
					setSuccessFlag("already_in_chat")
				}
			})
		);
	}

	return (
		<section className="chat-form">
			<h1 onClick={(() => setFormDisplay(""))}>Join Chat</h1>
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
			{successFlag === true ? <p></p> : successFlag === false ? <p>Incorrect password</p> : <p>Already joined chat</p>}
		</section>
	);
}

export default ChatJoinForm;
