import React from "react";
import cx from "classnames";
import UserInfo from "../UserInfo";
import styles from "./ProfileHeader.module.css";
import StickeyHeader from "../../../StickeyHeader/stickeyHeader";
import OfflineSwitch from "../../../OfflineSwitch/OfflineSwitch";
import CollapsableSidebar from "../../../CollapsableNavBar/CollapsableSidebar";

const ProfileHeader = (props) => {
	let { userName, logout, notification } = props;

	return (
		<React.Fragment>
			<CollapsableSidebar />
			<div className={cx(styles.container, "d-flex align-items-center px-4")}>
				<h5 className="title_header">My Profile</h5>
			</div>
			<div
				className={cx(
					styles.flex_alignItemsCenter_justifyContentEnd,
					styles.sticky_header_div
				)}
			>
				<StickeyHeader openRecharge={props.openRecharge} />
			</div>
			<OfflineSwitch />
			<div
				className={cx(
					styles.flex_alignItemsCenter_justifyContentEnd,
					styles.userInfoContainer
				)}
			>
				<UserInfo
					userId={props.user.userId}
					userName={userName}
					logout={logout}
					notification={notification}
				/>
			</div>
		</React.Fragment>
	);
};

export default ProfileHeader;
