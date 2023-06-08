import { useEffect, useState } from 'react';
import ChatDisplay from './ChatDisplay/ChatDisplay';
import ChatCreateForm from './ChatCreateForm';
import ChatJoinForm from './ChatJoinForm';
import './Main.css';

// uses userInfo from App to get user's chats from API when needed
// updates user's chats whenever user creates/joins a chat to get an updated list of chats
function Main({ userInfo }) {
	// obtained from fetchUserChats() on userInfo
	const [userChatsIDs, setUserChatsIDs] = useState();

	// sets userChatIDs to fetched chat IDs
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

		fetch('https://blabberbox-backend.vercel.app/getUser', reqOptions)
			.then((res) => res.json())
			.then((user) => {
				setUserChatsIDs(user[0].chats);
			});
	}

	// on initial render to get initial chats
	useEffect(() => {
		fetchUserChats();
	}, []);

	return (
		<main className="main">
			<div className="chat-form-container">
				{/*	creates chats */}
				<ChatCreateForm userInfo={userInfo} fetchUserChats={fetchUserChats} />
				{/*	join chats */}
				<ChatJoinForm userInfo={userInfo} fetchUserChats={fetchUserChats} />
				{/* both call fetchUserChats() after to get an updated list */}
			</div>
			{/*	chatDisplay component to display list of chats and current chat using userChatIDs*/}
			<ChatDisplay userChatsIDs={userChatsIDs} userInfo={userInfo} />
		</main>
	);
}

export default Main;
