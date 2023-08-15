import supabase from './supabaseConfig';

function APIcalls() {
	// fetch and returns user info from DB
	async function fetchUserInfo(username, password) {
		const { data, error } = await supabase
			.from('Users')
			.select()
			.eq('username', username)
			.eq('password', password);

		return data[0];
	}

	// return chat data for the inputted chatName
	async function fetchChatInfo(chatName) {
		const { data, error } = await supabase.from('Chats').select().eq('name', chatName);
		return data[0];
	}

	// add user to chat
	async function addChatToUser(userData, chatData) {
		const { error } = await supabase
			.from('Users')
			.update({ chats: [...userData.chats, chatData.name] })
			.eq('_id', userData.userID);
	}

	// add user to chat
	async function addUserToChat(chatData, userData) {
		const { error1 } = await supabase
			.from('Chats')
			.update({ users: [...chatData.users, userData.username] })
			.eq('_id', chatData._id);
	}

	// delete chat
	async function deleteChat(chatData) {
		const { error } = await supabase.from('Chats').delete().eq('_id', chatData._id);
	}

	// delete user from chat
	async function deleteUserFromChat(userData, chatData) {
		const { error1 } = await supabase
			.from('Chats')
			.update({ users: chatData.users.filter((e) => e !== userData.username) })
			.eq('_id', chatData._id);
	}

	async function deleteChatFromUser(userData, chatData) {
		const { error2 } = await supabase
			.from('Users')
			.update({ chats: userData.chats.filter((e) => e !== chatData.name) })
			.eq('_id', userData.userID);
	}

	// inserts a new user in the DB
	async function createNewUser(username, password) {
		const { data, error } = await supabase.from('Users').insert([
			{
				username: username,
				password: password,
				chats: [],
			},
		]);

		if (!error) {
			return true;
		}
	}

	// inserts a new chat in the DB
	async function createNewChat(chatName, chatPassword, firstUser) {
		const { chatData, chatError } = await supabase.from('Chats').insert([
			{
				name: chatName,
				password: chatPassword,
				users: [firstUser.username],
				messages: [],
			},
		]);
	}

	return {
		fetchUserInfo,
		createNewUser,
		fetchChatInfo,
		deleteChat,
		deleteUserFromChat,
		deleteChatFromUser,
		createNewChat,
		addChatToUser,
		addUserToChat,
	};
}

export default APIcalls;
