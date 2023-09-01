import React from "react";
import { CardImg, CardBody, CardTitle, CardText, Card } from "reactstrap";
import CardLayout from "./CardLayout";
import { sendAMessage } from "../../../../State/actions/chats";
import { connect } from "react-redux";
import { MessageTypeConstants } from "../../../../Services/Message";
import { truncateText } from "../Utils";

class ActionCard extends React.PureComponent {
	doAction = () => {
		let { mapId, cardId } = this.props;

		let responseMessage = {};
		responseMessage.message = {
			mapId: mapId,
			cardId: cardId,
		};
		responseMessage.messageType =
			MessageTypeConstants.MESSAGE_TYPE_MAP_RESPONSE;

		this.props.sendMessage(responseMessage, true);
	};

	render() {
		let { design, title, description, imageUrl } = this.props;
		if (design === "big") {
			return (
				<Card
					style={{
						width: "195px",
						height: "200px",
						border: "0.2px solid rgba(91,91,91,0.2)",
						borderRadius: "10px",
						boxShadow: "0 0 4px 0 rgba(0,0,0,0.08)",
						cursor: "pointer",
					}}
					onClick={this.doAction}
				>
					<CardImg top height="50%" src={imageUrl} alt={title} />
					<CardBody style={{ padding: "1rem" }}>
						{title && (
							<div style={{ color: "#638DFF", fontWeight: "bold" }}>
								{truncateText(title, 30)}
							</div>
						)}
						<div
							style={{
								// overflow: "hidden",
								// display: "-webkit-box",
								// "-webkit-line-clamp": "2",
								// "-webkit-box-orient": "vertical",
								marginBottom: "10px",
							}}
						>
							{/*{description}*/}
							{truncateText(description, 48)}
						</div>
					</CardBody>
				</Card>
			);
		} else {
			return (
				<CardLayout
					width="120px"
					height="120px"
					onClick={this.doAction}
					style={{ cursor: "pointer" }}
				>
					<CardBody
						style={{ width: "55%" }}
						className="d-flex flex-column justify-content-between"
					>
						{title}
					</CardBody>
				</CardLayout>
			);
		}
	}
}

let actions = {
	sendMessage: sendAMessage,
};

export default connect(null, actions)(ActionCard);
