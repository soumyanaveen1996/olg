import React from "react";
import UserInfo from "../UserInfo";
import styles from "./MarketplaceHeader.module.css";
import cx from "classnames";
import MarketplaceSearch from "../MarketplaceSearch/MarketplaceSearch";
import OfflineSwitch from "../../../OfflineSwitch/OfflineSwitch";
import CollapsableSidebar from "../../../CollapsableNavBar/CollapsableSidebar";

const MarketplaceHeader = (props) => {
	let {
		userName,
		logout,
		notification,
		isAnonymousUser,
		searchCatalogue,
		user: { userId },
	} = props;

	return (
		<div
			className={cx(
				styles.width_100,
				"d-flex align-items-center justify-content-between "
			)}
		>
			<div className="d-flex align-items-center">
				<CollapsableSidebar />
				<h5 className="title_header">Apps</h5>
			</div>
			<div>
				<div className={"d-flex align-items-center justify-content-end"}>
					<div className="mr-3">
						<MarketplaceSearch searchCatalogue={searchCatalogue} />
					</div>
					<OfflineSwitch />
					{!isAnonymousUser && (
						<div>
							<UserInfo
								userId={userId}
								userName={userName}
								logout={logout}
								notification={notification}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MarketplaceHeader;
