import _ from "lodash";
import { getSelectedConversation } from "../../Services/StorageService";
import {
  TIME_LINE_RECEIVED,
  ADD_NEW_CONVERSATION,
  CHANGE_SELECTED_CONVERSATION,
  ARCHIVED_MESSAGES_RECEIVED,
  CLOSE_CONTENT_AREA,
  CLOSE_SMART_REPLY,
  OPEN_CONTENT_AREA,
  NEW_LINK_RECEIVED,
  RESET_LINK,
  TOGGLE__FAVORITE_CONVERSATION,
  NEW_SERVER_MESSAGE_RECEIVED,
  NEW_CLIENT_MESSAGE_RECEIVED,
  NEW_SERVER_FORM_CLOSE_MESSAGE_RECEIVED,
  CLOSE_SEARCH_BOX,
  SEND_SEARCH_BOX_QUERY,
  SET_FORM_IN_POPUP,
  SET_WINDOW,
  SET_WINDOW_MIN_MAX,
  NEW_CONTACT_ACCEPT_IGNORE_MESSAGE__RECEIVED,
  CLEAR_ACCEPT_IGNORE_CONTACT,
  GET_FAVOURITES,
  CONVERSATION_SCROLL_POSITION,
  REMOVE_FROM_WINDOW,
  SHOW_CHAT_NON_CONVERSATIONAL,
  TOGGLE_TOP_NAV_BAR,
  TOGGLE_SIDE_NAV_BAR,
  TOGGLE_SIDE_NAV_BAR_FLAG,
  REMOVE_FROM_SHOW_CARDS_ONLY,
  REMOVE_HTML_CONTENT,
  REMOVE_CARDS_CONTENT,
  REMOVE_FORM_IN_POPUP,
  ADD_CHAT_FIELD_WINDOW,
  REMOVE_CHAT_FIELD_WINDOW,
  SET_VIDEO_TEXT,
  REMOVE_VIDEO_TEXT,
  SET_RING_TONE,
  REMOVE_RING_TONE,
  UPDATE_FIELDS_INSIDE_CONTAINER_COMPONENT,
  REMOVE_GENERIC_ERROR,
  UPDATE_TIME_LINE,
  UPDATE_CONTAINER_SELECTED_TAB,
  UPDATE_WINDOW,
  REMOVE_NOTIFICATION_MESSAGE,
  REMOVE_URL_CONTENT,
  GENERATING_PUSH_NOTIFICATIONS,
  DE_GENERATING_PUSH_NOTIFICATIONS,
  TIMELINE_FILTER,
} from "../actions/chats";
import {
  updateConversationMetaData,
  placeMessageBasedOnTime,
  shouldShowSliderArea,
  shouldShowSpinner,
  sortByModifiedOn,
  getConversationIndex,
  getConversationById,
  shouldReplaceMessage,
  shouldReplaceMessageByType,
  REPLACEMENT_ENABLED_FOR,
} from "../../Services/InteractionsService";
import { MessageTypeConstants } from "../../Services/Message";
import { IM_BOT } from "../../Utils/Constants";
import { LOGOUT_USER } from "../actions/user";
import AudioElement from "../../Utils/AudioElement";
0;
let initialContentState = {
  contentMessage: null,
  smartReplyMessage: null,
  disableMessageInput: false,
  mainChatHeight: "calc(100vh - 71px - 90px)",
};

let initialState = {
  userId: null,
  timeLine: [],
  chatLog: new Map(),
  selectedConversation: null,
  ...initialContentState,
  linkData: null,
  hiddenTimeLine: false,
  formInPopup: null,
  componentInWindow: {},
  chatFieldWindow: {},
  acceptIgnoreContact: null,
  conversationPaginationParameterMap: {},
  shouldScrollToTopConversationMap: {},
  conversationModeMap: {},
  navigationBar: {
    sidebar: {},
    navbar: {},
  },
  showOnlyCards: [],
  showHTMLContent: "",
  notificationMessage: null,
  videoChatText: null,
  menuMessage: null,
  urlContent: null,
  clearedAcceptIgnoreContact: false,
  hasError: false,
};

