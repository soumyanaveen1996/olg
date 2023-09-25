import {
	BookmarkDefaultIcon,
	BookmarkSelectedIcon,
	BookmarkText,
	DotIcon,
	Item,
	MainStack,
	MessageText,
	ReadMoreText,
	TimeText,
	UserName,
} from "./styles";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useIsInViewport } from "./hooks/useIsInViewPort";
import { useSelector } from "react-redux";
import moment from "moment-timezone";
import { getAuthData } from "../../../Services/StorageService";
import Linkify from "react-linkify";
import { chatDayFormats } from "../../../Utils/Helpers";
import { Box } from "@mui/material";
import DOMPurify from "dompurify";

const MAX_CHAR = 260;
const PostBlock = ({
	item,
	index,
	onPostView,
	renderType,
	onBookmark,
	showAuthor,
}) => {
	const ref1 = useRef(null);
	const isInViewport1 = useIsInViewport(ref1);
	const [isView, setView] = useState(false);
	const [isReadMore, setIsReadMore] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(item?.isBookmarked || false);
	const [bookmarkCount, setBookmarkCount] = useState(
		item?.bookmarkedCount || 0
	);
	const botWaitLoader = useSelector((state) => state.loader.botWaitLoader);

	useEffect(() => {
		if (!botWaitLoader && isInViewport1 && !isView) {
			setView(true);
			onPostView(item?.contentId);
		}
	}, [isInViewport1]);

	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";
	const dateToShow =
		item?.publishedOn && moment(item?.publishedOn).calendar(chatDayFormats);

	const componentDecorator = (href, text, key) => (
		<a href={href} key={key} target="_blank" rel="noopener noreferrer">
			{text}
		</a>
	);

	const sanitizedText = DOMPurify.sanitize(item?.text, { ALLOWED_TAGS: [] });

	return (
		<MainStack spacing={2} ref={ref1} key={index}>
			<div style={{ position: "relative" }}>
				<Item>
					<Stack direction="row" alignItems="center">
						{/* <Avatar alt="Remy Sharp" src="https://picsum.photos/id/237/200/300" /> */}
						{showAuthor && (
							<Fragment>
								<UserName variant="h6">{item?.publisherData?.name}</UserName>
								<DotIcon />
							</Fragment>
						)}
						<TimeText>
							{dateToShow === "Today"
								? item?.publishedOn &&
								moment(item.publishedOn)
									.tz(userTimezone || defaultUserTimezone)
									.format("HH:mm")
								: dateToShow}
						</TimeText>
					</Stack>
					<Linkify componentDecorator={componentDecorator}>
						{item?.text ? (
							<MessageText>
								{isReadMore ? (
									<Box
										component={"div"}
										dangerouslySetInnerHTML={{ __html: `${item?.text}` }}
									/>
								) : sanitizedText?.length > MAX_CHAR ? (
									<Box
										component={"div"}
										dangerouslySetInnerHTML={{
											__html: `${item?.text?.substring(0, MAX_CHAR)}...`,
										}}
									/>
								) : (
									<Box
										component={"div"}
										dangerouslySetInnerHTML={{ __html: `${item?.text}` }}
									/>
								)}
							</MessageText>
						) : (
							<MessageText />
						)}
						{sanitizedText?.length > MAX_CHAR && (
							<ReadMoreText onClick={() => setIsReadMore(!isReadMore)}>
								{isReadMore ? "Read Less" : "Read More"}
							</ReadMoreText>
						)}
					</Linkify>
					{renderType(item?.contentListView, item)}
					<Stack direction="row" alignItems="center">
						{isBookmarked ? (
							<BookmarkSelectedIcon
								onClick={() => {
									setBookmarkCount(bookmarkCount - 1);
									setIsBookmarked(false);
									onBookmark(item?.contentId, true);
								}}
							/>
						) : (
							<BookmarkDefaultIcon
								onClick={() => {
									setBookmarkCount(bookmarkCount + 1);
									setIsBookmarked(true);
									onBookmark(item?.contentId);
								}}
							/>
						)}
						{/*<BookmarkText>{bookmarkCount}</BookmarkText>*/}
					</Stack>
				</Item>
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "50px",
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						backgroundImage:
							"linear-gradient(to bottom, #b9a87a 0%, rgba(185, 168, 122, 0) 100%)",
						zIndex: item?.isViewed ? -1 : 2,
					}}
				/>
				<img
					src="./offlinelms/img/starIconNewPost.png"
					style={{
						position: "absolute",
						top: "15px",
						right: "20px",
						zIndex: item?.isViewed ? -1 : 2,
					}}
				/>
			</div>
		</MainStack>
	);
};

export default PostBlock;
