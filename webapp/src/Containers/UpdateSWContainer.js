import React, { Component } from "react";
import "./Notification.css";
export default class UpdateSWContainer extends Component {
	updateSW = () => {
		// console.log(
		//   "Manish [UpdateSWContainer] [updateSW]  this.props.installingWorkerInstance :: ",
		//   this.props.installingWorkerInstance
		// );
		this.props.installingWorkerInstance &&
			this.props.installingWorkerInstance.postMessage({
				action: "skipWaiting",
			});
		this.props.updateServiceWorkerRequired(false);
	};
	render() {
		const notification = this.props.updateSWFlag ? (
			<div id="notificationBar">
				A new version of this app is available. Click &nbsp;
				<a
					id="reload"
					href="#"
					onClick={this.updateSW}
					style={{
						fontWeight: 700,
						color: "white",
						textDecoration: "underline",
					}}
				>
					here
				</a>{" "}
				to update.
			</div>
		) : null;
		return notification;
	}
}
