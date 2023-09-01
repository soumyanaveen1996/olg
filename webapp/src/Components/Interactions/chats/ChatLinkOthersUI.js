import React from 'react';
import { connect } from 'react-redux';
import ChatAvatar from './ChatAvatar';
import ChatDateTimeUI from './ChatDateTimeUI';

// ChatLinkOthersUI component
const ChatLinkOthersUI = ({ chat, conversation, children, chatMessageFrom, self }) => {
	// Safely get user's id and name from 'self'
	const userId = self?.user?.userId;
	const userName = self?.user?.userName;

	// Safely get conversation's username and bot name
	const contactName = conversation?.contact?.userName;
	const botName = conversation?.bot?.botName;

	// Decide on the creator name
	const creatorName = chat.createdBy === userId
		? userName
		: contactName || botName;

	return (
		<div className="d-flex justify-content-start chat-message chat-others">
			{(
				<div className="mr-2">
					<ChatAvatar conversation={conversation} chat={chat} />
				</div>
			)}
			<div className="d-flex flex-column">
				<div className="mb-1">
					<span className="chat-username mr-2">{creatorName}</span>
					<ChatDateTimeUI chat={chat} />
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	self: state.user,
});

export default connect(mapStateToProps)(ChatLinkOthersUI);
