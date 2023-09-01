import React, { Component } from "react";
import { connect } from "react-redux";

import { toggleTopNavBar } from "../../State/actions/chats";
import CachedImage from "../Common/CachedImage";

class CollapsableTopNav extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			frozen,
			hidden,
			isAnonymousUser,
			toggleTopNavBar,
			sideNavBarHidden,
		} = this.props;
		let iconPosition = { top: "71px", left: "225px" };
		if (sideNavBarHidden) {
			iconPosition = { top: "71px", left: "25px" };
		}
		if (hidden) {
			iconPosition = { top: "0px", left: "225px" };
			if (sideNavBarHidden) {
				iconPosition = { top: "0px", left: "25px" };
			}
		}

		if (!frozen || !isAnonymousUser) {
			return (
				<div className="collapsable-top-navbar" style={iconPosition}>
					{hidden ? (
						<a onClick={toggleTopNavBar}>
							<CachedImage
								imgKey={"headerExpandIcon"}
								image={"img/header-expand-btn.png"}
							/>
						</a>
					) : (
						<a onClick={toggleTopNavBar}>
							<CachedImage
								imgKey={"headerCollapseIcon"}
								image={"img/header-collapse-btn.png"}
							/>
						</a>
					)}
				</div>
			);
		} else {
			return null;
		}
	}
}
const mapActionsToProps = {
	toggleTopNavBar,
};
const mapDataToProps = (state) => {
	let chats = state.chats;
	return {
		frozen: chats.navigationBar.navbar
			? chats.navigationBar.navbar.frozen === undefined
				? true
				: chats.navigationBar.navbar.frozen
			: true,
		hidden: chats.navigationBar.navbar
			? chats.navigationBar.navbar.hidden === undefined
				? false
				: chats.navigationBar.navbar.hidden
			: false,
		sideNavBarHidden: chats.navigationBar.sidebar
			? chats.navigationBar.sidebar.hidden === undefined
				? false
				: chats.navigationBar.sidebar.hidden
			: false,
		isAnonymousUser: state.user.isAnonymousUser,
	};
};
export default connect(mapDataToProps, mapActionsToProps)(CollapsableTopNav);
