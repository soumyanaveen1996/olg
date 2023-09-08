import { company } from "../gRPC/Generated/CompanyService";
import RPC from "./RPC";

class CompanyServiceClient {
	static create(req) {
		return RPC.rpcCall(
			"/company.CompanyService/Create",
			req,
			company.CreateCompanyResponse,
			(request) => {
				return company.CreateCompanyInput.encode(request).finish();
			},
			company.CreateCompanyResponse.decode
		);
	}
}

export default CompanyServiceClient;
