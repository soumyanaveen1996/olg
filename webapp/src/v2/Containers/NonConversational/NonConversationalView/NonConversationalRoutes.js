import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import { useSelector } from "react-redux";
import _ from "lodash";
import NonConversationalComponent from "./NonConversationalComponent";
import { FMChatWidget, FMSnackbar } from "../../../Components/Common";
import FMFilterDrawer from "../../../Components/FMFilterDrawer/FMFilterDrawer";
import ChatComponentInWindow from '../../../../Components/Interactions/content/ChatComponentInWindow';

const GridMainContainer = styled("div")(({ theme }) => {
	return {
		flexGrow: 1,
		height: "100%",
		padding: theme.spacing(2),
		overflow: "auto",
		backgroundColor: "#f4f7fb",
	};
});

export default function NonConversationalRoutes({ conversationId }) {
	const [currentConversationId, setCurrentConversationId] = useState(null);
	const NonConversationalMessages = useSelector(
		(state) => state.v2.NonConversational[conversationId]
	);

	const NonConversationalMessages1 = useSelector(
		(state) => state.v2.NonConversational
	);

	let NonConversationalComponents = NonConversationalMessages?.components;
	let selectedTab = NonConversationalMessages?.selectedTab;
	useEffect(() => {
		setCurrentConversationId(conversationId);
		return () => console.log("prints if renders");
	}, [conversationId]);

	if (currentConversationId === conversationId) {
		return (
			<GridMainContainer id="main-router">
				{!_.isEmpty(NonConversationalComponents) && (
					<NonConversationalComponent
						conversationId={conversationId}
						NonConversationalComponents={NonConversationalComponents}
						selectedTab={selectedTab}
					/>
				)}
				{
					(!_.isEmpty(NonConversationalMessages1["componentInWindow"]) && !_.isEmpty(NonConversationalMessages1["componentInWindow"][conversationId])) && (
						<ChatComponentInWindow
							conversationId={conversationId}
							data={{
								conversationId: NonConversationalMessages1["componentInWindow"][conversationId].message.conversation.conversationId
							}}
							{...NonConversationalMessages1["componentInWindow"][conversationId]}
						/>
					)
				}
				<FMChatWidget />
				<FMSnackbar />
				<FMFilterDrawer conversation={conversationId} />
			</GridMainContainer>
		);
	}
	return null;
}
