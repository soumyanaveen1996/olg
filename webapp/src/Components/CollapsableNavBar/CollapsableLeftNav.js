import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { toggleSideNavBar } from "../../State/actions/chats";
import CachedImage from "../Common/CachedImage";

const CollapsableLeftNav = (props) => {
	let iconPosition = { left: "200px" };
	const { frozen, hidden, isAnonymousUser, toggleSideNavBar, sidebarHidden } =
		props;
	if (hidden) {
		iconPosition = { left: "0px" };
	}

	useEffect(() => {
		if (sidebarHidden) {
			toggleSideNavBar();
		}
	}, []);

	if (isAnonymousUser) {
		return null;
	}

	if (!frozen || !isAnonymousUser) {
		return (
			<div className="collapsable-sidebar" style={iconPosition}>
				{hidden ? (
					<a onClick={toggleSideNavBar}>
						<CachedImage
							imgKey={"showSidebarIcon"}
							image={"offlinelms/img/show-sidebar.png"}
						/>
					</a>
				) : (
					<a onClick={toggleSideNavBar}>
						<CachedImage
							imgKey={"hideSidebarIcon"}
								image={"offlinelms/img/hide-sidebar.png"}
						/>
					</a>
				)}
			</div>
		);
	} else {
		return null;
	}
};
const mapActionsToProps = {
	toggleSideNavBar,
};
const mapDataToProps = (state) => {
	let chats = state.chats;
	return {
		frozen: chats.navigationBar.sidebar
			? chats.navigationBar.sidebar.frozen === undefined
				? true
				: chats.navigationBar.sidebar.frozen
			: true,
		hidden: chats.navigationBar.sidebar
			? chats.navigationBar.sidebar.hidden === undefined
				? false
				: chats.navigationBar.sidebar.hidden
			: false,
		isAnonymousUser: state.user.isAnonymousUser,
		sidebarHidden: state.selectedDomain?.sidebarHidden,
	};
};
export default connect(mapDataToProps, mapActionsToProps)(CollapsableLeftNav);
