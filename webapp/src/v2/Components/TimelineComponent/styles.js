import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import Carousel from "nuka-carousel";
import IconButton from "@mui/material/IconButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
	color: theme.palette.text.secondary,
	borderRadius: 20,
	boxShadow: "0 2px 4px 0 #dbe4f9",
}));

const UserName = styled(Typography)(() => ({
	color: "#4f5b7d",
	fontFamily: "SF Pro Text Regular",
	fontSize: 14,
	fontWeight: 600,
	// marginLeft: 10,
}));

const MessageText = styled(Typography)(() => ({
	color: "#4f5b7d",
	fontFamily: "SF Pro Text Light",
	fontSize: 14,
	margin: "10px 0",
	"& a": {
		fontWeight: "bold",
		color: "#638dff",
	},
	wordBreak: "break-word",
	whiteSpace: "pre-line",
}));

const DotIcon = styled(FiberManualRecordIcon)(() => ({
	fontSize: 8,
	margin: "3px 0 0 5px",
	color: "#9c9ea7",
}));

const TimeText = styled(Typography)(() => ({
	color: "#9c9ea7",
	fontFamily: "SF Pro Text Regular",
	fontSize: 12,
	margin: "3px 0 0 5px",
}));

const ReadMoreText = styled(Typography)(() => ({
	color: "#638dff",
	fontFamily: "SF Pro Text Regular",
	fontSize: 14,
	margin: "0 0 10px 0",
	cursor: "pointer",
}));

const BookmarkDefaultIcon = styled(BookmarkBorderOutlinedIcon)(() => ({
	fontSize: 25,
	color: "#959caa",
	cursor: "pointer",
}));

const BookmarkSelectedIcon = styled(BookmarkIcon)(() => ({
	fontSize: 25,
	cursor: "pointer",
	color: "#638dff",
}));

const BookmarkText = styled(Typography)(() => ({
	color: "#959caa",
	fontFamily: "SF Pro Text Regular",
	fontSize: 14,
	marginLeft: 5,
}));

const LinkTitleText = styled(Typography)(() => ({
	color: "#4f5b7d",
	fontFamily: "SF Pro Text Regular",
	fontSize: 14,
	fontWeight: 600,
}));

const LinkSubTitleText = styled(Typography)(() => ({
	color: "#4f5b7d",
	fontFamily: "SF Pro Text Light",
	fontSize: 12,
}));

const LinkFooter = styled(Typography)(() => ({
	color: "#959caa",
	fontFamily: "SF Pro Text Regular",
	fontSize: 12,
}));

const LinkCardContent = styled(CardContent)(() => ({
	flex: "1 0 auto",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	padding: "21px 0 16px 0",
}));

const LinkMainBox = styled(Box)(() => ({
	padding: "0 25px",
	display: "flex",
	flexDirection: "column",
}));

const LinkCard = styled(Card)(() => ({
	display: "flex",
	borderRadius: 10,
	margin: "15px 0 10px",
	boxShadow: "0 0 20px 0 rgba(198, 213, 238, 0.4)",
	cursor: "pointer",
}));

const MainStack = styled(Stack)(() => ({
	margin: "12px 0",
	width: "50%",
	alignSelf: "center",
}));

const LinkMedia = styled(CardMedia)(() => ({
	width: 178,
	height: 135,
	objectFit: "fill",
}));

const CarouselImage = styled("img")(() => ({
	width: "100%",
	maxHeight: "50vh",
	objectFit: "contain",
}));

const CarouselVideo = styled("video")(() => ({
	width: "100%",
	maxHeight: "50vh",
}));

const CarouselContainer = styled(Carousel)(() => ({
	"& .slide": {
		display: "flex",
		flexGrow: "inherit",
	},
	"& .dots": {
		top: 32,
		"& .paging-item": {
			"&.active": {
				fill: "#dbe4f9",
			},
			"& button": {
				fill: "rgba(79, 91, 125, 0.3)",
			},
		},
	},
}));

const CarouselIconButtonNext = styled(IconButton)(() => ({
	"&:hover": {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		width: "52px",
		height: "89px",
		borderBottomLeftRadius: "90px",
		borderTopLeftRadius: "90px",
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},
	"& svg": {
		color: "#ffffff",
	},
}));

const CarouselIconButtonPrev = styled(IconButton)(() => ({
	"&:hover": {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		width: "52px",
		height: "89px",
		borderBottomRightRadius: "90px",
		borderTopRightRadius: "90px",
		borderBottomLeftRadius: 0,
		borderTopLeftRadius: 0,
	},
	"& svg": {
		color: "#ffffff",
	},
}));

const FileMedia = styled(CardMedia)(() => ({
	width: 50,
	height: "50%",
	objectFit: "contain",
	alignSelf: "center",
	paddingLeft: 17,
	paddingTop: 14,
	paddingBottom: 14,
}));

const FileDownloadIcon = styled(FileDownloadOutlinedIcon)(() => ({
	fontSize: 30,
	color: "#638dff",
	alignSelf: "center",
}));

