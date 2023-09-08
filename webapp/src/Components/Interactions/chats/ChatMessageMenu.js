import React, { PureComponent } from "react";
import ChatLinkSelfUI from "./ChatLinkSelfUI";
import ChatLinkOthersUI from "./ChatLinkOthersUI";
import { getFileIconClass } from "../UploadingFilesView";

class ChatMessageMenu extends PureComponent {
	send = () => { };

	render() {
		let { chat, conversation, self } = this.props;
		let ChatUI = self ? ChatLinkSelfUI : ChatLinkOthersUI;

		let menuItems = chat.message,
			options = chat.options;

		menuItems = [
			{
				id: "1",
				iconFileName: "fileName",
				title: "Create an Advertisement",
			},
			{
				id: "2",
				iconFileName: "fileName",
				title: "Create a Campaign",
			},
			{
				id: "3",
				iconFileName: "fileName",
				title: "Create a Catalog",
			},
			{
				id: "4",
				iconFileName: "fileName",
				title: "Create products for Sale",
			},
			{
				id: "5",
				iconFileName: "fileName",
				title: "Group Management",
			},
			{
				id: "5",
				iconFileName: "fileName",
				title: "Group Management 1",
			},
		];

		return (
			<ChatUI chat={chat} conversation={conversation}>
				<div className="d-flex" style={{ overflowX: "auto", maxWidth: "85%" }}>
					{menuItems.map((menuItem) => {
						return (
							<a onClick={this.send} style={{ cursor: "pointer" }}>
								<div
									className="align-items-center mx-1"
									style={{
										boxSizing: "border-box",
										height: "120px",
										width: "120px",
										border: "0.2px solid rgba(91,91,91,0.2)",
										borderRadius: "10px",
										backgroundColor: "#FFFFFF",
										boxShadow: "0 0 4px 0 rgba(0,0,0,0.08)",
									}}
								>
									<div
										style={{
											height: "50px",
											width: "50px",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											borderRadius: "50%",
											backgroundColor: "#F4F4F4",
											marginBottom: "10px",
										}}
									>
										<i
											className="icon-star"
											style={{ color: "#638DFF", fontSize: "26px" }}
										/>
									</div>
									<div style={{ fontSize: "14px", textAlign: "center" }}>
										{menuItem.title}
									</div>
								</div>
							</a>
						);
					})}
				</div>
			</ChatUI>
		);
	}
}

export default ChatMessageMenu;
