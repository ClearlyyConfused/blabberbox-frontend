function ChatList({ chatsInfo }) {
	return (
		<ol>
			{chatsInfo.map((chat) => {
				return (
					<li>
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
