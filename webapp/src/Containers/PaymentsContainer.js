import React, { Component } from "react";
import { connect } from "react-redux";
import StripePayments from "../Components/Payments/StripePayments";
import PaymentServiceClient from "./../Services/Clients/PaymentServiceClient";
import { getStripeAmount } from "../Utils/Helpers";

class PaymentsContainer extends Component {
	startPayment = (paymentMethodId) => {
		let {
			amount,
			currency,
			paymentCode = "100",
			taxAmount = "0",
		} = this.props.options;

		const topupAmount = parseFloat(amount);
		taxAmount = parseFloat(taxAmount);
		return PaymentServiceClient.initiatePayment({
			paymentMethodId,
			topupAmount: getStripeAmount(topupAmount),
			taxAmount: getStripeAmount(taxAmount),
			currency,
			paymentCode,
		});
	};

	confirmPayment = (paymentIntentId) => {
		let {
			amount,
			currency,
			paymentCode = "100",
			taxAmount = "0",
		} = this.props.options;
		const topupAmount = parseFloat(amount);
		taxAmount = parseFloat(taxAmount);
		return PaymentServiceClient.confirmPayment({
			paymentIntentId,
			topupAmount: getStripeAmount(topupAmount),
			taxAmount: getStripeAmount(taxAmount),
			currency,
			paymentCode,
		});
	};

	render() {
		return (
			<StripePayments
				{...this.props}
				startPayment={this.startPayment}
				confirmPayment={this.confirmPayment}
				sendPaymentResponseMessage={this.props.sendPaymentResponseMessage}
			/>
		);
	}
}

const mapActionToProps = {};

const mapDataToProps = (state, props) => {
	return {
		user: state.user.user,
	};
};

export default connect(mapDataToProps, mapActionToProps)(PaymentsContainer);
