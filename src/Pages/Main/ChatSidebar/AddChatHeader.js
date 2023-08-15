import add from '../../../images/add-button-svgrepo-com.svg';
import back from '../../../images/back-arrow-svgrepo-com.svg';

function AddChatHeader({ setAddChatDisplay, addChatDisplay }) {
	return (
		<section className="add-chat">
			<div onClick={() => setAddChatDisplay(!addChatDisplay)} className="add-chat-header">
				{!addChatDisplay ? <img src={add} alt="" /> : ''}
				<h2>{addChatDisplay ? 'Chat List' : 'Add Chat'}</h2>
				{addChatDisplay ? <img src={back} alt="" /> : ''}
			</div>
		</section>
	);
}

export default AddChatHeader;
