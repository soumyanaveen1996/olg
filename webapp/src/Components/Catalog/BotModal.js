import React, { Component } from "react";
import ModalPopup from "../ModalMessages/ModalPopup";
import BotDetailsView from "./BotDetailsView";

class BotModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	subscribeToBot = (botId) => {
		this.props.subscribeToBot(botId);
		this.props.close();
	};

	createConversation = (bot) => {
		this.props.createConversation(bot);
		this.props.close();
	};

	render() {
		let { bot, close } = this.props;
		if (!bot) {
			return null;
		}

		return (
			<ModalPopup onClose={close} size="sm" noHeader>
				<BotDetailsView
					{...this.props}
					subscribeToBot={this.subscribeToBot}
					createConversation={this.createConversation}
				/>
			</ModalPopup>
		);
	}
}

export default BotModal;
