import React, { Component } from "react";
import ContentView from "./ContentView";
import AppHeaderContainer from "./../../Containers/AppHeaderContainer";
import _ from "lodash";
import PaymentServiceClient from "../../Services/Clients/PaymentServiceClient";
import { getStripeAmount } from "../../Utils/Helpers";
import Notify from "../ModalMessages/ToastNotif";
import { BANNER_TYPE_INFO } from "../../Utils/Constants";
import ConfrimCreditModal from "../Payments/ConfrimCreditModal";
import ModalPopup from "../ModalMessages/ModalPopup";
// import StripePayments_New from "../Payments/StripePayments_New";/
import GetCreditModal from "../Payments/GetCreditModal";

class AppContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDomain: null,
			newContactAdded: false,
			contactRemovingStatus: false,
			landingBotId: null,
			getCreditModal: false,
			showNoBalance: false,
			getConfirmCreditModal: false,
			showStripe: false,
			codeAlreadyApplied: false,
			amountToCredit: 0,
			totalAmount: 0,
			topUpAmount: 0,
			taxAmount: 0,
			userVoipStatus: {},
		};
	}

	componentDidMount() {
		if (this.props.selectedDomain) {
			this.setState({ selectedDomain: this.props.selectedDomain });
		}

		if (this.props.userVoipStatus) {
			this.setState({ userVoipStatus: { ...this.props.userVoipStatus } });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log("AppContent", newProps);

		if (!_.isEqual(this.props.selectedDomain, prevState.selectedDomain)) {
			this.setState({ selectedDomain: this.props.selectedDomain });
		}

		if (!_.isEqual(this.props.userVoipStatus, prevState.userVoipStatus)) {
			this.setState({ userVoipStatus: this.props.userVoipStatus });
		}
	}

	openRecharge = () => {
		console.log("open Reacharge");
		this.props.sendMsgForBanner(
			BANNER_TYPE_INFO,
			"Your account have no balance. Please top up your account."
		);

		setTimeout(() => {
			this.setState({ getCreditModal: true });
		}, 1000);
		// this.showGetCreditModal();
	};
	showGetCreditModal = () => {
		this.setState({ showNoBalance: true });
	};
	closeshowNoBalanceModal = () => {
		this.setState({ showNoBalance: false });
	};
	closeGetCreditModal = () => {
		this.setState({ getCreditModal: false });
	};
	closeConfirmCreditModal = (data) => {
		this.setState({ getConfirmCreditModal: false, codeAlreadyApplied: data });
	};
	showStripePayment = () => this.setState({ showStripe: true });
	closeStripePayment = () => this.setState({ showStripe: false });
	handleStripePayment = (amount, topUpAmt, taxAmt) => {
		this.closeGetCreditModal();
		this.closeConfirmCreditModal();
		if (amount <= 0) return;
		this.setState({
			totalAmount: amount,
			topUpAmount: topUpAmt,
			taxAmount: taxAmt,
			showStripe: true,
		});
	};

	addCredit = (credit, allReadyApplied) => {
		// console.log("top-up ", credit);
		this.setState({
			getConfirmCreditModal: true,
			amountToCredit: credit,
			codeAlreadyApplied: allReadyApplied,
		});
	};

	initiatePayment = (paymentMethodId) => {
		// const amountF = parseFloat(this.state.totalAmount);
		const topupAmount = parseFloat(this.state.topUpAmount);
		const taxAmount = parseFloat(this.state.taxAmount);
		const currency = "USD";
		const paymentCode = "100";

		return PaymentServiceClient.initiatePayment({
			paymentMethodId,
			topupAmount: getStripeAmount(topupAmount),
			taxAmount: getStripeAmount(taxAmount),
			currency,
			paymentCode,
		});
	};

	confirmPayment = (paymentIntentId) => {
		// const amountF = parseFloat(this.state.totalAmount);
		const topupAmount = parseFloat(this.state.topUpAmount);
		const taxAmount = parseFloat(this.state.taxAmount);
		const currency = "USD";
		const paymentCode = "100";

		return PaymentServiceClient.confirmPayment({
			paymentIntentId,
			topupAmount: getStripeAmount(topupAmount),
			taxAmount: getStripeAmount(taxAmount),
			currency,
			paymentCode,
		});
	};

	sendPaymentResponseMessage = (response) => {
		if (response === true) {
			this.closeStripePayment();
			Notify({
				type: "success",
				message: "Account topped up successfuly.",
			});
		}
	};

	render() {
		let {
			user,
			userDetails,
			history,
			location,
			newUser,
			tncAccept,
			geoData,
			isAnonymousUser,
			navbar,
			isMFAenabled,
		} = this.props;
		let { hidden } = navbar;
		let { selectedDomain } = this.state;

		return (
			<div>
				<div className="mobile-landscape-hidden">
					<article className="text-landscape">
						<h4>We don't support landscape mode currently</h4>
						<h5>Please rotate your device</h5>
					</article>
				</div>
				<div className="Logged-content">
					{!hidden && (
						<AppHeaderContainer
							userName={user?.userName || user?.name}
							openRecharge={this.openRecharge}
							selectedDomain={
								selectedDomain ||
								localStorage.getItem("selectedDomain.userDomain")
							}
							history={history}
							logout={this.props.logout}
							notification={this.props.notification}
							updateSubscriptionOnServer={this.props.updateSubscriptionOnServer}
							selectedContactStore={this.props.selectedContactStore}
							pathname={location.pathname}
							geoData={geoData}
							location={location}
							newContactAdded={(data) => {
								// console.log("contact added ", data);
								this.setState({
									// newContactAdded: data,
									contactRemovingStatus: false,
								});
							}}
						/>
					)}

					<ContentView
						enable2faAuthModal={userDetails?.enable2faAuthModal}
						isAnonymousUser={isAnonymousUser}
						userId={user?.userId}
						user={user}
						userEamil={user?.emailAddress}
						selectedDomain={selectedDomain}
						selectedContactStore={this.props.selectedContactStore}
						history={history}
						newUser={newUser}
						loginState={this.props.loginState}
						isMFAenabled={isMFAenabled || false}
						tncAccept={tncAccept}
						updateTnC={this.props.updateTnC}
						logout={this.props.logout}
						isLicenseValid={this.props.isLicenseValid}
						refreshCompanies={this.props.fetchCompanies}
						fetchBotSubscriptions={this.props.fetchBotSubscriptions}
						getAllDomains={this.props.getAllDomains}
						navbarToggle={this.props.chats.navigationBar.navbar}
						setSelectedDomain={this.props.setSelectedDomain}
						createConversation={this.props.createConversation}
						showSpinner={this.props.showSpinner}
						hideSpinner={this.props.hideSpinner}
						openRecharge={this.openRecharge}
						userContact={
							user && user.phoneNumbers && user?.phoneNumbers["mobile"]
						}
						mfaBotId={this.props.mfaBotId}
						softwareMfaStatus={this.props.softwareMfaStatus}
						updateSoftwareMfaStatus={this.props.updateSoftwareMfaStatus}
						updateQrCodeUri={this.props.updateQrCodeUri}
						updateSoftwareMfaEnabled={this.props.updateSoftwareMfaEnabled}
						updateBotIdForMFA={this.props.updateBotIdForMFA}
					// newContactAdded={this.state.newContactAdded}
					/>
					{/* <PhoneDevice /> */}
				</div>
				{this.state.showNoBalance &&
					!this.state.userVoipStatus.isPostpaidUser && (
						<ModalPopup onClose={this.closeshowNoBalanceModal} size="sm">
							<div
								className="d-flex justify-content-center align-items-center flex-column"
								style={{ textAlign: "center" }}
							>
								<h5>
									Your account have no balance.
									<br />
									Please top up your account.
								</h5>
								<a
									className="btn-open w-25"
									onClick={() => {
										this.closeshowNoBalanceModal();
										this.setState({ getCreditModal: true });
									}}
								>
									OK
								</a>
							</div>
						</ModalPopup>
					)}

				{this.state.getCreditModal &&
					!this.state.userVoipStatus.isPostpaidUser && (
						<ModalPopup
							onClose={this.closeGetCreditModal}
							size="sm"
							title="Top-up"
						>
							<GetCreditModal
								showSpinner={this.props.showSpinner}
								hideSpinner={this.props.hideSpinner}
								user={this.props.user}
								addCredit={this.addCredit}
								cancel={this.closeGetCreditModal}
								codeAlreadyApplied={this.state.codeAlreadyApplied}
							/>
							{/* <div>
              <p>Reacharge</p>
            </div> */}
						</ModalPopup>
					)}

				{/*{this.state.showStripe ? (*/}
				{/*	<ModalPopup*/}
				{/*		onClose={this.closeStripePayment}*/}
				{/*		size="sm"*/}
				{/*		title="Payment"*/}
				{/*	>*/}
				{/*		<StripePayments_New*/}
				{/*			user={this.props.user}*/}
				{/*			startPayment={this.initiatePayment}*/}
				{/*			confirmPayment={this.confirmPayment}*/}
				{/*			sendPaymentResponseMessage={this.sendPaymentResponseMessage}*/}
				{/*		/>*/}
				{/*	</ModalPopup>*/}
				{/*) : null}*/}
				{this.state.getConfirmCreditModal && (
					<ModalPopup noHeader="true">
						<ConfrimCreditModal
							amountToCredit={this.state.amountToCredit}
							onClose={this.closeConfirmCreditModal}
							handleStripe={this.handleStripePayment}
							codeAlreadyApplied={this.state.codeAlreadyApplied}
						/>
					</ModalPopup>
				)}
			</div>
		);
	}
}

export default AppContent;
