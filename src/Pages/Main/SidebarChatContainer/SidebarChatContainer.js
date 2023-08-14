import { useEffect, useState } from 'react';
import ChatSidebar from '../ChatSidebar/ChatSidebar';
import CurrentChat from '../CurrentChat/CurrentChat';
import SidebarChatLogic from './SidebarChatLogic';
import './ChatDisplay.css';
import supabase from '../../../supabaseConfig';

// also displays chat sidebar
function SidebarChatContainer({ userInfo, updateUserInfo, chatsInfo, updateChatsInfo }) {
	// array of info for each chat
	// const [chatsInfo, setChatsInfo] = useState([]);
	// current chat to display
	const [currentChat, setCurrentChat] = useState();
	// get logic for all components
	const { getCurrentChatInfo } = SidebarChatLogic(userInfo);

	useEffect(() => {
		if (userInfo.chats !== undefined) {
			// updateChatsInfo();
		}
	}, []);

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
					} else if (userInfo.chats.includes(payload.new.name)) {
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
				updateUserInfo={updateUserInfo}
			/>

			{/* CurrentChat component displays the current chat info and allows to send messages to that chat */}
			<CurrentChat
				currentChat={getCurrentChatInfo(chatsInfo, currentChat)}
				userInfo={userInfo}
				setCurrentChat={setCurrentChat}
			/>
		</main>
	);
}

export default SidebarChatContainer;
