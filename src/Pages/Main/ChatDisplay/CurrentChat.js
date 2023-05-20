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

		fetch('https://chatterbox-api.onrender.com/messageChat', reqOptions).then((res) =>
			res.json().then((data) => {})
		);
	}

	if (currentChatInfo !== undefined) {
		return (
			<section className="current-chat">
				{currentChatInfo.name}
				<ol>
					{currentChatInfo.messages.map((message) => {
						return (
							<li>
								<p>{message.message}</p>
								<p>{message.user}</p>
							</li>
						);
					})}
				</ol>
				<section>
					<h2>Message</h2>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="message">Message</label>
							<input id="message" type="text" />
						</div>
						<button type="submit">Submit</button>
					</form>
				</section>
			</section>
		);
	}
}

export default CurrentChat;
