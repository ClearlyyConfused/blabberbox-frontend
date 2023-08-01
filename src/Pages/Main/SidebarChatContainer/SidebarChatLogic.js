function ChatDisplayLogic(userChatsIDs, setChatsInfo) {
	// return chat data for the inputted chatID
	async function fetchChatInfo(chatID) {
		const reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chatID: chatID,
			}),
		};
		return fetch('https://blabberbox-backend.vercel.app/getChat', reqOptions)
			.then((res) => res.json())
			.then((chat) => {
				return chat;
			});
	}

	// fetches chat info for each chat then updates overall chatsInfo
	async function updateChatsInfo(f = 0) {
		let arr = [];
		for (const chatID of userChatsIDs) {
			const chat = await fetchChatInfo(chatID);
			arr.push(chat);
		}

		// sorts messages by latest
		const sorter = (a, b) => {
			// returns -1 if chat has no message (put last in array)
			if (b.messages[b.messages.length - 1] === undefined) {
				return -1;
			} else if (a.messages[a.messages.length - 1] === undefined) {
				return -1;
			}

			return (
				new Date(a.messages[a.messages.length - 1].timeSent) -
				new Date(b.messages[b.messages.length - 1].timeSent)
			);
		};
		arr.sort(sorter);
		setChatsInfo([...arr].reverse());

		// if being called after a message is sent, reset chat scroll chat to bottom
		if (f === 1) {
			const element = document.getElementsByClassName('chatbox');
			if (element[0] !== undefined) {
				element[0].scrollTo(0, undefined);
			}
		}
	}

	// send message to current chat
	function sendMessage(message, img, userInfo, currentChatInfo) {
		const reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userID: userInfo.userID,
				chatID: currentChatInfo._id,
				message: message,
				image: img,
			}),
		};

		fetch('https://blabberbox-backend.vercel.app/messageChat', reqOptions).then((res) =>
			res.json().then((data) => {
				// updates chat info after message is sent, also scrolls that chat to bottom
				updateChatsInfo(1);
			})
		);
	}

	function getCurrentChatInfo(chatsInfo, currentChat) {
		for (const chat of chatsInfo) {
			if (chat._id === currentChat) {
				return chat;
			}
		}
	}

	return { updateChatsInfo, sendMessage, getCurrentChatInfo };
}

export default ChatDisplayLogic;
