import React, { Component } from "react";
import PropTypes from "prop-types";
import { MessageTypeConstants } from "../../Services/Message";
import ModalPopup from "../ModalMessages/ModalPopup";
import Spinner from "react-spinkit";

function getHeight(results) {
	if (!results) {
		return "120px";
	}

	if (results.length === 0) {
		return "180px";
	}

	return "200px";
}

class ChatSearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = { selected: [] };
	}

	onChangeMessage = (e) => {
		this.setState({ message: e.target.value });
	};

	sendMessage = (e) => {
		e.preventDefault();
		let message = this.state.message;
		// console.log("all the search ", message);

		if (!message || !message.length) {
			return;
		}

		if (this.props.chatMessageFrom) {
			this.props.sendMessage(
				{
					message: { action: "search", queryString: message },
					messageType: MessageTypeConstants.MESSAGE_TYPE_SEARCH_BOX_RESPONSE,
				},
				null,
				this.props.conversation
			);
		} else {
			this.props.sendMessage({
				message: { action: "search", queryString: message },
				messageType: MessageTypeConstants.MESSAGE_TYPE_SEARCH_BOX_RESPONSE,
			});
		}

		this.setState({ lastSearchKey: message });

		this.props.sendSearchBoxQuery();
	};

	showMoreInfo = (info, text) => {
		this.setState({ moreInfo: info, moreInfoTitle: text });
	};

	hideMoreInfo = () => {
		this.setState({ moreInfo: null, moreInfoTitle: null });
	};

	closeSearchBox = () => {
		let message = {
			message: { action: "cancel" },
			messageId: this.props.searchBoxMessage.messageId,
			messageType: MessageTypeConstants.MESSAGE_TYPE_SEARCH_BOX_RESPONSE,
		};
		this.props.closeSearchBox(message);
	};

	submitResults = () => {
		let searchBoxMessage = this.props.searchBoxMessage;
		let { results = [] } = searchBoxMessage.message;
		let { selected } = this.state;
		let out = selected.map((index) => {
			if (index !== null) return results[index];
		});
		this.props.sendMessage({
			message: { action: "done", results: out },
			messageType: MessageTypeConstants.MESSAGE_TYPE_SEARCH_BOX_RESPONSE,
		});
		this.props.closeSearchBox();
	};

	render() {
		let { moreInfo, moreInfoTitle, lastSearchKey } = this.state;
		let {
			searchBoxMessage = {},
			closeSearchBox,
			isContentShown,
			background = null,
		} = this.props;
		let customStyle = {
			marginLeft: "20vw",
			width: "100%",
			marginRight: "20vw",
		};
		if (isContentShown || background) {
			customStyle = { width: "100%" };
		}
		let {
			action,
			placeholder = "Search",
			selectionType,
			results,
		} = searchBoxMessage.message;

		let showSpinner = searchBoxMessage.showSpinner;

		return (
			<div
				className="show d-flex p-2 justify-content-center align-items-center flex-column bg-white"
				style={{
					position: "relative",
					height: getHeight(results),
					borderTopLeftRadius: "10px",
					borderTopRightRadius: "10px",
					...customStyle,
				}}
			>
				<div
					className="d-flex justify-content-between mb-3"
					style={{
						width: "100%",
						// position: "absolute",
						top: 0,
						padding: "10px 20px",
					}}
				>
					<a className="primary-link" onClick={this.closeSearchBox}>
						Cancel
					</a>
					{results && results.length > 0 && (
						<a className="primary-link" onClick={this.submitResults}>
							Done
						</a>
					)}
				</div>

				{results && results.length > 0 && (
					<div style={{ width: "100%", minHeight: "60px", overflowY: "auto" }}>
						{results.map((result, index) => (
							<div
								className="d-flex justify-content-between my-2 py-2 px-1"
								style={{ borderBottom: "1px solid #F0F0F0" }}
							>
								<div className="d-flex">
									<input
										className="mr-4"
										type={selectionType === "multiple" ? "checkbox" : "radio"}
										value={index}
										checked={this.state.selected.indexOf(index) !== -1}
										onChange={() => {
											let selected = this.state.selected;
											if (selectionType === "multiple") {
												if (selected.indexOf(index) !== -1) {
													selected[index] = null;
													selected = [...selected];
												} else {
													selected = [...selected, index];
												}
											} else {
												selected[0] = index;
											}
											this.setState({ selected });
										}}
									/>
									<div>{result.text}</div>
								</div>
								{result.info && Object.keys(result.info).length > 0 && (
									<div>
										<a
											style={{
												height: "20px",
												width: "20px",
												border: "1px solid #638DFF",
												backgroundColor: "#FFFFFF",
												borderRadius: "50%",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												color: "#638DFF",
												cursor: "pointer",
											}}
											onClick={() => {
												this.showMoreInfo(result.info, result.text);
											}}
										>
											i
										</a>
									</div>
								)}
							</div>
						))}
					</div>
				)}

				{!showSpinner && results && results.length === 0 && (
					<div style={{ width: "100%", height: "60px", overflowY: "auto" }}>
						<div className="text-center" style={{ color: "#4A4A4A" }}>
							<div>No results found for</div>
							<div className="mt-1">
								<strong>{lastSearchKey}</strong>
							</div>
						</div>
					</div>
				)}
				<form
					className="form-inline"
					style={{ width: "100%", display: "flex", justifyContent: "center" }}
					onSubmit={this.sendMessage}
				>
					<div
						className="d-flex justify-content-center align-items-center"
						style={{
							boxSizing: "border-box",
							width: "100%",
							border: "0.2px solid rgba(91,91,91,0.2)",
							borderRadius: "10px",
							backgroundColor: "#FFFFFF",
							boxShadow: "0 0 4px 0 rgba(0,0,0,0.08)",
						}}
					>
						<input
							className="form-control chat-input border0"
							placeholder={placeholder}
							value={this.state.message}
							onChange={this.onChangeMessage}
							disabled={
								this.props.disable ||
								(this.state.selected && this.state.selected.length > 0)
							}
						/>
						<button
							className="btn border0"
							type="submit"
							style={{ position: "inherit" }}
							disabled={
								this.props.disable ||
								(this.state.selected && this.state.selected.length > 0)
							}
						>
							{!showSpinner && (
								<img src="/offlinelms/img/send-icon@2x.png" width="20" alt="send-button" />
							)}
							{showSpinner && (
								<div>
									<Spinner name="circle" color="steelblue" />
								</div>
							)}
						</button>
					</div>
				</form>

				{moreInfo && (
					<ModalPopup
						onClose={this.hideMoreInfo}
						size="sm"
						title={moreInfoTitle}
					>
						<div className="rounded">
							<div>
								{Object.keys(moreInfo).map((key) => {
									return (
										<div className="d-flex justify-content-between my-1">
											<div style={{ fontWeight: "bold" }}>{key}</div>
											<div>{moreInfo[key]}</div>
										</div>
									);
								})}
							</div>
						</div>
					</ModalPopup>
				)}
			</div>
		);
	}
}

ChatSearchBox.propTypes = {
	sendMessage: PropTypes.func.isRequired,
};

export default ChatSearchBox;
