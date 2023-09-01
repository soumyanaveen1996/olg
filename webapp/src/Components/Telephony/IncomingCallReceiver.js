import React, { PureComponent } from "react";
import { getVoipDevice, getVoipToken } from "../../Services/VoipServices";
import { findCallerName, notifyConnectionError } from "./Utils";
import CallSummary from "./CallSummary";
import DiallingScreen from "./DiallingScreen";
import ModalPopup from "../ModalMessages/ModalPopup";
import IncomingCallScreen from "./IncomingCallScreen";
import { connect } from "react-redux";

class IncomingCallReceiver extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { callDuration: 0, muted: false };
	}

	loadDevice = () => {
		getVoipDevice().then((device) => {
			this.device = device;
			this.device.on("ready", () => {
				this.device.on("incoming", (conn) => {
					if (!this.state.incomingConn) {
						this.setState({
							incomingConn: conn,
							callerId: conn.parameters.From,
							diallerState: null,
						});
					} else {
						conn.reject();
					}
				});
			});
			this.device.on("offline", () => {
				getVoipToken().then(async (token) => {
					if (token && this.device) {
						this.device.setup(token);
					} else {
						console.error("No Voip token found!");
					}
				});
			});
			this.device.on("disconnect", (conn) => {
				if (this.state.intervalId) {
					clearInterval(this.state.intervalId);
				}
				this.setState({
					diallerState: "call-hung",
					intervalId: null,
					incomingConn: null,
					callerId: null,
				});
				// this.connection = null;
			});
			this.device.on("cancel", (conn) => {
				if (this.state.intervalId) {
					clearInterval(this.state.intervalId);
				}
				this.setState({
					diallerState: "call-hung",
					intervalId: null,
					incomingConn: null,
					callerId: null,
				});
				// this.connection = null;
			});
			this.device.on("error", (error) => {
				this.setState({
					diallerState: null,
					incomingConn: null,
					callerId: null,
				});
				// this.connection = null;
				if (error.code !== 31205) {
					notifyConnectionError(error.message);
				}
			});
			this.device.on("connect", (conn) => {
				const intervalId = setInterval(() => {
					this.setState({ callDuration: this.state.callDuration + 1 });
				}, 1000);
				this.setState({
					diallerState: "on-call",
					intervalId,
					callDuration: 0,
				});
			});
		});
	};

	componentDidMount() {
		this.loadDevice();
		this.deviceRefreshInterval = setInterval(this.loadDevice, 2700000);
	}

	componentWillUnmount() {
		if (this.deviceRefreshInterval) {
			clearInterval(this.deviceRefreshInterval);
		}
		this.device = null;
	}

	acceptCall = () => {
		let conn = this.state.incomingConn;
		conn.accept();
		// this.connection = conn;
		// this.setState({ incomingAccepted: true });
	};

	disconnectCall = () => {
		this.device.disconnectAll();
		// this.setState({ incomingConn: null });
	};

	sendDigits = (digit) => {
		this.state.incomingConn.sendDigits("" + digit);
	};

	toggleMute = () => {
		if (this.state.muted) {
			this.state.incomingConn.mute(false);
			this.setState({ muted: false });
		} else {
			this.state.incomingConn.mute(true);
			this.setState({ muted: true });
		}
	};

	rejectCall = () => {
		this.state.incomingConn.reject();
		this.onClose();
		// this.setState({ incomingConn: null });
	};

	onClose = () => {
		this.setState({
			diallerState: null,
			incomingConn: null,
			callerId: null,
		});
		// this.connection = null;
		console.log("CLOSED PHONE");
	};

	render() {
		let { incomingConn, diallerState } = this.state;

		if (!incomingConn && diallerState !== "call-hung") {
			return null;
		}

		let node = null;

		if (!diallerState) {
			node = (
				<IncomingCallScreen
					rejectCall={this.rejectCall}
					from={findCallerName(this.props.contacts || [], this.state.callerId)}
					acceptCall={this.acceptCall}
					onClose={this.rejectCall}
				/>
			);
		}

		if (diallerState === "on-call") {
			node = (
				<DiallingScreen
					disconnectCall={this.disconnectCall}
					phoneNumber={this.state.phoneNumber}
					onCall={diallerState === "on-call"}
					callDuration={this.state.callDuration}
					onClose={this.disconnectCall}
					sendNumber={this.sendDigits}
					toggleMute={this.toggleMute}
					muted={this.state.muted}
					incoming
				/>
			);
		} else if (diallerState === "call-hung") {
			node = (
				<CallSummary
					phoneNumber={this.state.phoneNumber}
					callDuration={this.state.callDuration}
					onClose={this.onClose}
				/>
			);
		}

		return (
			<ModalPopup
				onClose={this.closeCreateConversation}
				size="sm"
				noHeader
				className="dialler-modal"
			>
				{node}
			</ModalPopup>
		);

		// return (
		//   <div>
		//     {incomingConn && (
		//       <div className="mt-4">
		//         <a className="btn btn-success" onClick={this.acceptCall}>
		//           Accept Incoming Call
		//         </a>
		//       </div>
		//     )}
		//
		//     {incomingAccepted && (
		//       <div className="mt-4">
		//         <a className="btn btn-danger" onClick={this.disconnectCall}>
		//           Disconnect Received Call
		//         </a>
		//       </div>
		//     )}
		//   </div>
		// );
	}
}

const mapDataToProps = (state, props) => {
	return {
		contacts: state.contacts.accepted,
	};
};

export default connect(mapDataToProps)(IncomingCallReceiver);
