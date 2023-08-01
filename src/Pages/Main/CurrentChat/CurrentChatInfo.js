import { useState } from 'react';

function CurrentChatInfo({ currentChat, userInfo, fetchUserChats, setCurrentChat }) {
	const [showPassword, setShowPassword] = useState(false);

	// delete chat from user
	function handleSubmit(chatID) {
		const reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userID: userInfo.userID,
				chatID: chatID,
			}),
		};
		return fetch('https://blabberbox-backend.vercel.app/leaveChat', reqOptions)
			.then((res) => res.json())
			.then((data) => {
				// fetch new list of chat
				fetchUserChats();
				setCurrentChat(undefined);
			});
	}

	function countUserMessages() {
		let count = 0;
		for (const message of currentChat.messages) {
			if (message.user === userInfo.username) {
				count++;
			}
		}
		return count;
	}

	return (
		<section className="chat-info">
			<div>
				<h2>Chat Password</h2>
				<p onClick={() => setShowPassword(!showPassword)}>
					{showPassword ? currentChat.password : 'Click to display'}
				</p>
			</div>
			<div>
				<h2>Users ({currentChat.users.length})</h2>
				<ol>
					{currentChat.users.map((user) => {
						return <li>{user}</li>;
					})}
				</ol>
			</div>
			<div>
				<h2>Number of messages</h2>
				<p>Total: {currentChat.messages.length}</p>
				<p>From you: {countUserMessages()}</p>
			</div>
			<button
				onClick={() => {
					handleSubmit(currentChat._id);
				}}
			>
				Leave Chat
			</button>
		</section>
	);
}

export default CurrentChatInfo;
