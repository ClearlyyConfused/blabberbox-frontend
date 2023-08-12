import { useState } from 'react';
import supabase from '../../../supabaseConfig';

function ChatJoinForm({ userInfo, fetchUserChats }) {
	// shows error message if cannot join chat
	const [successFlag, setSuccessFlag] = useState(true);

	async function updateChat(name, value) {
		// update chat's list of users
		const { data, chatError } = await supabase.from('Chats').select().eq('name', name).eq('password', value);
		return data[0];
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setSuccessFlag(true);

		const chatData = await updateChat(
			event.target.elements.chatName.value,
			event.target.elements.password.value
		);
		const { error1 } = await supabase
			.from('Chats')
			.update({ users: [...chatData.users, userInfo.username] })
			.eq('_id', chatData._id);

		// update user's list of chats
		const { data, userError } = await supabase
			.from('Users')
			.select()
			.eq('username', userInfo.username)
			.eq('password', userInfo.password);
		const userData = data[0];
		const { error2 } = await supabase
			.from('Users')
			.update({ chats: [...userData.chats, event.target.elements.chatName.value] })
			.eq('_id', userData._id);

		fetchUserChats();
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
