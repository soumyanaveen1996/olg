import React, { PureComponent } from "react";
import _ from "lodash";
import LeftNavChannel from "./LeftNavChannel";
import { NavLink } from "react-router-dom";
import store from "../../../State/configureStore";
import { initializeBotContext } from "../../../Services/BotsService";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import withStyles from '@mui/styles/withStyles';
import { styled } from "@mui/material/styles";
import { CardHeader } from "@mui/material";

// const styles = {
// 	root: {
// 		width: "100%",
// 		background: "none",
// 		boxShadow: "none",
// 		padding: 0,
// 		marginBottom: "10px",
// 	},
// 	header: {
// 		minHeight: "36px",
// 		height: "36px",
// 		padding: "5px 0",
// 		fontFamily: "SF Pro Display Medium",
// 	},
// };

const CustomizedAccordion = styled(Accordion)({
	width: "100%",
	background: "none",
	boxShadow: "none",
	padding: 0,
	marginBottom: "10px",
});
const CustomizedAccordionSummary = styled(AccordionSummary)({
	minHeight: "36px",
	height: "36px",
	padding: "5px 0",
	fontFamily: "SF Pro Display Medium",
});

const R = require("ramda");

class ChannelsNav extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			active: true,
			tooltipOpenChannelsConfig: false,
			newsubscribedChannels: [],
		};
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props, prevProps)) {
			this.setChannelList(this.props);
		}
	}

	setChannelList = (dataProps) => {
		let allchannel = [];

		const { timeLine, subscribedChannels } = dataProps;
		const timeLineContacts = timeLine.filter((conv) => !R.isNil(conv.channel));

		const addChannelCount = subscribedChannels.map(function (channel, index) {
			const tlChannel = timeLineContacts.find(
				(conv) => conv.channel.channelName === channel.channelName
			);
			return tlChannel
				? {
						...channel,
						conversationId: tlChannel.conversationId,
						unreadCount: tlChannel.unreadCount,
				  }
				: channel;
		});
		allchannel = [...addChannelCount];

		this.setState({ newsubscribedChannels: allchannel });
	};

	openChannel = (channel) => {
		// initializeBotContext({
		// 	userDomain: store.getState().selectedDomain.userDomain,
		// 	botId: "im-bot",
		// });
		this.props.history.push("/app/chats");
		this.props.initiateChannelConversation(channel, () => {});
	};

	toggleTooltipChannel = () => {
		this.setState({
			tooltipOpenChannelsConfig: !this.state.tooltipOpenChannelsConfig,
		});
	};

	computeUnreadCount = () => {
		const timeLine = store.getState().chats.timeLine;
		const channelUnreadCount = {};
		timeLine.forEach((ele) => {
			if (ele.channel && ele.bot && ele.bot.botId === "im-bot") {
				channelUnreadCount[ele.conversationId] = ele.unreadCount;
			}
		});
		return channelUnreadCount;
	};

	render() {
		let { subscribedChannels, selectedConversation, selectedDomain } =
			this.props;
		const unreadCountChannels = this.computeUnreadCount();

		let classNames =
			"d-flex justify-content-between align-items-center appnav-link-link";

		return (
			<li className="channel-intro">
				<CustomizedAccordion defaultExpanded>
					<CustomizedAccordionSummary
						expandIcon={
							<ExpandMoreIcon
								style={{ color: "white" }}
								className="channel-config-intro"
							/>
						}
						aria-label="Expand"
						aria-controls="channels-list"
						id="channels-sidebar"
					>
						<div className={classNames}>
							<span
								className="list-item active d-flex align-items-center justify-content-between"
								style={{
									fontSize: "14px",
									color: "#fff",
									marginBottom: 0,
									width: "100%",
								}}
								onClick={(event) => event.stopPropagation()}
								onFocus={(event) => event.stopPropagation()}
							>
								{selectedDomain &&
									selectedDomain.viewModes.chat &&
									selectedDomain.viewModes.channels && (
										<NavLink
											to={{
												pathname: "/app/groups",
												state: { domainSelected: selectedDomain },
											}}
											className="appnav-link-gear d-flex align-items-center justify-content-between"
											activeClassName="appnav-link-active"
											style={{ margin: "0px" }}
										>
											<div className="d-flex align-items-center">
												<span className="list-title text-white fs14">
													Groups
												</span>
											</div>
										</NavLink>
									)}
							</span>
						</div>
					</CustomizedAccordionSummary>

					<AccordionDetails>
						{selectedDomain &&
							selectedDomain.viewModes.chat &&
							selectedDomain.viewModes.channels && (
								<ul>
									{this.state.newsubscribedChannels.map((channel, index) => (
										<li key={index} style={{ margin: "0px", padding: "8px 0" }}>
											<div>
												<LeftNavChannel
													key={channel.channelName}
													channel={channel}
													openChannel={this.openChannel}
													active={
														selectedConversation &&
														selectedConversation.channel &&
														selectedConversation.channel.channelName ===
															channel.channelName
													}
													unreadCountChannels={unreadCountChannels}
												/>
											</div>
										</li>
									))}
									<li style={{ margin: "0px", padding: "8px 0" }}>
										<NavLink
											to="/app/groups?new=true"
											style={{
												borderRadius: "2px",
												boxShadow: "none",
												padding: "0 2px",
												lineHeight: "15px",
												fontSize: "0.8rem",
												color: "#638DFF",
											}}
										>
											<img
												loading="lazy"
											src="/offlinelms/img/plus-icon.png"
												alt="plus"
												width={10}
												className="mr-2"
											/>{" "}
											<span>Add group</span>
										</NavLink>
									</li>
								</ul>
							)}
					</AccordionDetails>
				</CustomizedAccordion>
			</li>
		);
	}
}

// export default withStyles(styles)(ChannelsNav);
export default ChannelsNav;
