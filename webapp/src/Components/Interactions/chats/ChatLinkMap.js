import React, { PureComponent } from "react";
import ChatLinkSelfUI from "./ChatLinkSelfUI";
import ChatLinkOthersUI from "./ChatLinkOthersUI";
import MapContentView from "../content/MapContentView";

class ChatLinkMap extends PureComponent {
	render() {
		let { chat, conversation, self, active, closeContent, open } = this.props;
		// console.log("this is the ChatLinkMap", chat);

		let ChatUI = self ? ChatLinkSelfUI : ChatLinkOthersUI;
		let options = chat.options || {};

		return (
			<ChatUI chat={chat} conversation={conversation}>
				<div
					className="d-flex flex-column"
					style={{
						border: "1px solid #edf2f4",
						borderRadius: "10px",
						overflow: "hidden",
					}}
				>
					{(options.title || options.description) && (
						<div
							className="card-header py-2 px-3 bg-white"
							style={{ borderBottom: "0px" }}
						>
							<h5 style={{ marginBottom: 0, fontSize: "18px", color: "#666" }}>
								{options.title}
							</h5>

							<div style={{ fontSize: "14px", color: "#666" }}>
								{options.description}
							</div>
						</div>
					)}

					<div style={{ opacity: active ? 1 : 0.5, height: "200px" }}>
						<MapContentView data={chat.message} options={chat.options} thumb />
					</div>

					{/*<MapContent*/}
					{/*data={Array.isArray(chat.message) ? chat.message[0] : chat.message}*/}
					{/*thumbnail*/}
					{/*active={active}*/}
					{/*/>*/}
					<a
						onClick={active ? closeContent : open}
						style={{
							borderBottomRightRadius: "10px",
							borderBottomLeftRadius: "10px",
						}}
						className="d-flex justify-content-center align-items-center p-2 bg-white primary-link"
					>
						{active ? "Close Map" : "View Map"}
					</a>
				</div>
			</ChatUI>
		);
	}
}

export default ChatLinkMap;
