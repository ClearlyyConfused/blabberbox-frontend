import { useEffect, useState } from 'react';
import ChatSidebar from '../ChatSidebar/ChatSidebar';
import CurrentChat from './CurrentChat';
import ChatDisplayLogic from './ChatDisplayLogic';
import './ChatDisplay.css';

// fetches and displays chat info using userChatsIDs
// also displays chat sidebar
function ChatDisplay({ userChatsIDs, userInfo, fetchUserChats }) {
	// array of info for each chat
	const [chatsInfo, setChatsInfo] = useState([]);
	// current chat to display
	const [currentChat, setCurrentChat] = useState();
	// get logic for all components
	const { updateChatsInfo, sendMessage, getCurrentChatInfo } = ChatDisplayLogic(userChatsIDs, setChatsInfo);

	// whenever user's chat IDs change, set an interval to fetch info from all the chatIDs
	useEffect(() => {
		if (userChatsIDs !== undefined) {
			updateChatsInfo();
			const timer = setInterval(() => {
				updateChatsInfo();
			}, 10000);
			return () => {
				clearInterval(timer);
			};
		}
	}, [userChatsIDs]);

	return (
		<main className="chat-display">
			{/* ChatList component displays each chat name and sets the current chat */}
			<ChatSidebar
				chatsInfo={chatsInfo}
				setCurrentChat={setCurrentChat}
				userInfo={userInfo}
				fetchUserChats={fetchUserChats}
			/>

			{/* CurrentChat component displays the current chat info and allows to send messages to that chat */}
			<CurrentChat
				currentChat={getCurrentChatInfo(chatsInfo, currentChat)}
				userInfo={userInfo}
				sendMessage={sendMessage}
				fetchUserChats={fetchUserChats}
				setCurrentChat={setCurrentChat}
			/>
		</main>
	);
}

export default ChatDisplay;
