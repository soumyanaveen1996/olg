import React from "react";
import { connect } from "react-redux";
import UploadingFilesView from "./UploadingFilesView";
import {
	cancelUpload,
	removeFile,
	setSelectedFiles,
} from "../../State/actions/files";
import { sendAMessage } from "../../State/actions/chats";

class UploadingFilesContainer extends React.PureComponent {
	render() {
		return <UploadingFilesView {...this.props} />;
	}
}

const actions = {
	setSelectedFiles,
	removeFile,
	cancelUpload,
	sendAMessage,
};
const data = (state) => {
	let chats = state.chats;
	let conversation = chats.selectedConversation;
	return {
		files: state.files.selected,
		conversation: conversation,
	};
};

export default connect(data, actions)(UploadingFilesContainer);
