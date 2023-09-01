import React from "react";
import { connect } from "react-redux";
import { toggleSideNavBar } from "../../State/actions/chats";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";

const CollapsableSidebar = (props) => {
	const { frozen, hidden, isAnonymousUser, toggleSideNavBar } = props;

	if (isAnonymousUser) {
		return null;
	}

	if (!frozen || !isAnonymousUser) {
		return (
			<div>
				<IconButton
					aria-label="more"
					aria-controls="long-menu"
					aria-haspopup="true"
					onClick={toggleSideNavBar}
					size="large"
				>
					{hidden ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
				</IconButton>
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
	};
};
export default connect(mapDataToProps, mapActionsToProps)(CollapsableSidebar);
