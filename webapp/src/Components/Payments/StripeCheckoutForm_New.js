import React, { useState } from "react";
import {
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import Spinner from "react-spinkit";
import Toast from "../ModalMessages/Toast";

const createOptions = (fontSize = "12px", padding) => {
	return {
		style: {
			base: {
				fontSize,
				color: "#424770",
				letterSpacing: "0.025em",
				"::placeholder": {
					color: "#aab7c4",
				},
				padding,
			},
			invalid: {
				color: "#9e2146",
			},
		},
	};
};

const StripeCheckoutFormNew = ({
	user,
	startPayment,
	confirmPayment,
	sendPaymentResponseMessage,
	fontSize,
}) => {
	const [loading, setLoading] = useState();
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		let errorInPayment = false;

		const cardNumberElement = elements.getElement(CardNumberElement);

		stripe
			.createPaymentMethod({
				type: "card",
				card: cardNumberElement,
				billing_details: { name: user.userName },
			})
			.then((result) => {
				if (result.error) {
					errorInPayment = result.error.message;
					throw new Error(result.error.message);
				}
				return startPayment(result.paymentMethod.id);
			})
			.then((response) => {
				let { success, errorMessage, actionRequired, clientSecret } = response;
				if (success) {
					// this.props.sendPaymentResponseMessage(true);
					return { success: true };
				}

				if (actionRequired) {
					return stripe.handleCardAction(clientSecret);
				}

				if (errorMessage) {
					errorInPayment = errorMessage;
					throw new Error(errorMessage);
				}
			})
			.then((response) => {
				if (response.success) {
					return response;
				}
				if (response.error) {
					errorInPayment = response.error.message;
					throw new Error(response.error.message);
				}
				return confirmPayment(response.paymentIntent.id);
			})
			.then((response) => {
				let { success, errorMessage } = response;
				if (success) {
					sendPaymentResponseMessage(true);
					setLoading(false);
					return;
				}

				if (errorMessage) {
					errorInPayment = errorMessage;
					throw new Error(errorMessage);
				}
			})
			.catch((error) => {
				console.log("error in payment ", error);
				setLoading(false);
				if (errorInPayment) {
					Toast({
						type: "error",
						message: errorInPayment,
					});
				}
			});
	};

	return (
		<div className="checkout" id="stripe-checkout">
			<form onSubmit={handleSubmit}>
				<div className="d-flex flex-column">
					<div>
						Card number
						<CardNumberElement {...createOptions(fontSize)} />
					</div>
					<div>
						Expiration date
						<CardExpiryElement {...createOptions(fontSize)} />
					</div>
					<div>
						CVC
						<CardCvcElement {...createOptions(fontSize)} />
					</div>
					<div>
						{!loading && (
							<button type="submit" className="btn btn-open">
								Pay
							</button>
						)}
						{loading && <Spinner name="circle" color="steelblue" />}
					</div>
				</div>
			</form>
		</div>
	);
};

export default StripeCheckoutFormNew;
