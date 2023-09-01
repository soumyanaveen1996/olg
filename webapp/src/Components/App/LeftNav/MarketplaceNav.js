import React, { PureComponent, Component } from "react";
import _ from "lodash";
import LeftNavBot from "./LeftNavBot";
import { FRONTM_BOT_ID } from "../../../Utils/Constants";
import { NavLink } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import withStyles from "@mui/styles/withStyles";
import { styled } from "@mui/material";

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

class MarketplaceNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: true,
			tooltipOpenAppsConfig: false,
			botSubscriptions: [],
		};
	}

	// createConversation = botId => {
	//   const {
	//     userId,
	//     botSubscriptions,
	//     createConversation,
	//     history
	//   } = this.props;
	//   const convBot = botSubscriptions.filter(bot => bot.botId === botId);
	//   createConversation(convBot[0], userId);
	//   history.push("/app/chats");
	// };

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			nextProps.botSubscriptions &&
			prevState.botSubscriptions &&
			!_.isEqual(nextProps.botSubscriptions, prevState.botSubscriptions)
		) {
			return {
				botSubscriptions: [...nextProps.botSubscriptions],
			};
		} else return null;
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevProps.botSubscriptions &&
			prevState.botSubscriptions &&
			!_.isEqual(prevProps.botSubscriptions, prevState.botSubscriptions)
		) {
			this.setState({ botSubscriptions: [...prevProps.botSubscriptions] });
		}
	}

	startFrontMAssistantConversation = () => {
		let { timeLine } = this.props;
		let index = timeLine.findIndex((conversation) => {
			return conversation.bot && FRONTM_BOT_ID === conversation.bot.botId;
		});
		this.props.changeConversation(timeLine[index], true);
		this.props.history.push("/app/chats");
	};

	toggleTooltipApps = () => {
		this.setState({
			tooltipOpenAppsConfig: !this.state.tooltipOpenAppsConfig,
		});
	};

	render() {
		let { startConversation, selectedConversation, selectedDomain, classes } =
			this.props;

		let { botSubscriptions } = this.state;

		// console.log("all bots ", this.state.botSubscriptions);

		let bsMap = {};
		botSubscriptions.forEach((bot) => {
			let category = bot.category;
			category.forEach((cat) => {
				if (bsMap[cat]) {
					bsMap[cat].push(bot);
				} else {
					bsMap[cat] = [bot];
				}
			});
		});
		let botList;

		botList = botSubscriptions.filter(
			(elem) => !elem.systemBot && !elem.botClients.web == false
		);
		// systemBot;

		// let categories = Object.keys(bsMap);
		let classNames =
			"d-flex justify-content-between align-items-center appnav-link-link";

		return (
			<li className="marketPlace-intro">
				<CustomizedAccordion defaultExpanded>
					<CustomizedAccordionSummary
						expandIcon={
							<ExpandMoreIcon
								style={{ color: "white" }}
								className="marketplace-config-intro"
							/>
						}
						aria-label="Expand"
						aria-controls="marketplace-list"
						id="marketplace-sidebar"
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
									selectedDomain.viewModes &&
									selectedDomain.viewModes.apps && (
										<NavLink
											to="/app/catalog"
											className="appnav-link-gear  d-flex align-items-center justify-content-between"
											activeClassName="appnav-link-active"
											style={{ margin: "0px" }}
										>
											<div className="d-flex align-items-center">
												<span className="list-title text-white fs14">Apps</span>
											</div>
										</NavLink>
									)}
							</span>
						</div>
						{/* {active && ( */}
					</CustomizedAccordionSummary>

					<CustomizedAccordion>
						<ul>
							{botList.map((bot, index) => (
								<li key={index} style={{ margin: "0px", padding: "8px 0" }}>
									<div>
										{selectedConversation ? (
											<LeftNavBot
												key={bot.botId}
												bot={bot}
												from="app"
												onUnsubscribe={this.onUnsubscribe}
												createConversation={startConversation}
												active={
													selectedConversation.bot &&
													selectedConversation.bot.botId === bot.botId
												}
											/>
										) : (
											<LeftNavBot
												key={bot.botId}
												bot={bot}
												from="app"
												onUnsubscribe={this.onUnsubscribe}
												createConversation={startConversation}
											/>
										)}
									</div>
								</li>
							))}
							<li style={{ margin: "0px", padding: "8px 0" }}>
								<NavLink
									to="/app/catalog"
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
										src="/img/plus-icon.png"
										alt="plus"
										width={10}
										className="mr-2"
									/>{" "}
									<span>Add apps</span>
								</NavLink>
							</li>
						</ul>
						{/* )} */}
					</CustomizedAccordion>
				</CustomizedAccordion>
			</li>
		);
	}
}

// export default withStyles(styles)(MarketplaceNav);
export default MarketplaceNav;
