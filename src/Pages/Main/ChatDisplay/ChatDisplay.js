import { useState } from 'react';

// updates and displays information about user's chats
function ChatDisplay({ userChatsIDs }) {
	// array of info for each chat in userChats
	const [chatsInfo, setChatsInfo] = useState();

	console.log(userChatsIDs);

	// which is the current chat to display
	const [currentChat, setCurrentChat] = useState();

	// fetchChatsInfo()
	// for each chatID in userChats, fetch chat data using the chatID
	// append chat data to chatsInfo

	// useEffect() on render, set an interval to call fetchChatsInfo every X seconds

	// ChatList component displays each chat name with latest message
	// takes in chatsInfo

	// CurrentChat component displays the currentChat and allows to send messages
	// takes in currentChat
}

export default ChatDisplay;
