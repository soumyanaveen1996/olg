import React, { Component } from "react";
import AppNotificationCard from "./AppNotificationCard";
import "./appNotificationModal.css";
import _ from "lodash";
import {
	BANNER_TYPE_ERROR,
	BANNER_TYPE_INFO,
	COLOR_TYPE_ERROR,
	COLOR_TYPE_INFO,
	COLOR_TYPE_MIX,
} from "../../Utils/Constants";

class AppNotificationModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	removeNotification = (id, type) => {
		this.props.removeAppNotification(id, type, "id");
	};

	render() {
		let notificationCards = !_.isEmpty(this.props.notifications)
			? _.map(this.props.notifications, (notification) => {
					let backGroundColor;
					let type = notification.type;
					if (type === BANNER_TYPE_INFO) {
						backGroundColor = COLOR_TYPE_INFO;
					} else if (type === BANNER_TYPE_ERROR) {
						backGroundColor = COLOR_TYPE_ERROR;
					} else {
						backGroundColor = COLOR_TYPE_MIX;
					}
					return (
						<div className="d-flex flex-column" key={notification.id}>
							<AppNotificationCard
								key={notification.id}
								backGroundColor={backGroundColor}
								notification={notification}
								removeNotification={this.removeNotification}
							/>
							<div className="notification-seprator" />
						</div>
					);
			  })
			: null;
		return (
			<div className="notificationModal d-flex flex-column">
				{/* <div
          className="align-self-end notification-modal-close"
          onClick={this.props.onClose}
          style={{ fontSize: "20px" }}
        >
          ×
        </div> */}
				<div className="d-flex justify-content-between px-2">
					<p className="fs24"> Notifications</p>
					<img
						loading="lazy"
						alt="notificationIcon"
						src="img/bell.svg"
						height={40}
					/>
				</div>
				<div className="partition-hr" style={{ height: "3px" }} />
				<div className="notificationBody d-flex flex-column">
					<div className="notification-child-container">
						{notificationCards}
					</div>
				</div>
			</div>
		);
	}
}

export default AppNotificationModal;
