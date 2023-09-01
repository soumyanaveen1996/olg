import React, { Suspense } from "react";
import { MessageTypeConstants } from "../../../Services/Message";
import ButtonContent from "./ButtonContent";
import AudioContent from "./AudioContent";
import VideoContent from "./VideoContent";
import ImageContent from "./ImageContent";
import Chips from "./Chips";
import MapContentView from "./MapContentView";
import SliderContent from "./SliderContent";
import ChartContent from "./ChartContent";
import FormContentView from "./forms/FormContentView";
import FloorPlanView from "./FloorPlanDemo/frontm_floorplan";

const CONTENT_VIEW = {
	map: MapContentView,
	location: MapContentView,
	slider: SliderContent,
	smart_suggestion: Chips,
	chart: ChartContent,
	form: FormContentView,
	form_response: FormContentView,
	button: ButtonContent,
	image: ImageContent,
	audio: AudioContent,
	video: VideoContent,
	floorplan: FloorPlanView,
};

class ChatContentView extends React.Component {
	constructor(props) {
		super(props);
		this.state = { closed: false };
	}

	close = () => {
		let messageType = this.props.content.messageType;
		if (
			messageType === MessageTypeConstants.MESSAGE_TYPE_FORM ||
			messageType === MessageTypeConstants.MESSAGE_TYPE_FORM2
		) {
			this.props.sendMessage(
				{
					message: "",
					messageType: MessageTypeConstants.MESSAGE_TYPE_FORM_CANCEL,
				},
				true
			);
		} else if (messageType === MessageTypeConstants.MESSAGE_TYPE_SLIDER) {
			this.props.sendMessage(
				{
					message: "",
					messageType: MessageTypeConstants.MESSAGE_TYPE_SLIDER_CANCEL,
				},
				true
			);
		}
		this.props.close();
	};

	sendMessage = (message, messageType, hidden) => {
		console.log(`${message} --- ${messageType}`);
		this.props.sendMessage(
			{ message, messageType },
			hidden,
			this.props.conversation
		);
		this.props.close();
	};

	render() {
		// console.log("external_things::::", this.props);

		let {
			content,
			style = {},
			smartReply,
			conversation,
			noCloseBtn,
		} = this.props;
		let ViewComponent = CONTENT_VIEW[content.messageType];

		let closeBtnStyle = {
			position: "absolute",
			zIndex: 150,
			borderRadius: "50%",
			marginTop: "10px",
			fontSize: "20px",
			top: "100px",
		};

		if (!smartReply) {
			closeBtnStyle.right = 60;
		} else {
			closeBtnStyle.marginLeft = "20px";
		}

		let data = content.message;
		if ([MessageTypeConstants.MESSAGE_TYPE_LOCATION, MessageTypeConstants.MESSAGE_TYPE_MAP].includes(content.messageType)) {
			data = Array.isArray(content.message)
				? content.message[0]
				: content.message;
		}

		return (
			<div
				className="d-flex flex flex-column justify-content-center" // style={Object.assign({ borderLeft: "1px solid #edf2f4" }, style)}
				style={Object.assign(
					{
						borderLeft: smartReply ? "0px" : "1px solid #e8e9ee",
						paddingLeft: "5rem"
					},
					style
				)}
				id="chat-content-view"
				ref={this.props.setRef}
			>
				{!noCloseBtn && (
					<div>
						<a
							onClick={this.close}
							className="map-close-bg d-flex justify-content-center align-items-center"
							style={closeBtnStyle}
						>
							<span aria-hidden="true" className="icon-cross" />
						</a>
					</div>
				)}

				<Suspense fallback={<div></div>}>
					<ViewComponent
						data={data}
						options={content.options}
						completed={
							content.completed ||
							(content.options && content.options.stage === "COMPLETED")
						}
						messageId={content.messageId}
						sendMessage={this.sendMessage}
						smartReply={smartReply}
						conversationId={conversation.conversationId}
					/>
				</Suspense>
			</div>
		);
	}
}

export default ChatContentView;
