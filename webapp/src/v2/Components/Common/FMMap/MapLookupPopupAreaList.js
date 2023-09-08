import React, { useState } from "react";
import Divider from "@mui/material/Drawer";
import ListItemText from "@mui/material/Drawer";
import Radio from "@mui/material/Drawer";
import InputBase from "@mui/material/Drawer";
import RadioGroup from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/Drawer";
import FormControl from "@mui/material/Drawer";
import FormLabel from "@mui/material/Drawer";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/Drawer";
import List from "@mui/material/Drawer";
import ListItem from "@mui/material/Drawer";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const MainContainer = styled("div")(() => ({
	flexGrow: 1,
}));

const SearchBlock = styled("div")(({ theme }) => ({
	position: "relative",
	zIndex: 1,
	padding: "6px",
	borderRadius: theme.shape.borderRadius,
	left: "calc(100% - 230px)",
	top: "10px",
}));

const RootContainer = styled("div")(({ theme }) => ({
	width: "100%",
	display: "block",
	maxWidth: 480,
	left: "-16px",
	margin: 0,
	"& .MuiFormLabel-root": {
		margin: 0,
	},
	backgroundColor: theme.palette.background.paper,
}));

const InputBaseBlock = styled(InputBase)(({ theme }) => ({
	"& .input": {
		paddingLeft: `calc(1em + ${theme.spacing(2)})`,
		border: "1px solid rgba(0, 0, 0, 0.12)",
		backgroundColor: "white",
	},
}));

const SearchIconBlock = styled("div")(() => ({
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	paddingBottom: "10px",
	paddingLeft: "5px",
	zIndex: 1,
}));

const PaddingBlock = styled(List)(() => ({
	padding: 0,
}));

const ListItemBlock = styled(ListItem)(() => ({
	display: "block",
	"&:hover": {
		backgroundColor: "#e5f6fa",
	},
	paddingTop: "15px",
	paddingBottom: "15px",
}));

const SliderNavBannerStyles = styled("div")(() => ({
	minHeight: "70px",
	maxWidth: "31%",
	marginLeft: "-23px",
	position: "relative",
	backgroundColor: "#f4f4f4",
	borderBottom: "2px solid rgba(0, 0, 0, 0.12)",
}));

const DrawerBlock = styled(Drawer)(() => ({
	top: "183px",
	border: 0,
	flexShrink: 0,
	"& .paper": {
		borderRight: 0,
	},
}));

export default function MapLookupPopupAreaList({
	options,
	message,
	mapContainer,
	popupShudOpenCallback,
	setRowIdCallback,
	flyToCallback,
	parentTabId = null,
	geoPoints,
	rows,
	onStyleChange,
	conversation,
	messageType,
}) {
	const [value, setValue] = useState("Drafts");

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<>
			<SliderNavBannerStyles>
				<MainContainer>
					<SearchBlock>
						<SearchIconBlock>
							<SearchIcon />
						</SearchIconBlock>
						<InputBaseBlock
							placeholder="Search..."
							value={"" || ""}
							onChange={(e) => {}}
							onKeyDown={() => {}}
							classes={{
								root: { color: "inherit" },
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</SearchBlock>
				</MainContainer>
			</SliderNavBannerStyles>
			<RootContainer>
				<CssBaseline />
				<DrawerBlock
					variant="permanent"
					classes={{
						paper: { borderRight: 0 },
					}}
					PaperProps={{
						style: {
							position: "absolute",
							top: "162px",
							height: "71%",
							width: "30%",
						},
					}}
					BackdropProps={{
						style: {
							position: "absolute",
							top: "162px",
							height: "71%",
							width: "20%",
						},
					}}
					ModalProps={{
						container: document.getElementById(mapContainer),
						style: { position: "absolute" },
					}}
					anchor="left"
				>
					<div />
					<FormControl component="fieldset">
						<FormLabel component="legend"></FormLabel>
						<RadioGroup
							aria-label="arealist"
							name="area"
							value={value}
							onChange={handleChange}
						>
							<PaddingBlock>
								{[
									"Area 1",
									"Area 2",
									"Area 3",
									"Area 4",
									"Area 5",
									"Area 6",
									"Area 7",
									"Area 8",
									"Area 9",
									"Area 10",
									"Area 11",
									"Area 12",
								].map((text, index) => (
									<>
										<ListItemBlock key={index}>
											<FormControlLabel
												value={text}
												control={<Radio color="primary" value={text} />}
												label={<ListItemText primary={text} />}
											/>
										</ListItemBlock>
										<Divider />
									</>
								))}
							</PaddingBlock>
						</RadioGroup>
					</FormControl>
				</DrawerBlock>
			</RootContainer>
		</>
	);
}
