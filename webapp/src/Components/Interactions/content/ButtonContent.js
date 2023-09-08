import React, { Component } from "react";
import { MessageTypeConstants } from "../../../Services/Message";

class ButtonContent extends Component {
	render() {
		let { data: messages, sendMessage } = this.props;
		let buttons = messages.map(function (msg) {
			return (
				<a
					className="btn btn-primary mr-3 mb-2"
					onClick={() => {
						sendMessage(
							{ action: msg.action, title: msg.title, user: msg.user },
							MessageTypeConstants.MESSAGE_TYPE_BUTTON_RESPONSE
						);
					}}
				>
					{msg.title}
				</a>
			);
		});

		return (
			<div className="justify-content-center" style={{ overflow: "auto" }}>
				<div
					className="list list-bordered justify-content-center"
					style={{ padding: "10px", display: "flex" }}
				>
					{buttons}
				</div>
			</div>
		);
	}
}

export default ButtonContent;
