/* eslint-disable react/no-deprecated */
import React, { Component } from "react";
import history from "./../Services/History";
import CatalogBotsView from "../Components/Catalog/CatalogBotsView";
import { connect } from "react-redux";
import { createConversation } from "../State/actions/chats";
import { subscribeToBot } from "../State/actions/catalogue";
import CatalogBotsSliderView from "../Components/Catalog/CatalogBotsSliderView";
import BotModal from "../Components/Catalog/BotModal";
import _ from "lodash";

class CatalogBotsContainer extends Component {
	state = {
		catalog: [],
	};

	componentDidMount() {
		const { botSubscriptions = [], bots } = this.props;
		this.mergeWithSubscriptions(botSubscriptions, bots);
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props, prevProps)) {
			const { botSubscriptions = [], bots } = this.props;
			this.mergeWithSubscriptions(botSubscriptions, bots);
		}
	}

	mergeWithSubscriptions = (botSubscriptions, bots) => {
		const botSubscriptionIds = botSubscriptions.map((subsBot) => subsBot.botId);
		const updatedBots = bots.map((bot) => {
			let updatedBot;
			if (botSubscriptionIds.includes(bot.botId)) {
				updatedBot = Object.assign({}, bot);
				updatedBot.subscribed = true;
			} else {
				updatedBot = Object.assign({}, bot);
				updatedBot.subscribed = false;
			}

			return updatedBot;
		});
		this.setState({ catalog: updatedBots });
	};

	createConversation = (bot) => {
		const { userId, createConversation } = this.props;
		createConversation(bot, userId);

		history.push("/offlinelms/app/chats");
	};

	openBot = (bot) => {
		this.setState({ botToView: bot });
	};

	closeBot = () => {
		this.setState({ botToView: null });
	};

	render() {
		let { slide } = this.props;
		let BotComponent = slide ? CatalogBotsSliderView : CatalogBotsView;

		return (
			<React.Fragment>
				<BotComponent
					bots={this.state.catalog}
					botHolderStyle={this.props.botHolderStyle}
					subscribeToBot={this.props.subscribeToBot}
					createConversation={this.createConversation}
					openBot={this.openBot}
				/>
				{this.state.botToView && (
					<BotModal
						bot={this.state.botToView}
						close={this.closeBot}
						subscribeToBot={this.props.subscribeToBot}
						createConversation={this.createConversation}
					/>
				)}
			</React.Fragment>
		);
	}
}

const mapActionToProps = {
	createConversation: createConversation,
	subscribeToBot: subscribeToBot,
};

const mapDataToProps = (state, props) => {
	let user = state.user;
	return {
		userId: user.user.userId,
		botSubscriptions: user.botSubscriptions,
	};
};

export default connect(mapDataToProps, mapActionToProps)(CatalogBotsContainer);
