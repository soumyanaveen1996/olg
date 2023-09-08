const timeLineUrl = new URL("/app/chats", self.location.origin).href;
const messagesUrl = new URL("/messages/c", self.location.origin).href;
// for web-app push notifications

self.addEventListener("push", function (event) {
	const message = event.data.json();
	self.registration.showNotification(message.title, { body: message.text });
});

self.addEventListener("push", function (event) {
	console.log("[Service Worker] Push Received.");
	console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

	let promiseChain = getMatchingClient().then((matchingClient) => {
		if (!matchingClient || !matchingClient.focused) {
			showNotification(event);
		}
	});
	event.waitUntil(promiseChain);
});

function showNotification(event) {
	let text = event.data.text();
	let content = JSON.parse(text);

	const title = content.title;
	const options = {
		body: content.message,
		icon: "img/logo.png",
		badge: "img/logo.png",
		data: { conversationId: content.conversationId },
	};

	event.waitUntil(self.registration.showNotification(title, options));
}

self.addEventListener("notificationclick", function (event) {
	event.notification.close();

	let promiseChain = getMatchingClient().then((matchingClient) => {
		if (matchingClient) {
			// matchingClient.navigate(
			//   messagesUrl + "/" + event.notification.data.conversationId
			// );
			send_message_to_client(
				matchingClient,
				JSON.stringify({
					action: "push-click",
					conversationId: event.notification.data.conversationId,
				})
			).then((m) => console.log("SW Received Message: " + m));
			matchingClient.focus();
		} else {
			clients.openWindow(
				messagesUrl + "/" + event.notification.data.conversationId
			);
		}
	});

	event.waitUntil(promiseChain);
});

function getMatchingClient() {
	return clients
		.matchAll({
			type: "window",
			includeUncontrolled: true,
		})
		.then((windowClients) => {
			let matchingClient = null;

			for (let i = 0; i < windowClients.length; i++) {
				const windowClient = windowClients[i];
				if (windowClient.url === timeLineUrl) {
					matchingClient = windowClient;
					break;
				}
			}

			return matchingClient;
		});
}

function send_message_to_client(client, msg) {
	return new Promise(function (resolve, reject) {
		var msg_chan = new MessageChannel();

		msg_chan.port1.onmessage = function (event) {
			if (event.data.error) {
				reject(event.data.error);
			} else {
				resolve(event.data);
			}
		};

		client.postMessage(msg, [msg_chan.port2]);
	});
}
