import { useState } from 'react';
import CurrentChatLogic from './CurrentChatLogic';

function CurrentChatInfo({ currentChat, userInfo, setCurrentChat, updateUserInfo }) {
	const [showPassword, setShowPassword] = useState(false);
	const { countUserMessages, leaveChat } = CurrentChatLogic(currentChat, userInfo);

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
					leaveChat(updateUserInfo, setCurrentChat);
				}}
			>
				Leave Chat
			</button>
		</section>
	);
}

export default CurrentChatInfo;
