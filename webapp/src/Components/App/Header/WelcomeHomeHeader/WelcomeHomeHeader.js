import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./WelcomeHomeHeader.module.css";
import StickeyHeader from "../../../StickeyHeader/stickeyHeader";
import UserInfo from "../UserInfo";
import OfflineSwitch from "../../../OfflineSwitch/OfflineSwitch";
import CollapsableSidebar from "../../../CollapsableNavBar/CollapsableSidebar";

const WelcomeHomeHeader = (props) => {
	let {
		userName,
		logout,
		notification,
		isAnonymousUser,
		openRecharge,
		user: { userId },
	} = props;

	return (
		<React.Fragment>
			<div
				className={cx(
					styles.container,
					styles.flex_alignItemsCenter_JustifyContentBetween
				)}
			>
				<div className="d-flex align-items-center">
					<CollapsableSidebar />
					<h5 className="title_header">Home</h5>
				</div>
			</div>
			{!isAnonymousUser && (
				<div className={styles.flex_alignItemsCenter_JustifyContentEnd}>
					<OfflineSwitch />
					<div className={styles.flex_alignItemsCenter_JustifyContentEnd}>
						<StickeyHeader openRecharge={openRecharge} />
					</div>
					<div className={styles.flex_alignItemsCenter_JustifyContentEnd}>
						<UserInfo
							userId={userId}
							userName={userName}
							logout={logout}
							notification={notification}
						/>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

WelcomeHomeHeader.propTypes = {
	userName: PropTypes.string.isRequired,
	logout: PropTypes.func,
	isAnonymousUser: PropTypes.bool.isRequired,
	openRecharge: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

export default WelcomeHomeHeader;
