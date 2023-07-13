import ChatCreateForm from './ChatCreateForm';
import ChatJoinForm from './ChatJoinForm';

function AddChatForms({ userInfo, fetchUserChats }) {
	return (
		<section className="add-chat-forms">
			<ChatCreateForm userInfo={userInfo} fetchUserChats={fetchUserChats} />
			<ChatJoinForm userInfo={userInfo} fetchUserChats={fetchUserChats} />
		</section>
	);
}

export default AddChatForms;
