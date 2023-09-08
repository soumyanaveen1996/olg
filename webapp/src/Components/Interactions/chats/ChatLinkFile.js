import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getFileIconClass } from "../UploadingFilesView";
import ChatLinkSelfUI from "./ChatLinkSelfUI";
import ChatLinkOthersUI from "./ChatLinkOthersUI";
import GenericAjax from "../../../Services/GenericAjax";
import Config from "../../../Utils/Config";
import { showSnackbarV2 } from "../../../v2/Store/Notification/NotificationAction";
const R = require("ramda");

class ChatLinkFile extends PureComponent {
	downloadFile(chat) {
		let message = Array.isArray(chat.message) ? chat.message[0] : chat.message;
		let fileName =
			chat.options && chat.options.fileName ? chat.options.fileName : message;
		let conversationId = this.props.conversation.conversationId;

		GenericAjax.downloadSignedUrlFile(
			`${R.prop(
				"filesAPI",
				Config
			)}/downloadwithsignedurl/conversation/${conversationId}/${message}`
		)
			.then((res) => {
				if (res?.signedUrl) {
					GenericAjax.downloadFile(res.signedUrl)
						.then((blob) => {
							var url = window.URL.createObjectURL(blob);
							var a = document.createElement("a");
							a.href = url;
							a.download = fileName;
							document.body.appendChild(a);
							a.click();
							a.remove();
						})
						.catch((error) => {
							console.error("ERROR in geting file from signed url", error);
							this.props.showSnackbarV2("error", "Failed to download file");
						});
				}
			})
			.catch((error) => {
				console.error("ERROR in genrate Signed Url", error);
				this.props.showSnackbarV2("error", "Failed to generate signed url");
			});
	}

	render() {
		let { chat, conversation, self } = this.props;
		let ChatUI = self ? ChatLinkSelfUI : ChatLinkOthersUI;
		let type = chat.messageType;

		return (
			<ChatUI chat={chat} conversation={conversation}>
				<div
					className="d-flex justify-content-center align-items-center"
					style={{
						height: "100px",
						width: "100px",
						border: "1px solid #FFFFFF",
						borderRadius: "10px",
						backgroundColor: "#FFFFFF",
						boxShadow: "0 0 3px 0 rgba(0,0,0,0.5)",
					}}
				>
					<i
						className={getFileIconClass(type)}
						style={{ color: "#e8e9ee", fontSize: "3.5em" }}
					/>

					<a
						onClick={() => {
							this.downloadFile(chat);
						}}
						className="oval d-flex justify-content-center
              align-items-center"
						style={{
							marginTop: "20px",
							position: "absolute",
							marginLeft: "15px",
							height: "28px",
							width: "28px",
							backgroundColor: "#00bcf4",
							borderRadius: "50%",
						}}
					>
						<i className="icon-download2 text-white" />
					</a>
				</div>
			</ChatUI>
		);
	}
}

const actions = {
	showSnackbarV2: showSnackbarV2,
};

export default connect(null, actions)(ChatLinkFile);
