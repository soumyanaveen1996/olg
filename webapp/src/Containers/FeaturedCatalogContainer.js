import React, { Component } from "react";
import { connect } from "react-redux";
import CatalogBotsContainer from "./CatalogBotsContainer";
import { fetchBots } from "../State/actions/catalogue";

class FeaturedCatalogContainer extends Component {
	componentDidMount() {
		this.getFeaturedBots();
	}

	getFeaturedBots = (type) => {
		let query = { featured: true };
		this.props.fetchBots(query, true);
	};

	render() {
		let { bots = [], slide } = this.props;

		return (
			<div className="container-fluid">
				<div className="row">
					<CatalogBotsContainer bots={bots} slide={slide} />
				</div>
			</div>
		);
	}
}

const mapActionToProps = {
	fetchBots: fetchBots,
};

const mapDataToProps = (state, props) => {
	let catalogue = state.catalogue;
	return {
		bots: catalogue.bots,
	};
};

export default connect(
	mapDataToProps,
	mapActionToProps
)(FeaturedCatalogContainer);
