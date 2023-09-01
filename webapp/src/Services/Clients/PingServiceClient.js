import PingService from "../gRPC/Generated/PingService";
import RPC from "./PingRPC";
const ping = PingService.ping;
const commonmessages = PingService.commonmessages;
let deadline = new Date();

class PingServiceClient {
	static fetchUserDetails(reqInfo) {
		// console.log("fetching request ", reqInfo, user);
		return RPC.rpcCall(
			reqInfo.host_url + "/ping.PingService/Ping",
			{},
			ping.ping,
			(request) => {
				console.log("=======request", request, ping);
				return ping.PingReply.encode(request).finish();
			},
			(resp) => {
				console.log("==========resp", resp);
				return resp;
			},
			{},
			true
		);
	}
}
export default PingServiceClient;
