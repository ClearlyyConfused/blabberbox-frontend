function CurrentChat({ chatsInfo, currentChat, userInfo }) {
	let currentChatInfo;

	// set currentChatInfo to currentChat being displayed
	for (const chat of chatsInfo) {
		if (chat._id === currentChat) {
			currentChatInfo = chat;
			console.log(currentChatInfo);
		}
	}

	// sends message to the currentChat
	function handleSubmit(event) {
		event.preventDefault();
		if (event.target.elements.image.files[0] !== undefined) {
			let reader = new FileReader();
			reader.readAsDataURL(event.target.elements.image.files[0]);
			reader.onloadend = () => {
				const reqOptions = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						userID: userInfo.userID,
						chatID: currentChatInfo._id,
						message: event.target.elements.message.value,
						image: reader.result,
					}),
				};

				fetch('https://blabberbox-backend.vercel.app/messageChat', reqOptions).then(
					(res) => res.json().then((data) => {})
				);
			};
		} else {
			const reqOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userID: userInfo.userID,
					chatID: currentChatInfo._id,
					message: event.target.elements.message.value,
					image: '',
				}),
			};

			fetch('https://blabberbox-backend.vercel.app/messageChat', reqOptions).then((res) =>
				res.json().then((data) => {})
			);
		}
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
						<input
							type="file"
							id="image"
							name="image"
							accept="image/png, image/jpeg"
						></input>
						<button type="submit">Send</button>
					</form>
				</section>
			</section>
		);
	}
}

export default CurrentChat;
