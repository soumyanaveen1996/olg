import React, { PureComponent } from "react";
import Avatar from "../Common/Avatar";
import { computeElapsedTime } from "../../Utils/Helpers";
import ConversationMenu from "./ConversationMenu";
import { truncateText } from "./cards/Utils";

const ConversationRow = (props) => {
	let {
		conversation,
		className,
		changeConversation,
		name,
		imgSrc,
		description,
		addConversationToFavourites,
		removeConversationFromFavourites,
	} = props;

	let messageCount = conversation.newMessagesCount;
	let modifiedOn = conversation.lastMessage
		? conversation.lastMessage.createdOn
		: conversation.modifiedOn;

	return (
		<div
			className={className + " d-flex justify-content-between"}
			style={{ alignItems: "start", padding: "1 rem" }}
		>
			<a
				onClick={changeConversation}
				className="d-flex justify-content-between flex"
			>
				<Avatar
					name={name}
					imgSrc={imgSrc}
					size={32}
					height={32}
					color="bg-primary"
				/>
				<div className="list-body ml-4">
					<span
						className="list-title"
						style={{ color: "#666", fontWeight: 500 }}
					>
						{name}
					</span>
					<span className="list-content mt-1" style={{ color: "#666" }}>
						{truncateText(description, 80)}
					</span>
				</div>
			</a>

			<div className="float-right ml-2 d-flex">
				<div className="d-flex flex-column align-items-center">
					<div className="text-muted mr-4">
						{computeElapsedTime(modifiedOn)}
					</div>
					{messageCount > 0 && (
						<div className="float-right mr-4 mt-2">
							<span
								className="badge d-block text-white"
								style={{ backgroundColor: "#E5453B" }}
							>
								{messageCount}
							</span>
						</div>
					)}
				</div>
				<ConversationMenu
					conversation={conversation}
					addConversationToFavourites={addConversationToFavourites}
					removeConversationFromFavourites={removeConversationFromFavourites}
					allData={props}
				>
					<img
						src="/img/collapse-gray-arrow.png"
						style={{
							height: "6px",
							width: "11px",
							transform: "scaleY(1)",
							pointer: "cursor",
						}}
					/>
				</ConversationMenu>
			</div>
		</div>
	);
};

export default ConversationRow;
