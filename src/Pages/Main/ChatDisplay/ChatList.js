function ChatList({ chatsInfo, setCurrentChat }) {
	return (
		<ol>
			{chatsInfo.map((chat) => {
				return (
					<li
						onClick={() => {
							setCurrentChat(chat.name);
						}}
					>
						<p>{chat.name}</p>
						<p>
							{chat.messages.slice(-1)[0] !== undefined
								? chat.messages.slice(-1)[0].message
								: ''}
						</p>
					</li>
				);
			})}
		</ol>
	);
}

export default ChatList;
