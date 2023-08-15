import { useState } from 'react';
import APIcalls from '../../../../APIcalls';

function ChatJoinForm({ userInfo, updateUserInfo }) {
	// shows error message if cannot join chat
	const [successFlag, setSuccessFlag] = useState(true);
	const { fetchChatInfo, addUserToChat, addChatToUser } = APIcalls();

	async function handleSubmit(event) {
		event.preventDefault();
		setSuccessFlag(true);

		const chatData = await fetchChatInfo(event.target.elements.chatName.value);

		addUserToChat(chatData, userInfo);
		addChatToUser(userInfo, chatData);

		updateUserInfo();
		event.target.elements.chatName.value = '';
		event.target.elements.password.value = '';
	}

	return (
		<section className="chat-form">
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
			{successFlag === true ? (
				<p></p>
			) : successFlag === false ? (
				<p>Incorrect password</p>
			) : (
				<p>Already joined chat</p>
			)}
		</section>
	);
}

export default ChatJoinForm;
