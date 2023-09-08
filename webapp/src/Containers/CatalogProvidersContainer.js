import React, { PureComponent } from "react";
import CatalogProvidersView from "../Components/Catalog/Providers/CatalogProvidersView";
import ProviderAllBotsView from "../Components/Catalog/Providers/ProviderAllBotsView";
import {
	fetchBotSubscriptions,
	logout,
	getAllDomains,
} from "../State/actions/user";
import { connect } from "react-redux";

class CatalogProvidersContainer extends PureComponent {
	componentDidMount() {
		this.props.fetchCompanies();
	}

	render() {
		const { companies, provider, selectedDomain } = this.props;
		// console.log("CatalogProvidersContainer", this.props);

		if (provider) {
			return (
				<ProviderAllBotsView
					provider={provider}
					bots={companies ? companies[provider] : []}
					history={this.props.history}
					selectedDomain={selectedDomain}
					providers={companies}
					getAllDomains={this.props.getAllDomains}
					userId={this.props.userId}
					refreshCompanies={this.props.fetchCompanies}
					fetchBotSubscriptions={this.props.fetchBotSubscriptions}
				/>
			);
		} else {
			return (
				<CatalogProvidersView
					history={this.props.history}
					selectedDomain={selectedDomain}
					providers={companies}
					getAllDomains={this.props.getAllDomains}
					userId={this.props.userId}
					refreshCompanies={this.props.fetchCompanies}
					fetchBotSubscriptions={this.props.fetchBotSubscriptions}
				/>
			);
		}
	}
}

const mapActionsToProps = {
	fetchBotSubscriptions: fetchBotSubscriptions,
	getAllDomains,
};

const mapDataToProps = (state) => {
	return {
		selectedDomain: state.selectedDomain,
	};
};
export default connect(
	mapDataToProps,
	mapActionsToProps
)(CatalogProvidersContainer);
