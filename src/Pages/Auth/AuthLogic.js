import supabase from '../../supabaseConfig';

function AuthLogic() {
	async function login(username, password, setUserInfo, setDisplayedPage, setSuccessFlag) {
		setSuccessFlag(true);
		const { data, error } = await supabase
			.from('Users')
			.select()
			.eq('username', username)
			.eq('password', password);

		if (data[0]) {
			let user = data;

			setUserInfo({
				userID: user[0]._id,
				username: user[0].username,
				password: user[0].password,
				chats: user[0].chats,
				image: user[0].image,
			});

			// store user info in local storage
			localStorage.setItem(
				'userInfo',
				JSON.stringify({
					userID: user[0]._id,
					username: user[0].username,
					password: user[0].password,
					chats: user[0].chats,
					image: user[0].image,
				})
			);

			setDisplayedPage('Main');
		} else {
			setSuccessFlag(false);
		}
	}

	return { login };
}

export default AuthLogic;
