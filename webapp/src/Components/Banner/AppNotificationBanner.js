import React, { Component } from "react";
import ModalPopup from "../ModalMessages/ModalPopup";
import AppNotificationModal from "./AppNotificationModal";
import _ from "lodash";
import "./appNotificationModal.css";
import {
	BANNER_TYPE_ERROR,
	BANNER_TYPE_INFO,
	COLOR_TYPE_ERROR,
	COLOR_TYPE_INFO,
	COLOR_TYPE_MIX,
} from "../../Utils/Constants";

class AppNotificationBanner extends Component {
	state = {};
	showNotificationModal = () => {
		this.setState({ showNotificationModal: true });
	};
	closeNotifications = () => {
		this.setState({ showNotificationModal: false });
	};
	render() {
		const { BannerStyle, handleCloseBanner } = this.props;
		let backGroundColor, fontColor, showAllNotificationColor, closeButtonColor;
		const notificationTypes = this.props.notificationTypes;
		if (!_.isEmpty(this.props.notifications)) {
			if (
				notificationTypes.indexOf(BANNER_TYPE_INFO) !== -1 &&
				notificationTypes.indexOf(BANNER_TYPE_ERROR) !== -1
			) {
				backGroundColor = COLOR_TYPE_MIX;
				fontColor = "#696969";
				closeButtonColor = "black";
				showAllNotificationColor = "black";
			} else if (notificationTypes.indexOf(BANNER_TYPE_INFO) !== -1) {
				backGroundColor = COLOR_TYPE_INFO;
				fontColor = "white";
				closeButtonColor = "white";
				showAllNotificationColor = "white";
			} else if (notificationTypes.indexOf(BANNER_TYPE_ERROR) !== -1) {
				backGroundColor = COLOR_TYPE_ERROR;
				fontColor = "#696969";
				closeButtonColor = "black";
				showAllNotificationColor = "black";
			}
		}
		return (
			<div
				style={Object.assign(
					{ backgroundColor: backGroundColor, color: fontColor },
					BannerStyle.BannerBackgroundStyle
				)}
			>
				{!_.isEmpty(this.props.notifications) &&
				this.props.notifications.length > 1 ? (
					<span>
						{" "}
						You have received multiple notifications! &nbsp;
						<a
							style={Object.assign(
								{ color: showAllNotificationColor },
								BannerStyle.retryNowStyle
							)}
							onClick={this.showNotificationModal}
						>
							{" "}
							Show all Notifications{" "}
						</a>
					</span>
				) : (
					!_.isEmpty(this.props.notifications) &&
					this.props.notifications.length === 1 && (
						<span style={{ color: fontColor }}>
							{this.props.notifications[0].msg}
						</span>
					)
				)}
				<a
					style={Object.assign(
						{
							color: closeButtonColor,
							border: `1px solid ${closeButtonColor}`,
						},
						BannerStyle.closeBannerStyle
					)}
					onClick={handleCloseBanner}
				>
					<i
						className="icon-cross"
						style={{ fontSize: "12px", fontWeight: "600" }}
					/>
				</a>
				{this.state.showNotificationModal && (
					<ModalPopup
						onClose={this.closeNotifications}
						size="sm"
						noHeader
						className="notification-modal-position"
					>
						<AppNotificationModal
							onClose={this.closeNotifications}
							{...this.props}
						/>
					</ModalPopup>
				)}
			</div>
		);
	}
}

export default AppNotificationBanner;
