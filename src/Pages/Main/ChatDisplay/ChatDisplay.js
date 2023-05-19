import { useEffect, useState } from 'react';

// updates and displays information about user's chats
function ChatDisplay({ userChatsIDs }) {
	// array of info for each chat in userChats
	const [chatsInfo, setChatsInfo] = useState([]);

	// which is the current chat to display
	const [currentChat, setCurrentChat] = useState();

	// fetchChatsInfo()
	// for each chatID in userChats, fetch chat data using the chatID
	// append chat data to chatsInfo
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

	async function updateChat() {
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
			const timer = setInterval(updateChat, 5000);
			return () => {
				clearInterval(timer);
			};
		}
	}, [userChatsIDs]);

	// ChatList component displays each chat name with latest message
	// takes in chatsInfo

	// CurrentChat component displays the currentChat and allows to send messages
	// takes in currentChat
}

export default ChatDisplay;
