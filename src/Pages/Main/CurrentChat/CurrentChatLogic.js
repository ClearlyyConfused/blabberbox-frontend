import supabase from '../../../supabaseConfig';
import defaultPFP from '../../../images/Default_pfp.svg';
import HelperFunctions from '../../../HelperFunctions';
import APIcalls from '../../../APIcalls';

function CurrentChatLogic(currentChat, userInfo) {
	const { uploadImage, convertToBase64 } = HelperFunctions();
	const { fetchChatInfo, deleteChat, deleteUserFromChat, deleteChatFromUser } = APIcalls();

	async function fetchProfileImage(username) {
		const { data, error } = await supabase.from('Users').select().eq('username', username);
		if (data[0].image) {
			return [data[0].username, data[0].image];
		} else {
			return [data[0].username, defaultPFP];
		}
	}
	// fetches profile image of all users in the chat to display
	async function fetchAllProfileImages(users, setUserProfileImages) {
		let array = [];
		for (const username of users) {
			const data = await fetchProfileImage(username);
			// waits until fetchAPI for that param is finished before continuing
			array.push(data);
		}
		setUserProfileImages(Object.fromEntries(array));
	}

	async function sendMessage(event) {
		event.preventDefault();
		const message = event.target.elements.message.value;
		let image = '';
		if (event.target.elements.messageImage.files[0] !== undefined) {
			image = await convertToBase64(event.target.elements.messageImage.files[0]);
		}
		const imageURL = image !== '' ? await uploadImage(image) : '';

		const { data, chatError } = await supabase.from('Chats').select().eq('name', currentChat.name);
		const previousChatData = data[0];

		const newMessage = { user: userInfo.username, message: message, image: imageURL, timeSent: new Date() };

		const { error } = await supabase
			.from('Chats')
			.update({ messages: [...previousChatData.messages, newMessage] })
			.eq('_id', previousChatData._id);

		event.target.elements.message.value = '';
		event.target.elements.messageImage.value = '';
	}

	// delete chat from user
	async function leaveChat(updateUserInfo, setCurrentChat) {
		// update chat's list of users or delete chat if last user leaves
		const chatData = await fetchChatInfo(currentChat.name);
		if (chatData.users.length === 1) {
			await deleteChat(chatData);
		} else {
			await deleteUserFromChat(userInfo, chatData);
		}
		await deleteChatFromUser(userInfo, chatData);

		updateUserInfo();
		setCurrentChat(undefined);
	}

	function countUserMessages() {
		let count = 0;
		for (const message of currentChat.messages) {
			if (message.user === userInfo.username) {
				count++;
			}
		}
		return count;
	}

	return { fetchAllProfileImages, sendMessage, countUserMessages, leaveChat };
}

export default CurrentChatLogic;
