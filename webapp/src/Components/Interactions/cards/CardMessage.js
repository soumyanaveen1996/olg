import React from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { MessageTypeConstants } from "../../../Services/Message";
import { truncateText } from "./Utils";
import Config from "../../../Utils/Config";
const R = require("ramda");

class CardMessage extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { showTitle: !this.props.pictureUrl, imageUrl: "" };
	}

	componentDidMount() {
		this.checkImage(
			this.props.pictureUrl,
			() => {
				this.setState({ imageUrl: this.props.pictureUrl });
			},
			() => {
				// let img =
				//   `${R.prop("contentURL", Config)}` + this.props.defaultPictureUrl;
				// console.log("data img ====", img, this.props.defaultPictureUrl);
				this.setState({ imageUrl: this.props.defaultPictureUrl });
			}
		);
		// let { pictureUrl } = this.props;
		// if (pictureUrl) {
		// if (!fetch) {
		//   this.setState({ imageURL: pictureUrl, showTitle: false });
		//   return;
		// }
		//   fetch(pictureUrl, {
		//     method: "GET"
		//     // mode: "no-cors"
		//   })
		//     .then(response => {
		//       return response.blob();
		//     })
		//     .then(blob => {
		//       let url = window.URL.createObjectURL(blob);
		//       this.setState({ imageURL: url, showTitle: false });
		//     })
		//     .catch(e => {
		//       this.setState({ showTitle: true, imageURL: null });
		//     });
		// }
	}

	doAction = (e) => {
		e.stopPropagation();
		this.sendMessage(this.props.action);
	};

	showData = () => {
		let { data, title } = this.props;
		// console.log("logs ", data);
		// if (!data) {
		//   return;
		// }

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

	sendMessageFromModal = (action) => {
		this.sendMessage(action);
		this.props.hideModal();
	};

	sendMessage = (action) => {
		this.props.sendMessage({
			message: action,
			messageType: MessageTypeConstants.MESSAGE_TYPE_STRING,
		});
	};

	checkImage(src, good, bad) {
		var img = new Image();
		img.onload = good;
		img.onerror = bad;
		img.src = src;
	}

	createMarkup = (banner) => {
		return { __html: banner };
	};

	openNewWindow = (url) => {
		window.open(url);
	};

	render() {
		let {
			title,
			pictureUrl,
			defaultPictureUrl,
			description,
			data,
			url,
			action,
			messageId,
			type,
			html,
			options,
		} = this.props;
		const { size, popup, type: cardType } = options || {};
		// console.log("cardType ====== ", title, description);

		let width = "250px";
		let minHeight = "150px";
		let maxHeight = "150px";
		// let imgHeight = "100px";
		if (cardType === "icon" || size === 1) {
			minHeight = "210px";
			maxHeight = "210px";
			// imgHeight = "100%";
		} else if (options && size === 2) {
			minHeight = "200px";
			maxHeight = "250px";
		} else if (options && size === 3) {
			minHeight = "400px";
			maxHeight = "450px";
		} else if (!options && pictureUrl) {
			minHeight = "190px";
			maxHeight = "250px";
		}
		return (
			<Card
				style={{
					width: width,
					minHeight: minHeight,
					maxHeight: cardType && maxHeight,
					border: "0.2px solid rgba(91,91,91,0.2)",
					borderRadius: "10px",
					boxShadow: "0 0 4px 0 rgba(0,0,0,0.08)",
					cursor: "pointer",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
				onClick={(e) => {
					if (popup) {
						this.showData();
					} else if (cardType === "icon") {
						this.doAction(e);
					} else if (url && url.length > 0 && !data) {
						this.openNewWindow(url);
					}
				}}
			>
				{(pictureUrl || defaultPictureUrl) && (
					<div
						style={{
							textAlign: "center",
							padding: "5px",
							/* height: 100vh; */
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
						}}
					>
						<CardImg
							top
							src={this.state.imageUrl}
							alt={title}
							style={{
								borderRadius: "10px",
								maxHeight: "140px",
								maxWidth: "210px",
								height: "80%",
								width: "80%",

								overflow: "hidden",
							}}
						/>
					</div>
				)}

				{cardType !== "icon" && this.state.showTitle && (title || description) && (
					<CardBody
						style={{
							padding: "0.5rem",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
							minHeight: "10px",
						}}
					>
						{this.state.showTitle && (
							<div style={{ color: "#638DFF", fontWeight: "bold" }}>
								{truncateText(title, 30)}
							</div>
						)}
						<div // className="ellipsis"
							style={{
								// overflow: "hidden",
								marginBottom: "10px",
							}}
						>
							{truncateText(description, 70)}
						</div>

						{action && (
							<div className="text-center">
								<a className="primary-link py-2 " onClick={this.doAction}>
									{action}
								</a>
							</div>
						)}
					</CardBody>
				)}
			</Card>
		);
	}
}
export default CardMessage;
