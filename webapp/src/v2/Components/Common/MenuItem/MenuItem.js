import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "@mui/icons-material/Image";

import { styled } from "@mui/material/styles";

const CardContainer = styled(Card)(({ theme }) => ({
	width: 275,
	height: 175,
	border: "1px solid #2DC0EF",
	"&:hover": {
		backgroundColor: "#2DC0EF",
		color: "#FFFFFF",
		fontWidth: 600,
		cursor: "pointer",
	},
}));

const TypographyContainer = styled(Typography)(({ theme }) => ({
	fontSize: 18,
	textAlign: "center",
	color: "inherit",
	wordWrap: "break-word",
}));

const divContainer = styled("div")(({ theme }) => ({
	textAlign: "center",
}));

const imgContainer = styled("div")(({ theme }) => ({
	width: "100%",
	height: "auto",
	maxHeight: 100,
	maxWidth: 100,
	color: "inherit",
}));

export default function MenuItem({ label, icon }) {
	return (
		<CardContainer>
			<CardContent>
				<divContainer>
					{!!icon ? (
						<imgContainer src={icon} alt="" />
					) : (
						<Image />
					)}
				</divContainer>
				<TypographyContainer gutterBottom>{label}</TypographyContainer>
			</CardContent>
		</CardContainer>
	);
}
