import { useEffect, useState } from 'react';
import ChatList from './ChatList';
import CurrentChat from './CurrentChat';

// updates and displays information about user's chats
function ChatDisplay({ userChatsIDs, userInfo }) {
	// array of info for each chat in userChats
	const [chatsInfo, setChatsInfo] = useState([]);

	// which is the current chat to display
	const [currentChat, setCurrentChat] = useState();

	// return chat data for the chatID
	async function fetchChatInfo(chatID) {
		const reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chatID: chatID,
			}),
		};
		return fetch('https://chatterbox-api.onrender.com/getChat', reqOptions)
			.then((res) => res.json())
			.then((chat) => {
				return chat;
			});
	}

	// fetches chat info for each chat then updates ChatsInfo
	async function updateChatsInfo() {
		let arr = [];
		for (const chatID of userChatsIDs) {
			const chat = await fetchChatInfo(chatID);
			arr.push(chat);
		}
		setChatsInfo(arr);
	}

	// useEffect() on render, set an interval to call fetchChatsInfo every X seconds
	useEffect(() => {
		if (userChatsIDs !== undefined) {
			const timer = setInterval(updateChatsInfo, 5000);
			return () => {
				clearInterval(timer);
			};
		}
	}, [userChatsIDs]);

	return (
		<main>
			{/* ChatList component displays each chat name with latest message */}
			{/* takes in chatsInfo */}
			<ChatList chatsInfo={chatsInfo} setCurrentChat={setCurrentChat} />

			{/* CurrentChat component displays the currentChat and allows to send messages */}
			{/* takes in currentChat and ChatsInfo */}
			<CurrentChat chatsInfo={chatsInfo} currentChat={currentChat} userInfo={userInfo} />
		</main>
	);
}

export default ChatDisplay;
