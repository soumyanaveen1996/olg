import React, { Component } from "react";
import { connect } from "react-redux";
import { makeCall } from "../../State/actions/phone";
class SatCallButton extends Component {
	componentDidMount() {
		// console.log("making call ======sat", this.props.balance);
	}
	handleToggleCall = async () => {
		if (this.props.isPostpaidUser && this.props.isPostpaidUser.isPostpaidUser) {
			this.props.closeCallHistory();
			let { from, to, toName, toUserId, localCall } = this.props;
			if (localCall) {
				this.props.makeCall(
					"sat",
					from,
					to,
					toName,
					toUserId,
					localCall,
					"on-call"
				);
			} else {
				this.props.makeCall("sat", from, to, toName, toUserId, null, "on-call");
			}
		} else {
			if (this.props.balance > 0) {
				this.props.closeCallHistory();
				let { from, to, toName, toUserId, localCall } = this.props;
				if (localCall) {
					this.props.makeCall(
						"sat",
						from,
						to,
						toName,
						toUserId,
						localCall,
						"on-call"
					);
				} else {
					this.props.makeCall(
						"sat",
						from,
						to,
						toName,
						toUserId,
						null,
						"on-call"
					);
				}
			} else {
				this.props.openGetRecharge();
			}
		}
	};

	render() {
		const { className = "", style = {} } = this.props;
		return (
			<a onClick={this.handleToggleCall} className={className} style={style}>
				{this.props.children}
			</a>
		);
	}
}

const actions = {
	makeCall: makeCall,
};

export default connect(null, actions)(SatCallButton);
