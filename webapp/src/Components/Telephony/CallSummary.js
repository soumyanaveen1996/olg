import React, { useEffect, useState } from "react";
import { SmallCircleButton } from "../Common/SmallCircleButton";
import { getFormattedDuration } from "./Utils";

const CallSummary = (props) => {
	let { callDuration, phoneNumber, onClose } = props;
	const [callDurationState, setCallDuration] = useState(0);
	useEffect(() => {
		setCallDuration(callDuration);
	}, [callDuration]);

	return (
		<div
			className="p-3"
			style={{
				backgroundColor: "#fff",
				height: "500px",
				borderRadius: "0.3rem",
				overflow: "hidden",
			}}
		>
			<div className="d-flex justify-content-end">
				<SmallCircleButton
					backgroundColor="#2A2D3C"
					color="#fff"
					iconClass="icon-cross"
					onClick={onClose}
				/>
			</div>

			<div className="mt-3 text-center">
				<div
					style={{
						fontSize: "30px",
						fontWeight: "bold",
						color: "#666666",
					}}
				>
					{phoneNumber}
				</div>

				<div
					className="d-flex flex-column justify-content-center align-items-center"
					style={{ color: "#E5453B", fontSize: "14px", fontWeight: 500 }}
				>
					<div>{getFormattedDuration(callDurationState)}</div>
					<div>Call ended</div>
				</div>
			</div>

			<div
				className="d-flex justify-content-center align-items-center"
				style={{ margin: "75px auto" }}
			>
				<img src="/img/called-emptyavatar.png" />
			</div>
		</div>
	);
};

export default CallSummary;
