import { useState } from 'react';
import ChatCreateForm from './ChatCreateForm';
import ChatJoinForm from './ChatJoinForm';
import add from '../../../images/add-button-svgrepo-com.svg';

function AddChat({ userInfo, fetchUserChats }) {
	const [buttonDisplay, setButtonDisplay] = useState('0px');
	const [formDisplay, setFormDisplay] = useState('');

	function handleClick() {
		if (buttonDisplay === '0px') {
			setButtonDisplay('160px');
		} else if (buttonDisplay === '160px') {
			setButtonDisplay('0px');
		}
	}

	if (formDisplay === 'create chat') {
		return (
			<ChatCreateForm userInfo={userInfo} fetchUserChats={fetchUserChats} setFormDisplay={setFormDisplay} />
		);
	}
	if (formDisplay === 'join chat') {
		return (
			<ChatJoinForm userInfo={userInfo} fetchUserChats={fetchUserChats} setFormDisplay={setFormDisplay} />
		);
	}

	return (
		<section className="add-chat">
			<div onClick={handleClick} className="add-chat-header">
				<img src={add} alt="" />
				<h2>Add Chat</h2>
			</div>
			<div className="add-chat-buttons" style={{ height: buttonDisplay }}>
				<button onClick={() => setFormDisplay('create chat')}>Create Chat</button>
				<button onClick={() => setFormDisplay('join chat')}>Join Chat</button>
			</div>
		</section>
	);
}

export default AddChat;
