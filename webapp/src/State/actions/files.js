export const FILES_SELECTED = "FILES_SELECTED";
export const REMOVE_FILE = "REMOVE_FILE";
export const CANCEL_UPLOAD = "CANCEL_UPLOAD";
export const SET_CONVERSATION_DETAILS = "SET_CONVERSATION_DETAILS";

export function setSelectedFiles(files) {
	return {
		type: FILES_SELECTED,
		data: { files: files },
	};
}

export function removeFile(index) {
	return {
		type: REMOVE_FILE,
		data: { index: index },
	};
}

export function cancelUpload() {
	return {
		type: CANCEL_UPLOAD,
	};
}
//
// export function setConversationDetailsForFiles(
//   conversationId,
//   conversationName
// ) {
//   return {
//     type: SET_CONVERSATION_DETAILS,
//     data: { conversationId, conversationName }
//   };
// }
