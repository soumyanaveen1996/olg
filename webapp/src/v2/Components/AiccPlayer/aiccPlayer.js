import { useEffect } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const AiccPlayer = ({ message }) => {
	useEffect(() => {
		document.addEventListener("keydown", function (e) {
			console.log("key press" + e.keyCode);
		});
		// detect enter or exit fullscreen mode
		document.addEventListener("webkitfullscreenchange", fullscreenChange);
		document.addEventListener("mozfullscreenchange", fullscreenChange);
		document.addEventListener("fullscreenchange", fullscreenChange);
		document.addEventListener("MSFullscreenChange", fullscreenChange);
	}, []);

	const fullscreen = () => {
		// check if fullscreen mode is available
		if (
			document.fullscreenEnabled ||
			document.webkitFullscreenEnabled ||
			document.mozFullScreenEnabled ||
			document.msFullscreenEnabled
		) {
			// which element will be fullscreen
			const iframe = document.querySelector("#iFrameContainer");
			// Do fullscreen
			if (iframe.requestFullscreen) {
				iframe.requestFullscreen();
			} else if (iframe.webkitRequestFullscreen) {
				iframe.webkitRequestFullscreen();
			} else if (iframe.mozRequestFullScreen) {
				iframe.mozRequestFullScreen();
			} else if (iframe.msRequestFullscreen) {
				iframe.msRequestFullscreen();
			}
		} else {
			document.querySelector(".error").innerHTML =
				"Your browser is not supported";
		}
	};

	const fullscreenChange = () => {
		if (
			document.fullscreenEnabled ||
			document.webkitIsFullScreen ||
			document.mozFullScreen ||
			document.msFullscreenElement
		) {
			console.log("enter fullscreen");
		} else {
			console.log("exit fullscreen");
		}
		// force to reload iframe once to prevent the iframe source didn't care about trying to resize the window
		// comment this line and you will see
		const iframe = document.querySelector("iframe");
		iframe.src = iframe.src;
	};
	return (
		<div style={{ marginTop: 12, height: "90vh" }}>
			<FullscreenIcon
				onClick={fullscreen}
				style={{
					position: "absolute",
					right: "50px",
					marginTop: "7px",
					fontSize: "45px",
					cursor: "pointer",
				}}
			/>
			<iframe
				id="iFrameContainer"
				src={message?.courseUrl}
				style={{ height: "95%", width: "100%" }}
				allowFullScreen={true}
			/>
		</div>
	);
};

export default AiccPlayer;
