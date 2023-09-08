import { payment } from "../gRPC/Generated/PaymentService";
import RPC from "./RPC";

class PaymentServiceClient {
	static initiatePayment(reqInfo) {
		console.log("initiate payment ", reqInfo);

		return RPC.rpcCall(
			"/payment.PaymentService/InitiatePayment",
			reqInfo,
			payment.InitiatePaymentResponse,
			(request) => {
				return payment.InitiatePaymentInput.encode(request).finish();
			},
			payment.InitiatePaymentResponse.decode,
			{},
			true
		);
	}

	static confirmPayment(reqInfo) {
		console.log("confrim payment", reqInfo);

		return RPC.rpcCall(
			"/payment.PaymentService/ConfirmPayment",
			reqInfo,
			payment.ConfirmPaymentResponse,
			(request) => {
				return payment.ConfirmPaymentInput.encode(request).finish();
			},
			payment.ConfirmPaymentResponse.decode,
			{},
			true
		);
	}
}

export default PaymentServiceClient;
