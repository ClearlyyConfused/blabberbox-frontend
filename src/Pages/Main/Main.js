import { useEffect, useState } from 'react';
import ChatDisplay from './ChatDisplay/ChatDisplay';
import ChatCreateForm from './ChatCreateForm';
import ChatJoinForm from './ChatJoinForm';

// uses userInfo from Main to get userChats from API when needed
// updates userChats whenever user creates/joins a chat to get an updated list of chats
function Main({ userInfo }) {
	// userChats: useState for userInfos's chats from API
	// initially undefined
	const [userChatsIDs, setUserChatsIDs] = useState();

	// fetchUserChats()
	// uses userInfo to call API and return user's chats IDs
	// setUserChatsIDs the returned chats
	function fetchUserChats() {
		const reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: userInfo.username,
				password: userInfo.password,
			}),
		};

		fetch('https://chatterbox-api.onrender.com/getUser', reqOptions)
			.then((res) => res.json())
			.then((user) => {
				setUserChatsIDs(user[0].chats);
			});
	}

	// useEffect []: on initial render, call fetchUserChats
	// to get initial sets of chats
	useEffect(() => {
		fetchUserChats();
	}, []);

	return (
		<main>
			{/*	createChatForm component to create chats */}
			{/*takes in fetchUserChats to fetch new chats when new chats added*/}
			<ChatCreateForm userInfo={userInfo} fetchUserChats={fetchUserChats} />

			{/*	joinChatForm component to join chats */}
			{/* takes in fetchUserChats to fetch new chats when new chats added */}
			<ChatJoinForm userInfo={userInfo} fetchUserChats={fetchUserChats} />

			{/*	chatDisplay component to display list of chats and current chat */}
			{/* takes in userChatsIDs */}
			<ChatDisplay userChatsIDs={userChatsIDs} userInfo={userInfo} />
		</main>
	);
}

export default Main;
