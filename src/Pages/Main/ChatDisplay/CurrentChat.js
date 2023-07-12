// is the current chat being displayed on the screen, user can send messages to that chat
function CurrentChat({ currentChat, userInfo, sendMessage }) {
	// submit button that takes info from form to input into sendMessage
	function handleSubmit(event) {
		event.preventDefault();
		const message = event.target.elements.message.value;
		// if message has an image, convert it then call sendMessage with result
		if (event.target.elements.image.files[0] !== undefined) {
			let reader = new FileReader();
			reader.readAsDataURL(event.target.elements.image.files[0]);
			reader.onloadend = () => {
				const image = reader.result;
				sendMessage(message, image, userInfo, currentChat);
				event.target.elements.message.value = '';
				event.target.elements.image.value = '';
			};
		} // if not, send ""
		else {
			sendMessage(message, '', userInfo, currentChat);
			event.target.elements.message.value = '';
		}
	}

	if (currentChat !== undefined) {
		return (
			<section className="current-chat">
				<h1>{currentChat.name}</h1>
				<ol className="chatbox">
					{/* column reverse on .chatbox makes scroll start at bottom, div makes it so messages aren't reversed */}
					<div>
						{currentChat.messages.map((message) => {
							return (
								<li className={message.user === userInfo.username ? 'user-message message' : 'message'}>
									<img src={message.image} alt="" srcset="" />
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
						<input placeholder="Send a message" id="message" type="text" />
						<div>
							<label className="image-input" htmlFor="image">
								Add Img
							</label>
							<input type="file" id="image" name="image" accept="image/png, image/jpeg"></input>
						</div>
						<button type="submit">Send</button>
					</form>
				</section>
			</section>
		);
	}
}

export default CurrentChat;
