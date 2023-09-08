import React, { useRef } from "react";
import Typography from "@mui/material/Typography";
import Popper from "@mui/material/Popover";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import moment from "moment";
import { getAuthData } from "../../../../Services/StorageService";

const DrawAttentionIcon = styled(Box)(({ theme }) => ({
	border: theme.spacing(1),
	borderRadius: theme.spacing(0.5),
	height: theme.spacing(2.25),
	width: theme.spacing(2.25),
	marginTop: "6px",
	marginRight: "18px",
	backgroundColor: "#147e40",
	color: "white",
	fontSize: theme.spacing(24),
}));

const Caption = styled("div")(() => ({
	fontSize: "10px",
	marginBottom: "10px",
}));

const PopoverInnerDiv = styled("div")(({ theme }) => ({
	padding: theme.spacing(1),
	paddingLeft: theme.spacing(4),
	paddingRight: theme.spacing(2),
	paddingTop: theme.spacing(5),
	display: "inline-flex",
	width: 400,
	height: "100%",
}));

const PopoverContainer = styled(Popper)(({ theme }) => ({
	pointerEvents: "none",
	padding: theme.spacing(2),
}));

const MainContainer = styled("div")(() => ({
	height: "100%",
}));

const EventTitle = styled("div")(() => ({
	pointerEvents: "none",
	"& span": {
		fontWeight: "bold",
	},
}));

const MbText = styled(Typography)(({ theme }) => ({
	marginBottom: theme.spacing(2),
}));

const EventCalendarComponent = ({ event, changeSelectedEventRef, view }) => {
	let { content } = event;
	const wrapperRef = useRef(null);
	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";
	moment.tz.setDefault(userTimezone || defaultUserTimezone);

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverOpen = (e) => {
		setAnchorEl(e.currentTarget);
		changeSelectedEventRef(event.id);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "mouse-over-popover" : undefined;

	const renderContentFiledValues = ({ type, value, fileName }) => {
		let tempValue = "";
		switch (type) {
			case "text_field":
			case "number":
			case "text_area":
			case "radiobutton":
				tempValue = value;
				break;
			case "dropdown":
			case "checkbox":
			case "switch":
			case "multi_selection":
				tempValue = value;
				break;
			case "file_field":
				tempValue = fileName;
				break;
			case "buttons_field":
				tempValue = value?.text || "";
				break;
			case "date":
				tempValue = value ? moment(value).format("ll") : "";
				break;
			case "time":
				tempValue = value ? moment(value).format("LT") : "";
				break;
			case "datetime":
				tempValue = value ? moment(value).format("lll") : "";
				break;
			case "password_field":
			case "slider":
			case "image_field":
			case "lookup":
				tempValue = value || "";
				break;
		}
		return tempValue;
	};

	return (
		<MainContainer
			ref={wrapperRef}
			onMouseEnter={handlePopoverOpen}
			onMouseLeave={handlePopoverClose}
		>
			{view !== "month" ? (
				<>
					<Typography variant="subtitle2">{event.title}</Typography>
					<Caption>
						{moment(event.start).format("LT")} -{" "}
						{moment(event.end).format("LT")}
					</Caption>
					{content.map((item) => {
						{
							return (
								<EventTitle
									key={item.id}
									aria-owns={open ? "mouse-over-popover" : undefined}
									aria-haspopup="true"
								>
									<Typography variant="caption" gutterBottom>
										{renderContentFiledValues(item)}
									</Typography>
								</EventTitle>
							);
						}
					})}
				</>
			) : (
				<EventTitle
					aria-owns={open ? "mouse-over-popover" : undefined}
					aria-haspopup="true"
				>
					<Typography variant="caption" display="block">
						{event.title}
					</Typography>
				</EventTitle>
			)}

			<PopoverContainer
				id={id}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "center",
					horizontal: "left",
				}}
				onClose={handlePopoverClose}
			>
				<PopoverInnerDiv>
					<DrawAttentionIcon />
					<Grid container>
						<Grid item xs={12}>
							<Typography variant="h6">{event.title}</Typography>
							<MbText variant="body1" gutterBottom>
								{moment(event.start).format("LLLL")} -{" "}
								{moment(event.end).format("LT")}
							</MbText>
						</Grid>
						{content.map((elem, i) => (
							<Grid item xs={12} key={i}>
								<Typography variant="caption" display="block">
									{elem.title}
								</Typography>
								<Typography variant="body1" gutterBottom>
									{renderContentFiledValues(elem)}
								</Typography>
							</Grid>
						))}
					</Grid>
				</PopoverInnerDiv>
			</PopoverContainer>
		</MainContainer>
	);
};

export default EventCalendarComponent;
