/* eslint-disable react/no-deprecated */
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import ConversationsSearch from "./ConversationsSearch";
import Conversation from "./Conversation";
import FeaturedCatalogContainer from "./../../Containers/FeaturedCatalogContainer";
import MenuArrow from "../Common/MenuArrow";
import _ from "lodash";

class ConversationList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: null,
			createConv: false,
			timeLine: this.props.timeLine,
			conversations: this.props.timeLine,
		};
	}

	componentDidMount() {
		this.searchConversations(this.state.searchText, this.props.timeLine);
	}

	componentDidUpdate(prevProps) {
		// this.setState({
		//   timeLine: newProps.timeLine,
		//   conversations: newProps.timeLine
		// });
		if (!_.isEqual(this.props, prevProps)) {
			this.searchConversations(this.state.searchText, this.props.timeLine);
		}
	}

	doSearch = (searchText) => {
		this.searchConversations(searchText, this.state.timeLine);
	};

	searchConversations = (searchText, timeLine) => {
		if (!searchText || !searchText.length) {
			this.setState({
				timeLine: timeLine,
				conversations: timeLine,
				searchText: null,
			});
			return;
		}
		let conversations = timeLine.filter(function (item) {
			let field1 = null,
				field2 = null;
			if (item.contact) {
				field1 = item.contact.userName;
				field2 = item.contact.emailAddress;
			} else if (item.channel) {
				field1 = item.channel.channelName;
				field2 = item.channel.description;
			} else {
				field1 = item.bot.botName;
				field2 = item.bot.description;
			}
			return (
				(field1 &&
					field1.toLowerCase().search(searchText.toLowerCase()) !== -1) ||
				(field2 && field2.toLowerCase().search(searchText.toLowerCase()) !== -1)
			);
		});
		this.setState({
			timeLine: timeLine,
			conversations: conversations,
			searchText,
		});
	};

	render() {
		let { selectedConversation, style } = this.props;
		let {
			conversations = [],
			searchText,
			closeFav,
			closeFeatured,
		} = this.state;
		// if (!conversations) {
		//     return null
		// }

		let favourites = conversations.filter((conversation) => {
			return conversation.favourite;
		});
		if (!searchText) {
			conversations = conversations.filter((conversation) => {
				return !conversation.favourite;
			});
		}

		if (searchText) {
			closeFeatured = true;
		}

		return (
			<div
				className="Interactions-sidebar sidebar-sm bg-white timeLine chat-left"
				id="sidebar-collapse"
				style={style}
			>
				<div className="d-flex align-items-center justify-content-around mb-2">
					<ConversationsSearch search={this.doSearch} />
				</div>
				<Scrollbars
					autohide="true"
					style={{
						height: closeFeatured
							? "calc(100vh - 60px - 60px  - 53px)"
							: "calc(100vh - 60px - 60px - 130px - 53px)",
					}}
				>
					<div className="Interactions-messages">
						{conversations.length === 0 && favourites.length === 0 && (
							<div className="p-3 text-center">
								No conversations have been found.
							</div>
						)}

						{favourites && favourites.length > 0 && (
							<div className="">
								{!searchText && (
									<div className="list conversation-list">
										<div
											className="d-flex justify-content-between align-items-center"
											style={{ borderBottom: "1px solid #e8e9ee" }}
										>
											<span
												className="d-block pt-3 pl-3 pb-2 title"
												style={{
													fontSize: "16px",
													color: "#4A4A4A",
												}}
											>
												Favourites
											</span>
											<div className="mx-3">
												<MenuArrow
													onOpen={() => {
														this.setState({ closeFav: false });
													}}
													onClose={() => {
														this.setState({ closeFav: true });
													}}
													open={!closeFav}
													color="#4A4A4A"
												/>
											</div>
										</div>

										<div>
											{!closeFav &&
												this.renderConversations(
													favourites,
													selectedConversation
												)}
										</div>
									</div>
								)}
							</div>
						)}

						{conversations && conversations.length > 0 && (
							<div className="">
								<div className="list conversation-list">
									{!searchText && (
										<span
											className="d-block pt-3 pl-3 pb-2 title"
											style={{
												fontSize: "16px",
												color: "#4A4A4A",
												borderBottom: "1px solid #e8e9ee",
											}}
										>
											Recent
										</span>
									)}
									<div className="recent-intro">
										{this.renderConversations(
											conversations,
											selectedConversation
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</Scrollbars>
				<div className="">
					{!searchText && (
						<div
							className="d-flex justify-content-between align-items-center"
							style={{ borderBottom: "1px solid #e8e9ee" }}
						>
							<span
								className="d-block pt-3 pl-3 pb-2 title"
								style={{
									fontSize: "16px",
									color: "#4A4A4A",
								}}
							>
								Featured Applications
							</span>
							<div className="mx-3">
								<MenuArrow
									onOpen={() => {
										this.setState({ closeFeatured: false });
									}}
									onClose={() => {
										this.setState({ closeFeatured: true });
									}}
									open={!closeFeatured}
									color="#4A4A4A"
								/>
							</div>
						</div>
					)}
					{!searchText && (
						<div style={{ padding: "0rem 0.5rem" }}>
							{!closeFeatured && <FeaturedCatalogContainer slide />}
						</div>
					)}
				</div>
			</div>
		);
	}

	renderConversations = (conversations, selectedConversation, favourite) => {
		return conversations.map((conversation) => (
			<Conversation
				key={conversation.conversationId}
				conversation={conversation}
				selected={
					selectedConversation &&
					conversation.conversationId === selectedConversation.conversationId
				}
				changeConversation={this.props.changeConversation}
			/>
		));
	};
}

ConversationList.propTypes = {};
export default ConversationList;
