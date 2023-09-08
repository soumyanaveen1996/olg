import React from "react";
import CountrySelector from "./CountrySelector";
import { doE164, formatPhoneNumber, getCallMode } from "./Utils";
import NumberPad from "./NumberPad";
import { ReactSipPhone, phoneStore } from "react-sip-phone";
import _ from "lodash";
import "react-sip-phone/dist/index.css";
import "./DiallerKeyPad.css";
import { connect } from "react-redux";
import UserServiceClient from "../../Services/Clients/UserServiceClient";
import { resetCallInfo } from "../../State/actions/phone";
import Config from "../../Utils/Config";
import countryCodes from "./CountryList";

const sipuri = Config.sipURI;
const password = Config.sipPassword;
const websocket = Config.sipWebsocket;
const name = "";
const disabledButtons = [
	// "dialpadopen",
	// "mute",
	// "hold",
	"numpad",
	"transfer",
];
const disabledFeatures = ["dialstring", "settings", "remoteid"];
const mode = "";

class DiallerKeyPad extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			country: null,
			fullPhoneNumber: "+",
			phoneState: null,
			duration: 0,
			showNumberPlate: true,
			// phoneNumberFromLink: "",
		};
		this.phnInput = React.createRef();
	}

	componentDidMount() {
		if (this.props.callerInfo) {
			const { toNumber } = this.props.callerInfo;
			let number = toNumber.indexOf("+") !== -1 ? toNumber : "+" + toNumber;
			number = formatPhoneNumber(null, number);
			const countryCode = number.split(" ");
			const country = countryCodes.find((i) => i.dial_code === countryCode[0]);
			if (country) {
				this.setState({ country });
			}
			this.setState({ showNumberPlate: false });
			this.setState(
				{
					fullPhoneNumber: number,
				},
				() => {
					setTimeout(() => {
						this.makeCall();
					}, 1200);
				}
			);
		} else if (this.props.phoneNumFromLink) {
			const toNumber = this.props.phoneNumFromLink;
			let number = toNumber.indexOf("+") !== -1 ? toNumber : "+" + toNumber;
			number = formatPhoneNumber(null, number);
			const countryCode = number.split(" ");
			const country = countryCodes.find((i) => i.dial_code === countryCode[0]);
			if (country) {
				this.setState({ country });
			}
			this.setState({
				fullPhoneNumber: number,
			});
		}
	}

	componentDidUpdate() {
		this.setCursorPositions();
		if (this.state.phoneState === "Establishing") {
			const elements1 = document.querySelector(
				".react-sip-phone div:nth-child(5)"
			);
			const children1 = elements1?.querySelectorAll(":scope > button > img");
			const children2 = elements1?.querySelectorAll(":scope > div > img");
			children1[0]?.setAttribute("src", "/img/call_end-24px.svg");
			children1[1]?.setAttribute("src", "/img/phone_paused-24px.svg");
			children2[0]?.setAttribute("src", "/img/mic_off-24px.svg");
		}
	}

	setCursorPositions = () => {
		this.phnInput.current.selectionStart = this.cursor;
		this.phnInput.current.selectionEnd = this.cursor;
	};

	selectCountry = (country) => {
		this.setState({
			country,
			fullPhoneNumber: formatPhoneNumber(country.dial_code, null),
		});
	};

	addNumber = (phoneNumber) => {
		if (this.state.fullPhoneNumber) {
			const added = this.state.fullPhoneNumber + "" + phoneNumber;
			const country = countryCodes.find((i) => i.dial_code === added);
			if (country) {
				this.setState({ country });
			}
			this.setState({
				fullPhoneNumber: formatPhoneNumber(null, added),
			});
		} else {
			this.setState({
				fullPhoneNumber: formatPhoneNumber(null, phoneNumber),
			});
		}
	};

	handlePhoneNumberChange = (e) => {
		let val = e.target.value;
		this.cursor = e.target.selectionStart;
		if (val.length > 0) {
			if (val.length === 1) {
				this.setState({
					fullPhoneNumber: "+",
					country: null,
				});
				return;
			}
			const country = countryCodes.find((i) => i.dial_code === val);
			if (country) {
				this.setState({ country });
			}
			this.setState({
				fullPhoneNumber: val,
			});
		}
	};

	_isNumeric = (val) => {
		return /^\d+$/.test(val.substr(1));
	};

	makeCall = () => {
		let number = doE164(this.state.fullPhoneNumber);

		if (!this.props.user.user.isPostpaidUser) {
			if (this.props.user.balance <= 0) {
				this.props.onClose();
				this.props.noBalance();
				return;
			}
		}
		if (number) {
			if (
				phoneStore.getState().sipAccounts.sipAccount &&
				number.formatted.substring(1)
			) {
				phoneStore
					.getState()
					.sipAccounts.sipAccount.makeCall(number.formatted.substring(1));
			}
			phoneStore.subscribe(() => {
				console.log(
					">>> make call",
					phoneStore.getState().sipSessions.sessions
				);
				if (!_.isEmpty(phoneStore.getState().sipSessions.sessions)) {
					let callObject = {
						userId: number.formatted.substring(1), // The receiver userId
						callerUserId: this.props.user.user.userId, // the user initiating the call
						videoSessionId: null,
						video: false,
					};

					switch (
					phoneStore.getState().sipSessions.sessions[
						Object.keys(phoneStore.getState().sipSessions.sessions)[0]
					]._state
					) {
						case "Established":
							if (this.state.duration === 0) {
								UserServiceClient.sendVoipCall({
									...callObject,
									callAction: "CallStart",
								});
								this.setState({
									duration: performance.now(),
									callStartTime: Date.now(),
									showNumberPlate: true,
								});
							}
							break;
						case "Terminated":
							let isSatCall = getCallMode(number.countryCode) === "sat";
							if (this.state.duration) {
								UserServiceClient.sendVoipCall({
									...callObject,
									callAction: "CallEnd",
								});
								UserServiceClient.sendVoipCall({
									...callObject,
									callAction: "CallSummary",
									callStartTime: this.state.callStartTime,
									callDuration:
										(performance.now() - this.state.duration) / 1000, // in sec,
									callType: isSatCall ? "SAT" : "PSTN",
									calledNumber: isSatCall ? "+12124010649" : number.formatted,
									dialledSatPhoneNumber: number.formatted,
									isLocalContact: false,
									showNumberPlate: true,
								});
							}
							break;
						default:
							break;
					}

					this.setState({
						phoneState:
							phoneStore.getState().sipSessions.sessions[
								Object.keys(phoneStore.getState().sipSessions.sessions)[0]
							]._state,
					});
				} else {
					this.setState({
						phoneState: null,
						duration: 0,
						callStartTime: null,
						fullPhoneNumber: "+",
						country: null,
						showNumberPlate: true,
					});
					this.props.resetCallInfo();
				}
			});
		}
	};

	clearText = () => {
		let textInput = this.state.fullPhoneNumber;
		if (textInput.length === 1 && textInput === "+") {
			this.setState({
				fullPhoneNumber: "+",
			});
		} else {
			textInput = textInput.substring(0, textInput.length - 1);
			if (textInput.length === 1 && textInput === "+") {
				this.setState({ country: null });
			}
			this.setState({ fullPhoneNumber: textInput });
		}
	};

	render() {
		const { showNumberPlate } = this.state;
		return (
			<div style={{ borderRadius: "0.3rem", overflow: "hidden" }}>
				<div style={{ backgroundColor: "#2FC76F" }}>
					<div className="d-flex justify-content-center pt-4">
						<CountrySelector
							onChange={this.selectCountry}
							selectedCountry={this.state.country}
							style={{
								background: "transparent",
								border: "none",
								color: "#fff",
							}}
						/>
					</div>

					<div className="p-5">
						<div style={{ textAlign: "center" }}>
							<input
								name="value"
								type="tel"
								className="hidden-input"
								style={{
									fontSize: "30px",
									lineHeight: "36px",
									color: "#fff",
									textAlign: "center",
								}}
								value={this.state.fullPhoneNumber}
								onChange={this.handlePhoneNumberChange}
								onBlur={() => {
									if (!this.props.callerInfo) {
										this.setState({
											fullPhoneNumber: formatPhoneNumber(
												null,
												this.state.fullPhoneNumber
											),
										});
									}
								}}
								maxLength="20"
								autoFocus="autofocus"
								ref={this.phnInput}
							/>
						</div>
					</div>
				</div>
				<div
					className={
						this.state.phoneState === null
							? "d-none"
							: "d-block react-sip-phone"
					}
				>
					<ReactSipPhone
						name={name || ""}
						sipCredentials={{
							sipuri: sipuri || "",
							password: password || "",
						}}
						sipConfig={{
							websocket: websocket || "",
							defaultCountryCode: "",
						}}
						phoneConfig={{
							disabledButtons: disabledButtons || "", // Will remove button(s) from Phone component. E.g. hold transfer dialpadopen mute '
							disabledFeatures: disabledFeatures || "", // Will remove feature(s) from application. E.g. settings remoteid
							defaultDial: "", // (strict-mode only) the default destination. E.g. 1234567890
							sessionsLimit: 3, // limits amount of sessions user can have active
							attendedTransferLimit: 2, // limits amount of attendedTransfer sessions user can have active
							autoAnswer: false, // enable the auto-answer on incoming calls
						}}
						appConfig={{
							mode: mode || "", // 'strict' will activate a simple and limited user experience. set to sessionLimit 1 if using 'strict'
							started: false, // (strict-mode only) keeps track of call button visability during strict-mode
							appSize: "large", // assign 'large' for larger font in status-name and session-status (not session remote-id/display name)
						}}
						width={0}
					/>
				</div>

				{showNumberPlate && (
					<div
						className="pad"
						style={{
							display:
								this.state.phoneState === "Terminated" ? "none" : "block",
						}}
					>
						<NumberPad onClick={this.addNumber} />

						{this.state.phoneState === null && (
							<div className="d-flex justify-content-between align-items-center my-3 px-4">
								<a onClick={this.props.onClose} className="primary-link">
									Close
								</a>
								<a
									className="d-flex justify-content-center align-items-center btn btn-success btn-icon-o btn-sm btn-rounded mb-2"
									style={{
										height: "60px",
										width: "60px",
										marginRight: "60  px",
									}}
									onClick={this.makeCall}
								>
									<img
										src="/img/call-receivecall-btn@2x.png"
										width="60"
										alt="call-receivecall-btn@2x.png"
									/>
								</a>
								<a onClick={this.clearText} className="secodary-link">
									Clear
								</a>
							</div>
						)}
					</div>
				)}
				{/* {this.state.phoneState === "Terminated" && (
					<div className="d-flex justify-content-between align-items-center my-3 px-4">
						<a onClick={this.props.onClose} className="primary-link">
							Close
						</a>
					</div>
				)} */}
			</div>
		);
	}
}

const mapActionsToProps = {
	resetCallInfo,
};
const mapDataToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapDataToProps, mapActionsToProps)(DiallerKeyPad);
