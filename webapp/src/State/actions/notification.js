import { savePushSubscription } from "../../Services/UserService";
import { getAuthData, storeAuthData } from "../../Services/StorageService";
import { getUpdatedSubscriptions } from "../../Utils/Helpers";
export const APPLICATION_SERVER_PUBLIC_KEY =
	"BAWcutaG8lR60qHPiiiWPXYiFoPRIrxgBDUXRrAbYRSEJIJfgWWZHpAiazV2BHjIG5ESl6SuxzQ7PtZtmXwy0eY";
export const SW_REGISTRATION_RECEIVED = "SW_REGISTRATION_RECEIVED";
export const PUSH_SUBSCRIPTION_STATUS_CHANGED =
	"PUSH_SUBSCRIPTION_STATUS_CHANGED";
export const SET_DEVICE_ID = "SET_DEVICE_ID";
export const UPDATE_USER_BOT_SUBSCRIPTION = "UPDATE_USER_BOT_SUBSCRIPTION";
// export const UPDATE_SW = "UPDATE_SW";
// export const UPDATE_INSTALLING_WORKER_INSTANCE = "UPDATE_INSTALLING_WORKER_INSTANCE";

// export function updateInstallingWorkerInstance(instance) {
//   return {
//     type: UPDATE_INSTALLING_WORKER_INSTANCE,
//     data: instance
//   }
// }
//
// export function updateServiceWorkerRequired(status) {
//   return {
//     type: UPDATE_SW,
//     data: status
//   }
// }

export function setSwRegistration(swRegistration) {
	return {
		type: SW_REGISTRATION_RECEIVED,
		data: { swRegistration },
	};
}

export function setDeviceId(deviceId) {
	return {
		type: SET_DEVICE_ID,
		data: { deviceId },
	};
}

export function setPushSubscriptionStatus(isSubscribed) {
	return { type: PUSH_SUBSCRIPTION_STATUS_CHANGED, data: { isSubscribed } };
}

export function updateSubscriptionOnServer(subscription) {
	return (dispatch, getState) => {
		dispatch(setPushSubscriptionStatus(!(subscription == null)));
		dispatch({
			type: UPDATE_USER_BOT_SUBSCRIPTION,
			data: {
				subscription: {
					deviceId: getState().notification.deviceId,
					subscription: subscription,
				},
			},
		});

		let authData = getAuthData();
		authData.user.webSubscriptions = getUpdatedSubscriptions(
			authData.user.webSubscriptions,
			{
				deviceId: getState().notification.deviceId,
				subscription: subscription,
			}
		);
		storeAuthData(authData);

		savePushSubscription(
			{
				conversationId: "itLjqsXxmg-4b404b93431f",
				createdOn: 1534849281947,
				bot: "frontm-bot-web",
				createdBy: getState().user.user.userId,
				participants: [getState().user.user.userId],
			},
			getState().notification.deviceId,
			subscription
		);
	};
}

export function isDeviceSubscribedToNotification(deviceId, subscriptions) {
	if (!subscriptions || subscriptions.length === 0) {
		return false;
	}
	return (
		subscriptions.findIndex(
			(subscription) => subscription.deviceId === deviceId
		) !== -1
	);
}
