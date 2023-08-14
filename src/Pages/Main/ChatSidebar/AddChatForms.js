import ChatCreateForm from './ChatCreateForm';
import ChatJoinForm from './ChatJoinForm';

function AddChatForms({ userInfo, updateUserInfo }) {
	return (
		<section className="add-chat-forms">
			<ChatCreateForm userInfo={userInfo} updateUserInfo={updateUserInfo} />
			<ChatJoinForm userInfo={userInfo} updateUserInfo={updateUserInfo} />
		</section>
	);
}

export default AddChatForms;
