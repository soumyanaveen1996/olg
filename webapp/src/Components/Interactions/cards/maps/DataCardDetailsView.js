import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { sendAMessage } from "../../../../State/actions/chats";
import { MessageTypeConstants } from "../../../../Services/Message";
class DataCardDetailsView extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			imageUrl: "",
		};
	}
	doAction = () => {
		let reponseObj = {};
		reponseObj.messageType = MessageTypeConstants.MESSAGE_TYPE_MAP_RESPONSE;
		reponseObj.message = {
			type: "map_response",
			mapId: this.props.card.mapId,
			controlId: this.props.card.controlId,
			cardId: this.props.card.cardId,
			markerId: this.props.card.markerId,
			cardData: this.props.card.data,
			cardTitle: this.props.card.title,
			action: this.props.card.action,
		};
		console.log("data to send on action ", this.props.card, reponseObj);

		this.props.card.sendMessage(reponseObj);
	};

	componentDidMount() {
		this.checkImage(
			this.props.card.imageUrl || this.props.card.pictureUrl,
			() => {
				this.setState({
					imageUrl: this.props.card.imageUrl || this.props.card.pictureUrl,
				});
			},
			() => {
				this.setState({
					imageUrl:
						this.props.card.defaultImageUrl ||
						this.props.card.imageUrl ||
						this.props.card.pictureUrl,
				});
			}
		);
	}

	checkImage(src, good, bad) {
		var img = new Image();
		img.onload = good;
		img.onerror = bad;
		img.src = src;
	}

	render() {
		let { card } = this.props;
		let {
			title,
			defaultPictureUrl,
			pictureUrl,
			description,
			data,
			url,
			action,
			messageId,
			imageUrl,
		} = card;

		let keys = data ? Object.keys(data) : [];

		return (
			<div>
				{(imageUrl || defaultPictureUrl || pictureUrl) && (
					<div className="d-flex justify-content-center align-items-center">
						<img
							src={this.state.imageUrl}
							alt={title}
							style={{
								borderRadius: "10px",
								height: "200px",
								width: "auto",
								overflow: "hidden",
							}}
						/>
					</div>
				)}

				<div>
					{/*<div className="mb-4 text-uppercase text-center">{title}</div>*/}
					<div className="mb-4 mt-4 text-left">{description}</div>
					{keys.length > 0 && (
						<div className="p-3">
							{keys.map((key, index) => {
								return (
									<div key={index}>
										<div className="d-flex justify-content-between">
											<div className="text-capitalize">
												<span>{key}</span>
											</div>
											<div
												style={{
													width: "320px",
													wordWrap: "break-word",
												}}
											>
												<p style={{ textAlign: "right" }}>{data[key]}</p>
											</div>
										</div>
										<hr />
									</div>
								);
							})}
						</div>
					)}
					{keys.length === 0 && url && (
						<div
							className="text-center mb-4"
							style={{ color: "#638DFF", cursor: "pointer" }}
						>
							<a href={url} target="_blank">
								{url}
							</a>
						</div>
					)}
					{action && (
						<div className="d-flex justify-content-center">
							<a className="btn btn-open" onClick={this.doAction}>
								{action}
							</a>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapActionToProps = {
	sendAMessage: sendAMessage,
};

export default connect(null, mapActionToProps)(DataCardDetailsView);
