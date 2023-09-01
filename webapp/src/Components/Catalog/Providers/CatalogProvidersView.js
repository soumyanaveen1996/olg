import React, { PureComponent } from "react";
import ProviderView from "./ProviderView";
import ModalPopup from "../../ModalMessages/ModalPopup";
import ActivateEnterpriseBots from "../ActivateEnterpriseBots";

class CatalogProvidersView extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	showNewProvideDialog = () => {
		this.setState({ newProvider: true });
	};

	hideNewProvideDialog = () => {
		this.setState({ newProvider: false });
	};

	render() {
		// console.log("in catelog ", this.state);

		const { providers, selectedDomain } = this.props;
		if (!providers) {
			return null;
		}
		let keys = Object.keys(providers);
		return (
			<div className="container-fluid">
				<div className="d-flex justify-content-center my-2 pb-3">
					<a
						className="btn btn-sm btn-open"
						onClick={this.showNewProvideDialog}
					>
						<i className="icon-plus" /> Sign up to a new Provider
					</a>
				</div>
				<div className="row">
					{keys.map((provider, index) => (
						<div key={index} className="d-flex flex-column mb-3">
							<ProviderView provider={provider} bots={providers[provider]} />
						</div>
					))}
				</div>

				{this.state.newProvider && (
					<ModalPopup onClose={this.hideNewProvideDialog} size="sm" noHeader>
						<div className="p-2">
							<h5> Sign up to a new Provider</h5>
							<ActivateEnterpriseBots
								isLicenseValid={true}
								userId={this.props.userId}
								getAllDomains={this.props.getAllDomains}
								onFormSubmit={() => {
									this.props.refreshCompanies();
									this.props.fetchBotSubscriptions({ ...selectedDomain });
									this.hideNewProvideDialog();
								}}
								cancel={this.hideNewProvideDialog}
								history={this.props.history}
							/>
						</div>
					</ModalPopup>
				)}
			</div>
		);
	}
}

export default CatalogProvidersView;
