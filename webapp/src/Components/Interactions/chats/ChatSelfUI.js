import React from "react";
import ChatDateTimeUI from "./ChatDateTimeUI";
import ReactEmoji from "react-emoji";
import { MessageTypeConstants } from "../../../Services/Message";
import Avatar from "../../Common/Avatar";
import { validURL } from "../../../Utils/Helpers";

const ChatSelfUI = ({ chat, style, children, allProfileImages }) => {
	const hasURL = (stringMsg) => {
		if (typeof stringMsg === "string") {
			return stringMsg
				.split(" ")
				.map((item) => validURL(item))
				.includes(true);
		}
		return false;
	};

	const renderMessageWithURL = (stringMsg) => {
		return stringMsg.split(" ").map((item, inx) =>
			validURL(item) ? (
				<a href={item} key={inx} target="_blank" rel="noopener noreferrer">
					{item + " "}
				</a>
			) : (
				item + " "
			)
		);
	};

	const showMessage = () => {
		try {
			return chat.messageType === MessageTypeConstants.MESSAGE_TYPE_STRING &&
				hasURL(chat.message)
				? renderMessageWithURL(chat.message)
				: typeof children === "string" || typeof children === "object"
				? ReactEmoji.emojify(children)
				: null;
		} catch (error) {
			return "Invalid Message";
		}
	};

	if (chat.messageType === MessageTypeConstants.MESSAGE_TYPE_CONTACT_CARD) {
		if (!Array.isArray(children) && typeof children === "object") {
			children = [children];
		}
		return children.map((elem, index) => {
			return (
				<div
					key={index}
					className="d-flex flex-column justify-content-end align-items-end chat-message chat-self"
				>
					<div
						className="chat-self-message"
						style={(style, { display: "flex", flexDirection: "row" })}
					>
						{/* <div>
            <Profile
          </div> */}
						{/* <div>
              <span>Contact Details</span>
              <hr className="hr-mb-0 hr-mt-0" />
            </div> */}

						{allProfileImages && allProfileImages[elem.userId] ? (
							<Avatar
								style={{ marginRight: "10px", borderRadius: "50%" }}
								height={30}
								name={elem.userName}
								size={30}
								imgSrc={allProfileImages[elem.userId]}
								color="bg-info"
							/>
						) : (
							<Avatar
								style={{ marginRight: "10px", borderRadius: "50%" }}
								height={30}
								name={elem.userName}
								size={30}
								color="bg-info"
							/>
						)}
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "column",
							}}
						>
							<div>{elem.userName}</div>
							<div>{elem.emailAddress}</div>
						</div>
					</div>
					<div>
						<ChatDateTimeUI chat={chat} />
					</div>
				</div>
			);
		});
	} else {
		return (
			<div className="d-flex flex-column justify-content-end align-items-end chat-message chat-self">
				<div className="chat-self-message" style={style}>
					{showMessage()}
				</div>
				<div>
					<ChatDateTimeUI chat={chat} />
				</div>
			</div>
		);
	}
};

export default ChatSelfUI;
