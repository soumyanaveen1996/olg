import React, { PureComponent } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import CallButton from "./CallButton";
import { getLoggedInUserCallHistory } from "../../State/actions/user";
import { connect } from "react-redux";
import _ from "lodash";
import { getAuthData } from "../../Services/StorageService";
import momentTz from "moment-timezone";
import ModalPopup from "../ModalMessages/ModalPopup";
import DiallerKeyPad from "./DiallerKeyPad";

class CallHistoryContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { isPostpaidUser: {}, pstnCall: false, currentCallData: null };
		this.callHistoryScroll = React.createRef();
		this.fetchPaginatedCallHistory = _.debounce(
			this.fetchPaginatedCallHistory.bind(this),
			500
		);
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		let currentCallTimeStamp = Date.now();
		!this.props.isAnonymousUser &&
			this.props.hasMoreRecords &&
			this.props.getLoggedInUserCallHistory(currentCallTimeStamp);
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(this.props.isPostpaidUser, prevState.isPostpaidUser)) {
			this.setState({ isPostpaidUser: { ...this.props.isPostpaidUser } });
		}
	}

	fetchPaginatedCallHistory = () => {
		const hasMoreRecords = this.props.hasMoreRecords;
		if (hasMoreRecords && !this.props.isAnonymousUser) {
			console.log(
				"in fetchPaginatedCallHistory calling fetchPaginatedCallHistory"
			);
			let currentCallTimeStamp = Date.now();
			this.props.getLoggedInUserCallHistory(currentCallTimeStamp);
		}
	};

	handleScroll = () => {
		const { top } = this.callHistoryScroll.current.getValues();
		if (top === 1) {
			return this.fetchPaginatedCallHistory();
		}
	};

	openRecharge = () => {
		console.log("open Reacharge", this.props.balance);
		if (this.props.balance <= 0) {
			console.log("no balance");
			this.props.noBalance();
			// notifyBalanceError();
		}
	};

	getCallButton = (call) => {
		let callButtonType = "voip";
		// call.callType && call.callType.toLowerCase() === "voip"
		//   ? "voip"
		//   : "phone";

		if (call.callType && call.callType.toLowerCase() === "voip") {
			callButtonType = "voip";
		} else if (call.callType && call.callType.toLowerCase() === "pstn") {
			callButtonType = "phone";
		} else if (call.callType && call.callType.toLowerCase() === "sat") {
			callButtonType = "sat";
		}

		let direction = call.callDirection;
		if (callButtonType === "voip") {
			let iconStyle =
				call.video === true ? "icon-camera" : "icon-phone-outgoing";
			return (
				<CallButton
					balance={this.props.balance}
					callType="voip"
					from={this.props.emailAddress}
					to={direction === "incoming" ? call.fromUserId : call.toUserId}
					video={call.video}
					toName={
						direction === "incoming" ? call.fromUserName : call.toUserName
					}
					className="btn btn-success btn-icon-o btn-sm mx-1 btn-rounded d-flex justify-content-center align-items-center"
					style={{ height: "30px", width: "30px" }}
					closeCallHistory={this.props.closeCallHistory}
				>
					<i
						className={iconStyle}
						style={{ color: "#fff", fontSize: "12px" }}
					/>
				</CallButton>
			);
		} else {
			let toNumber =
				call.toNumber.indexOf("+") !== -1 ? call.toNumber : "+" + call.toNumber;
			return (
				<CallButton
					callType={callButtonType}
					balance={this.props.balance}
					from={this.props.emailAddress}
					to={toNumber}
					user={this.props.user}
					isPostpaidUser={this.state.isPostpaidUser}
					toName={call.toUserName || toNumber}
					toUserId={call.toUserId}
					localCall={call.toUserId && toNumber ? "localCall" : null}
					className="btn btn-success btn-icon-o btn-sm mx-1 btn-rounded d-flex justify-content-center align-items-center"
					style={{ height: "30px", width: "30px" }}
					openGetRecharge={this.openRecharge}
					closeCallHistory={this.props.closeCallHistory}
					onLocalCall={() => {
						this.setState({
							pstnCall: true,
							currentCallData: call,
						});
					}}
				>
					<i
						className="icon-phone-outgoing"
						style={{ color: "#fff", fontSize: "12px" }}
					/>
				</CallButton>
			);
		}
	};

	getIcon = (call) => {
		if (call.callDirection === "incoming") {
			if (call.duration === 0) {
				return "/img/call-received-red@2x.png";
			}
			return "/img/call-received-green@2x.png";
		}

		if (call.callDirection === "outgoing") {
			if (call.duration === 0) {
				return "/img/call-made-red@2x.png";
			}
			return "/img/call-made-green@2x.png";
		}
	};

	render() {
		let history = this.props.loggedInUserCallHistory;
		if (!history || history.length === 0) {
			return <div className="text -center m-3">No history found</div>;
		}
		const {
			user: { userTimezone },
		} = getAuthData();
		const defaultUserTimezone = "Etc/UTC";
		return (
			<Scrollbars
				ref={this.callHistoryScroll}
				autohide="true"
				style={{ height: this.props.height }}
				onScroll={() => this.handleScroll()}
			>
				<div className="d-flex flex flex-column">
					{history.map((call, index) => {
						return (
							<div
								key={index}
								className="d-flex mx-4 my-2 pb-2 align-items-center justify-content-between"
								style={{ borderBottom: "1px solid #00000033" }}
							>
								<div
									className="d-flex align-items-center justify-content-between"
									style={{ width: "100%" }}
								>
									<div className="ml-3 d-flex flex-column">
										<span
											className="list-title"
											style={{ color: "#666666", fontWeight: "bold" }}
										>
											{call.callDirection === "incoming"
												? call.fromUserName
												: call.toUserName}
										</span>
										<span className="list-content" style={{ color: "#666666" }}>
											<span className="text-capitalize mr-2">
												<img
													src={this.getIcon(call)}
													width={14}
													alt="call-icon"
												/>
											</span>
											{momentTz(Number(call.callTimestamp))
												.tz(userTimezone || defaultUserTimezone)
												.format("DD MMM hh:mm a")}
											<span style={{ color: "#bababa" }}>
												{" "}
												{(call.callType === "PSTN" ||
													call.callType === "SAT") &&
												call.callDirection === "outgoing"
													? " | " + call.toNumber
													: ""}
												{call.callCharge > 0 && (
													<span style={{ fontSize: "12px", color: "#4A4A4A" }}>
														{" "}
														| $ {call.callCharge}
													</span>
												)}
												{call.callType !== "PSTN" &&
													call.callDirection !== "outgoing" && (
														<span>
															|{" "}
															<span
																style={{ fontSize: "12px", color: "#2FC76F" }}
															>
																Free
															</span>
														</span>
													)}
											</span>
										</span>
									</div>
									{/* <span>
                    {call.callType === "PSTN" &&
                    call.callDirection === "outgoing" &&
                    call.callCharge
                      ? " $ " + call.callCharge
                      : "Free"}
                  </span> */}
									{this.getCallButton(call)}
								</div>
							</div>
						);
					})}
					{this.state.pstnCall && (
						<ModalPopup size="sm" noHeader className="dialler-modal">
							<DiallerKeyPad
								callerInfo={this.state.currentCallData}
								onClose={() => {
									this.setState({ pstnCall: false });
								}}
								noBalance={() => this.props.noBalance()}
							/>
						</ModalPopup>
					)}
				</div>
			</Scrollbars>
		);
	}
}
const mapActionToProps = {
	getLoggedInUserCallHistory,
};

const mapDataToProps = (state) => {
	return {
		loggedInUserCallHistory: state.user.loggedInUserCallHistory,
		hasMoreRecords: state.user.hasMoreRecords,
		isAnonymousUser: state.user.isAnonymousUser,
		isPostpaidUser: state.user.voipStatus || false,
	};
};

export default connect(mapDataToProps, mapActionToProps)(CallHistoryContainer);
