import React from "react";
import NonConversationalRoutes from "./NonConversationalRoutes";

function NonConversationalView({ conversationId }) {
	if (conversationId) {
		return <NonConversationalRoutes conversationId={conversationId} />;
	}
	return null;
}

export default React.memo(NonConversationalView);
