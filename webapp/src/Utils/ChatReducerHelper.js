class ChatReducerHelper {
	static floorPlanMessage = (data) => {
		let { conversationId, message } = data;
		let availableDesk = message.message;
		console.log(
			"floor plan message ===>..",
			data,
			conversationId,
			availableDesk
		);
	};
}

export default ChatReducerHelper;
