import React from "react";
import { CardBody } from "reactstrap";
import { MessageTypeConstants } from "../../..//Services/Message";
import { connect } from "react-redux";
import { sendAMessage } from "../../../State/actions/chats";
import CardLayout from "./maps/CardLayout";
class ConversationalHTMLCard extends React.Component {
	createMarkup = (banner) => {
		return { __html: banner };
	};

	handleCardClickEvent = (e) => {
		console.log("Manish handleTempFunction e.target :: ", e.target.id);
		e.preventDefault();
		e.stopPropagation();
		if (e.target.id) {
			this.sendMessage(e.target.id);
		}
	};

	sendMessage = (action) => {
		this.props.sendMessage({
			message: action,
			messageType: MessageTypeConstants.MESSAGE_TYPE_CARD_RESPONSE,
		});
	};

	render() {
		const { options, cardHTML } = this.props;
		const { size } = options;
		let width = "300px",
			height = "190px";
		if (size === 1) {
			width = "250px";
			height = "190px";
		} else if (size === 2) {
			width = "300px";
			height = "200px";
		} else if (size === 3) {
			width = "300px";
			height = "400px";
		} else if (size === 4) {
			width = "300px";
			height = "100%";
		}
		return (
			<CardLayout width={width} height={height} style={{ marginRight: "0px" }}>
				<CardBody
					style={{ width: "55%", padding: "1rem" }}
					className="d-flex flex-column justify-content-between"
				>
					<div
						onClick={this.handleCardClickEvent}
						dangerouslySetInnerHTML={this.createMarkup(cardHTML)}
					/>
				</CardBody>
			</CardLayout>
		);
	}
}

const mapActionToProps = {
	sendMessage: sendAMessage,
};

export default connect(null, mapActionToProps)(ConversationalHTMLCard);
