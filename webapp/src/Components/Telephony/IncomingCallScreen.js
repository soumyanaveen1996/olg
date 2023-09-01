import React from "react";
import { SmallCircleButton } from "../Common/SmallCircleButton";

const IncomingCallScreen = (props) => {
	let { rejectCall, acceptCall, from, onClose, videoEnabled } = props;

	return (
		<div
			className="p-3"
			style={{
				backgroundImage: "linear-gradient(#51555a,#272e35)",
				height: "auto",
				borderRadius: "0.3rem",
				overflow: "hidden",
			}}
		>
			<div className="d-flex justify-content-between">
				<div>
					{/*<SmallCircleButton*/}
					{/*  backgroundColor="#2A2D3C"*/}
					{/*  color="#fff"*/}
					{/*  iconClass="icon-cog2"*/}
					{/*  onClick={this.props.onClick}*/}
					{/*/>*/}
				</div>
				<SmallCircleButton
					backgroundColor="#2A2D3C"
					color="#fff"
					iconClass="icon-cross"
					onClick={onClose}
				/>
			</div>

			<div className="mt-3 text-center">
				<div style={{ fontSize: "30px", fontWeight: "bold", color: "#fff" }}>
					{from}
				</div>

				<div style={{ color: "#2FC76F", fontSize: "14px", fontWeight: "bold" }}>
					IS CALLING...
				</div>
			</div>

			<div
				className="d-flex justify-content-center align-items-center"
				style={{ marginTop: "50px" }}
			>
				<img src="/img/calling-emptyavatar.png" />
			</div>

			<div className="d-flex justify-content-center align-items-center mt-4">
				<a
					className="d-flex justify-content-center align-items-center btn btn-success btn-icon-o btn-sm mx-1 btn-rounded mb-2"
					style={{ height: "60px", width: "60px" }}
					onClick={acceptCall}
				>
					{videoEnabled === true ? (
						<i
							className="fas fa-video"
							style={{ color: "#fff", backgroundColor: "#2fc76f" }}
						></i>
					) : (
						<img src="/img/call-receivecall-btn@2x.png" width="60" />
					)}
				</a>
				<a
					className="d-flex justify-content-center align-items-center btn btn-danger btn-icon-o btn-sm mx-1 btn-rounded mb-2"
					style={{ height: "60px", width: "60px" }}
					onClick={rejectCall}
				>
					<img src="/img/call-endcall-btn@2x.png" width="60" />
				</a>
			</div>
		</div>
	);
};

export default IncomingCallScreen;
