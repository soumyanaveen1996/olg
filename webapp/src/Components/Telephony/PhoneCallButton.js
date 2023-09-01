import React, { Component } from "react";
import { makeCall, resetCallInfo } from "../../State/actions/phone";
import { connect } from "react-redux";
import { fetchWalletBalanceService } from "../../State/actions/user";
import { doE164, formatPhoneNumber, getCallMode } from "./Utils";
import { ReactSipPhone, phoneStore } from "react-sip-phone";
import DiallerKeyPad from "./DiallerKeyPad";
import ModalPopup from "../ModalMessages/ModalPopup";

class PhoneCallButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialPad: false,
		};
	}

	openDiallerPadFn = async () => {
		this.setState({ openDialPad: true });
		this.makeCall();
	};

	makeCall = async () => {
		if (this.props.isPostpaidUser && this.props.isPostpaidUser.isPostpaidUser) {
			this.props.closeCallHistory();
			let { from, to, toUserId, toName, localCall } = this.props;

			if (localCall) {
				this.props.makeCall(
					"phone",
					from,
					to,
					toName,
					toUserId,
					localCall,
					"on-call"
				);
			} else {
				this.props.makeCall(
					"phone",
					from,
					to,
					toName,
					toUserId,
					null,
					"on-call"
				);
			}
		} else {
			if (this.props.balance > 0) {
				this.props.closeCallHistory();
				let { from, to, toUserId, toName, localCall } = this.props;
				if (localCall) {
					if (this.state.openDialPad) {
						<ModalPopup size="sm" noHeader className="dialler-modal">
							<DiallerKeyPad
								callerInfo={{ toNumber: to }}
								onClose={this.setState({ openDialPad: false })}
							/>
						</ModalPopup>;
					}
				} else {
					if (this.state.openDialPad) {
						<ModalPopup size="sm" noHeader className="dialler-modal">
							<DiallerKeyPad
								callerInfo={{ toNumber: to }}
								onClose={this.setState({ openDialPad: false })}
							/>
						</ModalPopup>;
					}
					// this.makeCallNew(
					// 	"phone",
					// 	from,
					// 	to,
					// 	toName,
					// 	toUserId,
					// 	null,
					// 	"on-call"
					// );
				}
			} else {
				this.props.openGetRecharge();
			}
		}
	};

	render() {
		const { className = "", style = {} } = this.props;

		return (
			<a onClick={this.openDiallerPadFn} className={className} style={style}>
				{this.props.children}
			</a>
		);
	}
}

const actions = {
	makeCall: makeCall,
	resetCallInfo,
};

const mapDataToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapDataToProps, actions)(PhoneCallButton);
