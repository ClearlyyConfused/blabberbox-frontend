import { useEffect, useState } from 'react';
import CurrentChatInfo from './CurrentChatInfo';
import downChevron from '../../../images/chevron-down-icon.svg';
import back from '../../../images/back-arrow-svgrepo-com.svg';
import './CurrentChat.css';
import ChatMessage from './ChatMessage';
import CurrentChatLogic from './CurrentChatLogic';

// is the current chat being displayed on the screen, user can send messages to that chat
function CurrentChat({ currentChat, userInfo, setCurrentChat, updateUserInfo }) {
	const [display, setDisplay] = useState('chat');
	const [x, setX] = useState(); // for resetting chat after switching chats
	const [userProfileImages, setUserProfileImages] = useState();
	const { fetchAllProfileImages, sendMessage } = CurrentChatLogic(currentChat, userInfo);

	// fetches profile images of users in the chat
	useEffect(() => {
		if (currentChat !== undefined) {
			fetchAllProfileImages(currentChat.users, setUserProfileImages);
		}
	}, [currentChat]);

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
					<form onSubmit={sendMessage}>
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
					setCurrentChat={setCurrentChat}
					updateUserInfo={updateUserInfo}
				/>
			</section>
		);
	}
}

export default CurrentChat;
