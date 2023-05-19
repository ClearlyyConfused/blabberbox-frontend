import { useState } from 'react';

// uses userInfo from Main to get userChats from API when needed
// updates userChats whenever user creates/joins a chat to get an updated list of chats
function Main({ userInfo }) {
	// userChats: useState for userInfos's chats from API
	// initially undefined
	const [userChatsIDs, setUserChatsIDs] = useState();

	// fetchUserChats()
	// uses userInfo to call API and return user's chats IDs
	// setUserChatsIDs the returned chats

	// useEffect []: on initial render, call fetchUserChats
	// to get initial sets of chats

	// createChatForm component to create chats
	// takes in fetchUserChats to fetch new chats when new chats added

	// joinChatForm component to join chats
	// takes in fetchUserChats to fetch new chats when new chats added

	// chatDisplay component to display list of chats and current chat
	// takes in userChatsIDs
}
