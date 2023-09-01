import ChannelServiceClient from "./Clients/ChannelServiceClient";

export function filterChannels(channels, filters, searchKey, user) {
	let filtered = channels;
	if (searchKey) {
		filtered = channels.filter((channel) => {
			let name = channel.channelName.toLowerCase();
			let description = channel.description.toLowerCase();
			searchKey = searchKey.toLowerCase();
			return (
				name.indexOf(searchKey) !== -1 || description.indexOf(searchKey) !== -1
			);
		});
		return filtered;
	}
	// if (filters) {
	//   return filtered.filter(channel => {
	//     let f = true;
	//
	//     let subscribed = filters.subscribed.value,
	//       created = filters.created.value,
	//       unsubscribed = filters.unsubscribed.value,
	//       team = filters.team.value,
	//       platform = filters.platform.value,
	//       publicChannel = filters.publicChannel.value;
	//
	//     if (subscribed) {
	//       f = f && !!channel.subscribed;
	//     }
	//     if (created) {
	//       f =
	//         f &&
	//         channel.channelOwner &&
	//         channel.channelOwner.userId === user.userId;
	//     }
	//     if (unsubscribed) {
	//       f = f && !!!channel.subscribed;
	//     }
	//     if (team) {
	//       // let index = user.domains.findIndex(d => {
	//       //   return d.domain === channel.userDomain;
	//       // });
	//       // f = f && index !== -1;
	//       f = f && channel.userDomain === team;
	//     }
	//     if (platform) {
	//       f = f && channel.userDomain === "frontmai";
	//     }
	//     if (publicChannel) {
	//       f = f && channel.channelType === "public";
	//     }
	//
	//     return f;
	//   });
	// }
	else {
		const filteredChannels = filtered.filter((channel) => {
			let f = true;
			f = f && !!channel.subscribed;
			return f;
		});
		return filteredChannels;
	}
}

export function createNewChannel(channelData) {
	return ChannelServiceClient.createChannel({
		channel: { ...channelData },
	}).then(function (data) {
		if (data.error && data.error !== "0") {
			//too handle error
		} else {
			return data.content || [];
		}
	});
}

export function subscribeChannel(domainChannels) {
	return ChannelServiceClient.subscribeChannel({
		domainChannels: domainChannels,
	}).then(function (data) {
		if (data.error && data.error !== "0") {
			//too handle error
		} else {
			return data.content || [];
		}
	});
}

export function unsubscribeChannel(userDomain, channelName) {
	return ChannelServiceClient.unsubscribeChannel({
		domainChannels: [
			{
				userDomain: userDomain,
				channels: [channelName],
			},
		],
	}).then(function (data) {
		if (data.error && data.error !== "0") {
			//too handle error
			console.log("unsubscribe error");
			return data;
		} else {
			return data.content || [];
		}
	});
}

export function getSubscribedChannels(domainSelected) {
	return ChannelServiceClient.getSubscribedChannels(domainSelected).then(
		function (data) {
			if (data.error && data.error !== "0") {
				return [];
			} else {
				return data.content || [];
			}
		}
	);
}

export function getUnsubscribedChannels(domainSelected) {
	return ChannelServiceClient.getUnsubscribedChannels(domainSelected).then(
		function (data) {
			if (data.error && data.error !== "0") {
				return [];
			} else {
				return data.content || [];
			}
		}
	);
}

export function addUsersToChannel(channelData) {
	let channelName = channelData.channelName;
	let userDomain = channelData.userDomain || "frontmai";
	let newUserIds = [...channelData.newUserIds];

	return ChannelServiceClient.addUsersToChannel({
		channelName: channelName,
		userDomain: userDomain,
		newUserIds: newUserIds,
	}).then(function (data) {
		// console.log("w==================== ", data);
		if (data.error && data.error !== "0") {
			//too handle error
		} else {
			return data.content || [];
		}
	});
}

export function editChannel(channelObj) {
	// console.log("lets check this part ", channelObj);

	return ChannelServiceClient.editChannel({
		...channelObj,
	}).then(function (data) {
		if (data.error && data.error !== "0") {
			//too handle error
		} else {
			return data.content || [];
		}
	});
}

export function requestAccessToPrivateChannel(channelData) {
	let channelName = channelData.channelName;
	let userDomain = channelData.userDomain;
	return ChannelServiceClient.requestAccessToPrivateChannel({
		channelName,
		userDomain,
	}).then(function (data) {
		if (data.error && data.error !== "0") {
			//too handle error
		} else {
			return data.content || [];
		}
	});
}

export function fetchPendingParticipants(channelName, userDomain) {
	return ChannelServiceClient.fetchPendingParticipants({
		channelName,
		userDomain,
	}).then(function (data) {
		if (data.error && data.error !== "0") {
			//too handle error
		} else {
			return data.content || [];
		}
	});
}
export function fetchChannelParticipants(channelName, userDomain) {
	return ChannelServiceClient.fetchChannelParticipants({
		channelName,
		userDomain,
	}).then(function (data) {
		console.log("fetchChannelParticipants", data);

		if (data.error && data.error !== "0") {
			//too handle error
			return;
		} else {
			return data.content || [];
		}
	});
}
export function authorizeParticipants(
	channelName,
	userDomain,
	acceptedList,
	ignoredList
) {
	return ChannelServiceClient.authorizeParticipants({
		channelName,
		userDomain,
		accepted: [...acceptedList],
		ignored: [...ignoredList],
	}).then(function (data) {
		if (data.error && data.error !== "0") {
			//too handle error
		} else {
			return data.content || [];
		}
	});
}

export function deleteChannel(channelData) {
	return ChannelServiceClient.deleteChannel({
		channelName: channelData.channelName,
		userDomain: channelData.userDomain,
	}).then(function (data) {
		if (data.error && data.error !== "0") {
			//too handle error
		} else {
			return data.content || [];
		}
	});
}

export function changeChannelOwner(channelData) {
	console.log("changeOwner ", channelData);

	return ChannelServiceClient.changeChannelOwner({
		channelName: channelData.channelName,
		userDomain: channelData.userDomain,
		newOwnerId: channelData.newOwnerId,
	}).then(function (data) {
		console.log("tramsfering ownership", data);

		if (data.error && data.error !== "0") {
			//too handle error
		} else {
			return data.content || [];
		}
	});
}

export function updateChannelAdmin(channelData) {
	// console.log("update admin channelData", channelData);

	return ChannelServiceClient.updateChannelAdmin({
		channelName: channelData.channelName,
		userDomain: channelData.userDomain,
		userIds: [...channelData.admins],
	}).then(function (data) {
		console.log("checking for error ", data);

		if (data.error && data.error !== "0") {
			//too handle error
		} else {
			return data.content || [];
		}
	});
}
export function getChannelAdmins(channelData) {
	return ChannelServiceClient.getChannelAdmins({
		channelName: channelData.channelName,
		userDomain: channelData.userDomain,
	}).then(function (data) {
		if (data.error && data.error !== "0") {
			//too handle error
		} else {
			// console.log("get all admins in services ", data);

			return data.content || [];
		}
	});
}

export function findNewParticipants(searchData) {
	return ChannelServiceClient.findNewParticipants(searchData).then((data) => {
		if (data.error && data.error !== "0") {
			//too handle error
		} else {
			// console.log("get all admins in services ", data);

			return data.content || [];
		}
	});
}

export function updateParticipants(participants) {
	return ChannelServiceClient.updateParticipants(participants).then((data) => {
		if (data.error && data.error !== "0") {
			//too handle error
		} else {
			// console.log("get all admins in services ", data);

			return data.content || [];
		}
	});
}
