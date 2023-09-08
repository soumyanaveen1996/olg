import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { sendAMessage } from "../../../../State/actions/chats";
import { MessageTypeConstants } from "../../../../Services/Message";
import { useDispatch } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { getAuthData } from "../../../../Services/StorageService";
import { styled } from "@mui/material/styles";

const MainContainer = styled("div")(() => ({
	flexGrow: 1,
}));

const SearchBlock = styled("div")(({ theme }) => ({
	position: "relative",
	right: "18px",
	bottom: "2px",
	zIndex: 1,
	padding: "4px 0px",
	marginRight: "10px",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.common.white,
	"&:hover": {
		backgroundColor: theme.palette.common.white,
	},
	marginLeft: theme.spacing(1),
	// alignItems: "center",
	height: "30px",
}));

const SearchIconBlock = styled("div")(() => ({
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	paddingBottom: "8px",
	paddingLeft: "4px",
	transform: "scale(0.8)",
}));

const InputBaseBlock = styled(InputBase)(({ theme }) => ({
	padding: "0.75px 2px 0.75px calc(1em + 11px) !important",
	transition: theme.transitions.create("width"),
	width: "0",
	cursor: "pointer",
	"&.Mui-focused": {
		width: "340px",
		cursor: "unset",
		bottom: "10px",
	},
}));

function MapSearchButton({ options, parentTabId = null, handleAction }) {
	const dispatch = useDispatch();
	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";
	const [searchText, setSearchText] = useState(function () {
		return options?.activeQueryString || null;
	});
	const [shouldShowClrIcon, setShouldShowClrIcon] = useState(false);

	const onClear = (e) => {
		e.stopPropagation();
		setSearchText((oldVal) => {
			handleAction("clearSearch");
			return "";
		});
	};

	const handleSearch = (queryString) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options?.parent?.length ? parentTabId : options.tabId,
			action: "search",
			queryString,
			tz: userTimezone || defaultUserTimezone,
		};
		dispatch(sendAMessage(responseChat, true));
	};

	const handleSearchInput = (e) => {
		if (e.key === "Enter" && e.target.value !== "") {
			handleSearch(e.target.value);
		}
	};

	return (
		<MainContainer>
			<SearchBlock>
				<SearchIconBlock>
					<SearchIcon />
				</SearchIconBlock>
				<InputBaseBlock
					placeholder="Search.."
					value={searchText || ""}
					onChange={(e) => setSearchText(e.target.value)}
					onFocus={(e) => setShouldShowClrIcon(true)}
					onBlur={(e) => setTimeout(() => setShouldShowClrIcon(false), 400)}
					onKeyDown={handleSearchInput}
					inputProps={{ "aria-label": "search" }}
				/>
				<ClearIcon
					fontSize="small"
					style={{
						verticalAlign: "sub",
						cursor: "pointer",
						color: "rgba(0, 0, 0, 0.54)",
						height: "30px",
						paddingBottom: "9px",
						display: !shouldShowClrIcon ? "none" : "inline-block",
					}}
					onClick={onClear}
				/>
			</SearchBlock>
		</MainContainer>
	);
}

export default React.memo(MapSearchButton);
