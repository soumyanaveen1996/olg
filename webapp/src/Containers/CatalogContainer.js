import React, { Component } from "react";
import { connect } from "react-redux";
import CatalogView from "../Components/Catalog/CatalogView";
import {
	fetchBots,
	fetchCategories,
	fetchCompanies,
} from "../State/actions/catalogue";
import { createConversation } from "../State/actions/chats";
import { getAllDomains } from "../State/actions/user";

class CatalogContainer extends Component {
	componentDidMount() {
		window.document.title = "Applications";
	}

	render() {
		return <CatalogView {...this.props} />;
	}
}

const mapActionToProps = {
	fetchBots: fetchBots,
	fetchCompanies: fetchCompanies,
	fetchCategories: fetchCategories,
	getAllDomains,
	createConversation: createConversation,
};

const mapDataToProps = (state) => {
	// console.log("CatalogContainer", state);

	let user = state.user,
		catalogue = state.catalogue;
	return {
		userId: user.user.userId,
		botSubscriptions: user.botSubscriptions,
		bots: catalogue.bots,
		companies: catalogue.companies,
		categories: catalogue.categories,
		searchResults: catalogue.searchResults,
		searchKey: catalogue.searchKey,
		selectedDomain: state.selectedDomain,
	};
};

export default connect(mapDataToProps, mapActionToProps)(CatalogContainer);
