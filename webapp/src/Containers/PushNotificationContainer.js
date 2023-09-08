import React, { Component } from "react";
import "../Components/App/App.css";
import { connect } from "react-redux";
import {
	isDeviceSubscribedToNotification,
	setDeviceId,
	setPushSubscriptionStatus,
	setSwRegistration,
	updateSubscriptionOnServer,
} from "../State/actions/notification";
import { getDeviceId } from "../Utils/Helpers";
import { openPushConversation } from "../State/actions/chats";

class PushNotificationContainer extends Component {
	componentDidMount() {
		if (navigator.serviceWorker) {
			navigator.serviceWorker.addEventListener("message", (event) => {
				let data = JSON.parse(event.data);
				console.log("Client 1 Received Message: " + data);
				if (data.action === "push-click") {
					this.props.openPushConversation(data.conversationId);
				}
			});

			getDeviceId().then((deviceId) => {
				this.props.setDeviceId(deviceId);
				let status = isDeviceSubscribedToNotification(
					deviceId,
					this.props.user.webSubscriptions
				);
				this.props.setPushSubscriptionStatus(status);

				if ("serviceWorker" in navigator && "PushManager" in window) {
					// navigator.serviceWorker
					// 	.register("sw.js")
					// 	.then((swReg) => {
					// 		console.log("Service Worker is registered", swReg);
					// 		this.props.setSwRegistration(swReg);
					// 		// if (!status) {
					// 		//   swReg.pushManager.getSubscription().then(subscription => {
					// 		//     this.props.updateSubscriptionOnServer(subscription);
					// 		//   });
					// 		// }
					// 	})
					// 	.catch((error) => {
					// 		console.error("Service Worker Error", error);
					// 	});
				} else {
					console.warn("Push messaging is not supported");
				}
			});
		}
	}

	render() {
		return null;
	}
}

const mapActionsToProps = {
	setSwRegistration: setSwRegistration,
	updateSubscriptionOnServer: updateSubscriptionOnServer,
	setDeviceId: setDeviceId,
	setPushSubscriptionStatus: setPushSubscriptionStatus,
	openPushConversation: openPushConversation,
};

const mapDataToProps = (state) => {
	return {
		user: state.user.user,
	};
};
export default connect(
	mapDataToProps,
	mapActionsToProps
)(PushNotificationContainer);
