import React, { useState, useEffect } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

function RecorderBox({ stopRecording, sendAudio }) {
	const [counter, setCounter] = useState(1);
	const [seconds, setSeconds] = useState("00");
	const [minute, setMinute] = useState("00");

	useEffect(() => {
		let interval = null;

		interval = setInterval(() => {
			const minuteCounter = Math.floor(counter / 60);
			const secondCounter = counter % 60;

			let computedSecond =
				secondCounter < 10 ? `0${secondCounter}` : secondCounter;

			let computedMinute =
				minuteCounter < 10 ? `0${minuteCounter}` : `${minuteCounter}`;

			setSeconds(computedSecond);
			setMinute(computedMinute);
			setCounter((counter) => counter + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, [counter]);

	return (
		<div
			style={{
				backgroundColor: "rgb(224, 240, 252)",
				width: "140px",
				height: "40px",
				borderRadius: "26px",
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center",
			}}
		>
			<span>
				<ClearIcon
					style={{
						color: "red",
					}}
					onClick={stopRecording}
				/>
			</span>
			<div>
				<span>{minute}</span>
				<span>:</span>
				<span>{seconds}</span>
			</div>
			<span>
				<CheckIcon
					style={{
						color: "rgb(47, 199, 111)",
					}}
					onClick={sendAudio}
				/>
			</span>
		</div>
	);
}

export default RecorderBox;
