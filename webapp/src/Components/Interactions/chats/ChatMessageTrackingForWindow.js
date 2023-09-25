import React, { PureComponent } from "react";
import _ from "lodash";
import { hideModal, showModal } from "../../../State/actions/modal";
import { connect } from "react-redux";
import { setFormInWindow } from "../../../State/actions/chats";
import { Tooltip } from "reactstrap";
import { MessageTypeConstants } from "../../../Services/Message";

class ChatMessageTrackingForWindow extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tooltipOpenContactConfig: false,
		};
	}

	toggleTooltipContacts = () => {
		this.setState({
			tooltipOpenContactConfig: !this.state.tooltipOpenContactConfig,
		});
	};

	timeConversion = (millisec) => {
		let milliseconds = Number(millisec);
		let d = Math.floor(milliseconds / (3600 * 24));
		let h = Math.floor(milliseconds / 3600);
		let m = Math.floor((milliseconds % 3600) / 60);
		// let s = Math.floor((milliseconds % 3600) % 60);

		let dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
		let hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
		let mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
		// let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";

		// console.log("see tshe time ", dDisplay + hDisplay + mDisplay);

		if (dDisplay === "" && hDisplay === "" && mDisplay === "") {
			return 0;
		}
		return dDisplay + hDisplay + mDisplay;
	};

	reformTimestamp = (timestamp) => {
		const optionsTime = {
			weekday: "long",
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		};
		if (timestamp.startsWith("#")) {
			let regExp = /\(([^)]+)\)/;
			let matches = regExp.exec(timestamp);

			return new Date(parseInt(matches[1], 10)).toLocaleString(
				"en-US",
				optionsTime
			);
		} else return timestamp;
	};

	checkIcon = () => {
		let { chat } = this.props;
		let options = chat.options;
		let message = chat.message;
		let coveredPercentage =
			(message.tracking.currentPosition.totalTimeElapsed /
				message.tracking.currentPosition.totalTripTimeEstimation) *
			100;

		if (options.icon === "aircraft") {
			return (
				<div className="myBar" style={{ width: coveredPercentage + "%" }}>
					<img
						id="flight-icon"
						style={{ left: "calc(" + coveredPercentage + "% - 14px )" }}
						src="./offlinelms/img/moving-maps-plane-blue-icon@3x.png"
						alt="flight"
					/>
					<Tooltip
						placement="bottom"
						isOpen={this.state.tooltipOpenContactConfig}
						delay={{ show: 0, hide: 0 }}
						target="flight-icon"
						toggle={this.toggleTooltipContacts}
						style={{
							minWidth: "220px",
							textAlign: "center",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<div className="d-flex flex-row p-1">
							<p className="d-flex flex-row mr-3">
								<span className="toolTip-altitude">Altitude:</span>
								<span style={{ color: "#b6b6b6", fontSize: "12px" }}>
									{message.tracking.currentPosition.currentAltitude} ft
								</span>
							</p>
							<p className="d-flex flex-row">
								<span className="toolTip-speed">Speed:</span>
								<span style={{ color: "#b6b6b6", fontSize: "12px" }}>
									{message.tracking.currentPosition.currentSpeed} mph
								</span>
							</p>
						</div>
					</Tooltip>
				</div>
			);
		} else {
			return (
				<div className="myBar" style={{ width: coveredPercentage + "%" }}>
					<img
						id="vessel-icon"
						style={{ left: "calc(" + coveredPercentage + "% - 14px )" }}
						src="./offlinelms/img/vessel-trajectory-direction@2x.png"
						alt="flight"
					/>
					<Tooltip
						placement="bottom"
						isOpen={this.state.tooltipOpenContactConfig}
						delay={{ show: 0, hide: 0 }}
						target="vessel-icon"
						toggle={this.toggleTooltipContacts}
						style={{
							minWidth: "220px",
							textAlign: "center",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<div className="d-flex flex-row p-1">
							<p className="d-flex flex-row mr-3">
								<span className="toolTip-altitude">Altitude:</span>
								<span style={{ color: "#b6b6b6", fontSize: "12px" }}>
									{message.tracking.currentPosition.currentAltitude} ft
								</span>
							</p>
							<p className="d-flex flex-row">
								<span className="toolTip-speed">Speed:</span>
								<span style={{ color: "#b6b6b6", fontSize: "12px" }}>
									{message.tracking.currentPosition.currentSpeed} mph
								</span>
							</p>
						</div>
					</Tooltip>
				</div>
			);
		}
	};

	handleRefresh = (options) => {
		let responseChat = {};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_TRACKING_VIEW_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			action: "refresh",
		};
		this.props.sendMessage(responseChat, true);
	};

	render() {
		let { chat } = this.props;
		// console.log("this is the props in tracking", this.props);

		let options = chat.options;
		let message = chat.message;
		// let columnNames = options.columnNames || Object.keys(rows[0]);
		// let coveredPercentage =
		//   (message.tracking.currentPosition.totalTimeElapsed /
		//     message.tracking.currentPosition.totalTripTimeEstimation) *
		//   100;
		let cancelled = options && options.cancelled ? options.cancelled : false;
		let notification = (options && options.notification) || "";
		const totalTimeElapsed = _.get(
			message,
			"tracking.currentPosition.totalTimeElapsed",
			0
		);
		const totalTripTimeEstimation = _.get(
			message,
			"tracking.currentPosition.totalTripTimeEstimation",
			0
		);
		let timeSpent = this.timeConversion(totalTimeElapsed);
		let timeLeft = this.timeConversion(
			totalTripTimeEstimation - totalTimeElapsed
		);
		const originTimeStamp = _.get(message, "tracking.origin.timeStamp", null);
		const destinationTimeStamp = _.get(
			message,
			"tracking.destination.timeStamp",
			null
		);
		let flightStartTime =
			(!_.isEmpty(originTimeStamp) &&
				this.reformTimestamp(message.tracking.origin.timeStamp)) ||
			" ";
		let flightEndTime =
			(!_.isEmpty(destinationTimeStamp) &&
				this.reformTimestamp(message.tracking.destination.timeStamp)) ||
			" ";
		let arrivalText = timeSpent === 0 ? "Not departed" : `${timeSpent} elapsed`;
		let departureText = "";
		if (timeSpent === 0) {
			departureText = cancelled ? "Cancelled" : "On Schedule";
		} else if (timeLeft === 0) {
			departureText = "Arrived";
		} else {
			departureText = `${timeLeft} remaining`;
		}

		let contentHeight = notification && notification.length ? "300px" : "270px";
		return (
			<div
				className="d-flex flex-column"
				style={{
					overflow: "auto",
					width: "100%",
					maxHeight: "600px",
					backgroundColor: "#FFF",
					borderBottomLeftRadius: "10px",
					borderBottomRightRadius: "10px",
					boxShadow: "0 0 4px 0 rgba(0,0,0,0.08)",
				}}
			>
				<div
					style={{ borderBottom: "1px solid #DEDEDE" }}
					className="d-flex flex-column p-2"
				>
					<div className="d-flex flex-row justify-content-between">
						<h2 style={{ marginBottom: 0, fontSize: "18px", color: "#666" }}>
							{options.title}
						</h2>
						<div
							style={{
								// marginRight: "-9%",
								width: "25px",
								height: "25px",
								cursor: "Pointer",
							}}
							onClick={() => this.handleRefresh(options)}
						>
							<img
								src="/offlinelms/img/refresh-btn@2x.png"
								alt="close-icon"
								style={{
									width: "25px",
									height: "25px",
								}}
							/>
						</div>
					</div>

					<div style={{ fontSize: "14px", color: "#666" }}>
						{options.description}
					</div>
				</div>
				<div style={{ width: "100%" }}>
					<div
						className="d-flex flex-column"
						style={{ width: "100%", height: contentHeight }}
					>
						{notification && notification.length > 0 && (
							<div className="trackerNotification">{notification}</div>
						)}
						<div className="d-flex flex-row p-4 justify-content-between trip-details">
							<div className="d-flex flex-column origin">
								<span className="header-origin">
									{(message.tracking &&
										message.tracking.origin &&
										message.tracking.origin.title) ||
										""}
								</span>
								<span className="origin-code">
									{(message.tracking &&
										message.tracking.origin &&
										message.tracking.origin.code) ||
										""}
								</span>
								<span className="origin-place">
									{(message.tracking &&
										message.tracking.origin &&
										message.tracking.origin.place) ||
										""}
								</span>
								<span className="origin-timestamp">{flightStartTime}</span>
							</div>
							<div className="d-flex flex-column destination">
								<span className="header-destination">
									{(message.tracking &&
										message.tracking.destination &&
										message.tracking.destination.title) ||
										""}
								</span>
								<span className="destination-code">
									{(message.tracking &&
										message.tracking.destination &&
										message.tracking.destination.code) ||
										""}
								</span>
								<span className="destination-place">
									{(message.tracking &&
										message.tracking.destination &&
										message.tracking.destination.place) ||
										""}
								</span>
								<span className="destination-timestamp">{flightEndTime}</span>
							</div>
						</div>
						<div
							className="flight-detail-line"
							style={{ width: "100%", padding: "10px 20px" }}
						>
							<div className="flight-progress-line">
								{this.checkIcon()}

								<div
									className="d-flex flex-row justify-content-between"
									style={{ width: "100%", marginTop: "15px" }}
								>
									<span className="arrival-text">{arrivalText}</span>
									<span className="departure-text">{departureText}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

let actions = {
	showModal: showModal,
	hideModal: hideModal,
	setFormInWindow: setFormInWindow,
};

export default connect(null, actions)(ChatMessageTrackingForWindow);
