import ChatList from './ChatList';
import AddChatHeader from './AddChatHeader';
import AddChatForms from './AddChatForms';
import './ChatSidebar.css';
import { useState } from 'react';

function ChatSidebar({ chatsInfo, setCurrentChat, userInfo, fetchUserChats }) {
	// determines to display either chat list or add chat forms
	const [addChatDisplay, setAddChatDisplay] = useState(false);

	return (
		<section className="chat-sidebar">
			<AddChatHeader
				userInfo={userInfo}
				fetchUserChats={fetchUserChats}
				setAddChatDisplay={setAddChatDisplay}
				addChatDisplay={addChatDisplay}
			/>
			{addChatDisplay ? (
				<AddChatForms userInfo={userInfo} fetchUserChats={fetchUserChats} />
			) : (
				<ChatList
					chatsInfo={chatsInfo}
					setCurrentChat={setCurrentChat}
					userInfo={userInfo}
					fetchUserChats={fetchUserChats}
				/>
			)}
		</section>
	);
}

export default ChatSidebar;
