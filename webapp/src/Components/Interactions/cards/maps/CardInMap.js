import React from "react";
import { CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import CardLayout from "./CardLayout";
import { hideModal, showModal } from "../../../../State/actions/modal";
import { connect } from "react-redux";
import { truncateText } from "../Utils";
import { sendAMessage } from "../../../../State/actions/chats";
import { MessageTypeConstants } from "../../../../Services/Message";

class CardInMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = { imageUrl: "" };
	}
	openData = () => {
		let { data, title } = this.props;

		this.props.showModal(
			title,
			"sm",
			this.props.hideModal,
			{
				card: { ...this.props },
				sendMessage: this.sendMessageFromModal,
			},
			"MAP_CARD_DATA_VIEW"
		);
	};

	showModalData = () => {
		// console.log("show modal", this.props);
		let { description, title, imageUrl } = this.props;
		if (this.props.displayModal) {
			this.props.displayModal(title, "sm", description, imageUrl);
		}
	};

	componentDidMount() {
		this.checkImage(
			this.props.thumbnailPictureUrl || this.props.imageUrl,
			() => {
				this.setState({
					imageUrl: this.props.thumbnailPictureUrl || this.props.imageUrl,
				});
			},
			() => {
				this.setState({ imageUrl: this.props.defaultImageUrl });
			}
		);
	}

	sendActionMessage = () => {
		let responseChat = {
			messageType: MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE,
			message: {
				mapId: this.props.mapId,
				cardId: this.props.cardId,
				markerId: this.props.markerId,
			},
		};
		this.props.sendMessage(responseChat, true);
	};

	checkImage(src, good, bad) {
		var img = new Image();
		img.onload = good;
		img.onerror = bad;
		img.src = src;
	}

	render() {
		let { title, description, imageUrl, seeMoreUrl, action, data } = this.props;
		// console.log("see the props in card", this.props);

		if (!seeMoreUrl && !data && !action) {
			// console.log("it show go in this", this.props);

			return (
				<CardLayout
					width="300px"
					height="250px"
					className="test mx-1"
					style={{ cursor: "pointer" }}
					onClick={() => this.showModalData()}
				>
					<CardBody
						style={{ width: "55%", padding: "1rem" }}
						className="d-flex flex-column justify-content-between"
					>
						{imageUrl && (
							<div
								style={{
									height: "100%",
									backgroundImage: `url(${this.state.imageUrl})`,
									backgroundPosition: "center",
									backgroundSize: "cover",
								}}
							/>
						)}

						<div>
							{title && (
								<h2 className="card-title">{truncateText(title, 30)}</h2>
							)}
							<CardText>{truncateText(description, 64)}</CardText>
						</div>
					</CardBody>
				</CardLayout>
			);
		} else {
			return (
				<ActionCards
					imageUrl={imageUrl}
					title={title}
					description={description}
					seeMoreUrl={seeMoreUrl}
					data={data}
					action={action}
					state={this.state}
					openData={this.openData}
					sendActionMessage={this.sendActionMessage}
				/>
			);
		}
	}
}

const ActionCardsMobile = ({
	imageUrl,
	title,
	description,
	seeMoreUrl,
	data,
	action,
	state,
	openData,
	sendActionMessage,
}) => (
	<CardLayout
		width="300px"
		height="250px"
		className="test mx-1 justify-content-center align-items-center"
		onClick={() => {
			if (data) {
				return openData();
			}

			if (seeMoreUrl) {
				return window.open(seeMoreUrl, "_self");
			}

			if (action) {
				return sendActionMessage();
			}
		}}
	>
		<img src={imageUrl} className="mobile-card-image" alt={title} />
		<article className="after d-flex flex-column justify-content-center align-items-center text-center p-2">
			<span>{truncateText(title, 64)}</span>
			<small>
				<a className="see-more">{action ? action : "more.."}</a>
			</small>
		</article>
	</CardLayout>
);

const ActionCards = ({
	imageUrl,
	title,
	description,
	seeMoreUrl,
	data,
	action,
	state,
	openData,
	sendActionMessage,
}) => (
	<CardLayout width="300px" height="250px" className="test mx-1">
		<CardBody
			style={{ width: "100%", padding: "1rem" }}
			className="d-flex flex-column justify-content-between"
		>
			{imageUrl && (
				<div
					style={{
						height: "100%",
						backgroundImage: `url(${state.imageUrl})`,
						backgroundPosition: "center",
						backgroundSize: "cover",
					}}
				/>
			)}

			<div>
				{title && <h2 className="card-title">{truncateText(title, 30)}</h2>}
				<CardText>{truncateText(description, 64)}</CardText>
			</div>

			{seeMoreUrl && (
				<a
					className="primary-link d-flex  align-items-center"
					style={{ fontSize: "12px", color: "#638DFF" }}
					href={seeMoreUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					See More
				</a>
			)}
			{!seeMoreUrl && data && (
				<a
					className="primary-link d-flex  align-items-center"
					style={{ fontSize: "12px", color: "#638DFF" }}
					onClick={openData}
				>
					More info
				</a>
			)}
			{!seeMoreUrl && !data && action && (
				<div className="text-center">
					<a className="btn btn-sm btn-open" onClick={sendActionMessage}>
						{action}
					</a>
				</div>
			)}
		</CardBody>
	</CardLayout>
);

let actions = {
	showModal: showModal,
	hideModal: hideModal,
	sendMessage: sendAMessage,
};

export default connect(null, actions)(CardInMap);
