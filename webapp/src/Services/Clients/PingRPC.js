import * as gRPCWeb from "grpc-web";
const grpcClient = new gRPCWeb.GrpcWebClientBase({});

//let RPC_SERVER = "https://grpcdev.frontm.ai:8080";
let RPC_SERVER = "https://grpcdev.frontm.ai:8080";

export default class RPC {
	static rpcCall(
		url,
		request,
		responseType,
		requestSerializeFn,
		responseDeserializeFn,
		options = {},
		noSpinner
	) {
		let auth = null;
		return new Promise((resolve, reject) => {
			let deadline = new Date();
			deadline.setSeconds(deadline.getSeconds() + 15);
			grpcClient.rpcCall(
				url,
				request,
				Object.assign(options, {
					sessionId: auth ? auth.sessionId : null,
					deadline: deadline.getTime(),
				}),
				new gRPCWeb.AbstractClientBase.MethodInfo(
					responseType,
					requestSerializeFn,
					responseDeserializeFn
				),
				(error, response) => {
					if (error) {
						console.log("GRPC Error: ", error);

						reject(error);
						return;
					}

					resolve(response);
				}
			);
		});
	}

	static serverStreaming(
		url,
		request,
		options,
		responseType,
		requestSerializeFn,
		responseDeserializeFn,
		successCb,
		errorCb
	) {
		let auth = null;

		let deadline = new Date();
		deadline.setSeconds(deadline.getSeconds() + 1800);
		let call = grpcClient.serverStreaming(
			RPC_SERVER + url,
			request,
			Object.assign(options, {
				sessionId: auth ? auth.sessionId : null,
				deadline: deadline.getTime(),
			}),
			new gRPCWeb.AbstractClientBase.MethodInfo(
				responseType,
				requestSerializeFn,
				responseDeserializeFn
			)
		);

		call.on("data", successCb);
		call.on("error", errorCb);

		call.on("status", (status) => {
			console.log("GRPC status: ", status);
			if (status.code !== 0 && status.code !== 16 && status.code !== 14) {
				console.log("Sttream Is Closed RESET!!!");
				window.dispatchEvent(new Event("stream_closed"));
			}
		});
		call.on("end", (data) => {
			console.log("GRPC  end: ", data);
			window.dispatchEvent(new Event("stream_closed"));
		});
		return call;
	}
}
