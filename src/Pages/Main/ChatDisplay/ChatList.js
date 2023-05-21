function ChatList({ chatsInfo, setCurrentChat }) {
	return (
		<section className="chat-list">
			<ol>
				{chatsInfo.map((chat) => {
					return (
						<li
							onClick={() => {
								setCurrentChat(chat.name);
							}}
						>
							<h3>{chat.name}</h3>
							<p>
								Latest Message:{' '}
								{chat.messages.slice(-1)[0] !== undefined
									? chat.messages.slice(-1)[0].message
									: 'N/A'}
							</p>
						</li>
					);
				})}
			</ol>
		</section>
	);
}

export default ChatList;
