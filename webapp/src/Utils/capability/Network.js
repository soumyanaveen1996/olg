import SHA1 from "sha1";
import _ from "lodash";
import AgentGuardServiceClient from "../../Services/Clients/AgentGuardServiceClient";
import UserServiceClient from "../../Services/Clients/UserServiceClient";
import { isUserOnline } from "../../Services/StorageService";

// const { AgentGuardServiceClient, UserServiceClient } = NativeModules;

const R = require("ramda");

export class NetworkError extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.message = message;
	}

	get code() {
		return this.code;
	}

	get message() {
		return this.message;
	}

	get description() {
		return `${this.code} : ${this.message}`;
	}
}

export class NetworkRequest {
	constructor(options) {
		this.options = options;
	}

	getNetworkRequestOptions() {
		return this.options;
	}

	isNetworkRequest() {
		return true;
	}
}

const getGrpcService = (name) => {
	switch (name) {
		case "AgentGuardServiceClient":
			return AgentGuardServiceClient;
		case "UserServiceClient":
			return UserServiceClient;

		default:
			return null;
	}
};

const convertResponse = (response) => {
	if (!response) {
		return {
			error: 0,
			data: {
				error: 0,
				content: [],
			},
		};
	}
	const content = R.pathOr([], ["content"], response);
	// const objContent = content.map((str) => JSON.parse(str));
	const objContent = content;

	return {
		error: response.error,
		data: {
			error: response.error,
			content: objContent,
		},
	};
};

// const queueMessage = ({ options, resolve, reject }) => {
// 	NetworkHandler.readLambda(true);
// 	const { params, key = null } = options;
// 	const deferredKey = key ? key : SHA1(JSON.stringify(params)).toString();
// 	return resolve(futureRequest(deferredKey, new NetworkRequest(options)));
// };

function Network(options, queue = false) {
	return new Promise((resolve, reject) => {
		Network.isConnected()
			.then((connected) => {
				// connected = false;
				const { serviceName, action, sessionId, params, key = null } = options;
				if (connected) {
					const grpcService = getGrpcService(serviceName);
					let data = {};
					data = _.cloneDeep(params);
					let objParams = data.parameters ? JSON.parse(data.parameters) : {};
					objParams["isWebRequest"] = true;
					data["parameters"] = JSON.stringify(objParams);

					grpcService[action](data)
						.then((response) => {
							let responseDATA = convertResponse(response);
							resolve(responseDATA);
						})
						.catch((err) => {
							console.error("grpcService error in network capability", err);
							reject(err);
						});
				} else {
					console.error("network error");
					reject("No network connectivity");
				}
			})
			.catch((err) => {
				console.error("no network ", err);
				reject(err);
			});
	});
}

Network.getNetworkInfo = () => {
	if (navigator) {
		return navigator.connection;
	}
};

Network.isWiFi = () =>
	new Promise((resolve, reject) => {
		resolve(true);
	});

Network.isCellular = () =>
	new Promise((resolve, reject) => {
		resolve(true);
	});

Network.addConnectionChangeEventListener = (handleConnectionChange) => { };

Network.removeConnectionChangeEventListener = (handleConnectionChange) => { };

Network.isConnected = function () {
	return new Promise((resolve, reject) => resolve(isUserOnline()));
};

export function futureRequest(key, networkRequest) {
	throw new Error("Not supported for web requests");
}

export default Network;
