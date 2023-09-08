import RPC from "./RPC";
import { queue } from "../gRPC/Generated/QueueService";
import { fetchArchivedMessages } from "../../State/actions/chats";
import store from "../../State/configureStore";
import Config from "./../../Utils/Config";
import _ from "lodash";
import {
	getSelectedConversation, putInStorage
} from "../../Services/StorageService";
import { sendSocketReconnectionEvent } from "../BotsService";

const io = require("socket.io-client");
let baseURL = Config.gRPCURL;

export default class QueueServiceClient {
	static setupQueueMessageStream(receiveIncoming) {
		let userData = store.getState().user ? store.getState().user : null;
		let email = userData?.user?.emailAddress;
		let socketParams;
		socketParams = {
			path: "/grpc/clientConn",
			// Config.envName == "development" ? "/grpc/clientConn" : "/clientConn",
			transports: ["polling", "websocket"],
			transportOptions: {
				polling: {
					extraHeaders: {
						sessionId: _.get(userData, "auth.sessionId", null),
					},
				},
				websocket: {
					extraHeaders: {
						sessionId: _.get(userData, "auth.sessionId", null),
					},
				},
			},
			reconnection: true,
			withCredentials: true,
			autoConnect: false
		};
		const socket = io(baseURL, socketParams);

		socket.on("connect", () => {
			console.info("%c SOCKET successfully connected!", "color: green;");
			putInStorage('thirdPartyEnabled', true);
			let selectedConversation = getSelectedConversation();
			let now = Date.now();  // Current time in milliseconds
			let twentyFourHoursAgo = now - (24 * 60 * 60 * 1000);  // Time 24 hours ago in milliseconds
			store.dispatch(fetchArchivedMessages(selectedConversation, twentyFourHoursAgo, 'NEWER'));
			sendSocketReconnectionEvent();
			socket.emit("getMessages");
		});

		socket.on("disconnect", (reason) => {
			console.info("SOCKET disconnected :", reason);
			if (reason === "io server disconnect") {
				let extraHeaders = _.get(userData, "auth.sessionId", null);
				// the disconnection was initiated by the server, you need to reconnect manually
				console.log('socket server disconnct', extraHeaders);
				socket.connect();
			}
		});

		socket.on(email, (data) => {
			if (typeof data.data === "string") {
				receiveIncoming && receiveIncoming(JSON.parse(data.data));
			} else {
				receiveIncoming && receiveIncoming(data.data);
			}
		});
		socket.io.on("reconnect_attempt", () => {
			console.info("SOCKET reconnect_attempt");
		});

		socket.io.on("reconnect", () => {
			console.info("SOCKET reconnect");
		});
		socket.on("connect_error", () => {
			putInStorage('thirdPartyEnabled', false);
			console.error("SOCKET connect_error");
		});
		return socket;
	}

	static GetPaginatedQueueMessages(args) {
		return RPC.rpcCall(
			"/queue.QueueService/GetPaginatedQueueMessages",
			args,
			queue.QueueResponseList,
			(request) => {
				return queue.QueueMessageInput.encode(request).finish();
			},
			queue.QueueResponseList.decode,
			{},
			true
		);
	}
}
