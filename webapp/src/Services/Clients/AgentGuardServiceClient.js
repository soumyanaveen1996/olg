import { agentguard } from "../gRPC/Generated/AgentGuardService";
import RPC from "./RPC";

class AgentGuardServiceClient {
	static execute(agInput) {
		if (!agInput?.requestUuid) agInput.requestUuid = "somerandomid369";
		return RPC.rpcCall(
			"/AgentGuardService/Execute",
			agInput,
			agentguard.AgentGuardStringResponse,
			(request) => {
				return agentguard.AgentGuardInput.encode(request).finish();
			},
			agentguard.AgentGuardStringResponse.decode,
			{},
			true
		).then((response) => {
			let content = response.content;

			if (typeof content === "string") {
				response.content = JSON.parse(content);
			} else if (Array.isArray(content) && content[0]) {
				response.content = [JSON.parse(content[0])];
			}
			return response;
		});
	}
}

export default AgentGuardServiceClient;
