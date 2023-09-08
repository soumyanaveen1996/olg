import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import RefreshIcon from "@mui/icons-material/Refresh";
import { TagStack, TagButton, BookmarkButton, RefreshButton } from "./styles";
import { useSelector } from "react-redux";
import TypeLink from "./TypeLink";
import TypeFile from "./TypeFile";
import TypeGallery from "./TypeGallery";
import TypeSurvey from "./TypeSurvey";
import { sendAMessage } from "../../../State/actions/chats";
import { RENDER_MESSAGE_TYPE_TIMELINE } from "../../Containers/NonConversational/Store/types";
import { useDispatch } from "react-redux";
import PostBlock from "./PostBlock";
import { useIsInViewport } from "./hooks/useIsInViewPort";

const MainTimeline = ({ data, conversationId }) => {
	const dispatch = useDispatch();

	const ref1 = useRef(null);
	const isInViewport1 = useIsInViewport(ref1);
	const renderType = (type, item) => {
		let component = null;
		switch (type) {
			case "file":
				component = <TypeFile item={item} conversationId={conversationId} />;
				break;
			case "gallery":
				component = <TypeGallery item={item} />;
				break;
			case "survey":
				component = <TypeSurvey item={item} startSurvey={startSurvey} />;
				break;
			// case "link":
			// 	component = <TypeLink item={item} />;
			// 	break;
		}
		return component;
	};
	const {
		message: { rows, tags, options, nextSkip, selectedTags },
		isListEnd,
		isBookmarkOnly,
	} = data || {};
	const mapTags = tags?.map((i) => {
		if (selectedTags && selectedTags.length > 0 && selectedTags.includes(i)) {
			return { name: i, selected: true };
		} else {
			return { name: i, selected: false };
		}
	});
	const [filters, setFilters] = useState(mapTags || []);
	const [showBookmarked, setShowBookmarked] = useState(isBookmarkOnly);

	const startSurvey = (surveyId) => {
		const payload = {
			messageType: "timelineResponse",
			message: {
				action: "survey",
				tabId: options?.tabId,
				controlId: options?.controlId,
				content: {
					surveyId,
				},
			},
			messageId: data?.messageId,
		};
		dispatch(sendAMessage(payload, true));
	};

	const onBookmark = (contentId, unbookmark = false) => {
		const payload = {
			messageType: "timelineResponse",
			message: {
				tabId: options?.tabId,
				action: "bookmark",
				controlId: options?.controlId,
				content: unbookmark
					? {
							contentId: contentId,
							unbookmark,
					  }
					: {
							contentId: contentId,
					  },
			},
			messageId: data?.messageId,
		};
		updateBookmark(contentId);
		dispatch(sendAMessage(payload, true));
	};
	const NonConversationalData = useSelector(
		(state) => state.v2.NonConversational[conversationId]
	);

	const updateBookmark = (contentId) => {
		if (
			NonConversationalData &&
			!_.isEmpty(NonConversationalData) &&
			!_.isEmpty(NonConversationalData.components)
		) {
			NonConversationalData.components.forEach((item, i) => {
				if (
					item?.options?.tabId &&
					data?.options?.tabId &&
					item?.options?.tabId === data?.options?.tabId
				) {
					const test = [];
					data.message.rows.forEach((item, i) => {
						if (item.contentId === contentId) {
							test[i] = {
								...item,
								isBookmarked: !item.isBookmarked,
							};
						} else {
							test[i] = item;
						}
					});
					NonConversationalData.components[i] = {
						...data,
						message: {
							...data?.message,
							rows: test,
						},
					};
				}
			});
			dispatch({
				type: RENDER_MESSAGE_TYPE_TIMELINE,
				data: {
					[conversationId]: NonConversationalData,
				},
			});
		}
	};

	const resetData = (isBookmark) => {
		if (
			NonConversationalData &&
			!_.isEmpty(NonConversationalData) &&
			!_.isEmpty(NonConversationalData.components)
		) {
			NonConversationalData.components.forEach((item, i) => {
				if (
					item?.options?.tabId &&
					data?.options?.tabId &&
					item?.options?.tabId === data?.options?.tabId
				) {
					NonConversationalData.components[i] = {
						...data,
						message: {
							...data?.message,
							rows: [],
						},
						isBookmarkOnly: isBookmark,
					};
				}
			});
			dispatch({
				type: RENDER_MESSAGE_TYPE_TIMELINE,
				data: {
					[conversationId]: NonConversationalData,
				},
			});
		}
	};

	const onTagClick = (tagName, contentId) => {
		const index = filters.findIndex((i) => i.name === tagName);
		filters[index].selected = !filters[index]?.selected;
		const myArrayFiltered = tags.filter((el) => {
			return filters.some((f) => {
				return f.name === el && f.selected;
			});
		});
		const payload = {
			messageType: "timelineResponse",
			message: {
				tabId: options?.tabId,
				action: "refresh",
				controlId: options?.controlId,
				content: {
					showBookmarked: showBookmarked,
					tags: myArrayFiltered,
				},
			},
			messageId: data?.messageId,
		};
		setFilters([...filters]);
		resetData(showBookmarked);
		dispatch(sendAMessage(payload, true));
	};

	const onRefreshClick = () => {
		const payload = {
			messageType: "timelineResponse",
			message: {
				tabId: options?.tabId,
				action: "refresh",
				controlId: options?.controlId,
				content: {
					tags: [],
				},
			},
			messageId: data?.messageId,
		};
		resetData();
		dispatch(sendAMessage(payload, true));
	};

	const onPostView = (contentId) => {
		const payload = {
			messageType: "timelineResponse",
			message: {
				tabId: options?.tabId,
				action: "view",
				controlId: options?.controlId,
				content: {
					contentId: contentId,
					tags: [],
				},
			},
			messageId: data?.messageId,
		};
		dispatch(sendAMessage(payload, true));
	};

	const onLoad = () => {
		const myArrayFiltered = tags.filter((el) => {
			return filters.some((f) => {
				return f.name === el && f.selected;
			});
		});
		const payload = {
			messageType: "timelineResponse",
			message: {
				tabId: options?.tabId,
				controlId: options?.controlId,
				action: "loadMore",
				content: {
					showBookmarked: showBookmarked,
					skip: nextSkip,
					tags: myArrayFiltered,
				},
			},
			messageId: data?.messageId,
		};
		dispatch(sendAMessage(payload, true));
	};

	const onShowBookmarkedOnly = () => {
		const myArrayFiltered = tags.filter((el) => {
			return filters.some((f) => {
				return f.name === el && f.selected;
			});
		});
		const payload = {
			messageType: "timelineResponse",
			message: {
				tabId: options?.tabId,
				action: "refresh",
				controlId: options?.controlId,
				content: {
					showBookmarked: !showBookmarked,
					tags: myArrayFiltered,
				},
			},
			messageId: data?.messageId,
		};
		resetData(!showBookmarked);
		dispatch(sendAMessage(payload, true));
	};

	useEffect(() => {
		if (isInViewport1 && !isListEnd && rows?.length >= 5) {
			onLoad();
		}
	}, [isInViewport1]);

	return (
		<>
			<TagStack>
				{filters?.map((item) => {
					return (
						<TagButton
							onClick={() => onTagClick(item?.name)}
							isSelected={item?.selected}
							variant="outlined"
						>
							{item?.name}
						</TagButton>
					);
				})}
				<BookmarkButton
					onClick={() => {
						onShowBookmarkedOnly();
						setShowBookmarked(!showBookmarked);
					}}
					isSelected={showBookmarked}
					variant="outlined"
					startIcon={
						<BookmarksIcon sx={{ color: "#f2bf00", fontSize: "12px" }} />
					}
				>
					Bookmarked
				</BookmarkButton>
				<RefreshButton
					onClick={() => {
						onRefreshClick();
					}}
				>
					<RefreshIcon sx={{ color: "#f2bf00", fontSize: "20px" }} />
				</RefreshButton>
			</TagStack>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				{rows?.map((item, index) => {
					return (
						<PostBlock
							showAuthor={data.options.showAuthor}
							item={item}
							index={index}
							onPostView={onPostView}
							renderType={renderType}
							onBookmark={onBookmark}
						/>
					);
				})}
				<h4 ref={ref1} style={{ textAlign: "center", fontSize: 12 }}>
					{!isListEnd && rows?.length >= 5 ? "Loading..." : ""}
				</h4>
			</Box>
		</>
	);
};

export default MainTimeline;
