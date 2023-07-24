// list of chats being displayed
// displays latest message from each chat
function ChatList({ chatsInfo, setCurrentChat, userInfo, fetchUserChats }) {
	return (
		<section className="chat-list-container">
			<ol className="chat-list">
				{chatsInfo.map((chat) => {
					return (
						<li
							className="chat"
							onClick={() => {
								setCurrentChat(chat._id);
								// resets chat scroll to bottom after changing chats
								const element = document.getElementsByClassName('chatbox');
								if (element[0] !== undefined) {
									element[0].scrollTo(0, undefined);
								}
							}}
						>
							{/*<button onClick={(() => {handleSubmit(chat._id)})}>Leave Chat</button>*/}
							<h3>{chat.name}</h3>
							<p>
								Latest:{' '}
								{chat.messages.slice(-1)[0] !== undefined ? chat.messages.slice(-1)[0].message : 'N/A'}
							</p>
						</li>
					);
				})}
			</ol>
		</section>
	);
}

export default ChatList;
