import { Auth } from "./Auth";
import { default as Network } from "./Network";

const R = require("ramda");
export class AgentGuardError extends Error {
	constructor(code, message) {
		super(code, message);
		this.code = code;
		this.message = message;
	}

	get code() {
		return this.code;
	}

	get message() {
		return this.message;
	}
}

/**
 * A simple AgentGuard wrapper
 */
class AgentGuard {
	constructor() {
		this.heartBeat = async () => {
			try {
				let newAuth = new Auth();
				// let newNetwork = new Network();
				const user = await newAuth.getUser();
				if (user) {
					const options = {
						serviceName: "AgentGuardServiceClient",
						action: "execute",
						sessionId: user.creds.sessionId,
						params: {
							parameters: JSON.stringify({
								test: "test",
							}),
							capability: "PingAgentGuardCapability",
							sync: true,
						},
					};

					Network(options, false).then((response) => {
						console.log("Connected to AgentGuard", response);
					});
				}
			} catch (error) {
				console.log("Error Calling AG Heartbeat", error);
			}
		};

		this.execute = async (params) => {
			try {
				let newAuth = new Auth();
				// let newNetwork = new Network();
				const user = await newAuth.getUser();
				const key = R.pathOr(null, ["conversation", "bot"], params);
				if (user) {
					const options = {
						serviceName: "AgentGuardServiceClient",
						action: "execute",
						sessionId: user.creds.sessionId,
						params,
						key,
					};

					const response = await Network(options, true);
					return response;
					// return convertResponse(response);
				}

				throw Error("No Logged in User");
			} catch (error) {
				console.log("agent gaurd ====>", error);
				throw Error("Error Calling Agent Guard", error.message);
			}
		};
	}
}

export default AgentGuard;
