import { useEffect, useState } from 'react';
import CurrentChatInfo from './CurrentChatInfo';
import downChevron from '../../../images/chevron-down-icon.svg';
import back from '../../../images/back-arrow-svgrepo-com.svg';
import './CurrentChat.css';
import ChatMessage from './ChatMessage';

// is the current chat being displayed on the screen, user can send messages to that chat
function CurrentChat({ currentChat, userInfo, sendMessage, fetchUserChats, setCurrentChat }) {
	const [display, setDisplay] = useState('chat');
	const [x, setX] = useState(); // for resetting chat after switching chats
	const [userProfileImages, setUserProfileImages] = useState();

	async function fetchProfileImage(username) {
		const reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
			}),
		};
		return fetch('https://blabberbox-backend.vercel.app/getProfileImage', reqOptions)
			.then((res) => res.json())
			.then((data) => {
				return [username, data.userProfileImage];
			});
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

	// calls sendMessage with info from form
	function handleMessage(event) {
		event.preventDefault();
		const message = event.target.elements.message.value;
		// if message has an image, convert it then call sendMessage with result
		if (event.target.elements.messageImage.files[0] !== undefined) {
			let reader = new FileReader();
			reader.readAsDataURL(event.target.elements.messageImage.files[0]);
			reader.onloadend = () => {
				const image = reader.result;
				sendMessage(message, image, userInfo, currentChat);
				event.target.elements.message.value = '';
				event.target.elements.messageImage.value = '';
			};
		} // if not, send ""
		else {
			sendMessage(message, '', userInfo, currentChat);
			event.target.elements.message.value = '';
		}
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
				<CurrentChatInfo
					currentChat={currentChat}
					userInfo={userInfo}
					fetchUserChats={fetchUserChats}
					setCurrentChat={setCurrentChat}
				/>
			</section>
		);
	}
}

export default CurrentChat;
