import APIcalls from '../APIcalls';

function HelperFunctions() {
	const { fetchUserInfo } = APIcalls();

	async function updateUserInfo(username, password, setUserInfo) {
		const userData = await fetchUserInfo(username, password);

		// store user info in state
		setUserInfo({
			userID: userData._id,
			username: userData.username,
			password: userData.password,
			chats: userData.chats,
			image: userData.image,
		});

		// store user info in local storage
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

	return { updateUserInfo };
}

export default HelperFunctions;
