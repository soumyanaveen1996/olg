import React, { PureComponent } from "react";
import { connect } from "react-redux";
import DiallerKeyPad from "./DiallerKeyPad";
import NewCallScreen from "./NewCallScreen";
import { makeCall } from "../../State/actions/phone";

class Dialler extends PureComponent {
	constructor(props, context) {
		super(props, context);
		this.state = { showWhat: null };
	}

	makePhoneCall = async (phone, callMode) => {
		let { emailAddress, balance } = this.props;
		console.log("Current Balance", balance);
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
			console.log("making phone call");

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

	showDialPad = () => {
		this.setState({ showWhat: "on-dial-pad" });
	};

	closeDiallerPad = () => {
		this.setState({ showWhat: null });
	};

	render() {
		let { showWhat } = this.state;

		if (!showWhat) {
			return (
				<NewCallScreen
					noBalance={() => this.props.noBalance()}
					showDialPad={this.showDialPad}
					selectedDomain={this.props.selectedDomain}
					onCloseDialler={this.props.onClose}
				/>
			);
		} else if (showWhat === "on-dial-pad") {
			return (
				<DiallerKeyPad
					makePhoneCall={this.makePhoneCall}
					onClose={this.closeDiallerPad}
					noBalance={() => this.props.noBalance()}
				/>
			);
		}
	}
}

const actions = {
	makeCall: makeCall,
};

const mapDataToProps = (state, props) => {
	let user = state.user;

	return {
		userId: user.user.userId,
		emailAddress: user.user.emailAddress,
		selectedDomain: state.selectedDomain,
		balance: user.balance,
	};
};

export default connect(mapDataToProps, actions)(Dialler);
