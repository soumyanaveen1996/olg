import { Typography, styled } from "@mui/material";
import React from "react";
import Image from "@mui/icons-material/Image";
import cx from "classnames";

const DivContainer = styled("div")(({ theme, background }) => ({
	display: "flex",
	flexDirection: "column",
	position: "relative",
	height: 180,
	width: 300,
	backgroundColor: background || theme.palette.primary.main,
	borderRadius: "20px",
	boxShadow: `0 0 20px 0 rgba(42, 45, 60, 0.1)`,
	justifyContent: "center",
	alignItems: "center",
	color: "#ffffff",
	cursor: "pointer",

	"&.active::before": {
		content: '""',
		position: "absolute",
		display: "block",
		width: 0,
		left: "50%",
		bottom: 0,
		border: "8px solid transparent",
		borderBottom: 0,
		borderTopColor: background || theme.palette.primary.main,
		transform: "translate(-50%, 100%)",
	},

	"& .icon": {
		width: "100%",
		height: "auto",
		maxHeight: 80,
		maxWidth: 80,
		color: "inherit",
	},

	"& .label": {
		fontSize: "18px",
		fontWeight: "bold",
		textAlign: "center",
	},

	"& .description": {
		fontSize: "14px",
		textAlign: "center",
		textAlign: "center",
	},
}));

export default function MenuItem({
	menuEntry,
	isActive,
	onHandlePopOverOpen,
}) {
	const { titleColor, labelColor, descriptionColor } = menuEntry;
	const heading = titleColor || labelColor;

	return (
		<DivContainer
			className={cx({ active: isActive })}
			background={menuEntry.color}
			onClick={onHandlePopOverOpen}
		>
			<div>
				{menuEntry.icon ? (
					<img
						className="icon"
						src={menuEntry.icon}
						alt=""
						height="210px"
						width="210px"
					/>
				) : (
					<Image className="icon" />
				)}
			</div>
			<Typography className="label" style={{ color: heading }}>
				{menuEntry.label}
			</Typography>
			<Typography
				className="description"
				style={{ color: descriptionColor }}
			>
				{menuEntry.description}
			</Typography>
		</DivContainer>
	);
}