import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import UserInfo from "../UserInfo";
import ChannelsSearch from "../ChannelsSearch/ChannelsSearch";
import ModalPopup from "../../../ModalMessages/ModalPopup";
import NewChannel from "../../../Channels/NewChannel";
import styles from "./ChannelsHeader.module.css";
import OfflineSwitch from "../../../OfflineSwitch/OfflineSwitch";
import CollapsableSidebar from "../../../CollapsableNavBar/CollapsableSidebar";

const ChannelsHeader = (props) => {
	const [showNewChannelModal, toggleCreateChannelModal] = useState(false);

	let {
		userName,
		logout,
		isAnonymousUser,
		channelSearchKey,
		updateChannelSearchKey,
		fetchAllChannels,
		notification,
		user: { userId },
		location,
	} = props;

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		if (queryParams.get("new")) {
			toggleCreateChannelModal(true);
		}
	}, [location]);

	return (
		<div
			className={cx(
				styles.container,
				"d-flex align-items-center justify-content-between"
			)}
		>
			<div className="d-flex align-items-center">
				<CollapsableSidebar />
				<h5 className="title_header">Groups</h5>
			</div>

			<div className={styles.flex_alignItemsCenter_JustifyContentEnd}>
				<div className="mr-3">
					<a
						className={cx(
							styles.flex_alignItemsCenter_JustifyContentCenter,
							"primary-link"
						)}
						onClick={() => toggleCreateChannelModal(!showNewChannelModal)}
					>
						<span className={styles.btn_title}>New Group</span>
						<span
							className={cx(
								styles.flex_alignItemsCenter_JustifyContentCenter,
								"ml-2 dot text-white fs20"
							)}
						>
							<i className={cx(styles.icon_styling, "icon-plus")} />
						</span>
					</a>
				</div>
				<div className="mr-3">
					<ChannelsSearch
						searchKey={channelSearchKey}
						updateChannelSearchKey={updateChannelSearchKey}
						fetchAllChannels={fetchAllChannels}
					/>
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

			{showNewChannelModal && (
				<ModalPopup
					onClose={() => toggleCreateChannelModal(!showNewChannelModal)}
					size="sm"
					noHeader
				>
					<NewChannel
						cancel={() => toggleCreateChannelModal(!showNewChannelModal)}
						fetchAllChannels={fetchAllChannels}
					/>
				</ModalPopup>
			)}
		</div>
	);
};
ChannelsHeader.propTypes = {
	userName: PropTypes.string.isRequired,
	logout: PropTypes.func,
	isAnonymousUser: PropTypes.bool.isRequired,
	channelSearchKey: PropTypes.string,
	updateChannelSearchKey: PropTypes.func,
	fetchAllChannels: PropTypes.func,
	user: PropTypes.object.isRequired,
};

export default ChannelsHeader;
