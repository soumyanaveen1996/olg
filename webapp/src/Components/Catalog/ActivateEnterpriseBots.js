import React, { Component } from "react";
import { activateEnterpriseBots } from "../../Services/BotsService";
import Toast from "../ModalMessages/Toast";
import { BANNER_TYPE_INFO, FRONTM_DOMAIN } from "../../Utils/Constants";
import { addAppNotification } from "../../State/actions/appNotifications";
import store from "../../State/configureStore";

import { setSelectedDomain } from "../../State/actions/user";
import { storeDomainSelected } from "../../Services/StorageService";
import { FRONTM_BOT_ID } from "../../Utils/Constants";
import { connect } from "react-redux";
import { changeConversation } from "../../State/actions/chats";
import { showSpinner, hideSpinner } from "../../State/actions/spinner";
import { updateLastLoggedInDomain } from "../../Services/UserService";
import { loadAllDomainsListInLFStorage } from "../../Services/LFStorage";

class ActivateEnterpriseBots extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLicenseValid: this.props.isLicenseValid || true,
		};
	}

	selectDomain = (data) => {
		this.props.showSpinner();
		updateLastLoggedInDomain(data.userDomain)
			.then(() => {
				let { timeLine } = this.props;
				if (timeLine && timeLine.length === 0) {
					this.props.getFrontMAssistant(timeLine);
				} else {
					let index = timeLine.findIndex((conversation) => {
						return conversation.bot && FRONTM_BOT_ID === conversation.bot.botId;
					});
					this.props.changeConversation(timeLine[index], true);
				}
				this.props.getAllDomains();
				this.props.history.push("/app/home");
				this.props.hideSpinner();
			})
			.catch((err) => {
				console.log(err);
				this.props.hideSpinner();
			});
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.showSpinner();
		this.setState({ error: false });

		let code = this.state.code;
		if (!code || !code.length) {
			this.setState({ error: "Please enter code" });
			return;
		}
		activateEnterpriseBots(code, this.props.userId)
			.then((response) => {
				if (response.errorMessage) {
					this.setState({ error: response.errorMessage });
					this.props.hideSpinner();
				} else if (response.content && response.content[0] == null) {
					this.setState({ error: "Incorrect code. Try again" });
					this.props.hideSpinner();
				} else {
					const content = response.content;
					const newDomainName =
						content && content[content.length - 1]
							? content[content.length - 1].name
							: "";
					Toast({
						type: "success",
						message: `You are now signed in to ${newDomainName}.`,
					});
					store.dispatch(
						addAppNotification(
							`You are now signed in to ${newDomainName}.`,
							BANNER_TYPE_INFO
						)
					);
					let contentLength = response.content.length;
					let newAddedDomain = response.content[contentLength - 1];
					setTimeout(() => {
						const domains = response.content;
						let corporateDomainList = domains.filter((domain) => {
							return domain.userDomain !== FRONTM_DOMAIN;
						});
						loadAllDomainsListInLFStorage(corporateDomainList);
						this.props.setSelectedDomain(newAddedDomain);
						storeDomainSelected(newAddedDomain);
						this.selectDomain(newAddedDomain);
						this.props.hideSpinner();
					}, 3000);
					this.props.onFormSubmit();
				}
			})
			.catch((error) => {
				console.log("cating the error activateEnterpriseBots", error);
				if (error.message || error.errorMessage) {
					this.setState({ error: error.message || error.errorMessage });
				} else {
					this.setState({
						error: "Sorry something went wrong. Please contact to our support",
					});
				}
				this.props.hideSpinner();
			});
	};

	render() {
		let { error } = this.state;
		return (
			<div className="page-wrapper d-flex flex align-items-center">
				<div className="container">
					<div className="row align-self-center">
						<div className="mb-3">
							Please enter your business license key.
							{/*Please write an alphanumeric code.*/}
							{/*, or scan if it is a QR code.*/}
						</div>
						<div className="col-lg-12 col-md-12 col-12">
							<div className="m-2">
								<form onSubmit={this.onSubmit}>
									<div className="form-group" style={{ marginBottom: "2rem" }}>
										<input
											id="username"
											placeholder="License Key"
											type="text"
											className="form-control form-control-lg"
											onChange={(e) => {
												this.setState({ code: e.target.value });
											}}
											value={this.state.code}
											autoComplete="off"
										/>
										{error && (
											<div className="d-flex justify-content-end mt-1">
												<span
													style={{
														backgroundColor: "#E5453B",
														color: "#fff",
														padding: "2px 5px",
														borderRadius: "0 5px 5px 5px",
														lineHeight: 1,
													}}
												>
													<small>{error}</small>
												</span>
											</div>
										)}
									</div>

									<hr />

									<div className="mt-4 d-flex justify-content-center">
										{this.props.isLicenseValid && (
											<a
												onClick={this.props.cancel}
												className="btn btn-sm btn-outline-info btn-install"
											>
												Cancel
											</a>
										)}
										<button type="submit" className="btn btn-sm btn-open ml-2">
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapActionsToProps = {
	setSelectedDomain: setSelectedDomain,
	changeConversation: changeConversation,
	showSpinner,
	hideSpinner,
};

const mapDataToProps = (state) => {
	return {
		timeLine: state.chats.timeLine,
	};
};

export default connect(
	mapDataToProps,
	mapActionsToProps
)(ActivateEnterpriseBots);
