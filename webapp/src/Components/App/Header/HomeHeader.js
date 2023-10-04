import React from "react";
import ConversationTitle from "../../Interactions/ConversationTitle";
import UserInfo from "./UserInfo";
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import history from '../../../Services/History';

const HomeHeader = (props) => {
	let {
		user,
		userName,
		logout,
		notification,
		selectedConversation,
		selectedContactStore,
		hiddenTimeLine,
		selectedDomain,
		openRecharge,
	} = props;

	let showHeaderAds = false;

	if (
		props?.selectedConversation?.customCSS &&
		props.selectedConversation.customCSS.includes("airindia")
	) {
		console.log(
			"%cSHOW HEADER ADS",
			"color:red; font-size:15px; font-weight: bold"
		);
		showHeaderAds = true;
	}

	let topNavBarWidth = "95%";
	let topNavBarClass = "";
	let marginLeft = "0%";
	let padding = "0 10px 0 0";
	if (props.isAnonymousUser) {
		topNavBarClass = "";
		topNavBarWidth = "100%";
		marginLeft = "1.5%";
		padding = "0 10px 0 0";
	}
	return (
		<React.Fragment>
			<div
				className={
					"header-right-chats d-flex align-items-center justify-content-between"
				}
				style={{
					backgroundColor: "white",
					height: "100%",
					boxShadow: "-2px 1px 8px 0px lightgrey",
					borderBottom: "1px solig lightgrey",
				}}
			>
				<div
					className={topNavBarClass}
					style={{ width: topNavBarWidth, padding: padding }}
				>
					{selectedConversation && (
						<ConversationTitle
							conversation={selectedConversation}
							selectedContactStore={selectedContactStore}
							addConversationToFavourites={props.addConversationToFavourites}
							removeConversationFromFavourites={
								props.removeConversationFromFavourites
							}
							user={user}
							selectedDomain={selectedDomain}
							hiddenTimeLine={hiddenTimeLine}
							showHeaderAds={showHeaderAds}
							openRecharge={openRecharge}
						/>
					)}
				</div>

				{!props.isAnonymousUser && (
					<div>
						<UserInfo
							userId={props.user.userId}
							userName={userName}
							logout={logout}
							notification={notification}
							user={props.user}
						/>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export default HomeHeader;
