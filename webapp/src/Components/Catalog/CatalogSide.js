import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import CatalogBotsView from "./CatalogBotsView";
import history from "../../Services/History";
import BotModal from "./BotModal";
import { connect } from "react-redux";
import { subscribeToBot } from "../../State/actions/catalogue";

class CatalogSide extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	createConversation = (bot) => {
		// console.log("let see the bot name", bot);
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
		const { botSubscriptions, selectedDomain } = this.props;
		// console.log("CatalogSide", this.props);
		let botList;

		botList = botSubscriptions.filter(
			(elem) => !elem.systemBot && !elem.botClients.web == false
		);
		return (
			<div
				className="Catalog-sidebar sidebar-sm p-2 catalog-right"
				id="sidebar-collapse"
			>
				<h4 className="d-block mb-4 px-2" style={{ color: "#4A4A4A" }}>
					Installed apps
				</h4>
				<Scrollbars autoHide style={{ height: "calc(100vh - 100px - 60px)" }}>
					<div className="Catalog-messages px-3">
						<CatalogBotsView
							bots={botList.map((bs) => {
								bs.subscribed = true;
								return bs;
							})}
							subscribeToBot={this.props.subscribeToBot}
							botHolderStyle={{
								marginBottom: "10px",
								borderRadius: "10px",
								boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 6px ",
							}}
							createConversation={this.createConversation}
							openBot={this.openBot}
						/>
					</div>
				</Scrollbars>
				{this.state.botToView && (
					<BotModal
						bot={this.state.botToView}
						close={this.closeBot}
						selectedDomain={selectedDomain}
						subscribeToBot={this.props.subscribeToBot}
						createConversation={this.createConversation}
					/>
				)}
			</div>
		);
	}
}
const mapActionToProps = {
	subscribeToBot: subscribeToBot,
};

export default connect(null, mapActionToProps)(CatalogSide);
