import { useEffect, useState } from 'react';
import ChatSidebar from '../ChatSidebar/ChatSidebar';
import CurrentChat from '../CurrentChat/CurrentChat';
import SidebarChatLogic from './SidebarChatLogic';
import './ChatDisplay.css';
import supabase from '../../../supabaseConfig';

// fetches and displays chat info using userChatsIDs
// also displays chat sidebar
function SidebarChatContainer({ userChatsIDs, userInfo, fetchUserChats }) {
	// array of info for each chat
	const [chatsInfo, setChatsInfo] = useState([]);
	// current chat to display
	const [currentChat, setCurrentChat] = useState();
	// get logic for all components
	const { updateChatsInfo, sendMessage, getCurrentChatInfo } = SidebarChatLogic(userChatsIDs, setChatsInfo);

	// whenever user's chat IDs change, set an interval to fetch info from all the chatIDs
	useEffect(() => {
		if (userChatsIDs !== undefined) {
			updateChatsInfo();
			const timer = setInterval(() => {
				//	updateChatsInfo();
			}, 10000);
			return () => {
				clearInterval(timer);
			};
		}
	}, [userChatsIDs]);

	useEffect(() => {
		const channel = supabase
			.channel('table_db_changes')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'Chats',
				},
				(payload) => {
					if (currentChat === payload.new._id) {
						updateChatsInfo(1);
					} else if (userChatsIDs.includes(payload.new.name)) {
						updateChatsInfo(0);
					}
				}
			)
			.subscribe();
	}, [currentChat]);

	return (
		<main className="sidebar-chat-container">
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

export default SidebarChatContainer;
