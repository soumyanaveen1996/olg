import { JitsiMeeting } from "@jitsi/react-sdk";
import { getAuthData } from "../../Services/StorageService";
import { Route, Redirect } from "react-router-dom";
import _ from "lodash";

function JitsiCall(props) {
	let configOverwrite = {
		startWithAudioMuted: true,
		disableModeratorIndicator: true,
		startScreenSharing: true,
		enableEmailInStats: false,
	};
	let interfaceConfigOverwrite = {
		DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
	};
	const jitsiCallData = window["jitsiVideoCall"];
	const authData = getAuthData();

	if (_.isEmpty(authData)) {
		if (
			window.location.origin === "https://stage1.frontm.com" ||
			window.location.pathname.includes("stage1")
		) {
			return <Redirect to={"/login"} />;
		}
		if (
			window.location.origin === "https://vikand.frontm.com" ||
			window.location.pathname.includes("vikand")
		) {
			return <Redirect to={"/vikandconnect"} />;
		}
		if (
			window.location.origin === "https://vikandtelehealth.com" ||
			window.location.pathname.includes("vikand")
		) {
			return <Redirect to={"/vikandconnect"} />;
		}
		if (
			window.location.origin === "https://vikandconnect.com" ||
			window.location.pathname.includes("vikand")
		) {
			return <Redirect to={"/vikandconnect"} />;
		}
		if (
			window.location.origin === "https://stage2.frontm.com" ||
			window.location.pathname.includes("stage2")
		) {
			return <Redirect to={"/vikandconnect"} />;
		}
		if (
			window.location.origin === "https://sattrackland.thuraya.com" ||
			window.location.pathname.includes("sattrackland")
		) {
			return <Redirect to={"/sattrackland"} />;
		}
		if (
			window.location.origin === "https://stage3.frontm.com" ||
			window.location.pathname.includes("stage3")
		) {
			return <Redirect to={"/sattrackland"} />;
		}

		if (
			window.location.origin === "https://onecare.frontm.com" ||
			window.location.pathname.includes("onecare")
		) {
			return <Redirect to={"/onecare"} />;
		}

		if (
			window.location.origin === "https://stage5.frontm.com" ||
			window.location.pathname.includes("stage5")
		) {
			return <Redirect to={"/onecare"} />;
		}

		if (
			window.location.origin === "https://onship.app" ||
			window.location.pathname.includes("onship")
		) {
			return <Redirect to={"/onship"} />;
		}

		if (
			window.location.origin === "https://stage.frontm.com" ||
			window.location.pathname.includes("stage")
		) {
			return <Redirect to={"/onship"} />;
		}

		if (
			window.location.origin === "https://ssvideokonnect.com" ||
			window.location.pathname.includes("ssvideokonnect")
		) {
			return <Redirect to={"/stationsatcom"} />;
		}
		if (
			window.location.origin === "https://stage6.frontm.com" ||
			window.location.pathname.includes("stage6")
		) {
			return <Redirect to={"/stationsatcom"} />;
		}
		if (
			window.location.origin === "https://sigmaxpoc.frontm.com" ||
			window.location.pathname.includes("sigma")
		) {
			return <Redirect to={"/sigma"} />;
		}

		return <Redirect to={"/login"} />;
	}

	if (!jitsiCallData) {
		return <Redirect to={"/app/home"} />;
	}

	const videoOpts = window["jitsiVideoCall"]?.options;
	const message = window["jitsiVideoCall"]?.message;
	const room = message.meetingId;
	configOverwrite = { ...configOverwrite, ...videoOpts.configOverwrite };
	interfaceConfigOverwrite = {
		...interfaceConfigOverwrite,
		...videoOpts.interfaceConfigOverwrite,
	};
	return (
		<JitsiMeeting
			domain={videoOpts.domain}
			roomName={room}
			configOverwrite={configOverwrite}
			interfaceConfigOverwrite={interfaceConfigOverwrite}
			jwt={message.jwt}
			userInfo={{
				displayName: "YOUR_USERNAME",
			}}
			onApiReady={(externalApi) => {
				// here you can attach custom event listeners to the Jitsi Meet External API
				// you can also store it locally to execute commands
			}}
			getIFrameRef={(iframeRef) => {
				iframeRef.style.height = "95%";
				iframeRef.style.position = "absolute";
				iframeRef.style.top = "50px";
				iframeRef.style.width = "100%";
			}}
		/>
	);
}

export default JitsiCall;
