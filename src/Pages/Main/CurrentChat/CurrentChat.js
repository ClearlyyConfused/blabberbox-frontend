import { useEffect, useState } from 'react';
import CurrentChatInfo from './CurrentChatInfo';
import downChevron from '../../../images/chevron-down-icon.svg';
import back from '../../../images/back-arrow-svgrepo-com.svg';
import defaultPFP from '../../../images/Default_pfp.svg';
import './CurrentChat.css';
import ChatMessage from './ChatMessage';
import supabase from '../../../supabaseConfig';

// is the current chat being displayed on the screen, user can send messages to that chat
function CurrentChat({ currentChat, userInfo, setCurrentChat }) {
	const [display, setDisplay] = useState('chat');
	const [x, setX] = useState(); // for resetting chat after switching chats
	const [userProfileImages, setUserProfileImages] = useState();

	async function fetchProfileImage(username) {
		const { data, error } = await supabase.from('Users').select().eq('username', username);
		if (data[0].image) {
			return [data[0].username, data[0].image];
		} else {
			return [data[0].username, defaultPFP];
		}
	}
	// fetches profile image of all users in the chat to display
	async function fetchAllProfileImages(users) {
		let array = [];
		for (const username of users) {
			const data = await fetchProfileImage(username);
			// waits until fetchAPI for that param is finished before continuing
			array.push(data);
		}
		setUserProfileImages(Object.fromEntries(array));
	}

	useEffect(() => {
		if (currentChat !== undefined) {
			fetchAllProfileImages(currentChat.users);
		}
	}, [currentChat]);

	function convertToBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
		});
	}

	// calls sendMessage with info from form
	async function handleMessage(event) {
		event.preventDefault();
		const message = event.target.elements.message.value;
		let image = '';
		// if message has an image, convert it then call sendMessage with result
		if (event.target.elements.messageImage.files[0] !== undefined) {
			image = await convertToBase64(event.target.elements.messageImage.files[0]);
		}

		const { data, chatError } = await supabase.from('Chats').select().eq('name', currentChat.name);
		const previousChatData = data[0];

		const newMessage = { user: userInfo.username, message: message, image: image, timeSent: new Date() };

		const { error } = await supabase
			.from('Chats')
			.update({ messages: [...previousChatData.messages, newMessage] })
			.eq('_id', previousChatData._id);

		event.target.elements.message.value = '';
		event.target.elements.messageImage.value = '';
	}

	// sets display back to chat after changing chats (if, for example, changing while displaying chat info)
	useEffect(() => {
		if (JSON.stringify(currentChat) !== JSON.stringify(x)) {
			setX(currentChat);
			setDisplay('chat');
		}
	}, [currentChat]);

	if (currentChat !== undefined && display === 'chat') {
		// display chat messages
		return (
			<section className="current-chat">
				<div
					onClick={() => {
						if (display === 'chat') {
							setDisplay('chat-info');
						} else if (display === 'chat-info') {
							setDisplay('chat');
						}
					}}
				>
					<h1>{currentChat.name}</h1>
					<img src={downChevron} alt="" />
				</div>
				<ol className="chatbox">
					<ChatMessage
						messages={currentChat.messages}
						userInfo={userInfo}
						userProfileImages={userProfileImages}
					/>
				</ol>
				<section className="message-form">
					<form onSubmit={handleMessage}>
						<input placeholder="Send a message" id="message" type="text" />
						<div>
							<label htmlFor="messageImage">Add Img</label>
							<input type="file" id="messageImage" name="messageImage" accept="image/png, image/jpeg"></input>
						</div>
						<button type="submit">Send</button>
					</form>
				</section>
			</section>
		);
	}
	// display chat info
	else if (currentChat !== undefined && display === 'chat-info') {
		return (
			<section className="current-chat">
				<div
					onClick={() => {
						if (display === 'chat') {
							setDisplay('chat-info');
						} else if (display === 'chat-info') {
							setDisplay('chat');
						}
					}}
				>
					<img src={back} alt="" />
					<h1>{currentChat.name} info</h1>
				</div>
				<CurrentChatInfo currentChat={currentChat} userInfo={userInfo} setCurrentChat={setCurrentChat} />
			</section>
		);
	}
}

export default CurrentChat;