const FileCardContent = styled(CardContent)(() => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
}));

const FileMainBox = styled(Box)(() => ({
	width: "100%",
	display: "flex",
	justifyContent: "space-between",
	paddingRight: 17,
}));

const FileTitleText = styled(Typography)(() => ({
	color: "#4f5b7d",
	fontFamily: "SF Pro Text Regular",
	fontSize: 14,
	fontWeight: 600,
	display: "inline-block",
	width: "200px",
	whiteSpace: "nowrap",
	overflow: "hidden !important",
	textOverflow: "ellipsis",
}));

const FileSubTitleText = styled(Typography)(() => ({
	color: "#959caa",
	fontFamily: "SF Pro Text Regular",
	fontSize: 12,
}));

const TagStack = styled(Stack)(() => ({
	display: "block",
	flexDirection: "row",
	padding: "0 30px",
}));

const TagButton = styled(Button)(({ isSelected }) => ({
	borderRadius: "30px",
	fontSize: "14px",
	fontWeight: 500,
	textTransform: "none",
	margin: "5px 5px",
	...(isSelected
		? {
				backgroundColor: "#2fc76f",
				border: "none",
				color: "#ffffff",
				"&:hover": {
					backgroundColor: "#2fc76f",
					border: "none",
				},
		  }
		: {
				backgroundColor: "transparent",
				border: "solid 1px rgba(79, 91, 125, 0.2)",
				color: "#4f5b7d",
		  }),
}));

const BookmarkButton = styled(Button)(({ isSelected }) => ({
	borderRadius: "30px",
	fontSize: "14px",
	fontWeight: 500,
	textTransform: "none",
	margin: "5px 5px",
	boxShadow: "0 2px 4px 0 #dbe4f9",
	...(isSelected
		? {
				backgroundColor: "#2fc76f",
				border: "none",
				color: "#ffffff",
				"&:hover": {
					backgroundColor: "#2fc76f",
					border: "none",
				},
		  }
		: {
				backgroundColor: "#ffffff",
				border: "none",
				color: "#4f5b7d",
		  }),
}));

const RefreshButton = styled(IconButton)(() => ({
	borderRadius: "30px",
	fontSize: "18px",
	fontWeight: 500,
	textTransform: "none",
	margin: "5px 5px",
	boxShadow: "0 2px 4px 0 #dbe4f9",
	backgroundColor: "#ffffff",
	border: "none",
	color: "#4f5b7d",
}));

const TimelineSurveyContainer = styled(Paper)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	gap: "5px",
	flexGrow: 0,
	margin: "11px 0px 15px 1px",
	padding: "32px 81px 35px 59px",
	background: "linear-gradient(72deg, #093D61 0%, #00A7D6 100%)",
	boxShadow: "0 2px 4px 0 #dbe4f9",
	borderRadius: "10px",
}));

const TimelineSurveyHeading = styled(Typography)(() => ({
	color: "#fff",
	fontFamily: "SF Pro Text Regular",
	fontSize: 16,
	fontWeight: 500,
	display: "inline-block",
	width: "100%",
	whiteSpace: "nowrap",
	overflow: "hidden !important",
	textOverflow: "ellipsis",
}));

const TimelineSurveyTitle = styled(Typography)(() => ({
	color: "#fff",
	fontFamily: "SF Pro Text Regular",
	fontSize: 27,
	fontWeight: 500,
	display: "inline-block",
}));

const TimelineSurveyButton = styled(Button)(({ theme }) => ({
	borderRadius: "20px",
	border: "none",
	padding: "4px 30px",
	textTransform: "none",
	marginTop: theme.spacing(2),
	backgroundColor: "#638dff",
	color: "#FFFFFF",
	fontFamily: "SF Pro Text Bold",
	fontSize: 15,
	boxShadow: "none",
	"&:hover": {
		backgroundColor: "#4c71d6",
	},
	"&:focus": {
		boxShadow: "0 0 6px 0 #638dff !important",
	},
	"&:disabled": {
		backgroundColor: "#aeb8d6",
		color: "#e8ecf8",
	},
}));

export {
	Item,
	UserName,
	MessageText,
	DotIcon,
	TimeText,
	BookmarkDefaultIcon,
	BookmarkText,
	ReadMoreText,
	LinkTitleText,
	LinkSubTitleText,
	LinkCardContent,
	LinkMainBox,
	LinkCard,
	MainStack,
	LinkMedia,
	LinkFooter,
	CarouselImage,
	CarouselContainer,
	CarouselVideo,
	CarouselIconButtonNext,
	CarouselIconButtonPrev,
	FileMedia,
	FileDownloadIcon,
	FileCardContent,
	FileMainBox,
	FileTitleText,
	FileSubTitleText,
	TagStack,
	TagButton,
	BookmarkSelectedIcon,
	TimelineSurveyContainer,
	TimelineSurveyHeading,
	TimelineSurveyTitle,
	TimelineSurveyButton,
	BookmarkButton,
	RefreshButton,
};
