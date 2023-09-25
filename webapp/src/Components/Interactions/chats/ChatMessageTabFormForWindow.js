import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import Tabs from "../../Tabs";
import TabPanel from "../../TabPanel";
import FormContentView from "../content/forms/FormContentView";
import ChatMessageTableForWindow from "./ChatMessageTableForWindow";
import { MessageTypeConstants } from "../../../Services/Message";
import Button from "../content/forms/Elements/Button";
import HeaderContainerForm from "../content/forms/HeaderContainerForm/HeaderContainerForm";
import { updateContainerFormSelectedTab } from "../../../State/actions/chats";

class ChatMessageTabFormForWindow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showRefresh: false,
			showDownload: false,
			confirmAction: null,
			controlId: null,
			componentResponse: null,
			chat: { ...this.props.chat },
			tabs: [],
			tabsBackup: [],
			backupOfTab: [],
			selectedTab: 0,
			windowsId: null,
		};
	}

	componentDidMount() {
		let allTabs = _.cloneDeep(this.props.chat.message);
		this.setState({
			tabs: allTabs,
			tabsBackup: allTabs,
			backupOfTab: allTabs,
		});
		this.props.updateContainerFormSelectedTab(this.props.windowsId, 0);
	}

	sendMessageFromContainer = (
		responseChat,
		fieldsToSubmit,
		type,
		responseChatMessage
	) => {
		if (type === "form") {
			this.props.sendMessage(responseChatMessage);
			// this.props.updateFieldsComponentInContainer(
			//   responseChat.options,
			//   fieldsToSubmit,
			//   type
			// );
		}
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			nextProps.chat.message &&
			prevState.tabsBackup &&
			nextProps.chat.message.length &&
			!_.isEqual(nextProps.chat.message, prevState.tabsBackup)
		) {
			let newTabs = _.cloneDeep(nextProps.chat.message);

			return {
				tabs: [...newTabs],
				tabsBackup: [...newTabs],
				confirmAction:
					newTabs[prevState.selectedTab].message.options.confirmAction,
				controlId: newTabs[prevState.selectedTab].message.options.controlId,
				windowsId: nextProps.windowsId,
				selectedTab: nextProps.selectedTab || prevState.selectedTab,
			};
		} else return null;
	}

	updateTheRows = (options, data, type) => {
		let tabsData = _.cloneDeep(this.state.tabsBackup);
		let fields = _.cloneDeep(data);
		// console.log("updateTheRows=====", tabsData, options.controlId);

		let getIndexOfTab = tabsData.findIndex(
			(elem) => elem.message.options.controlId === options.controlId
		);

		if (getIndexOfTab === -1) {
			console.log("no tab", getIndexOfTab);
			return;
		} else {
			if (type === "form") {
				tabsData[getIndexOfTab].message.fields = [...fields];
			} else if (type === "table") {
				tabsData[getIndexOfTab].message.rows = [...fields];
			}
		}

		// console.log("all tabs ======= ", tabsData);
		this.props.updateFieldsComponentInContainer(options, fields, type);
		this.setState({ tabs: tabsData });
	};

	renderTabs = (tabData) => {
		return tabData.map((elem, index) => {
			let background = this.props.background;
			if (elem.type === "form2") {
				let chat = {
					messageType: elem.type,
					options: elem.message.options,
					message: [...elem.message.fields],
				};
				return (
					<TabPanel key={index} title={elem.message.options.title}>
						<FormContentView
							background={background}
							chat={chat}
							comingFrom="container"
							genericMessage={this.props.genericError || {}}
							completed={this.props.completed}
							cancelForm={this.props.cancelForm}
							closeForm={this.props.cancelForm}
							sendMessageFromContainer={this.sendMessageFromContainer}
							removeGenericErrorMsg={this.props.removeGenericErrorMsg}
							updateTheRows={this.updateTheRows}
							hasCards={this.props.hasCards}
							resetSelectedConversationFormInWindow={
								this.props.resetSelectedConversationFormInWindow
							}
							sendMessage={this.props.sendMessage}
							setFormInWindow={this.props.setFormInWindow}
							toggleRefresh={this.toggleRefresh}
							toggleConfirm={this.toggleConfirm}
							toggleDownload={this.toggleDownload}
							showConfirmFromContainer={
								elem.message.options.confirmAction || null
							}
							showRefreshFromContainer={
								elem.message.options.allowRefresh || false
							}
							showDownloadFromContainer={
								elem.message.options.allowDownload || false
							}
						/>
					</TabPanel>
				);
			} else if (elem.type === "table") {
				let newRows = _.cloneDeep(elem.message.rows);
				if (!Array.isArray(newRows)) {
					let backUpRow = _.cloneDeep(
						this.state?.backupOfTab[index]?.message?.rows
					);
					newRows = [...backUpRow];
				}
				let newOptions = _.cloneDeep(elem.message.options);
				let chat = {
					messageType: elem.type,
					options: { ...newOptions },
					message: [...newRows],
				};

				return (
					<TabPanel key={index} title={elem.message.options.title}>
						<ChatMessageTableForWindow
							background={background}
							chat={chat}
							sendMessage={this.props.sendMessage}
							hasCards={this.props.hasCards}
							comingFrom="container"
							toggleRefresh={this.toggleRefresh}
							toggleConfirm={this.toggleConfirm}
							toggleDownload={this.toggleDownload}
							sendMessageFromContainer={this.sendMessageFromContainer}
							updateTheRows={this.updateTheRows}
							showConfirmFromContainer={
								elem.message.options.confirmAction || null
							}
							showRefreshFromContainer={
								elem.message.options.allowRefresh || false
							}
							showDownloadFromContainer={
								elem.message.options.allowDownload || false
							}
						/>
					</TabPanel>
				);
			}
			return null;
		});
	};

	toggleRefresh = (allowRefresh, controlId, componentResponse) => {
		this.setState({
			showRefresh: allowRefresh,
			controlId: controlId,
			componentResponse: componentResponse,
		});
	};
	toggleDownload = (allowDownload, controlId, componentResponse) => {
		this.setState({
			allowDownload: allowDownload,
			controlId: controlId,
			componentResponse: componentResponse,
		});
	};
	toggleConfirm = (confirmAction, controlId, componentResponse) => {
		this.setState({
			confirmAction: confirmAction,
			controlId: controlId,
			componentResponse: componentResponse,
		});
	};

	handleRefresh = () => {
		let responseChat = {};
		responseChat.messageType = this.state.componentResponse;
		responseChat.message = {
			controlId: this.state.controlId,
			action: "onRefresh",
		};
		this.props.sendMessage(responseChat, true);
	};
	handleDownload = () => {
		let responseChat = {};
		responseChat.messageType = this.state.componentResponse;
		responseChat.message = {
			controlId: this.state.controlId,
			action: "onDownload",
		};
		this.props.sendMessage(responseChat, true);
	};

	handleConfirmAction = () => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: this.state.controlId,
			action: "onConfirm",
		};
		this.props.sendMessage(responseChat, true);
	};

	confirmActionBtn = () => {
		const { tabs } = this.state;
		const { background, windowsId, chat, sendMessage } = this.props;
		let responseContainer = [];

		tabs.forEach((tab) => {
			let responseTab = {};

			if (tab.type === MessageTypeConstants.MESSAGE_TYPE_FORM2) {
				let fieldsCopy = _.cloneDeep(tab.message.fields);
				responseTab = {
					fields: fieldsCopy,
					formId: tab.message.options.formId,
				};
			} else if (tab.type === MessageTypeConstants.MESSAGE_TYPE_FORM) {
				let fieldsCopy = _.cloneDeep(tab.message.fields);
				responseTab = fieldsCopy;
			} else if (tab.type === MessageTypeConstants.MESSAGE_TYPE_TABLE) {
				let fieldsCopy = _.cloneDeep(tab.message.rows);
				responseTab = {
					rows: fieldsCopy,
					tableId: tab.message.options.tableId,
				};
			}

			responseContainer.push(responseTab);
		});

		let responseChat = {};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_CONTAINER_RESPONSE;
		responseChat.message = {
			controlId: chat.options.controlId,
			action: "confirm",
			container: responseContainer,
		};
		sendMessage(responseChat, true);
		if (background && !_.isEmpty(background)) {
			if (chat.options.allowClose) {
				this.props.closeForm(chat);
			} else {
				return;
			}
		} else {
			this.props.closeForm();
		}
	};

	getFieldsToSubmit = (message, fields) => {
		// let { fields } = this.state;
		let newFields = _.cloneDeep(fields);
		return message.map((element) => {
			let elementToMerge;
			const changedElement = newFields.filter(
				(formElement) => formElement.id === element.id
			);

			if (changedElement.length === 0) {
				elementToMerge = {};
			} else {
				elementToMerge = changedElement[0];
			}

			return Object.assign(element, elementToMerge);
		});
	};

	cancelActionBtn = () => {
		console.log("==================", this.state.tabs);
	};

	updateSelectedTabs = (selectedTab) => {
		this.setState({ selectedTab });
		this.props.updateContainerFormSelectedTab(
			this.props.windowsId,
			selectedTab
		);
	};

	render() {
		// console.log("new state of chat ", this.state.chat);

		return (
			<div className="d-flex flex-column custom-tab-style">
				<div className="d-flex flex-row justify-content-between">
					<h2 className="font600 fa-1x py-1 px-2">
						{this.props.chat.options.title}
					</h2>
					<div
						className="d-flex flex-row justify-content-center align-items-center"
						style={{
							height: "inherit",
							padding: "0 10px",
						}}
					>
						{this.state.confirmAction && (
							<div
								className="d-flex justify-content-center align-content-center mr-2"
								style={{
									height: "25px",
									cursor: "pointer",
								}}
								onClick={() =>
									this.handleConfirmAction(this.props.chat.options)
								}
							>
								<span style={{ color: "#638DFF" }}>
									{this.state.confirmAction}
								</span>
							</div>
						)}

						{this.state.showDownload && (
							<div
								className="mr-2"
								style={{
									// marginRight: "-9%",
									width: "25px",
									height: "25px",
									cursor: "Pointer",
								}}
								onClick={() => this.handleDownload()}
							>
								{/* need the icon for download */}
								{/* <img
                  src="/offlinelms/img/refresh-btn@2x.png"
                  alt="close-icon"
                  style={{
                    width: "25px",
                    height: "25px"
                  }}
                /> */}
								<span style={{ color: "#638DFF" }}>Download</span>
							</div>
						)}

						{this.state.showRefresh && (
							<div
								style={{
									// marginRight: "-9%",
									width: "25px",
									height: "25px",
									cursor: "Pointer",
								}}
								onClick={() => this.handleRefresh()}
							>
								<img
									src="/offlinelms/img/refresh-btn@2x.png"
									alt="close-icon"
									style={{
										width: "25px",
										height: "25px",
									}}
								/>
							</div>
						)}
					</div>
				</div>
				<div>
					{this.props.chat.options?.keys && (
						<HeaderContainerForm
							conversationId={this.props.conversationId}
							options={this.props.chat.options}
							sendMessage={this.props.sendMessage}
						/>
					)}
				</div>
				<Tabs
					selected={this.state.selectedTab}
					tabs={this.state.tabs}
					updateSelectedTabs={this.updateSelectedTabs}
				>
					{this.renderTabs(this.state.tabs)}
				</Tabs>
				<div className="d-flex align-items-center flex-row justify-content-center">
					{this.props.chat.options.confirm && (
						<Button
							role="button"
							className="btn btn-open my-1 mx-2"
							text={this.props.chat.options.confirm}
							// text="Save"
							action={this.confirmActionBtn}
						/>
					)}
					{this.props.chat.options.cancel && (
						<Button
							role="button"
							text={this.props.chat.options.cancel}
							// text="Cancel"
							className="btn btn-install my-1 mx-2"
							action={this.cancelActionBtn}
						/>
					)}
				</div>
			</div>
		);
	}
}

ChatMessageTabFormForWindow.propTypes = {
	chat: PropTypes.object.isRequired,
};
const mapActionToProps = {
	updateContainerFormSelectedTab,
};

export default connect(null, mapActionToProps)(ChatMessageTabFormForWindow);
