export class Stripe {
	static startPayment(
		transactionId,
		amount,
		currency,
		description,
		botContext,
		paymentCode
	) {
		let Message = botContext.getCapability("Message");
		let message = new Message({ addedByBot: true });
		message.stripeMessage([], {
			transactionId,
			amount,
			currency,
			description,
			paymentCode,
		});
		botContext.tell(message);
	}
}
