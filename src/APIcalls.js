import supabase from './supabaseConfig';

function APIcalls() {
	async function fetchUserInfo(username, password) {
		const { data, error } = await supabase
			.from('Users')
			.select()
			.eq('username', username)
			.eq('password', password);

		return data[0];
	}

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

	return { fetchUserInfo, createNewUser };
}

export default APIcalls;
