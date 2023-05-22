function CurrentChat({ chatsInfo, currentChat, userInfo }) {
	let currentChatInfo;

	// set currentChatInfo to currentChat being displayed
	for (const chat of chatsInfo) {
		if (chat.name === currentChat) {
			currentChatInfo = chat;
		}
	}

	// sends message to the currentChat
	function handleSubmit(event) {
		event.preventDefault();
		const reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userID: userInfo.userID,
				chatID: currentChatInfo._id,
				message: event.target.elements.message.value,
			}),
		};

		fetch('https://chatterbox-backend.vercel.app/messageChat', reqOptions).then((res) =>
			res.json().then((data) => {})
		);
	}

	if (currentChatInfo !== undefined) {
		return (
			<section className="current-chat">
				<h1>{currentChatInfo.name}</h1>
				<ol>
					<div>
						{currentChatInfo.messages.map((message) => {
							console.log(message);
							return (
								<li className={message.user === userInfo.username ? 'user-message' : ''}>
									<h4>{message.user} </h4>
									<p>{message.message}</p>
									<p className="message-date">
										{new Date(message.timeSent).toLocaleTimeString('en-US', {
											year: 'numeric',
											month: 'numeric',
											day: 'numeric',
											hour: 'numeric',
											minute: 'numeric',
										})}
									</p>
								</li>
							);
						})}
					</div>
				</ol>
				<section className="message-form">
					<form onSubmit={handleSubmit}>
						<label htmlFor="message"></label>
						<input id="message" type="text" />
						<button type="submit">Send</button>
					</form>
				</section>
			</section>
		);
	}
}

export default CurrentChat;
