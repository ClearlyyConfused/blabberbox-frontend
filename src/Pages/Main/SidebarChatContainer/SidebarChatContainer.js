import { useEffect, useState } from 'react';
import ChatSidebar from '../ChatSidebar/ChatSidebar';
import CurrentChat from '../CurrentChat/CurrentChat';
import './ChatDisplay.css';
import supabase from '../../../supabaseConfig';

// also displays chat sidebar
function SidebarChatContainer({ userInfo, updateUserInfo, chatsInfo, updateChatsInfo }) {
	// array of info for each chat
	// const [chatsInfo, setChatsInfo] = useState([]);
	// current chat to display
	const [currentChatID, setCurrentChatID] = useState();
	const [currentChatInfo, setCurrentChatInfo] = useState();

	useEffect(() => {
		let f = 0;
		for (const chat of chatsInfo) {
			if (chat._id === currentChatID) {
				setCurrentChatInfo(chat);
				f = 1;
			}
		}
		if (f === 0) {
			setCurrentChatInfo(undefined);
		}
	}, [chatsInfo, currentChatID]);

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
					if (currentChatID === payload.new._id) {
						updateChatsInfo(1);
					} else if (userInfo.chats.includes(payload.new.name)) {
						updateChatsInfo(0);
					}
				}
			)
			.subscribe();
	}, [currentChatID]);

	return (
		<main className="sidebar-chat-container">
			{/* ChatList component displays each chat name and sets the current chat */}
			<ChatSidebar
				chatsInfo={chatsInfo}
				setCurrentChat={setCurrentChatID}
				userInfo={userInfo}
				updateUserInfo={updateUserInfo}
			/>

			{/* CurrentChat component displays the current chat info and allows to send messages to that chat */}
			<CurrentChat
				currentChat={currentChatInfo}
				userInfo={userInfo}
				setCurrentChat={setCurrentChatID}
				updateUserInfo={updateUserInfo}
			/>
		</main>
	);
}

export default SidebarChatContainer;
