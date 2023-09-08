import React from "react";
import VOIPCallButton from "./VOIPCallButton";
import PhoneCallButton from "./PhoneCallButton";
import SatCallButton from "./SatCallButton";
import PhoneCallButtonFunctional from "./PhoneCallButtonFunctional";

export default function CallButton(props) {
	const { callType } = props;
	if (callType === "voip") {
		return <VOIPCallButton {...props} />;
	}
	if (callType === "phone") {
		return <PhoneCallButtonFunctional {...props} />;
	}
	if (callType === "sat") {
		return <PhoneCallButtonFunctional {...props} />;
	}
}
