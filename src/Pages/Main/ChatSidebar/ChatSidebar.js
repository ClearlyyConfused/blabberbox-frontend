import ChatList from './ChatList';
import AddChatHeader from './AddChatHeader';
import AddChatForms from './AddChatForms/AddChatForms';
import './ChatSidebar.css';
import { useState } from 'react';

function ChatSidebar({ chatsInfo, setCurrentChat, userInfo, updateUserInfo }) {
	// determines to display either chat list or add chat forms
	const [addChatDisplay, setAddChatDisplay] = useState(false);

	return (
		<section className="chat-sidebar">
			<AddChatHeader
				userInfo={userInfo}
				setAddChatDisplay={setAddChatDisplay}
				addChatDisplay={addChatDisplay}
			/>
			{addChatDisplay ? (
				<AddChatForms userInfo={userInfo} updateUserInfo={updateUserInfo} />
			) : (
				<ChatList chatsInfo={chatsInfo} setCurrentChat={setCurrentChat} userInfo={userInfo} />
			)}
		</section>
	);
}

export default ChatSidebar;
