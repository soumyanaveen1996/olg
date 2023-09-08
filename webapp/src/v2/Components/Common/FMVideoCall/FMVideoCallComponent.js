import React from "react";
import MeetingRoom from "../../../../Components/Video/Components/MeetingRoom";

const FMVideoComponent = (props) => {
	return (
		<MeetingRoom
			sessionInfo={{
				userId: props.message.userId,
				bot: props.bot,
				conversationId: props.conversation,
			}}
			callRejected={props.callRejected}
			disableVideo={props.disableVideo}
			meetingId={props.videoSessionId}
			options={props.message}
			waitingText={props.waitingText}
			onMeetingIdCreated={props.sendVideoId}
			onError={(id, errorMessage) => {
				props.errorHandleVideoMsg(
					props.message.controlId,
					"error",
					errorMessage,
					id
				);
			}}
			onMeetingEnded={(id) => {
				props.onMeetingEnded(props.message.controlId, "callEnd", id);
			}}
			onMeetingStarted={(id) => {
				props.onMeetingStarted(props.message.controlId, "callActive", id);
			}}
		/>
	);
};

export default FMVideoComponent;
