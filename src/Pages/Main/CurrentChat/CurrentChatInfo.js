import { useState } from 'react';
import supabase from '../../../supabaseConfig';

function CurrentChatInfo({ currentChat, userInfo, setCurrentChat }) {
	const [showPassword, setShowPassword] = useState(false);

	async function getChatInfo(name, password) {
		// update chat's list of users
		const { data, chatError } = await supabase
			.from('Chats')
			.select()
			.eq('name', name)
			.eq('password', password);
		return data[0];
	}

	// delete chat from user
	async function handleSubmit() {
		// update chat's list of users or delete chat if last user leaves
		const chatData = await getChatInfo(currentChat.name, currentChat.password);
		if (chatData.users.length === 1) {
			const { error } = await supabase.from('Chats').delete().eq('_id', chatData._id);
		} else {
			const { error1 } = await supabase
				.from('Chats')
				.update({ users: chatData.users.filter((e) => e !== userInfo.username) })
				.eq('_id', chatData._id);
		}

		// update user's list of chats
		const { data, userError } = await supabase
			.from('Users')
			.select()
			.eq('username', userInfo.username)
			.eq('password', userInfo.password);
		const userData = data[0];
		const { error2 } = await supabase
			.from('Users')
			.update({ chats: userData.chats.filter((e) => e !== currentChat.name) })
			.eq('_id', userData._id);

		setCurrentChat(undefined);
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
					handleSubmit();
				}}
			>
				Leave Chat
			</button>
		</section>
	);
}

export default CurrentChatInfo;