function chatsReducer(state = initialState, action) {
  let timeLine = [];

  switch (action.type) {
    case GET_FAVOURITES: {
      let fav = [...action.data.getFavourites.favourites];
      let peopleFav = [...action.data.getFavourites.favouritePeople];
      let allFav = fav.concat(peopleFav);

      return { ...state, favourites: [...allFav] };
    }
    case TIME_LINE_RECEIVED: {
      timeLine = action.data.timeLine || [];
      let chatLog = state.chatLog;
      let oldTimeLine = _.cloneDeep(state.timeLine);
      let selectedConversation = getSelectedConversation();

      if (oldTimeLine && oldTimeLine.length) {
        timeLine = [...oldTimeLine, ...timeLine];
      }
      timeLine.forEach(function (conversation) {
        if (
          action.data.changeCurrent === false &&
          conversation.conversationId === selectedConversation.conversationId
        ) {
          console.log("Dont change the current");
        } else {
          chatLog.set(conversation.conversationId, []);
        }
      });

      if (selectedConversation && selectedConversation.conversationId) {
        let getTheIndexOnConversation = timeLine.findIndex(
          (elem) => elem.conversationId === selectedConversation.conversationId
        );

        if (getTheIndexOnConversation === -1) {
          if (
            selectedConversation.contact &&
            selectedConversation.contact.showAcceptIgnoreMsg
          ) {
            selectedConversation["message"] = {
              ...selectedConversation.contact,
            };
            selectedConversation["contentType"] =
              MessageTypeConstants.MESSAGE_TYPE_ACCEPT_IGNORE_CONTACT;
          }
          chatLog.set(
            selectedConversation.conversationId,
            [].concat([{ ...selectedConversation }])
          );
        }
      }

      return { ...state, timeLine: timeLine, userId: action.data.userId };
    }
    case UPDATE_TIME_LINE: {
      return { ...state, timeLine: action.data.timeLine };
    }
    case ADD_NEW_CONVERSATION: {
      AudioElement.pauseRing();
      let { timeLine, chatLog } = state;
      let { conversation } = action.data;
      let exConversation = getConversationById(
        state,
        conversation.conversationId
      );
      if (exConversation) {
        return state;
      }
      chatLog.set(conversation.conversationId, []);

      return { ...state, timeLine: [conversation].concat(timeLine), chatLog };
    }

    case CHANGE_SELECTED_CONVERSATION: {
      let { conversation, toTop } = action.data;
      let { timeLine, chatLog } = state;
      if (!conversation) {
        return {
          ...state,
          selectedConversation: {
            conversationId: "99999999999999999999999999999999",
          },
        };
      }
      let index = timeLine.findIndex((con) => {
        return con.conversationId === conversation.conversationId;
      });
      let clonedConversation = { ...conversation, newMessagesCount: 0 };

      let partOfState = {};
      if (
        clonedConversation.bot &&
        clonedConversation.bot.botId === IM_BOT &&
        !clonedConversation.channel
      ) {
        let chatMessages = chatLog.get(conversation.conversationId);
        let lastMessage =
          !_.isEmpty(chatMessages) && chatMessages[chatMessages.length - 1];
        if (
          (lastMessage &&
            state.userId !== lastMessage.createdBy &&
            lastMessage.messageType ===
            MessageTypeConstants.MESSAGE_TYPE_ACCEPT_IGNORE_CONTACT) ||
          (lastMessage &&
            lastMessage.contentType ===
            MessageTypeConstants.MESSAGE_TYPE_ACCEPT_IGNORE_CONTACT)
        ) {
          partOfState.acceptIgnoreContact = lastMessage;
        } else {
          partOfState.acceptIgnoreContact = null;
        }
      } else {
        partOfState.acceptIgnoreContact = null;
      }

      if (toTop) {
        if (index !== -1) {
          timeLine.splice(index, 1);
        }

        return {
          ...state,
          timeLine: [clonedConversation].concat(timeLine),
          selectedConversation: clonedConversation,
          ...initialContentState,
          showWaitSpinner: false,
          searchBoxMessage: null,
          ...partOfState,
        };
      } else {
        if (index !== -1) {
          timeLine[index] = clonedConversation;
        }
      }

      return {
        ...state,
        timeLine: [].concat(timeLine),
        selectedConversation: clonedConversation,
        ...initialContentState,
        showWaitSpinner: false,
        searchBoxMessage: null,
        ...partOfState,
      };
    }

    case NEW_SERVER_MESSAGE_RECEIVED: {
      let { conversationId, message } = action.data;
      let { messageType } = message;
      console.log(
        `%c Message recived from bot to webapp >> ${messageType} >>`,
        "color: green;",
        action
      );

      let conversationModeMapUpdated = state.conversationModeMap;
      let conversationalMode = conversationModeMapUpdated[conversationId];

      let selectedConversation = state.selectedConversation || {};
      let chatLog = state.chatLog;
      let timeLine = state.timeLine;

      let messages = chatLog.get(conversationId) || [];

      if (messageType === MessageTypeConstants.MESSAGE_TYPE_WAIT) {
        let lastMessage =
          messages && messages.length > 0
            ? messages[messages.length - 1]
            : null;
        if (
          shouldShowSpinner(
            message,
            conversationId,
            selectedConversation,
            lastMessage
          )
        ) {
          return { ...state, showWaitSpinner: true };
        } else {
          return state;
        }
      } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_DATA) {
        return state;
      } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_TIMELINE) {
        return {
          ...state,
          message: action.data?.message?.message,
        };
      } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_CHAT) {
        return {
          ...state,
          message: action.data?.message?.message,
        };
      } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_DASHBOARD) {
        return {
          ...state,
          message: action.data?.message,
        };
      } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_MENU) {
        let menuMsgObj = {};
        menuMsgObj[conversationId] = { ...message.message };
        return {
          ...state,
          menuMessage: { ...menuMsgObj },
          showWaitSpinner: false,
        };
      } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_RUNMODE) {
        let sidebar = state.navigationBar.sidebar;
        let navbar = state.navigationBar.navbar;
        let chatButtonHidden = false;
        if (message.message.sidebar) {
          sidebar = { ...message.message.sidebar };
        }
        if (message.message.navbar) {
          navbar = { ...message.message.navbar };
        }

        if (message.message.chatButtonHidden) {
          chatButtonHidden = message.message.chatButtonHidden;
        }
        let navigationBar = { sidebar, navbar };
        selectedConversation["chatButtonHidden"] = chatButtonHidden;

        selectedConversation = {
          ...selectedConversation,
          ...{ chatButtonHidden, customCSS: message?.message?.cssFilePath },
        };
        let conversationModeMapUpdated = state.conversationModeMap;
        conversationModeMapUpdated[conversationId] = {
          chatViewMode: MessageTypeConstants.MESSAGE_TYPE_RUNMODE,
          background: message.message.background || {},
          conversational: message.message.conversational || false,
          suggestionsLayout: message.message.suggestionsLayout || "horizontal",
        };
        return {
          ...state,
          selectedConversation,
          conversationModeMap: conversationModeMapUpdated,
          navigationBar: navigationBar,
          waitingIcon: message.message.waitingIcon || {},
          showWaitSpinner: false,
          modal: message.message.modal,
        };
      } else if (
        conversationalMode &&
        !conversationalMode.conversational &&
        messageType === MessageTypeConstants.MESSAGE_TYPE_CARDS
      ) {
        if (
          Array.isArray(message.message) &&
          state.selectedConversation.conversationId === conversationId
        ) {
          return {
            ...state,
            showOnlyCards: [...message.message],
            showWaitSpinner: false,
          };
        }
        return { ...state, showWaitSpinner: false };
      } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_HTML) {
        if (message?.options?.url) {
          return {
            ...state,
            urlContent: message.options.url,
            showWaitSpinner: false,
          };
        } else
          return {
            ...state,
            showHTMLContent: message.options.content,
            showWaitSpinner: false,
          };
      } else if (
        messageType === MessageTypeConstants.MESSAGE_TYPE_CRITICAL_NOTIFICATION
      ) {
        return {
          ...state,
          notificationMessage: {
            message: message.message,
            notificationType: messageType,
          },
          showWaitSpinner: false,
        };
      } else if (
        conversationalMode &&
        !conversationalMode.conversational &&
        messageType === MessageTypeConstants.MESSAGE_TYPE_MAP
      ) {
        let options = message.options;

        if (
          conversationalMode.background &&
          conversationalMode.background.content &&
          conversationalMode.background.content.options &&
          conversationalMode.background.content.options.mapId === options.mapId
        ) {
          let newContent = { ...message.message, options };
          let updatedConversationalMode = {
            ...conversationalMode,
            background: {
              ...conversationalMode.background,
              content: newContent,
            },
          };
          return {
            ...state,
            conversationModeMap: {
              ...state.conversationModeMap,
              [conversationId]: updatedConversationalMode,
            },
          };
        }
        return state;
      } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_SEARCH_BOX) {
        return {
          ...state,
          searchBoxMessage: { ...message, showSpinner: false },
        };
      } else if (shouldShowSliderArea(messageType)) {
        let newState = { ...state };
        let chatWindowKey =
          newState.selectedConversation &&
          newState.selectedConversation.conversationId;
        let smartSuggestionObj;
        if (newState.chatFieldWindow[chatWindowKey]) {
          let chatFieldWindowArr = [...newState.chatFieldWindow[chatWindowKey]];
          smartSuggestionObj = { ...newState.smartReplyMessage };
          chatFieldWindowArr.forEach((elem) => {
            if (elem.conversationId === message.conversation) {
              smartSuggestionObj = {
                ...smartSuggestionObj,
                [elem.conversationId]: message,
              };
              newState = {
                ...state,
                smartReplyMessage: smartSuggestionObj,
                showWaitSpinner: false,
              };
            }
          });
        }

        if (
          conversationId &&
          selectedConversation.conversationId &&
          conversationId === selectedConversation.conversationId
        ) {
          smartSuggestionObj = { [conversationId]: message };
          newState = {
            ...state,
            smartReplyMessage: smartSuggestionObj,
            showWaitSpinner: false,
          };
        }
        newState.timeLine = updateConversationMetaData(
          timeLine,
          selectedConversation,
          conversationId,
          message
        );
        return newState;
      } else {
        let replaceIndex = shouldReplaceMessageByType(messages, message);
        if (replaceIndex !== -1) {
          let newMessage = JSON.parse(JSON.stringify(message));
          messages[replaceIndex] = newMessage;

          chatLog.set(conversationId, [...messages]);
          let newState = { ...state, chatLog, showWaitSpinner: false }; // messageType: "Runmode",
          // conversational: true
          if (state.contentMessage) {
            let cm = state.contentMessage;
            let rep = REPLACEMENT_ENABLED_FOR[newMessage.messageType];
            if (rep) {
              let matcher = rep.matcher;
              if (matcher && matcher(cm, newMessage)) {
                newState.contentMessage[conversationId] = newMessage;
              }
            }
          }
          return newState;
        } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_FORM2) {
          let { options } = message;

          if (options.parent) {
            if (
              options.action === "results" ||
              options.action === "validation"
            ) {
              let componentInWindow = _.cloneDeep(state.componentInWindow);

              if (!_.isEmpty(componentInWindow)) {
                const windowIndexToUpdate =
                  getUpdateIndexFromComponentInWindowContainer(
                    conversationId,
                    componentInWindow,
                    options
                  );

                if (windowIndexToUpdate !== -1) {
                  const windowObjectToUpdate =
                    componentInWindow[conversationId][windowIndexToUpdate];

                  let containerMessages = windowObjectToUpdate.message;
                  let getFormIndex = getUpdateIndexFromContainer(
                    containerMessages,
                    options
                  );

                  if (options.controlId === options.parent) {
                    if (
                      windowObjectToUpdate.options?.keys &&
                      windowObjectToUpdate.options?.keys.length
                    ) {
                      let keysArr = windowObjectToUpdate.options.keys;
                      let fieldId = message.message.field;
                      for (let i = 0; i < keysArr.length; i++) {
                        if (fieldId === keysArr[i].id) {
                          if (message.message.result) {
                            keysArr[i].results = message.message.result;
                          }
                          if (
                            Object.prototype.hasOwnProperty.call(
                              message.message,
                              "validationResult"
                            )
                          ) {
                            keysArr[i].validationResult =
                              message.message.validationResult;
                          }
                          if (message.message.validationMessage) {
                            keysArr[i].validationMessage =
                              message.message.validationMessage;
                          }
                        }
                      }
                    }
                  } else {
                    if (getFormIndex !== -1) {
                      let formInContainer = containerMessages[getFormIndex];
                      let formInContainerMessage = formInContainer.message;

                      if (
                        Object.prototype.hasOwnProperty.call(
                          message.message,
                          "field"
                        )
                      ) {
                        for (
                          let i = 0;
                          i < formInContainerMessage.fields.length;
                          i++
                        ) {
                          let m = formInContainerMessage.fields[i];
                          if (m.id === message.message.field) {
                            if (message.message.results) {
                              m.showSpinner = false;
                              m.results = message.message.results;
                            }

                            if (
                              Object.prototype.hasOwnProperty.call(
                                message.message,
                                "validationResult"
                              )
                            ) {
                              m.validationResult =
                                message.message.validationResult;
                            }
                            if (message.message.validationMessage) {
                              m.validationMessage =
                                message.message.validationMessage;
                              // break;
                            }
                            // break;
                          }
                        }
                      } else {
                        formInContainerMessage.genericError = {
                          ...message.message,
                        };
                      }

                      if (
                        conversationId &&
                        windowIndexToUpdate &&
                        getFormIndex &&
                        componentInWindow[conversationId] &&
                        componentInWindow[conversationId][
                        windowIndexToUpdate
                        ] &&
                        componentInWindow[conversationId][windowIndexToUpdate]
                          .messsage &&
                        componentInWindow[conversationId][windowIndexToUpdate]
                          .messsage[getFormIndex]
                      ) {
                        componentInWindow[conversationId][
                          windowIndexToUpdate
                        ].messsage[getFormIndex].message = {
                          ...formInContainerMessage,
                        };
                      }
                    }
                  }
                }
              }
              let updatedComponentInWindow = Object.assign(
                {},
                componentInWindow
              );
              let newState = {
                ...state,
                componentInWindow: updatedComponentInWindow,
                showWaitSpinner: false,
              };
              return newState;
            } else if (options.action === "change") {
              let componentInWindow = _.cloneDeep(state.componentInWindow);
              if (!_.isEmpty(componentInWindow)) {
                const windowIndexToUpdate =
                  getUpdateIndexFromComponentInWindowContainer(
                    conversationId,
                    componentInWindow,
                    options
                  );

                if (windowIndexToUpdate !== -1) {
                  const windowObjectToUpdate =
                    componentInWindow[conversationId][windowIndexToUpdate];

                  let containerMessages = windowObjectToUpdate.message;
                  let getFormIndex = getUpdateIndexFromContainer(
                    containerMessages,
                    options
                  );
                  if (getFormIndex !== -1) {
                    let formInContainer = containerMessages[getFormIndex];
                    let formInContainerMessage = formInContainer.message;
                    let formFieldsCopy = formInContainerMessage.fields;

                    if (
                      Object.prototype.hasOwnProperty.call(
                        message.message,
                        "remove"
                      )
                    ) {
                      let messageRemove = message.message.remove;

                      for (let elemRemove of messageRemove) {
                        let getIndexToRemove = formFieldsCopy.findIndex(
                          (elem) => {
                            return elem.id === elemRemove;
                          }
                        );
                        if (getIndexToRemove > -1) {
                          formFieldsCopy.splice(getIndexToRemove, 1);
                        }
                      }
                    } else if (
                      Object.prototype.hasOwnProperty.call(
                        message.message,
                        "fields"
                      )
                    ) {
                      let messageUpdateFields = message.message.fields;
                      if (!_.isEmpty(messageUpdateFields)) {
                        formFieldsCopy.forEach((field) => {
                          for (let updateField of messageUpdateFields) {
                            if (updateField.id === field.id) {
                              field.value = updateField.value;
                            }
                          }
                        });
                      }
                    }
                  }
                }
              }
              let updatedComponentInWindow = Object.assign(
                {},
                componentInWindow
              );

              let newState = {
                ...state,
                componentInWindow: updatedComponentInWindow,
                showWaitSpinner: false,
              };
              return newState;
            }
          } else {
            if (
              !_.isEmpty(conversationalMode) &&
              !conversationalMode.conversational
            ) {
              const componentInWindow = state.componentInWindow;
              if (!_.isEmpty(componentInWindow)) {
                const windowIndexToUpdate = getUpdateIndexFromComponentInWindow(
                  conversationId,
                  componentInWindow,
                  options
                );

                if (windowIndexToUpdate === -1) {
                  componentInWindow[conversationId] =
                    componentInWindow[conversationId] &&
                      componentInWindow[conversationId].length > 0
                      ? componentInWindow[conversationId]
                      : [];
                  componentInWindow[conversationId].push(message);
                } else {
                  if (
                    message.options.action === "results" ||
                    message.options.action === "validation"
                  ) {
                    const windowObjectToUpdate =
                      componentInWindow[conversationId][windowIndexToUpdate];
                    const messages = windowObjectToUpdate.message;
                    if (
                      Object.prototype.hasOwnProperty.call(
                        message.message,
                        "field"
                      )
                    ) {
                      for (let i = 0; i < messages.length; i++) {
                        let m = messages[i];
                        if (m.id === message.message.field) {
                          if (message.message.results) {
                            m.showSpinner = false;
                            m.results = message.message.results;
                          }
                          if (
                            Object.prototype.hasOwnProperty.call(
                              message.message,
                              "validationResult"
                            )
                          ) {
                            m.validationResult =
                              message.message.validationResult;
                          }
                          if (message.message.validationMessage) {
                            m.validationMessage =
                              message.message.validationMessage;
                          }
                          break;
                        }
                      }
                    } else {
                      windowObjectToUpdate.genericError = {
                        ...message.message,
                      };
                    }
                    componentInWindow[conversationId][windowIndexToUpdate] =
                      windowObjectToUpdate;
                  } else if (message.options.action === "change") {
                    const windowObjectToUpdate =
                      componentInWindow[conversationId][windowIndexToUpdate];
                    let messages = windowObjectToUpdate.message;
                    const fieldsToUpdate = message.message.fields;
                    const fieldsToRemove = message.message.remove;

                    if (!_.isEmpty(fieldsToRemove)) {
                      windowObjectToUpdate.message = messages.filter(
                        (message) => {
                          let mId = message.id;
                          return fieldsToRemove.indexOf(mId) !== -1;
                        }
                      );
                    }

                    if (!_.isEmpty(fieldsToUpdate)) {
                      window.lastMsgFields = fieldsToUpdate;
                      windowObjectToUpdate.message =
                        Array.isArray(messages) &&
                        messages.map((message) => {
                          let mId = message.id;
                          for (let i = 0; i < fieldsToUpdate.length; i++) {
                            const incomingField = fieldsToUpdate[i];
                            if (incomingField.id === mId) {
                              return incomingField;
                            }
                          }
                          return message;
                        });
                    }

                    componentInWindow[conversationId][windowIndexToUpdate] =
                      windowObjectToUpdate;
                  }
                }
              } else {
                componentInWindow[conversationId] = [];
                componentInWindow[conversationId].push(message);
              }
              let updatedComponentInWindow = Object.assign(
                {},
                componentInWindow
              );
              let newStateData = {
                ...state,
                componentInWindow: updatedComponentInWindow,
                showWaitSpinner: false,
              };
              return newStateData;
            } else if (
              !_.isEmpty(conversationalMode) &&
              conversationalMode.conversational
            ) {
              if (
                options &&
                options.formId &&
                state.formInPopup &&
                state.formInPopup.options &&
                options.formId === state.formInPopup.options.formId
              ) {
                let newObj = {};
                if (
                  message.options.action === "results" ||
                  message.options.action === "validation"
                ) {
                  let currentMessage = state.formInPopup;
                  let cmm = currentMessage.message;
                  for (let i = 0; i < cmm.length; i++) {
                    let m = cmm[i];
                    if (m.id === message.message.field) {
                      if (message.message.results) {
                        m.showSpinner = false;
                        m.results = message.message.results;
                      }
                      if (
                        Object.prototype.hasOwnProperty.call(
                          message.message,
                          "validationResult"
                        )
                      ) {
                        m.validationResult = message.message.validationResult;
                      }
                      if (message.message.validationMessage) {
                        m.validationMessage = message.message.validationMessage;
                      }
                      break;
                    }
                  }
                  newObj = Object.assign({}, { ...state.formInPopup });
                } else {
                  let newMessage = _.cloneDeep(message);
                  let formPopup = _.cloneDeep(state.formInPopup);

                  if (newMessage.message && newMessage.message.fields) {
                    newMessage.message.fields.forEach((elem) => {
                      let findIndex = formPopup.message.findIndex(
                        (elemForm) => elemForm.id === elem.id
                      );

                      if (findIndex !== -1) {
                        formPopup.message[findIndex] = elem;
                      }
                    });
                  } else {
                    newMessage.message.forEach((elem) => {
                      let findIndex = formPopup.message.findIndex(
                        (elemForm) => elemForm.id === elem.id
                      );

                      if (findIndex !== -1) {
                        formPopup.message[findIndex] = elem;
                      }
                    });
                  }

                  newObj = Object.assign({}, { ...formPopup });
                }
                return {
                  ...state,
                  formInPopup: newObj,
                  showWaitSpinner: false,
                };
              } else if (
                message.options.action === "results" ||
                message.options.action === "validation"
              ) {
                // let newObj = Object.assign(
                //   {},
                //   { ...state.formInPopup },
                //   { ...message }
                // );
                let newDataState = {
                  ...state,
                  formInPopup: { ...message },
                  showWaitSpinner: false,
                };
                return newDataState;
              }
            }
          }
        }

        // Handle FloorPlan Messages -- DEMO ONLY

        if (
          message.messageType === MessageTypeConstants.MESSAGE_TYPE_FLOORPLAN &&
          message.contentType === 150
        ) {
          let newState = { ...state, chatLog, showWaitSpinner: false }; // messageType: "Runmode",
          newState.contentMessage = message;
          return newState;
        }

        placeMessageBasedOnTime(messages, message);

        chatLog.set(conversationId, [].concat(messages));
        let newState = { ...state, chatLog: chatLog };
        if (
          selectedConversation &&
          conversationId === selectedConversation.conversationId
        ) {
          newState = { ...state, chatLog: chatLog, showWaitSpinner: false };
        }
        newState.timeLine = updateConversationMetaData(
          timeLine,
          selectedConversation,
          conversationId,
          message
        );
        return newState;
      }
    }
    case REMOVE_HTML_CONTENT:
      return { ...state, showHTMLContent: null };
    case REMOVE_NOTIFICATION_MESSAGE:
      return { ...state, notificationMessage: null };

    case NEW_SERVER_FORM_CLOSE_MESSAGE_RECEIVED: {
      let conversationId = action.data.conversationId;
      let actionMessage = action.data.message;
      let chatLog = state.chatLog;
      // let timeLine = state.timeLine;

      let messages = chatLog.get(conversationId);
      messages.forEach((message, index) => {
        if (
          message.messageType === MessageTypeConstants.MESSAGE_TYPE_FORM2 &&
          message.options &&
          message.options.formId === actionMessage.message.formId
        ) {
          message.options.stage = "COMPLETED";
          messages[index] = JSON.parse(JSON.stringify(message));
        }
      });

      chatLog.set(conversationId, [...messages]);
      return { ...state, chatLog };
    }
    case NEW_CLIENT_MESSAGE_RECEIVED: {
      let conversationId = action.data.conversationId;
      let message = action.data.message;
      let chatLog = state.chatLog;
      let messages = chatLog.get(conversationId);

      if (message.messageId && shouldReplaceMessage(message)) {
        let index = messages.findIndex(
          (msg) => msg.messageId === message.messageId
        );
        if (index !== -1) {
          messages = [
            ...messages.slice(0, index),
            message,
            ...messages.slice(index + 1),
          ];
        } else {
          messages = [...messages, message];
        }
      } else {
        messages = messages ? [...messages, message] : [message];
      }

      chatLog.set(conversationId, messages);

      let newState = { ...state, chatLog };
      newState.timeLine = updateConversationMetaData(
        state.timeLine,
        state.selectedConversation,
        conversationId,
        message
      );
      return newState;
    }
    case ARCHIVED_MESSAGES_RECEIVED: {
      let {
        conversationId,
        messages = [],
        moreMessagesExist,
        userId,
      } = action.data;

      let { chatLog, timeLine, conversationPaginationParameterMap } = state;

      let exMessages = chatLog.get(conversationId) || [];
      const firstMessageCreatedOnInReceivedList =
        messages.length > 0 ? messages[messages.length - 1].createdOn : "";
      conversationPaginationParameterMap[conversationId] = {
        hasMoreMessages: moreMessagesExist || false,
        createdOn: firstMessageCreatedOnInReceivedList,
      };
      let allMessages = messages.concat(exMessages);
      // let allMessages = messages;
      let messagesMap = {},
        outMessages = [];
      allMessages.forEach((m) => {
        if (m && m.messageId) {
          if (!messagesMap[m.messageId]) {
            outMessages.push(m);
            messagesMap[m.messageId] = true;
          }
        }
      });
      outMessages.sort(function (a, b) {
        return (
          new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime()
        );
      });

      chatLog.set(conversationId, [].concat(outMessages));
      let newTimeLine = [...timeLine];
      // let index = getConversationIndex(timeLine, conversationId);

      // let unReadMessages = messages.filter((msg) => !msg.isOpened);
      // let unReadMessageCount =
      // 	getConversationById(state, conversationId)?.unreadCount || 0;
      // unReadMessages.forEach((msg) => {
      // 	if (
      // 		getConversationById(state, conversationId) &&
      // 		getConversationById(state, conversationId).modifiedOn < msg.createdOn
      // 	) {
      // 		unReadMessageCount += 1;
      // 	} else {
      // 		unReadMessageCount = 1;
      // 	}
      // });

      // newTimeLine[index] = {
      // 	...getConversationById(state, conversationId),
      // 	archivedMessagesRead: moreMessagesExist,
      // 	unreadCount: unReadMessageCount || 0,
      // };

      let lastMessage = outMessages[outMessages.length - 1];
      if (
        lastMessage &&
        userId !== lastMessage.createdBy &&
        lastMessage.messageType ===
        MessageTypeConstants.MESSAGE_TYPE_ACCEPT_IGNORE_CONTACT
      ) {
        return {
          ...state,
          chatLog,
          timeLine: newTimeLine,
          acceptIgnoreContact:
            state.clearedAcceptIgnoreContact === true ? null : lastMessage,
          clearedAcceptIgnoreContact:
            state.clearedAcceptIgnoreContact === true
              ? false
              : state.clearedAcceptIgnoreContact,
          conversationPaginationParameterMap,
        };
      }

      return {
        ...state,
        chatLog,
        timeLine: newTimeLine,
        conversationPaginationParameterMap,
      };
    }

    case CONVERSATION_SCROLL_POSITION: {
      const { status, conversation } = action.data;
      if (conversation) {
        let updatedShouldScrollToTopConversationMap =
          state.shouldScrollToTopConversationMap;
        updatedShouldScrollToTopConversationMap[conversation.conversationId] =
          status;
        return {
          ...state,
          shouldScrollToTopConversationMap: {
            ...updatedShouldScrollToTopConversationMap,
          },
        };
      }
      return { ...state };
    }

    case REMOVE_URL_CONTENT:
      return { ...state, urlContent: null };

    case CLOSE_CONTENT_AREA:
      return { ...state, contentMessage: null, disableMessageInput: false };

    case CLOSE_SMART_REPLY:
      return { ...state, smartReplyMessage: null };

    case CLOSE_SEARCH_BOX:
      return { ...state, searchBoxMessage: null };

    case SEND_SEARCH_BOX_QUERY:
      return {
        ...state,
        searchBoxMessage: { ...state.searchBoxMessage, showSpinner: true },
      };

    case OPEN_CONTENT_AREA:
      return { ...state, ...action.data };

    case SET_FORM_IN_POPUP: {
      let { chat } = action.data;
      return { ...state, formInPopup: chat };
    }

    case REMOVE_GENERIC_ERROR:
      return {
        ...state,
        componentInWindow: { ...action.data },
        showWaitSpinner: false,
      };

    case REMOVE_FORM_IN_POPUP:
      return { ...state, formInPopup: null, showWaitSpinner: false };

    case SET_WINDOW: {
      return { ...state, componentInWindow: { ...action.data } };
    }
    case SET_WINDOW_MIN_MAX: {
      return { ...state, componentInWindow: { ...action.data } };
    }
    case UPDATE_WINDOW: {
      return { ...state, componentInWindow: { ...action.data } };
    }
    case REMOVE_FROM_WINDOW: {
      return {
        ...state,
        componentInWindow: { ...action.data },
        showWaitSpinner: false,
      };
    }
    case REMOVE_CHAT_FIELD_WINDOW: {
      return {
        ...state,
        chatFieldWindow: { ...action.data },
        showWaitSpinner: false,
      };
    }
    case ADD_CHAT_FIELD_WINDOW:
      return { ...state, chatFieldWindow: { ...action.data } };
    case NEW_CONTACT_ACCEPT_IGNORE_MESSAGE__RECEIVED:
      if (
        state.selectedConversation &&
        action.data.conversationId === state.selectedConversation.conversationId
      ) {
        return { ...state, acceptIgnoreContact: action.data.message };
      }
      return state;

    case CLEAR_ACCEPT_IGNORE_CONTACT:
      return {
        ...state,
        acceptIgnoreContact: null,
        clearedAcceptIgnoreContact: true,
      };

    case NEW_LINK_RECEIVED:
      return {
        ...state,
        linkData: {
          type: action.data.type,
          botId: action.data.botId,
          message: action.data.message,
          action: action.data.action,
        },
      };

    case RESET_LINK:
      return { ...state, linkData: null };

    case TOGGLE__FAVORITE_CONVERSATION: {
      timeLine = state.timeLine;
      let index = timeLine.findIndex(
        (t) => t.conversationId === action.data.conversationId
      );
      let conversation = timeLine[index];
      timeLine[index] = { ...conversation, favourite: action.data.favourite };
      sortByModifiedOn(timeLine);

      let stateData = { ...state, timeLine: [].concat(timeLine) };
      let selected = state.selectedConversation;
      if (selected.conversationId === conversation.conversationId) {
        stateData.selectedConversation = {
          ...conversation,
          favourite: action.data.favourite,
        };
      }
      return stateData;
    }

    case UPDATE_FIELDS_INSIDE_CONTAINER_COMPONENT: {
      let newUpdatedState = {
        ...state,
        componentInWindow: { ...action.data },
        showWaitSpinner: false,
      };
      return newUpdatedState;
    }

    case SHOW_CHAT_NON_CONVERSATIONAL: {
      let updatedConversationModeMap = state.conversationModeMap;
      let conversationSelected = state.selectedConversation;
      if (_.isEmpty(conversationSelected)) {
        return { ...state };
      }
      let convId = conversationSelected.conversationId;
      updatedConversationModeMap[convId] = {
        ...updatedConversationModeMap[convId],
        showChat: action.data || false,
      };
      return { ...state, conversationModeMap: updatedConversationModeMap };
    }

    case REMOVE_FROM_SHOW_CARDS_ONLY:
      return { ...state, showOnlyCards: [...action.data] };
    case REMOVE_CARDS_CONTENT:
      return { ...state, showOnlyCards: [] };
    case TOGGLE_TOP_NAV_BAR: {
      let navbar = Object.assign({}, state.navigationBar.navbar);
      navbar["hidden"] = !navbar.hidden;
      return { ...state, navigationBar: { ...state.navigationBar, navbar } };
    }
    case SET_VIDEO_TEXT: {
      let text = action.data.textMessage;
      return {
        ...state,
        videoChatText: text,
      };
    }

    case REMOVE_VIDEO_TEXT:
      return {
        ...state,
        videoChatText: null,
      };
    case SET_RING_TONE:
      return {
        ...state,
        setRingTone: true,
      };
    case REMOVE_RING_TONE:
      return {
        ...state,
        setRingTone: false,
      };
    case TOGGLE_SIDE_NAV_BAR: {
      let sidebar = Object.assign({}, state.navigationBar.sidebar);
      sidebar["hidden"] = !sidebar.hidden;
      return { ...state, navigationBar: { ...state.navigationBar, sidebar } };
    }

    case TOGGLE_SIDE_NAV_BAR_FLAG: {
      let sidebar = Object.assign({}, state.navigationBar.sidebar);
      sidebar["hidden"] = !sidebar.hidden;
      return { ...state, navigationBar: { ...state.navigationBar, sidebar } };
    }

    // case NO_ACTION:
    //   return state;
    case LOGOUT_USER:
      return {
        ...initialState,
        conversationPaginationParameterMap: {},
        shouldScrollToTopConversationMap: {},
        conversationModeMap: {},
      };
    case UPDATE_CONTAINER_SELECTED_TAB:
      return {
        ...state,
        chats: action.data.chats,
      };

    default:
      return state;
  }
}

const getUpdateIndexFromComponentInWindow = (
  conversationId,
  componentInWindow,
  options
) => {
  const windowObject = componentInWindow[conversationId];
  if (!_.isEmpty(windowObject)) {
    for (let index = 0; index < windowObject.length; index++) {
      const message = windowObject[index];
      if (message.options && message.options.formId === options.formId) {
        return index;
      }
    }
  }
  return -1;
};
const getUpdateIndexFromComponentInWindowContainer = (
  conversationId,
  componentInWindow,
  options
) => {
  const windowObject = componentInWindow[conversationId];

  if (!_.isEmpty(windowObject)) {
    for (let index = 0; index < windowObject.length; index++) {
      const message = windowObject[index];
      if (message.options && message.options.controlId === options.parent) {
        return index;
      }
    }
  }
  return -1;
};
const getUpdateIndexFromContainer = (messageArray, options) => {
  if (!_.isEmpty(messageArray)) {
    for (let index = 0; index < messageArray.length; index++) {
      const message = messageArray[index].message;
      if (message.options && message.options.controlId === options.formId) {
        return index;
      }
    }
  }
  return -1;
};
export default chatsReducer;
