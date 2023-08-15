import { useEffect, useState } from 'react';
import defaultPFP from '../../../images/Default_pfp.svg';
import HelperFunctions from '../../../HelperFunctions';

function ChatMessage({ messages, userInfo, userProfileImages }) {
	const { diffMinutes } = HelperFunctions();

	// groups messages by if they are sent by the same person in a certain amount of minutes
	// Ex. user1 sends 3 messages within 3 minutes are grouped
	const [groupedMessages, setGroupedMessages] = useState([]);
	useEffect(() => {
		let groupedMessages = [];
		let lastMessageUser = undefined;
		let lastMessageTime = undefined;
		for (const message of messages) {
			// if message sent has same user as and sent within 3 minutes of previous message
			if (
				message.user === lastMessageUser &&
				diffMinutes(message.timeSent, lastMessageTime) <= 3 &&
				lastMessageTime !== undefined
			) {
				// add to latest batch of grouped messages
				groupedMessages[groupedMessages.length - 1].push(message);
				lastMessageTime = message.timeSent;
			} else {
				// start a new batch of grouped messages
				groupedMessages.push([message]);
				lastMessageUser = message.user;
				lastMessageTime = message.timeSent;
			}
		}
		setGroupedMessages(groupedMessages);
	}, [messages]);

	return (
		<div className="messages-container">
			{groupedMessages.map((groupedMessage) => {
				return (
					<li className={groupedMessage[0].user === userInfo.username ? 'user-message message' : 'message'}>
						{userProfileImages !== undefined ? (
							<img
								className="user-profile-picture"
								src={
									userProfileImages[groupedMessage[0].user] !== undefined
										? userProfileImages[groupedMessage[0].user]
										: defaultPFP
								}
								alt=""
								srcset=""
							/>
						) : (
							''
						)}
						<div>
							<div className="message-info">
								<h4>{groupedMessage[0].user} </h4>
								<p className="message-date">
									{new Date(groupedMessage[0].timeSent).toLocaleTimeString('en-US', {
										year: 'numeric',
										month: 'numeric',
										day: 'numeric',
										hour: 'numeric',
										minute: 'numeric',
									})}
								</p>
							</div>
							<div className="message-content-container">
								{groupedMessage.map((message) => {
									return (
										<div className="message-content">
											<img
												className="user-image"
												src={message.image}
												alt=""
												srcset=""
												style={{ display: message.image ? '' : 'none' }}
											/>
											<p style={{ display: message.message ? '' : 'none' }}>{message.message}</p>
										</div>
									);
								})}
							</div>
						</div>
					</li>
				);
			})}
		</div>
	);
}

export default ChatMessage;

/*
return (
					<li className={message.user === userInfo.username ? 'user-message message' : 'message'}>
						{userProfileImages !== undefined ? (
							<img
								className="user-profile-picture"
								src={
									userProfileImages[message.user] !== undefined ? userProfileImages[message.user] : defaultPFP
								}
								alt=""
								srcset=""
							/>
						) : (
							''
						)}
						<div className="message-info-date-container">
							<div className="message-info">
								<h4>{message.user} </h4>
								<p className="message-date">
									{new Date(message.timeSent).toLocaleTimeString('en-US', {
										year: 'numeric',
										month: 'numeric',
										day: 'numeric',
										hour: 'numeric',
										minute: 'numeric',
									})}
								</p>
							</div>
							<div className="message-content">
								<img
									className="user-image"
									src={message.image}
									alt=""
									srcset=""
									style={{ display: message.image ? '' : 'none' }}
								/>
								<p style={{ display: message.message ? '' : 'none' }}>{message.message}</p>
							</div>
						</div>
					</li>
				);
*/
