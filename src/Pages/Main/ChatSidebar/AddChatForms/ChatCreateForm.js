import { useState } from 'react';
import APIcalls from '../../../../APIcalls';

function ChatCreateForm({ userInfo, updateUserInfo }) {
	// shows error message if chat cannot be created
	const [successFlag, setSuccessFlag] = useState(true);
	const { createNewChat, addChatToUser, fetchChatInfo } = APIcalls();

	async function createChat(event) {
		event.preventDefault();
		setSuccessFlag(true);

		await createNewChat(event.target.elements.chatName.value, event.target.elements.password.value, userInfo);
		const chatData = await fetchChatInfo(event.target.elements.chatName.value);
		await addChatToUser(userInfo, chatData);

		updateUserInfo();
		event.target.elements.chatName.value = '';
		event.target.elements.password.value = '';
	}

	return (
		<section className="chat-form">
			<h1>Create Chat</h1>
			<form onSubmit={createChat}>
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
