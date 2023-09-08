import React, { Component } from "react";
import { connect } from "react-redux";
import ModalPopup from "../ModalMessages/ModalPopup";
import DiallerKeyPad from "./DiallerKeyPad";
import { makeCall } from "../../State/actions/phone";
import { Tooltip } from "reactstrap";
import { notifyInvalidPhone } from "../Telephony/Utils";
import _ from "lodash";
import CachedImage from "../Common/CachedImage";
import classNames from "classnames";
const R = require("ramda");

class DiallerPadButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialPad: false,
			dialPadToolTipOpen: false,
			isPostpaidUser: {},
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

	showCreateConversation = () => this.setState({ openDialPad: true });
	closeCreateConversation = () => this.setState({ openDialPad: false });
	toggle = () => {
		this.setState({
			dialPadToolTipOpen: !this.state.dialPadToolTipOpen,
		});
	};

	makePhoneCall = async (phone, callMode) => {
		// console.log("whilemaking call diallerPadButton ", this.props);

		if (R.isNil(phone)) {
			notifyInvalidPhone();
			return;
		}
		let { emailAddress, balance } = this.props;

		if (!this.state.isPostpaidUser.isPostpaidUser) {
			if (balance <= 0) {
				// return notifyBalanceError();
				this.closeCreateConversation();
				this.props.noBalance();
				return;
			}
		}
		if (callMode === "sat") {
			this.props.makeCall(
				"sat",
				emailAddress,
				phone,
				phone,
				null,
				null,
				"on-call"
			);
		} else {
			this.props.makeCall(
				"phone",
				emailAddress,
				phone,
				phone,
				null,
				null,
				"on-call"
			);
		}
	};

	render() {
		return (
			<div className="home-call-btn" id="dialPad">
				<a
					style={{
						backgroundColor: "#2FC76F",
						width: "32px",
						height: "32px",
						borderRadius: "16px",
					}}
					onClick={this.showCreateConversation}
					className={classNames(
						"btn btn-default d-inline-flex justify-content-center align-items-center",
						{ disabled: !this.props.isUserOnline }
					)}
				>
					<CachedImage
						imgKey={"dialpadIcon"}
						image={"/img/tab-dialpad-icon@2x.png"}
						width={"12"}
					/>
					{/* <img src="/img/tab-dialpad-icon@2x.png" width="15" alt="" /> */}
				</a>

				{this.state.openDialPad && (
					<ModalPopup size="sm" noHeader className="dialler-modal">
						<DiallerKeyPad
							makePhoneCall={this.makePhoneCall}
							onClose={this.closeCreateConversation}
							noBalance={() => this.props.noBalance()}
						/>
					</ModalPopup>
				)}
				<Tooltip
					target={"dialPad"}
					placement={"bottom"}
					isOpen={this.state.dialPadToolTipOpen}
					toggle={this.toggle}
					delay={{ show: 0, hide: 0 }}
				>
					Dialpad
				</Tooltip>
			</div>
		);
	}
}

const actions = {
	makeCall: makeCall,
};

const mapDataToProps = (state) => {
	let user = state.user;
	return {
		userId: user.user.userId,
		isUserOnline: user.isOnline,
		emailAddress: user.user.emailAddress,
		balance: user.balance,
		isPostpaidUser: state.user.voipStatus || false,
	};
};

export default connect(mapDataToProps, actions)(DiallerPadButton);
