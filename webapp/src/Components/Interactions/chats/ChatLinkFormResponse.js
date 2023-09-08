import React, { PureComponent } from "react";
import ChatLinkSelfUI from "./ChatLinkSelfUI";
import ChatLinkOthersUI from "./ChatLinkOthersUI";
import FormResponseContentThumb from "../content/forms/FormResponseContentThumb";

class ChatLinkFormResponse extends PureComponent {
	render() {
		let { chat, conversation, self } = this.props;
		let ChatUI = self ? ChatLinkSelfUI : ChatLinkOthersUI;

		return (
			<ChatUI chat={chat} conversation={conversation}>
				<div
					style={{
						boxSizing: "border-box",
						width: "260px",
						border: "0.2px solid rgba(91,91,91,0.2)",
						borderRadius: "10px",
						backgroundColor: "#FFF",
						boxShadow: "0 0 4px 0 rgba(0,0,0,0.08)",
						margin: "7px 0",
					}}
				>
					<FormResponseContentThumb chat={chat} />
				</div>
			</ChatUI>
		);
	}
}

export default ChatLinkFormResponse;
