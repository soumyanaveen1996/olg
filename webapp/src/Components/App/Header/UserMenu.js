import React, { Component } from "react";
import Avatar from "../../Common/Avatar";
import Popover from "../../Common/Popover";
import { urlB64ToUint8Array } from "../../../Utils/Helpers";
import { APPLICATION_SERVER_PUBLIC_KEY } from "../../../State/actions/notification";
import Notify from "../../ModalMessages/ToastNotif";

class UserMenu extends Component {
	state = {
		open: false,
	};

	handleClick = (e) => {
		e.preventDefault();
		this.setState({ open: !this.state.open });
	};

	subscribeUser = () => {
		let { swRegistration } = this.props.notification;
		const applicationServerKey = urlB64ToUint8Array(
			APPLICATION_SERVER_PUBLIC_KEY
		);
		swRegistration.pushManager
			.subscribe({
				userVisibleOnly: true,
				applicationServerKey: applicationServerKey,
			})
			.then((subscription) => {
				console.log("User is subscribed.");
				this.props.updateSubscriptionOnServer(subscription);
			})
			.catch((err) => {
				Notify({
					type: "info",
					message:
						"You have disabled notifications in the browser. Notifications provide alerts when new messages are received even if the browser window is not open.\n" +
						"If you want to enable it, Please go to browser settings and enable notifications",
					autoClose: 12000,
				});
				console.log("Failed to subscribe the user: ", err);
			});
	};

	unsubscribeUser = () => {
		let { swRegistration } = this.props.notification;

		swRegistration.pushManager
			.getSubscription()
			.then((subscription) => {
				if (subscription) {
					return subscription.unsubscribe();
				}
			})
			.then(() => {
				this.props.updateSubscriptionOnServer(null);
			})
			.catch((error) => {
				console.log("Error unsubscribing", error);
			});
	};

	handleClose = (e) => this.setState({ open: false });

	render() {
		let {
			userName,
			logout,
			notification,
			open,
			target,
			handleClose,
			container,
		} = this.props;

		return (
			<Popover
				style={{ backgroundColor: "transparent", padding: 0 }}
				placement="bottom"
				container={container}
				target={target}
				show={open}
				onHide={handleClose}
			>
				<div className="Profile-popover">
					<div className="User-info">
						<Avatar name={userName} size={40} height={40} color="name-avatar" />
						<span style={{ margin: 5 }}>{userName}</span>
					</div>

					<div className="d-flex justify-content-center align-items-center w-100 btn-sm p-2">
						<button
							type="button"
							className="btn btn-primary"
							onClick={
								notification.isSubscribed
									? this.unsubscribeUser
									: this.subscribeUser
							}
							style={{ color: "#fff" }}
						>
							{notification.isSubscribed
								? "Disable Notifications"
								: "Enable Notifications"}
						</button>
					</div>

					<div className="Profile-gutter" />
					<div className="Profile-logout d-flex justify-content-start align-items-center ml-2">
						<a
							style={{ color: "inherit" }}
							className="nav-link"
							onClick={logout}
						>
							<i className="icon-exit" style={{ fontSize: "20px" }} />
						</a>
						<a style={{ color: "inherit" }} onClick={logout}>
							<span style={{ padding: 2 }}>Logout</span>
						</a>
					</div>
				</div>
			</Popover>
		);
	}
}

export default UserMenu;
