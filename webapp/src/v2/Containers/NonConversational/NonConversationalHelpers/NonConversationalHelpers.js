import {
	getDataFromLFStorage,
	saveDataInLFStorage,
	LFStorageKeys,
} from "../../../../Services/LFStorage";
import { uploadingTheFile } from "../../../Components/Common/FMForm/UploadingFile";

// When upload file offline only 1 files is getting uploaded
// appending offline queue is async and slower so added local queue
// It does not solve all edge case need improvisation
const localQueue = [];

export const queueFileUpload = async (details) => {
	try {
		let queue = await getDataFromLFStorage(LFStorageKeys.OFFLINE_QUEUE);
		if (!queue) {
			queue = [];
		}
		localQueue.push(details);
		queue.push(details);

		await saveDataInLFStorage(LFStorageKeys.OFFLINE_QUEUE, localQueue);
		return true;
	} catch (error) {
		console.log("=== ~ queueFileUpload ~ error", error);
		return error;
	}
};

export const dequeueFileUpload = async () => {
	try {
		let queue = await getDataFromLFStorage(LFStorageKeys.OFFLINE_QUEUE);
		if (queue) {
			let queuedItem = queue.length;

			for (let i = 0; i < queuedItem; i++) {
				let fileDetails = queue.shift();
				localQueue.shift();
				uploadingTheFile(
					fileDetails.file,
					fileDetails.conversationId,
					fileDetails.fileName
				)
					.then(() => {
						console.log("%c Offline Queue file got uploaded", "color: green;");
						saveDataInLFStorage(LFStorageKeys.OFFLINE_QUEUE, queue);
					})
					.catch((error) => {
						console.error("ERROR while uploading file offline queue::", error);
						queue.push(fileDetails);
						saveDataInLFStorage(LFStorageKeys.OFFLINE_QUEUE, queue);
					});
			}
		}
	} catch (error) {
		console.error("=== ~ queueFileUpload ~ error", error);
		return error;
	}
};
