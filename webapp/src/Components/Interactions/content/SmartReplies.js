import React, { Component } from "react";
import { connect } from "react-redux";
import ChatContentView from "./ChatContentView";
import { MessageTypeConstants } from "../../../Services/Message";

class SmartReplies extends Component {
	constructor(props) {
		super(props);
		this.smartReplies = React.createRef();
	}

	// componentDidUpdate() {
	//   let height = 0;
	//   if (this.smartReplies && this.smartReplies.current) {
	//     height = this.smartReplies.current.clientHeight;
	//   }
	//   console.log(height);
	//   this.props.setSmartReplyHeight(height);
	// }

	setRef = (component) => {
		this.smartReplies = component;
	};

	render() {
		let { smartReplies, close, conversation } = this.props;
		if (
			!smartReplies ||
			!smartReplies.message ||
			smartReplies.message.length === 0
		) {
			return null;
		}
		return (
			<div
				style={{
					height: "auto",
					maxHeight: "200px",
					overflow: "auto hidden",
				}}
				ref={this.smartReplies}
			>
				<ChatContentView
					content={smartReplies}
					sendMessage={this.props.sendMessage}
					smartReply
					close={close}
					conversation={conversation}
					noCloseBtn={
						smartReplies.messageType ===
						MessageTypeConstants.MESSAGE_TYPE_SMART_SUGGESTIONS
					}
				/>
			</div>
		);
	}
}

export default connect(null, null)(SmartReplies);
