import AgentGuardServiceClient from "./Clients/AgentGuardServiceClient";
import UserServiceClient from "./Clients/UserServiceClient";
import { IM_BOT } from "../Utils/Constants";
import appType from "../Utils/ApiConfig";

export const MIN_WALLET_BAL = 0;

export function getVoipDevice(low_bw = false) {
	return new Promise((resolve, reject) => {
		getVoipToken().then(async (token) => {
			if (token) {
				return resolve(true);
				// import("twilio-client")
				// 	.then((Twilio) => {
				// 		let device = Twilio.Device;
				// 		if (low_bw) {
				// 			device.setup(token, {
				// 				allowIncomingWhileBusy: false,
				// 				codecPreferences: ["opus", "pcmu"],
				// 				maxAverageBitrate: 8000,
				// 			});
				// 		} else {
				// 			device.setup(token, {
				// 				allowIncomingWhileBusy: false,
				// 				codecPreferences: ["opus", "pcmu"],
				// 			});
				// 		}

				// 		return resolve(device);
				// 	})
				// 	.catch((error) => {
				// 		console.error("Unable to TWILIO::", error);
				// 		return reject(null);
				// 	});
			} else {
				console.error("No token found");
				return reject(null);
			}
		});
	});
}

export const PSTN_CALL = {
	SAT_CALL: "SAT_CALL",
	NOT_SUPPORTED: "NOT_SUPPORTED",
	OTHER_CALL: "OTHER_CALL",
};

export function checkSatelliteCall(number) {
	if (number.startsWith("00870") || number.startsWith("+870")) {
		return [PSTN_CALL.SAT_CALL];
	}
	if (number.startsWith("008816") || number.startsWith("+8816")) {
		return [PSTN_CALL.SAT_CALL];
	}
	if (number.startsWith("00882") || number.startsWith("+882")) {
		return [
			PSTN_CALL.NOT_SUPPORTED,
			"Our team is working hard to be able to initiate calls to CustomLanding phones. Stay in touch and we will inform you when it becomes available",
		];
	}
	return [PSTN_CALL.OTHER_CALL];
}

export function getVoipToken() {
	let typeOfApp = appType;
	let data = {};
	if (typeOfApp) {
		data = {
			appType: typeOfApp,
		};
	}
	return UserServiceClient.generateTwilioToken(data)
		.then((token) => {
			return token.accessToken;
		})
		.catch((error) => {
			console.error("error in get voip token::", error);
		});
}

export async function fetchWalletBalance() {
	const data = {
		parameters: JSON.stringify({
			action: "getSpecificQuota",
			botId: "pstn-balance",
		}),
		capability: "MessageQuotaCapability",
		conversation: {
			conversationId: "fetch_balance",
			bot: IM_BOT,
			participants: ["AgentM"],
		},
		sync: true,
	};
	return 0;

	// return AgentGuardServiceClient.execute(data).then((response) => {
	// 	let available = 0;
	// 	if (response && response.content && response.content[0]) {
	// 		let pstn = response?.content[0]["pstn-balance"];
	// 		if (pstn?.available) {
	// 			available = Math.ceil(pstn.available * 1000) / 1000;
	// 		}
	// 	}
	// 	return available;
	// });
}

export async function getCallHistory() {
	return UserServiceClient.getCallHistory().then((response) => {
		return response.content;
	});
}

export async function getPaginatedCallHistory(startTime) {
	return UserServiceClient.getPaginatedCallHistory(startTime).then(
		(response) => {
			return response;
		}
	);
}

export async function getCallHistoryForSelectedContact(selectedContactId) {
	return UserServiceClient.getContactHistory({
		contactId: selectedContactId,
	}).then((response) => {
		return response;
	});
}
