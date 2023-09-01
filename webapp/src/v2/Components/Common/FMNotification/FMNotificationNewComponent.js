import React, { useState, useEffect } from "react";
import {
	Link,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Checkbox,
	IconButton,
	Box,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
} from "@mui/material";
import _ from "lodash";
import ErrorIcon from "@mui/icons-material/ErrorOutline";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import parse from "html-react-parser";
import { styled } from "@mui/material/styles";

import { MessageTypeConstants } from "../../../../Services/Message";

const InfoIconBlock = styled(InfoIcon)(({ theme }) => ({
	verticalAlign: "top",
	marginRight: 10,
	color: theme.palette.info.main,
}));

const ErrorIconBlock = styled(ErrorIcon)(({ theme }) => ({
	verticalAlign: "top",
	marginRight: 10,
	color: theme.palette.error.main,
}));

const ListBlock = styled(List)(() => ({
	"&:hover": {
		backgroundColor: "transparent",
	},
}));

const IconBtnBlock = styled(IconButton)(() => ({
	"&:hover": {
		backgroundColor: "transparent",
	},
}));

const ListItemBlock = styled(ListItem)(() => ({
	backgroundColor: `${(props) => (props.isChecked ? "rgb(230,246,250)" : "")}`,
}));

const DialogTitleBlock = styled(DialogTitle)(() => ({
	paddingBottom: 0,
}));

