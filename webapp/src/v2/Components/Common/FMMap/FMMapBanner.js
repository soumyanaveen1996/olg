import React, { useState } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

function FMMapBanner() {
	const [visibility, setVisibility] = useState(() => {
		if (localStorage.getItem("fMMapBanner")) {
			return true;
		} else {
			return false;
		}
	});

	const onClose = () => {
		localStorage.removeItem("fMMapBanner");
		setVisibility(false);
	};

	return (
		<Box
			style={{
				display: "flex",
				justifyContent: "center",
				position: "absolute",
				zIndex: 9999,
				left: "22%",
				right: "22%",
			}}
		>
			<Box
				style={{
					display: visibility ? "block" : "none",
					padding: "2px 13px 2px 23px",
					borderRadius: "10px",
					backgroundColor: "rgba(42, 45, 60, 0.8)",
					margin: "10px 13px 2px 0",
					fontSize: "14px",
					fontWeight: 500,
					fontStretch: "normal",
					fontStyle: "normal",
					lineHeight: "normal",
					letterSpacing: "normal",
					textAlign: "center",
					color: "#fff",
				}}
			>
				<Box component="span">
					Weather information sourced from World weather online. There might be
					some differences with weather forecast from local agencies
				</Box>
				<a
					className={`close-icon modal-close-header`}
					style={{
						display: "inline-block",
						border: "none",
						position: "relative",
						top: "3px",
					}}
					onClick={onClose}
				>
					<CloseIcon style={{ color: "white", fontSize: 18 }}></CloseIcon>
				</a>
			</Box>
		</Box>
	);
}

export default FMMapBanner;
