import AgentGuardServiceClient from "./Clients/AgentGuardServiceClient";
import CompanyServiceClient from "./Clients/CompanyServiceClient";
import UserServiceClient from "./Clients/UserServiceClient";
import { updateSelectedDomainInLFStorage } from "../Services/LFStorage";

export function registerBusiness(data) {
	return CompanyServiceClient.create(data).then((res) => res.data);
}

export function savePushSubscription(conversation, deviceId, subscription) {
	let reqData = {
		parameters: JSON.stringify({
			botId: "frontm-bot-web",
			command: "RegisterWebPush",
			webSubscription: subscription,
			deviceId: deviceId,
		}),
		capability: "RegisterDevice",
		conversation: conversation,
		sync: true,
	};

	return AgentGuardServiceClient.execute(reqData)
		.then((response) => {})
		.catch((error) => {
			throw new Error(error);
		});
}

export function updateLastLoggedInDomain(selectedDomain) {
	return UserServiceClient.updateLastLoggedInDomain({
		userDomain: selectedDomain,
	}).then(async (res) => {
		await updateSelectedDomainInLFStorage(selectedDomain);
		return res;
	});
}

//
// export function sendTestNotification() {
//   return Ajax.post("/push-notification-test", {})
//     .then(response => {})
//     .catch(error => {
//       throw new Error(error);
//     });
// }
