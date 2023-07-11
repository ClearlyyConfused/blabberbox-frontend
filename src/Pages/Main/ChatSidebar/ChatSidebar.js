import ChatList from './ChatList';
import AddChat from './AddChat';

function ChatSidebar({ chatsInfo, setCurrentChat, userInfo, fetchUserChats }) {
	return (
		<section className="chat-sidebar">
			<AddChat userInfo={userInfo} fetchUserChats={fetchUserChats} />
			<ChatList
				chatsInfo={chatsInfo}
				setCurrentChat={setCurrentChat}
				userInfo={userInfo}
				fetchUserChats={fetchUserChats}
			/>
		</section>
	);
}

export default ChatSidebar;
