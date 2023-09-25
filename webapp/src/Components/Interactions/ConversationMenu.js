import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { makeCall } from "../../State/actions/phone";
import Tooltip from "@mui/material/Tooltip";
import CachedImage from "../Common/CachedImage";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import classNames from "classnames";

class ConversationMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			conversation: this.props.conversation,
			selectedContactStore: this.props.selectedContactStore,
			selectedDomain: this.props.selectedDomain,
		};
	}

	componentDidMount() {
		if (this.props.favourites) {
			let conversationObj = { ...this.props.conversation };
			this.checkForFav(this.props, conversationObj);
		}
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.conversationData &&
			!_.isEqual(this.props.conversationData, prevProps.conversationData)
		) {
			this.setState({
				...this.state,
				conversation: this.props.conversationData,
			});
			this.checkForFav(this.props, this.props.conversationData);
		}
		if (
			this.props.selectedContactStore &&
			!_.isEqual(
				this.props.selectedContactStore,
				prevProps.selectedContactStore
			)
		) {
			this.setState({
				...this.state,
				selectedContactStore: this.props.selectedContactStore,
			});
		}
		if (
			!_.isEqual(this.props.favourites, prevProps.favourites) ||
			!_.isEqual(this.props.conversation, prevProps.conversation)
		) {
			let conversationObj = { ...this.props.conversation };
			this.checkForFav(this.props, conversationObj);
		}
	}

	checkForFav = (newProps, conversationObj) => {
		let getFavIndex = newProps?.favourites?.findIndex((elem) => {
			return elem.conversationId === newProps.conversation.conversationId;
		});
		getFavIndex = getFavIndex == null ? -1 : getFavIndex;

		if (getFavIndex !== -1) {
			conversationObj.favourite = true;
		} else {
			conversationObj.favourite = false;
		}
		this.setState({ ...this.state, conversation: { ...conversationObj } });
	};

	showAddFavBtn = () => {
		let { addConversationToFavourites, selectedDomain } = this.props;
		let { conversation } = this.state;
		return (
			<div id="addToFav" key="addToFav">
				<Tooltip title="Add to favourites">
					<a
						href="#"
						className="btn-xs"
						onClick={(e) => {
							addConversationToFavourites(
								conversation.conversationId,
								this.props.selectedDomain.userDomain
							);
							e.preventDefault();
						}}
					>
						<span className="cicle">
							<StarBorderIcon
								className="circel"
								style={{
									color: "#9C9EA7",
									margin: "3px",
									marginRight: "15px",
									fontSize: "25px",
								}}
							/>
						</span>
					</a>
				</Tooltip>
			</div>
		);
	};

	showRemoveFavBtn = () => {
		let { removeConversationFromFavourites } = this.props;
		let { conversation } = this.state;
		let userDomain = this.state.selectedDomain?.userDomain;
		return (
			<div id="removeFromFav" key="removeFromFav">
				<Tooltip title="Remove from favourites">
					<a
						href="#"
						className="btn-xs"
						onClick={(e) => {
							removeConversationFromFavourites(
								conversation.conversationId,
								userDomain
							);
							e.preventDefault();
						}}
					>
						<span className="cicle">
							<StarIcon
								className="circel"
								style={{
									color: "#638dff",
									margin: "3px",
									marginRight: "15px",
									fontSize: "25px",
								}}
							/>
						</span>
					</a>
				</Tooltip>
			</div>
		);
	};

	render() {
		let { user, selectedDomain } = this.props;
		let { conversation } = this.state;
		if (!conversation) {
			return null;
		}
		let isOnBoardingBot =
			conversation &&
			conversation.bot &&
			conversation.bot.botId === "onboarding-bot"
				? true
				: false;

		if (this.props.acceptIgnoreContact) {
			return null;
		}
		return (
			<div className="d-flex pt-5">
				{/* Fav icon */}
				{/* {conversation && conversation.contact ? (
					<>
						{conversation &&
							conversation.contact &&
							!Object.prototype.hasOwnProperty.call(
								conversation?.contact,
								"showAcceptIgnoreMsg"
							) &&
							!conversation.favourite &&
							!isOnBoardingBot &&
							this.showAddFavBtn()}
						{conversation &&
							conversation.contact &&
							!Object.prototype.hasOwnProperty.call(
								conversation?.contact,
								"showAcceptIgnoreMsg"
							) &&
							conversation.favourite &&
							!isOnBoardingBot &&
							this.showRemoveFavBtn()}
					</>
				) : (
					<>
						{conversation &&
							!conversation.favourite &&
							!isOnBoardingBot &&
							this.showAddFavBtn()}
						{conversation &&
							conversation.favourite &&
							!isOnBoardingBot &&
							this.showRemoveFavBtn()}
					</>
				)} */}
				{conversation &&
					conversation.contact &&
					selectedDomain?.viewModes?.voip &&
					!this.props.acceptIgnoreContact && (
						<div>
							<Tooltip title={`Call ${conversation.contact.userName}`}>
								<a
									className={classNames("btn-xs", {
										disabled: !user.isOnline,
									})}
									onClick={() => {
										console.log(" user to call ", conversation.contact);
									}}
								>
									<CachedImage
										id="callBtn"
										imgKey="makeCallIcon"
									image="/offlinelms/img/call-grey-icon.png"
										width="14px"
										style={{
											width: "30px",
											height: "30px",
											marginRight: "10px",
											marginBottom: 5,
											borderRadius: "50%",
										}}
										onClick={() => {
											this.props.makeCall(
												"voip",
												user.emailAddress,
												conversation.contact.userId,
												conversation.contact.userName,
												conversation.contact.userId,
												null,
												"on-call"
											);
										}}
									/>
								</a>
							</Tooltip>
							<Tooltip title={`Video Call ${conversation.contact.userName}`}>
								<a
									className={classNames("btn-xs", {
										disabled: !user.isOnline,
									})}
									onClick={() => {
										console.log(" user to call ", conversation.contact);
									}}
								>
									<CachedImage
										id="videoCallBtn"
										imgKey="makeVideoCallIcon"
									image="/offlinelms/img/video-outline-icon.png"
										width="14px"
										style={{
											width: "30px",
											height: "30px",
											marginRight: "10px",
											marginBottom: 5,
											borderRadius: "50%",
										}}
										onClick={() => {
											this.props.makeCall(
												"voip",
												user.emailAddress,
												conversation.contact.userId,
												conversation.contact.userName,
												conversation.contact.userId,
												null,
												"on-call",
												true
											);
										}}
									/>
								</a>
							</Tooltip>
						</div>
					)}
			</div>
		);
	}
}

const actions = {
	makeCall: makeCall,
};

const mapDataToProps = (state) => {
	const chats = state.chats;
	return {
		favourites: chats.favourites,
		conversation: chats.selectedConversation,
		selectedDomain: state.selectedDomain,
		acceptIgnoreContact: chats.acceptIgnoreContact,
	};
};

export default connect(mapDataToProps, actions)(ConversationMenu);
