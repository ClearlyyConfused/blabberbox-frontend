import { useEffect, useState } from 'react';
import ChatSidebar from '../ChatSidebar/ChatSidebar';
import CurrentChat from '../CurrentChat/CurrentChat';
import './ChatDisplay.css';
import supabase from '../../../supabaseConfig';

function SidebarChatContainer({ userInfo, updateUserInfo, chatsInfo, updateChatsInfo }) {
	// current chat to display
	const [currentChatID, setCurrentChatID] = useState();
	const [currentChatInfo, setCurrentChatInfo] = useState();

	// gets and sets currentChatInfo corresponding to currentChatID from all chats info
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

	// update all chats info if change made to a user's chat
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
						updateChatsInfo(1); // if change made to current chat, scroll chat to bottom
					} else if (userInfo.chats.includes(payload.new.name)) {
						updateChatsInfo(0);
					}
				}
			)
			.subscribe();
	}, [currentChatID]);

	return (
		<main className="sidebar-chat-container">
			<ChatSidebar
				chatsInfo={chatsInfo}
				setCurrentChat={setCurrentChatID}
				userInfo={userInfo}
				updateUserInfo={updateUserInfo}
			/>
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
