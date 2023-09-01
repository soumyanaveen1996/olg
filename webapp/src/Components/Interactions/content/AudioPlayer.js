import React, { useEffect, useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import {
	getFileUrl,
	getFileUsingUrl,
	isFileFromS3,
} from "../../../Services/FilesService";
function AudioPlayer({ data, id, conversationId, options }) {
	// const [audioURL, setAudioURL] = useState("");
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [progressPercent, setProgressPercent] = useState(100);

	const [seconds, setSeconds] = useState("00");
	const [minute, setMinute] = useState("00");

	let fileName = Array.isArray(data) ? data[0] : data;

	if (!isLoaded) {
		getFileUsingUrl(getFileUrl(conversationId, fileName)).then((audioUrl) => {
			loadAudio(audioUrl, id);
		});
	}

	function pause() {
		let audio = document.getElementById("audio_" + id);
		audio.pause();
		setIsPlaying(false);
	}

	function loadAudio(audioUrl, id) {
		let audio = document.getElementById("audio_" + id);
		audio.src = audioUrl;
		audio.load();
		setIsLoaded(true);
	}

	useEffect(() => {
		if (isLoaded && isPlaying) {
			let audio = document.getElementById("audio_" + id);
			let duration = audio.duration;

			if (duration === Infinity || NaN) {
				duration = options?.duration
			}
			audio.play();
			let interval = null;

			interval = setInterval(() => {
				let progress = audio.currentTime + 0.3;
				if (progress >= duration) {
					setIsPlaying(false);
					setProgressPercent(100);
					audio.load();
				} else {
					setProgressPercent(100 - (progress / duration) * 100);
				}

				let computedSecond =
					progress < 10 ? `0${parseInt(progress)}` : parseInt(progress);
				let minuteCounter = Math.floor(progress / 60);
				let computedMinute =
					minuteCounter < 10 ? `0${minuteCounter}` : `${minuteCounter}`;

				setSeconds(computedSecond);
				setMinute(computedMinute);
			}, 10);
			return () => {
				clearInterval(interval);
			};
		}
	}, [isPlaying, progressPercent]);

	return (
		<div
			className="d-flex justify-content-end align-items-center"
			style={{
				height: "60px",
				flexDirection: "row-reverse",
				margin: "5px 0px",
			}}
		>
			<div
				style={{
					backgroundColor: "rgb(224, 240, 252)",
					height: "50px",
					width: "290px",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "5px",
				}}
			>
				<span
					className="btn"
					style={{
						backgroundColor: "rgb(0, 150, 251)",
						color: "white",
						borderRadius: "50%",
						height: "30px",
						width: "30px",
						display: "flex",
						justifyContent: "space-around",
						alignItems: "center",
						marginRight: "5px",
					}}
				>
					{isPlaying ? (
						<PauseIcon onClick={() => pause()} />
					) : (
						<PlayArrowIcon onClick={() => setIsPlaying(true)} />
					)}
				</span>
				<div style={{
					position: "relative",
					top: 0,
					left: 0,
				}}>
					<img
						src="/img/progressBar.jpg"
						width="200px"
						height="30px"
						style={{
							clipPath: `inset(0% ${progressPercent}% 0% 0%)`,
							position: "absolute",
						}}
					/>
					<img
						src="/img/progressBar.jpg"
						width="200px"
						height="30px"
						style={{
							opacity: "0.3",
						}}
					/>
				</div>
				<div className="ml-1">
					<span>{minute}</span>
					<span>:</span>
					<span>{seconds}</span>
				</div>
			</div>
			<audio src="" id={"audio_" + id} preload="auto">
				Your browser does not support the audio format.
			</audio>
		</div>
	);
}

export default AudioPlayer;
