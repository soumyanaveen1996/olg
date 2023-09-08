import React from "react";
import { Card } from "reactstrap";

export default function CardLayout({
	width,
	height,
	children,
	onClick,
	style,
}) {
	return (
		<Card
			style={{
				display: "flex",
				flexDirection: "row",
				width: width,
				height: height,
				marginRight: "10px",
				border: "0.2px solid rgba(91,91,91,0.2)",
				borderRadius: "10px",
				boxShadow: "0 0 4px 0 rgba(0,0,0,0.08)",
				...style,
			}}
			onClick={onClick ? onClick : null}
		>
			{children}
		</Card>
	);
}
