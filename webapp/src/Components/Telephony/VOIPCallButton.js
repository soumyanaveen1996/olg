import React, { Component } from "react";
import { connect } from "react-redux";
import { makeCall } from "../../State/actions/phone";

class VOIPCallButton extends Component {
	makeCall = async () => {
		this.props.closeCallHistory();
		let { from, to, toName } = this.props;
		console.log("making call ======voip", from, to, toName);
		if (this.props.video === true) {
			this.props.makeCall("voip", from, to, toName, to, null, "on-call", true);
		} else {
			this.props.makeCall("voip", from, to, toName, null, null, "on-call");
		}
	};

	render() {
		const { className = "", style = {} } = this.props;
		return (
			<a onClick={this.makeCall} className={className} style={style}>
				{this.props.children}
			</a>
		);
	}
}

const actions = {
	makeCall: makeCall,
};

export default connect(null, actions)(VOIPCallButton);
