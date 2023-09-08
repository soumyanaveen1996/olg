import FileServiceClient from "../../../../Services/Clients/FileServiceClient";
import { getFileUrl } from "../../../../Services/FilesService";
import store from "../../../../State/configureStore";
import { queueFileUpload } from "../../../Containers/NonConversational/NonConversationalHelpers/NonConversationalHelpers";

export function uploadingTheFile(
	file,
	conversationId,
	fileName,
	fileScope = null,
	scopeId
) {
	let isOnline = store.getState().user.isOnline;
	return new Promise((resolve, reject) => {
		if (isOnline) {
			FileServiceClient.uploadLargeFile({
				file,
				conversationId,
				scopeId: scopeId || conversationId,
				fileName,
				fileScope,
			})
				.then(() => {
					return getFileUrl(conversationId, fileName);
				})
				.then((fileUrl) => {
					resolve(fileUrl);
				})
				.catch((error) => {
					console.error("error on upload ", error);
					reject(error);
				});
		} else {
			queueFileUpload({
				file,
				conversationId,
				scopeId: conversationId,
				fileName,
				fileScope,
			})
				.then(() => {
					return getFileUrl(conversationId, fileName);
				})
				.then((fileUrl) => {
					resolve(fileUrl);
				})
				.catch((error) => {
					console.error("error on upload ", error);
					reject(error);
				});
		}
	});
}
