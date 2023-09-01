import UtilsServiceClient from "./Clients/UtilsServiceClient";
import store from "../State/configureStore";

export const addLog = (log) => {
	const domainInfo = store.getState().selectedDomain;
	log["entry"]["botId"] = domainInfo ? domainInfo.assistantBotConfig.botId : "";
	return UtilsServiceClient.addLogEntry(log);
};
