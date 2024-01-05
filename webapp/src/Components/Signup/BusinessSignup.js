import React, { Component } from "react";
import { Spinner } from "../Spinner";
import BusinessRegistration from "./../Company/BusinessRegistration";
import Constants from "../../Utils/Constants";
import { registerBusiness } from "../../Services/UserService";
import Toast from "../ModalMessages/Toast";
import history from "../../Services/History";

class BusinessSignup extends Component {
	state = {};

	registerBusiness = (data) => {
		const { companyCountry: country, companyId } = data;
		const roles = [Constants.ADMINISTRATOR];
		const companyDomains = [
			{ domain: `${companyId}_${country}_DEV`, roles },
			{ domain: `${companyId}_${country}_TEST`, roles },
			{ domain: `${companyId}_${country}_PROD`, roles },
		];
		data.action = "CREATE_COMPANY";
		data.domains = companyDomains;
		this.setState({ loading: true });
		registerBusiness(data)
			.then(() => {
				this.setState({ loading: false });
				history.push("/offlinelms/app/chats");
				Toast({
					type: "success",
					message:
						"Thanks for registering your business. You can manage your business account using the business management bot.",
				});
			})
			.catch((error) => {
				console.error("register business error ::", error);
				this.setState({
					loading: false,
					error: "Error Occurred!",
				});
			});
	};

	render() {
		let { loading, error } = this.state;
		return (
			<div className="flex d-flex flex-column">
				<BusinessRegistration submit={this.registerBusiness} error={error} />
				{loading && <Spinner />}
			</div>
		);
	}
}

export default BusinessSignup;
