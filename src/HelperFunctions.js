import APIcalls from './APIcalls';

function HelperFunctions() {
	const { fetchUserInfo, fetchChatInfo } = APIcalls();

	// calls DB, updates user's info in state variable and localStorage
	async function updateUserInfoHelper(username, password, setUserInfo) {
		const userData = await fetchUserInfo(username, password);

		setUserInfo({
			userID: userData._id,
			username: userData.username,
			password: userData.password,
			chats: userData.chats,
			image: userData.image,
		});

		localStorage.setItem(
			'userInfo',
			JSON.stringify({
				userID: userData._id,
				username: userData.username,
				password: userData.password,
				chats: userData.chats,
				image: userData.image,
			})
		);
	}

	// fetches chat info for each chat then updates overall chatsInfo
	// f(1) -> chat scrolls to bottom after updating
	async function updateChatsInfoHelper(userInfo, setChatsInfo, f = 0) {
		let arr = [];
		for (const chatID of userInfo.chats) {
			const chat = await fetchChatInfo(chatID);

			if (chat) {
				if (chat.users.includes(userInfo.username)) {
					arr.push(chat);
				}
			}
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

		if (f === 1) {
			const element = document.getElementsByClassName('chatbox');
			if (element[0] !== undefined) {
				element[0].scrollTo(0, undefined);
			}
		}
	}

	function convertToBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
		});
	}

	async function uploadImage(img) {
		const reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ image: img }),
		};

		return fetch('https://blabberbox-upload.vercel.app/upload', reqOptions).then((res) =>
			res.json().then((data) => {
				return data.image;
			})
		);
	}

	function diffMinutes(date1, date2) {
		const d1 = new Date(date1).getTime();
		const d2 = new Date(date2).getTime();
		return Math.round((d1 - d2) / 60000);
	}

	return { updateUserInfoHelper, updateChatsInfoHelper, uploadImage, convertToBase64, diffMinutes };
}

export default HelperFunctions;
