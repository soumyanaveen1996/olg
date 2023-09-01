import { contacts } from "../gRPC/Generated/ContactsService";
import RPC from "./RPC";

class ContactsServiceClient {
	static search(req) {
		return RPC.rpcCall(
			"/contacts.ContactsService/Find",
			req,
			contacts.FindResponse,
			(request) => {
				return contacts.SearchQuery.encode(request).finish();
			},
			contacts.FindResponse.decode
		);
	}

	static add(req, noSpinner) {
		return RPC.rpcCall(
			"/contacts.ContactsService/Add",
			req,
			contacts.AgentGuardBoolResponse,
			(request) => {
				return contacts.ContactsInput.encode(request).finish();
			},
			contacts.AgentGuardBoolResponse.decode,
			{},
			noSpinner
		);
	}

	static update(req) {
		return RPC.rpcCall(
			"/contacts.ContactsService/Update",
			req,
			contacts.AgentGuardBoolResponse,
			(request) => {
				return contacts.ContactsInput.encode(request).finish();
			},
			contacts.AgentGuardBoolResponse.decode
		);
	}
	static invite(req) {
		return RPC.rpcCall(
			"/contacts.ContactsService/Invite",
			req,
			contacts.AgentGuardBoolResponse,
			(request) => {
				return contacts.EmailIdList.encode(request).finish();
			},
			contacts.AgentGuardBoolResponse.decode
		);
	}

	static remove(req) {
		return RPC.rpcCall(
			"/contacts.ContactsService/Remove",
			req,
			contacts.AgentGuardBoolResponse,
			(request) => {
				return contacts.ContactsInput.encode(request).finish();
			},
			contacts.AgentGuardBoolResponse.decode
		);
	}

	static accept(req) {
		return RPC.rpcCall(
			"/contacts.ContactsService/Accept",
			req,
			contacts.AgentGuardBoolResponse,
			(request) => {
				return contacts.ContactsInput.encode(request).finish();
			},
			contacts.AgentGuardBoolResponse.decode
		);
	}

	static ignore(req) {
		return RPC.rpcCall(
			"/contacts.ContactsService/Ignore",
			req,
			contacts.AgentGuardBoolResponse,
			(request) => {
				return contacts.ContactsInput.encode(request).finish();
			},
			contacts.AgentGuardBoolResponse.decode
		);
	}
}

export default ContactsServiceClient;
