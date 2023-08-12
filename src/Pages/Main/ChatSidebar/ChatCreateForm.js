import { useState } from 'react';
import supabase from '../../../supabaseConfig';

function ChatCreateForm({ userInfo, fetchUserChats }) {
	// shows error message if chat cannot be created
	const [successFlag, setSuccessFlag] = useState(true);

	async function handleSubmit(event) {
		event.preventDefault();
		setSuccessFlag(true);

		// create chat
		const { chatData, chatError } = await supabase.from('Chats').insert([
			{
				name: event.target.elements.chatName.value,
				password: event.target.elements.password.value,
				users: [userInfo.username],
				messages: [],
			},
		]);

		// update user's list of chats
		const { data, userError } = await supabase
			.from('Users')
			.select()
			.eq('username', userInfo.username)
			.eq('password', userInfo.password);
		const userData = data[0];
		const { error } = await supabase
			.from('Users')
			.update({ chats: [...userData.chats, event.target.elements.chatName.value] })
			.eq('_id', userData._id);

		fetchUserChats();
		event.target.elements.chatName.value = '';
		event.target.elements.password.value = '';
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
