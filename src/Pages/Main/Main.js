import { useEffect, useState } from 'react';
import SidebarChatContainer from './SidebarChatContainer/SidebarChatContainer';
import Navbar from './Navbar/Navbar';
import './Main.css';
import supabase from '../../supabaseConfig';

// uses userInfo from App to get user's chats from API when needed
// updates user's chats whenever user creates/joins a chat to get an updated list of chats
function Main({ userInfo, setUserInfo, setDisplayedPage }) {
	// obtained from fetchUserChats() on userInfo
	const [userChatsIDs, setUserChatsIDs] = useState();

	// sets userChatIDs to fetched chat IDs
	async function fetchUserChats() {
		const { data, error } = await supabase
			.from('Users')
			.select()
			.eq('username', userInfo.username)
			.eq('password', userInfo.password);

		if (data) {
			setUserChatsIDs(data[0].chats);
		}
	}

	// on initial render to get initial chats
	useEffect(() => {
		fetchUserChats();
	}, []);

	return (
		<main className="main">
			<Navbar userInfo={userInfo} setUserInfo={setUserInfo} setDisplayedPage={setDisplayedPage} />
			<SidebarChatContainer userChatsIDs={userChatsIDs} userInfo={userInfo} fetchUserChats={fetchUserChats} />
		</main>
	);
}

export default Main;