const FMNotificationNewComponent = ({
	message,
	messageType,
	dismissNotifications,
	handleNewClose,
	handleAction,
	messageArr,
}) => {
	const [open, setOpen] = useState(false);
	const [checked, setChecked] = React.useState([]);
	useEffect(() => {
		if (!_.isEmpty(message)) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [message]);

	const handleDialogClose = () => {
		setOpen(false);
		handleNewClose();
	};

	const dismissSelectedNotifications = () => {
		dismissNotifications(checked?.map((ch) => ch?.messageId || ch?.uuid));
		setChecked([]);
	};

	// const options = [{id: 0,  msg: 'Hello 1'}, {id:2, msg: 'Hello 2'}, {id:3, msg: 'Hello 3'}, {id:4, msg: 'Hello 4'}, {id:5, msg: 'Hello 5'}, {id:6, msg: 'Hello 6'}, {id:7, msg: 'Hello 7'}];
	const options = [
		{
			userId: "qpTTkKV4CsVVWaiP5bYcEy",
			conversation: "qpTTkKV4Cs-4c800661c0a8",
			bot: "6SZtNgBggr5MQubm6V2RN1",
			createdOn: "2022-05-26T12:43:41.200Z",
			contentType: "280",
			messageType: "standard_notification",
			addedByBot: true,
			messageId: "r8udXAeSHm2Z3yJ4jN9zPB",
			uuid: "r8udXAeSHm2Z3yJ4jN9zPB",
			messageDate: "2022-05-26T12:43:41.200Z",
			botKey: null,
			status: 0,
			message:
				"SOS message received from MSISDN 821622991166 at 26/05/2022 12:43:35 (GMT)",
			options: null,
		},
	];
	const isAllSelected =
		messageArr.length > 0 && checked.length === messageArr.length;

	const handleToggle = (value) => () => {
		const currentIndex = checked
			.map((ch) => ch?.uuid || ch?.messageId)
			.indexOf(value?.uuid || value?.messageId);
		const newChecked = [...checked];
		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleSelectAll = (e) => {
		if (e.target.checked) {
			return setChecked(messageArr);
		}
		setChecked([]);
	};

	return (
		<Dialog
			open={open}
			onClose={handleDialogClose}
			disableEscapeKeyDown
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth
			PaperProps={{
				style: { borderRadius: 10, maxHeight: 400 },
			}}
		>
			<DialogTitleBlock>
				<span>Notifications</span>
				<IconButton
					disableRipple
					edge="end"
					style={{ position: "relative", left: "70%" }}
					onClick={handleDialogClose}
					size="large"
				>
					<CloseIcon />
				</IconButton>
				<Box style={{ marginLeft: "4px" }}>
					<Checkbox
						//defaultChecked
						checked={isAllSelected}
						color="primary"
						onChange={handleSelectAll}
						indeterminate={
							checked.length > 0 && checked.length < messageArr.length
						}
					/>
					<Link
						component="button"
						variant="body2"
						underline="none"
						sx={
							!checked.length && {
								color: "gray",
								cursor: "default",
								pointerEvents: "none",
							}
						}
						onClick={dismissSelectedNotifications}
					>{`Dismiss (${checked.length}) notifications selected`}</Link>
				</Box>
			</DialogTitleBlock>
			<DialogContent
				PaperProps={{
					style: { maxHeight: 200, overflow: "auto", paddingTop: 0 },
				}}
			>
				<DialogContentText id="alert-dialog-description">
					<ListBlock>
						{messageArr?.map((value, index, array) => {
							if (typeof array[array.length - 1 - index]?.message == "string") {
								const listItemId =
									array[array.length - 1 - index]?.uuid ||
									array[array.length - 1 - index]?.messageId;
								const headingId = `checkbox-list-label-${listItemId}`;
								const descriptionId = `checkbox-list-description-${listItemId}`;
								const isChecked =
									checked
										.map((ch) => ch?.uuid || ch?.messageId)
										.indexOf(listItemId) !== -1;
								return (
									<ListItemBlock
										key={listItemId}
										style={{ cursor: "default" }}
										sx={
											!array[array.length - 1 - index]?.markAsOld && {
												backgroundColor: "rgb(254,247,225)",
											}
										}
										isChecked={isChecked}
										disableRipple
										role={undefined}
										dense
										button
									>
										<ListItemIcon>
											<Checkbox
												edge="start"
												color="primary"
												onChange={handleToggle(array[array.length - 1 - index])}
												checked={isChecked}
												tabIndex={-1}
												disableRipple
												inputProps={{ "aria-labelledby": headingId }}
											/>
										</ListItemIcon>
										{array[array.length - 1 - index]?.messageType ===
											MessageTypeConstants.MESSAGE_TYPE_STD_NOTIFICATION && (
											<>
												<ListItemText
													id={descriptionId}
													primary={
														<div style={{ fontWeight: "bold" }}>
															Standard Notification
														</div>
													}
													secondary={
														<>
															<div>
																{parse(
																	array[array.length - 1 - index]?.message
																)}
															</div>
														</>
													}
												/>
												<IconBtnBlock
													disableRipple
													style={{ cursor: "default" }}
													edge="end"
													aria-label="information"
													size="large"
												>
													<InfoIconBlock />
												</IconBtnBlock>
											</>
										)}
										{array[array.length - 1 - index]?.messageType ===
											MessageTypeConstants.MESSAGE_TYPE_CRITICAL_NOTIFICATION && (
											<>
												<ListItemText
													id={descriptionId}
													primary={
														<div style={{ fontWeight: "bold" }}>
															Critical Notification
														</div>
													}
													secondary={
														<>
															<div>
																{parse(
																	array[array.length - 1 - index]?.message
																)}
															</div>
														</>
													}
												/>
												<IconBtnBlock
													disableRipple
													style={{ cursor: "default" }}
													edge="end"
													aria-label="critical"
													size="large"
												>
													<ErrorIconBlock />
												</IconBtnBlock>
											</>
										)}
										{array[array.length - 1 - index]?.messageType ===
											MessageTypeConstants.MESSAGE_TYPE_AUTHORIZATION_REQUEST && (
											<>
												<ListItemText
													id={descriptionId}
													primary={
														<div style={{ fontWeight: "bold" }}>
															Authorization Request
														</div>
													}
													secondary={
														<>
															<div>
																{parse(
																	array[array.length - 1 - index]?.message
																)}
															</div>
														</>
													}
												/>
											</>
										)}
									</ListItemBlock>
								);
							}
						})}
					</ListBlock>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{messageType ===
				MessageTypeConstants.MESSAGE_TYPE_AUTHORIZATION_REQUEST ? (
					<>
						<Button
							onClick={() => {
								setOpen(false);
								handleAction("cancel");
							}}
							color="primary"
							variant="outlined"
						>
							{message?.cancel}
						</Button>
						<Button
							onClick={() => {
								setOpen(false);
								handleAction("confirm");
							}}
							color="primary"
							variant="confirm"
							autoFocus
						>
							{message?.confirm}
						</Button>
					</>
				) : null}
			</DialogActions>
		</Dialog>
	);
};

export default FMNotificationNewComponent;
