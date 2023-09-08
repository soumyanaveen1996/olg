import store from "./../State/configureStore";
let webSocket = null;

export function setUpRTC() {
	let auth = store.getState().user ? store.getState().user.auth : null;
	if (auth && auth.sessionId) {
		let sessionId = auth.sessionId;

		webSocket = new WebSocket(
			"wss://izqzqeha4l.execute-api.us-east-1.amazonaws.com/Prod"
		);
		webSocket.onopen = function (event) {
			console.log("socket opopen");
		};
		webSocket.onerror = function (event) {
			console.log("websocket errored out: ", event.data);
		};
		webSocket.onmessage = function (event) {
			console.log("message received: ", event.data);
			// cb(event.data);
		};
	}
}
//
// export function receiveIncoming(cb) {
//   webSocket.onmessage = function(event) {
//     console.log("message received: ", event.data);
//     cb(event.data);
//   };
// }

export function sendMessageToSocket(message) {
	webSocket.send(
		JSON.stringify({
			action: "sendMessage",
			message: "sendMessage",
			data: message,
		})
	);
}
