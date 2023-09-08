import React from "react";
import { withRouter } from "react-router-dom";
import { getPageName } from "./Utils";
import Banner from "../../Banner/index";
import {
	HomeHeader,
	MarketplaceHeader,
	ChannelsHeader,
	ContactsHeader,
	ProfileHeader,
	WelcomeHomeHeader,
	ErrorHeader,
} from "../Header";
import FMNavLoader from "../../../v2/Components/Common/FMNavLoader/FMNavLoader";

const AppHeader = (props) => {
	let { pathname, isAnonymousUser } = props;
	let pageName = getPageName(pathname, isAnonymousUser);
	let headerClass = "navbar in-header navbar-expand-lg pl-0 pr-0 bg-white";
	let headerStyle = {
		// borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
		// boxShadow: "0 2px 4px 0 rgb(42 45 60 / 10%)",
		// borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
		zIndex: 1201,
		// boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 6px",
	};
	if (pageName === "Error" && isAnonymousUser) {
		headerClass = "navbar in-header navbar-expand-lg pl-0 pr-0";
		headerStyle = { backgroundColor: "rgb(244, 244, 244)" };
	}
	return (
		<React.Fragment>
			<header role="banner" className={headerClass} style={headerStyle}>
				{pageName === "Error" && <ErrorHeader {...props} />}
				{pageName === "Home" && <HomeHeader {...props} />}
				{pageName === "Loft" && <HomeHeader {...props} />}
				{pageName === "Chatbots" && <MarketplaceHeader {...props} />}
				{pageName === "Channels" && <ChannelsHeader {...props} />}
				{pageName === "Contacts" && <ContactsHeader {...props} />}
				{pageName === "Profile" && <ProfileHeader {...props} />}
				{pageName === "Welcome" && <WelcomeHomeHeader {...props} />}
			</header>
			<FMNavLoader />
			<Banner {...props} />
		</React.Fragment>
	);
};

export default withRouter(AppHeader);
