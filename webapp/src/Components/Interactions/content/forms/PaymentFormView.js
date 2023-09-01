import React, { PureComponent } from "react";
import PaymentsContainer from "../../../../Containers/PaymentsContainer";
import { sendAMessage } from "../../../../State/actions/chats";
import { connect } from "react-redux";
import { MessageTypeConstants } from "../../../../Services/Message";

class PaymentFormView extends PureComponent {
	continuePayment = (token) => {
		const { chat, sendMessage } = this.props;
		let { options, messageId } = chat;
		let { amount, currency, description } = options;
		let responseChat = { ...chat };
		responseChat.message = { token: token, amount, currency, description };
		responseChat.options = options || {};
		responseChat.options.stage = "COMPLETED";
		responseChat.messageId = messageId;
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_STRIPE_RESPONSE;
		sendMessage(responseChat);
		if (this.props.cancel) {
			this.props.cancel();
		}
	};

	sendPaymentResponseMessage = (success) => {
		const { chat, sendMessage } = this.props;
		let { options, messageId } = chat;
		let { amount, currency, transactionId } = options;
		let responseChat = { ...chat };
		responseChat.message = {
			paymentSuccessful: success,
			transactionId,
			amount,
			currency,
		};
		responseChat.options = options || {};
		responseChat.options.stage = "COMPLETED";
		responseChat.messageId = messageId;
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_STRIPE_RESPONSE;
		sendMessage(responseChat);
		if (this.props.cancel) {
			this.props.cancel();
		}
	};

	render() {
		let { chat } = this.props;
		let { message, options } = chat;
		console.log("payment method ", options);

		return (
			<PaymentsContainer
				options={options}
				continuePayment={this.continuePayment}
				sendPaymentResponseMessage={this.sendPaymentResponseMessage}
			/>
		);
	}
}

let actions = {
	sendMessage: sendAMessage,
};

export default connect(null, actions)(PaymentFormView);
