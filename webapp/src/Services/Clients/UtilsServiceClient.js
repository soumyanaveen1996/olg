import UtilsService from "../gRPC/Generated/UtilsService";
import RPC from "./RPC";

const utils = UtilsService.utils;
const commonmessages = UtilsService.commonmessages;

class UtilsServiceClient {
	static addLogEntry(reqInfo) {
		return RPC.rpcCall(
			"/utils.UtilsService/AddLogEntry",
			reqInfo,
			commonmessages.empty,
			(request) => {
				return utils.LogEntryInput.encode(request).finish();
			},
			(response) => {
				return utils.LogEntryInput.decode(response);
			},
			{},
			true
		);
	}
}

export default UtilsServiceClient;
