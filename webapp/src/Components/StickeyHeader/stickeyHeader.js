import React, { Component } from "react";
import DiallerPadButton from "../Telephony/DiallerPadButton";
import DiallerButton from "../Telephony/DiallerButton";
import { connect } from "react-redux";
import { fetchWalletBalanceService } from "../../State/actions/user";

import AudioElement from "../../Utils/AudioElement";
import { isIpad } from "../../Utils/Helpers";

import _ from "lodash";
import "../../styles/css/style.css";
import classNames from "classnames";
import CachedImage from "../Common/CachedImage";

class StickeyHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPhoneNumbers: false,
			showNoBalance: false,
			getCreditModal: false,
			getConfirmCreditModal: false,
			amountToCredit: 0,
			codeAlreadyApplied: false,
			showStripe: false,
			totalAmount: 0,
			topUpAmount: 0,
			taxAmount: 0,
			isPostpaidUser: {},
			videoModal: false,
			playSound: false,
		};
	}

	componentDidMount() {
		if (this.props.isPostpaidUser) {
			this.setState({ isPostpaidUser: { ...this.props.isPostpaidUser } });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(this.props.isPostpaidUser, prevState.isPostpaidUser)) {
			this.setState({ isPostpaidUser: { ...this.props.isPostpaidUser } });
		}
	}

	showGetCreditModal = () => {
		if (this.props.openRecharge) {
			this.props.openRecharge();
		}
	};

	render() {
		let { selectedDomain, user } = this.props;

		const voipMode =
			selectedDomain &&
			selectedDomain.viewModes &&
			selectedDomain.viewModes?.voip;
		let pstnMode =
			selectedDomain &&
				selectedDomain?.viewModes &&
				!Object.prototype.hasOwnProperty.call(selectedDomain.viewModes, "pstn")
				? true
				: selectedDomain?.viewModes?.pstn;

		//Api Postpaid Status
		let PPstatus = this.state.isPostpaidUser.isPostpaidUser || false;
		let sound_class = this.state.playSound
			? "enable-sound-container-on d-flex align-items-center justify-content-center m-1"
			: "enable-sound-container-off d-flex align-items-center justify-content-center m-1";

		return (
			<div className="d-flex reveal-nav-controls align-items-center">
				<div className="d-flex align-items-center">
					{!this.props.isAnonymousUser && voipMode && pstnMode && (
						<DiallerPadButton
							user={user.user}
							noBalance={() => {
								this.showGetCreditModal();
							}}
						/>
					)}
					{!this.props.isAnonymousUser && voipMode && (
						<DiallerButton
							noBalance={() => {
								this.showGetCreditModal();
							}}
							selectedDomain={selectedDomain}
						/>
					)}{" "}
					{!this.props.isAnonymousUser && voipMode && pstnMode && !PPstatus && (
						<div
							className="get-credits-intro d-flex justify-content-center align-items-center flex-row"
							style={{
								padding: "10px",
								borderRadius: "10px",
								backgroundColor: "rgba(0, 167, 214,0.1)",
								marginRight: "10px",
							}}
						>
							<span style={{ color: "#666666", marginRight: "5px" }}>
								Balance:
								<span
									style={{
										color: "#00a7d6",
										fontWeight: "bold",
										padding: "0 0.2rem",
									}}
								>
									${user.balance.toFixed(2)}
								</span>
							</span>

							<a
								className={classNames("d-inline-flex", {
									disabled: !this.props.isUserOnline,
								})}
								onClick={this.showGetCreditModal}
							>
								<img
									src="./img/plus-icon@2x.png"
									style={{
										width: "12px",
										paddingBottom: "2px",
									}}
									alt="plus-icon"
								/>
							</a>
						</div>
					)}
				</div>

				{isIpad() ? (
					<div
						className={sound_class}
						onClick={() => {
							if (!this.state.playSound) {
								console.log("Toggling Sound");
								AudioElement.loadAudio();
								this.setState({ playSound: true });
							} else {
								AudioElement.disableSound();
								this.setState({ playSound: false });
							}
						}}
					>
						<CachedImage
							imgKey={"speakerIcon"}
							image={"/img/technology.png"}
							width={"12"}
						/>
					</div>
				) : null}
			</div>
		);
	}
}

const mapActionsToProps = {
	fetchWalletBalanceService,
};

const mapDataToProps = (state) => {
	let user = state.user;
	return {
		user,
		isUserOnline: user.isOnline,
		isAnonymousUser: state.user.isAnonymousUser,
		selectedDomain: state.selectedDomain,
		isPostpaidUser: state.user.voipStatus || false,
	};
};

export default connect(mapDataToProps, mapActionsToProps)(StickeyHeader);
