import React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Typography,
	IconButton,
	Box,
} from "@mui/material";
import MuiDialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import FMMap from "./FMMap";
import { styled } from "@mui/material/styles";

const DialogStyles = styled(Dialog)(() => ({
	"& .paper": {
		width: "90%",
		height: "80%",
		maxWidth: "unset",
		maxHeight: "unset",
	},
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
	position: "absolute",
	right: theme.spacing(1),
	top: theme.spacing(1),
	width: "8px",
	height: "8px",
}));

const CancelButton = styled(Button)(() => ({
	backgroundColor: "#E6F6FA",
	color: "#00A9D7",
}));

const DoneButton = styled(Button)(() => ({
	marginRight: "12px",
}));

const DialogRoot = styled(MuiDialogTitle)(({ theme }) => ({
	margin: 0,
	padding: theme.spacing(2),
}));

const DialogTitle = (props) => {
	const { children, onClose, ...other } = props;
	return (
		<DialogRoot disableTypography {...other}>
			<Typography variant="h6">{children}</Typography>
			{
				<CloseButton aria-label="close" onClick={onClose} size="large">
					<CloseIcon />
				</CloseButton>
			}
		</DialogRoot>
	);
};

export default function MapLookupPopup({
	conversation,
	messageType,
	options,
	message,
	rows,
}) {
	const [open, setOpen] = React.useState(false);
	const [scroll, setScroll] = React.useState("paper");

	const handleClickOpen = (scrollType) => () => {
		setOpen(true);
		setScroll(scrollType);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const descriptionElementRef = React.useRef(null);
	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	return (
		<div>
			<Button onClick={handleClickOpen("paper")}>scroll=paper</Button>
			{/* <Button onClick={handleClickOpen("body")}>scroll=body</Button> */}
			<DialogStyles
				open={open}
				onClose={handleClose}
				scroll={scroll}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<DialogTitle id="scroll-area-dialog-title" onClose={handleClose}>
					Select area
				</DialogTitle>
				<DialogContent dividers={scroll === "paper"}>
					<DialogContentText
						id="scroll-dialog-description"
						ref={descriptionElementRef}
						tabIndex={-1}
					>
						{/* {[...new Array(50)]
							.map(
								() => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
							)
							.join("\n")} */}
					</DialogContentText>
					<>
						<Box
							id="container-for-rendering-map-ina-popup"
							style={{
								left: "20px",
								right: "20px",
								height: "80%",
								position: "absolute",
							}}
						/>
						<FMMap
							conversation={conversation}
							messageType={messageType}
							options={options}
							message={message || rows}
							showAreaList={true}
							nomagnifyerCntrl={true}
							noFullScreencontrol={true}
							nosettingsCntrl={true}
							nomapsearchCntrl={true}
							mapContainer="container-for-rendering-map-ina-popup"
						/>
					</>
				</DialogContent>
				<DialogActions>
					<CancelButton onClick={handleClose} variant="contained">
						Cancel
					</CancelButton>
					<DoneButton onClick={handleClose} variant="contained" color="primary">
						Done
					</DoneButton>
				</DialogActions>
			</DialogStyles>
		</div>
	);
}
