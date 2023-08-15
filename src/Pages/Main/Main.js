import SidebarChatContainer from './SidebarChatContainer/SidebarChatContainer';
import Navbar from './Navbar/Navbar';
import './Main.css';

// uses userInfo from App to get user's chats from API when needed
// updates user's chats whenever user creates/joins a chat to get an updated list of chats
function Main({ userInfo, setUserInfo, setDisplayedPage, updateUserInfo, chatsInfo, updateChatsInfo }) {
	return (
		<main className="main">
			<Navbar userInfo={userInfo} setUserInfo={setUserInfo} setDisplayedPage={setDisplayedPage} />
			<SidebarChatContainer
				userInfo={userInfo}
				updateUserInfo={updateUserInfo}
				chatsInfo={chatsInfo}
				updateChatsInfo={updateChatsInfo}
			/>
		</main>
	);
}

export default Main;
