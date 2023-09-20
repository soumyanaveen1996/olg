import store from "../../State/configureStore";
import Config from "./../../Utils/Config";
import { storeLatestCall } from "../../State/actions/offlineBanner";
import axios from "axios";
import _ from "lodash";
import { getAuthData } from "../StorageService";

// let baseURL = `${Config.gRPCURL}/`;
let baseURL = "http://localhost:4001/";
// Config.envName == "development" ? `${Config.gRPCURL}/grpc` : Config.gRPCURL;

export default class RPC {
	static rpcCall(
		url,
		request,
		responseType,
		requestSerializeFn,
		responseDeserializeFn,
		options = {},
		noSpinner
	) {
		let auth = store.getState().user ? store.getState().user.auth : null;
		return new Promise((resolve, reject) => {
			let config = {
				baseURL,
				url,
				method: "POST",
				data: request,
			};
			let auth = getAuthData();
			if (auth?.token) {
				config["headers"] = {
					token: auth.token,
				};
			}
			// ServiceClientUtils.requestInterceptor();
			if (auth && !store.getState().user.isOnline) {
				reject("No internet connection please try again later");
				return;
			}
			axios(config)
				.then((response) => {
					// ServiceClientUtils.handleResponse(response.data);
					resolve(response.data);
				})
				.catch((error) => {
					let latestAPICallObj = {
						url,
						request,
						responseType,
						requestSerializeFn,
						responseDeserializeFn,
						options,
						noSpinner,
					};
					store.dispatch(storeLatestCall(latestAPICallObj));
					// ServiceClientUtils.handleError(error, url);
					reject(error);
					return;
				});
		});
	}
}
