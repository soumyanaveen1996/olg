import { MessageTypeConstants } from "../../../../Services/Message";
import {
  RENDER_MESSAGE_TYPE_TABLE,
  RENDER_MESSAGE_TYPE_CONTAINER,
  CHANGE_CONTAINER_SELECTED_TAB,
  RENDER_MESSAGE_TYPE_FORM2,
  RENDER_MESSAGE_TYPE_MENU,
  RENDER_MESSAGE_TYPE_CALENDAR,
  RENDER_MESSAGE_TYPE_MAP,
  RENDER_MESSAGE_TYPE_HTML,
  RENDER_MESSAGE_TYPE_TIMELINE,
  RENDER_MESSAGE_TYPE_SURVEY,
  CHANGE_CALENDAR,
  RESET_FORM2_FIELDS,
  RESET_CONTAINER_FIELDS,
  REMOVE_APP,
  BG_CALENDAR_TOOLBAR,
  SAVE_MAP_SETTINGS,
  RENDER_MESSAGE_TYPE_VIDEOCALL,
  RENDER_CHANGE_NONCONVERSATION_SELECTED_TAB,
  RESET_NONCONVENTIONAL,
  RENDER_MESSAGE_TYPE_DASHBOARD, RENDER_MESSAGE_TYPE_CHAT,
} from './types';
import store from "../../../../State/configureStore";
import _ from "lodash";

import {
  handleMessageTypeNotification,
  handleMessageTypeNonVideoNotification,
} from "../../../Store/Notification/NotificationAction";
import {
  handleMessageTypeForm2ChangeAction,
  handleMessageTypeForm2ResultAction,
  handleMessageTypeTableChangeAction,
  handleMessageTypeInlineFormTableResultAction,
  handleMessageTypeTableChangeColumnTemplate,
  handleForm2PromptOnCloseAction,
} from "../NonConversationalHelpers/NonConversationalActionHelper";
import { renderNonconversationalFilter } from "../../../Store/NonConversationalFilter/NonConversationalFilterAction";
import { initializeBotContext } from '../../../../Services/BotsService';

export const v2HandleNonConversationalServerMessages =
  (conversationId, message) => (dispatch) => {
    switch (message.messageType) {
      case MessageTypeConstants.MESSAGE_TYPE_MENU:
        dispatch(handleMessageTypeMenu(conversationId, message));
        break;
      case MessageTypeConstants.MESSAGE_TYPE_TABLE:
        if (["changeFilter", "validationFilter", "resultsFilter", "updateFilter"].includes(message.options.action)) {
          dispatch(renderNonconversationalFilter(message));
        } else {
          dispatch(handleMessageTypeTable(conversationId, message, false, false));
        }
        break;
      case MessageTypeConstants.MESSAGE_TYPE_MAP:
        if (["changeFilter", "validationFilter", "resultsFilter", "updateFilter"].includes(message.options.action)) {
          dispatch(renderNonconversationalFilter(message));
        } else {
          dispatch(handleMessageTypeMap(conversationId, message));
        }
        break;
      case MessageTypeConstants.MESSAGE_TYPE_CONTAINER:
        dispatch(handleMessageTypeContainer(conversationId, message));
        break;
      case MessageTypeConstants.MESSAGE_TYPE_FORM2:
        if (["changeFilter", "validationFilter", "resultsFilter", "updateFilter"].includes(message.options.action)) {
          dispatch(renderNonconversationalFilter(message));
        } else {
          dispatch(handleMessageTypeForm2(conversationId, message));
        }
        break;
      case MessageTypeConstants.MESSAGE_TYPE_TIMELINE:
        dispatch(handleMessageTypeTimeline(conversationId, message));
        break;
      case MessageTypeConstants.MESSAGE_TYPE_CHAT:
        dispatch(handleMessageTypeChat(conversationId, message));
        break;
      case MessageTypeConstants.MESSAGE_TYPE_SURVEY:
        dispatch(handleMessageTypeSurvey(conversationId, message));
        break;
      case MessageTypeConstants.MESSAGE_TYPE_DASHBOARD:
        dispatch(handleMessageTypeDashboard(conversationId, message));
        break;
      case MessageTypeConstants.MESSAGE_TYPE_CALENDAR:
        if (["changeFilter", "validationFilter", "resultsFilter", "updateFilter"].includes(message.options.action)) {
          dispatch(renderNonconversationalFilter(message));
        } else {
          dispatch(handleMessageTypeCalendar(conversationId, message));
        }
        break;
      case MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL:
        if (parseInt(message.contentType) === 600) {
          dispatch(handleMessageTypeNotification(conversationId, message));
        }
        break;
      case MessageTypeConstants.MESSAGE_TYPE_HTML:
        dispatch(handleMessageTypeHtml(conversationId, message));
        break;
      case MessageTypeConstants.MESSAGE_TYPE_STD_NOTIFICATION:
      case MessageTypeConstants.MESSAGE_TYPE_CRITICAL_NOTIFICATION:
      case MessageTypeConstants.MESSAGE_TYPE_AUTHORIZATION_REQUEST:
        dispatch(
          handleMessageTypeNonVideoNotification(conversationId, message)
        );
        break;
    }
  };

export const handleChangeNonConversationalMessagesTab =
  (conversationId, selectedTab) => (dispatch) => {
    const nonConversationalState = store.getState().v2.NonConversational;
    let updatedNonConversationalData;

    if (nonConversationalState && !_.isEmpty(nonConversationalState)) {
      let nonConversationalData = nonConversationalState[conversationId];

      if (
        nonConversationalData &&
        !_.isEmpty(nonConversationalData) &&
        !_.isEmpty(nonConversationalData.components)
      ) {
        updatedNonConversationalData = {
          ...nonConversationalData,
          selectedTab: selectedTab,
        };
      } else {
        updatedNonConversationalData = {
          ...nonConversationalData,
          selectedTab: selectedTab,
          components: [],
        };
      }

      dispatch({
        type: RENDER_CHANGE_NONCONVERSATION_SELECTED_TAB,
        data: {
          [conversationId]: updatedNonConversationalData,
        },
      });
    }
  };

export const handleMessageTypeMenu = (conversationId, message) => (dispatch) => {
  const nonConversationalState = store.getState().v2.NonConversational;
  let nonConversationalData = {};

  if (!_.isEmpty(nonConversationalState)) {
    nonConversationalData = handleExistingNonConversational(conversationId, message, nonConversationalState);
  } else {
    nonConversationalData = handleNonExistingNonConversational(undefined, message);
  }
  dispatch({
    type: RENDER_MESSAGE_TYPE_MENU,
    data: {
      [conversationId]: nonConversationalData,
    },
  });
};

const handleExistingNonConversational = (conversationId, message, nonConversationalState) => {
  let nonConversationalData = { ...nonConversationalState[conversationId] };

  if (nonConversationalData && !_.isEmpty(nonConversationalData) && !_.isEmpty(nonConversationalData.components)) {
    nonConversationalData = handleComponentsExist(nonConversationalData, message);
  } else {
    nonConversationalData = handleComponentsNotExist(nonConversationalData, message);
  }
  return nonConversationalData;
};

const handleComponentsExist = (NonConversationalData, message) => {
  NonConversationalData = handleExistingTab(NonConversationalData, message);
  NonConversationalData = handleNewTab(NonConversationalData, message);
  return NonConversationalData;
};

const handleComponentsNotExist = (NonConversationalData, message) => {
  let nonConversationalData = handleNonExistingNonConversational(NonConversationalData, message);
  return nonConversationalData;
};

const handleNonExistingNonConversational = (nonConversationalData = {}, message) => {
  if (message?.options?.pullDown) {
    nonConversationalData = {
      ...nonConversationalData,
      components: [],
      pullDownMenuComponent: message,
    };
  } else {
    if (
      !message?.message?.options?.updateInBackground
    ) {
      nonConversationalData = {
        ...nonConversationalData,
        selectedTab: message?.message?.options?.tabId,
        components: [message],
      };
    } else {
      nonConversationalData = {
        ...nonConversationalData,
        components: [message],
      };
    }
  }
  return nonConversationalData;
};

const handleExistingTab = (NonConversationalData, message) => {
  const updatedComponents = NonConversationalData.components.map((item, i) => {
    if (
      item?.options?.tabId &&
      message?.options?.tabId &&
      item?.options?.tabId === message?.options?.tabId
    ) {
      if (message?.options?.pullDown) {
        NonConversationalData = {
          ...NonConversationalData,
          pullDownMenuComponent: message
        };
        return item;
      } else {
        const shouldUpdateTab = !message?.message?.options?.updateInBackground;
        if (shouldUpdateTab) {
          NonConversationalData = {
            ...NonConversationalData,
            selectedTab: message?.message?.options?.tabId,
          };
        }
        return message;
      }
    } else if (message?.options?.pullDown) {
      NonConversationalData = {
        ...NonConversationalData,
        pullDownMenuComponent: message
      };
    }
    return item;
  });

  return {
    ...NonConversationalData,
    components: updatedComponents
  };
};

const handleNewTab = (NonConversationalData, message) => {
  const componentsList = NonConversationalData.components.map(component => component.options.tabId);
  const isMessageTabIdUnique = !componentsList.includes(message.options.tabId);
  const isNotPullDown = !message?.options?.pullDown;

  let updatedData = NonConversationalData;

  if (isMessageTabIdUnique && isNotPullDown) {
    updatedData = {
      ...NonConversationalData,
      components: [...NonConversationalData.components, message]
    };
  }

  return updatedData;
};

export const handleMessageTypeVideoCall = (conversationId, message) => (dispatch) => {
  const nonConversationalState = store.getState().v2.NonConversational;
  if (!_.isEmpty(nonConversationalState)) {
    handleNonEmptyNonConversational(conversationId, message, dispatch);
  } else {
    handleEmptyNonConversational(conversationId, message, dispatch);
  }
};

const handleNonEmptyNonConversational = (conversationId, message, dispatch) => {
  const NonConversationalData = store.getState().v2.NonConversational[conversationId];

  let newNonConversationalData;

  if (
    NonConversationalData &&
    !_.isEmpty(NonConversationalData) &&
    !_.isEmpty(NonConversationalData.components)
  ) {
    newNonConversationalData = handleComponentsExistVideoCall(NonConversationalData, message);
  } else {
    newNonConversationalData = handleComponentsNotExistVideoCall(NonConversationalData, message);
  }

  if (
    !message?.options?.updateInBackground
  ) {
    newNonConversationalData = {
      ...newNonConversationalData,
      selectedTab: message?.options?.tabId,
    };
  }

  dispatch({
    type: RENDER_MESSAGE_TYPE_VIDEOCALL,
    data: {
      [conversationId]: newNonConversationalData,
    },
  });
};

const handleEmptyNonConversational = (conversationId, message, dispatch) => {
  if (
    !message?.options?.updateInBackground
  ) {
    dispatch({
      type: RENDER_MESSAGE_TYPE_VIDEOCALL,
      data: {
        [conversationId]: {
          selectedTab: message?.options?.tabId,
          components: [message],
        },
      },
    });
  } else {
    dispatch({
      type: RENDER_MESSAGE_TYPE_VIDEOCALL,
      data: {
        [conversationId]: {
          components: [message],
        },
      },
    });
  }
};

const handleExistingTabVideoCall = (NonConversationalData, message) => {
  const newComponents = NonConversationalData.components.map((item, i) => {
    if (item?.options?.tabId &&
      message?.options?.tabId &&
      item?.options?.tabId === message?.options?.tabId) {
      return message;
    } else {
      return item;
    }
  });

  return {
    ...NonConversationalData,
    components: newComponents,
  };
};

const handleNewTabVideoCall = (NonConversationalData, message) => {
  const componentsList = NonConversationalData.components.map(component => component.options.tabId);

  if (!componentsList.includes(message.options.tabId)) {
    return {
      ...NonConversationalData,
      components: [...NonConversationalData.components, message],
    };
  }

  return { ...NonConversationalData };
};

const handleComponentsExistVideoCall = (NonConversationalData, message) => {
  NonConversationalData = handleExistingTabVideoCall(NonConversationalData, message);
  NonConversationalData = handleNewTabVideoCall(NonConversationalData, message);

  return NonConversationalData;
};

const handleComponentsNotExistVideoCall = (NonConversationalData, message) => {
  const updatedData = {
    ...NonConversationalData,
    components: [message],
  };

  return updatedData;
};

const updateNonConversationalDataWithAction = (
  nonConversationalData,
  message,
  isNewRow,
  propmtOnClose
) => {
  const action = message?.options?.action;
  let updatedNonConversationalData;
  switch (action) {
    case "change": {
      updatedNonConversationalData = handleMessageTypeTableChangeAction(
        nonConversationalData,
        message,
        propmtOnClose,
        isNewRow
      );

      return updatedNonConversationalData;
    }
    case "validation":
    case "results": {
      updatedNonConversationalData =
        handleMessageTypeInlineFormTableResultAction(
          nonConversationalData,
          message
        );
      return updatedNonConversationalData;
    }
    case "changeColumnTemplate": {
      updatedNonConversationalData = handleMessageTypeTableChangeColumnTemplate(
        nonConversationalData,
        message
      );
      return updatedNonConversationalData;
    }
    default:
      return nonConversationalData;
  }
};

const updateNonConversationalDataWithoutAction = (
  nonConversationalData,
  message,
  dispatch
) => {
  const nonConversationalDataExists =
    nonConversationalData && !_.isEmpty(nonConversationalData);
  const nonConversationalComponentDataExists =
    nonConversationalDataExists && !_.isEmpty(nonConversationalData.components);
  let updatedComponents = [];
  if (nonConversationalComponentDataExists) {
    const openDrawer = message.options.hasOwnProperty("openDrawer")
      ? message.options.openDrawer
      : false;
    const showFilterSearchInput = message.options.hasOwnProperty(
      "showFilterSearchInput"
    )
      ? message.options.showFilterSearchInput
      : false;
    const view = message.options.hasOwnProperty("view")
      ? message.options.view
      : "month";
    const style = message.options.hasOwnProperty("style")
      ? message.options.style
      : "calendar";
    const isNewFilter = message.options.hasOwnProperty("isNewFilter")
      ? message.options.isNewFilter
      : false;

    const componentsList = nonConversationalData.components.map(
      (item) => item.options.tabId
    );

    updatedComponents = nonConversationalData.components.map((item, i) => {
      if (
        item?.options?.tabId &&
        message?.options?.tabId &&
        item?.options?.tabId === message?.options?.tabId
      ) {
        let updatedItem = {
          ...message,
          options: {
            ...message.options,
            view: item.options.view,
            style: item.options.style,
            openDrawer: openDrawer,
            showFilterSearchInput: showFilterSearchInput,
            isNewFilter: isNewFilter,
          },
        };
        if (updatedItem.options.openDrawer) {
          dispatch(renderNonconversationalFilter(updatedItem));
        }
        return updatedItem;
      }
      return item;
    });

    if (!componentsList.includes(message.options.tabId)) {
      updatedComponents.push({
        ...message,
        options: {
          ...message.options,
          view,
          style,
          openDrawer,
          showFilterSearchInput,
          isNewFilter,
        },
      });
    }
  } else {
    updatedComponents = [message];
  }
  return { ...nonConversationalData, components: updatedComponents };
};

export const handleMessageTypeTable =
  (conversationId, message, isNewRow = false, propmtOnClose = true) => (dispatch) => {
    const nonConversationalState = store.getState().v2.NonConversational;
    const nonConversationalStateExists =
      nonConversationalState && !_.isEmpty(nonConversationalState);

    if (nonConversationalStateExists) {
      const nonConversationalData = nonConversationalState?.[conversationId];
      let updatedNonConversationalData;

      if (message?.options?.action) {
        updatedNonConversationalData = updateNonConversationalDataWithAction(
          nonConversationalData,
          message,
          isNewRow,
          propmtOnClose
        );
      } else {
        updatedNonConversationalData = updateNonConversationalDataWithoutAction(
          nonConversationalData,
          message,
          dispatch
        );
      }

      if (!message.options.updateInBackground) {
        updatedNonConversationalData = {
          ...updatedNonConversationalData,
          selectedTab: message?.options?.tabId,
        };
      }

      dispatch({
        type: RENDER_MESSAGE_TYPE_TABLE,
        data: { [conversationId]: updatedNonConversationalData },
      });
    } else {
      const data = {
        [conversationId]: {
          components: [message],
        },
      };

      if (!message.options.updateInBackground) {
        data[conversationId].selectedTab = message.options.tabId;
      }

      dispatch({
        type: RENDER_MESSAGE_TYPE_TABLE,
        data: data,
      });
    }
  };

export const handleMessageTypeCalendar =
  (conversationId, message) => (dispatch) => {
    const nonConversationalState = store.getState().v2.NonConversational;
    const nonConversationalStateExists =
      nonConversationalState && !_.isEmpty(nonConversationalState);

    if (nonConversationalStateExists) {
      const nonConversationalData = nonConversationalState?.[conversationId];
      let updatedNonConversationalData;

      if (message?.options?.action) {
        updatedNonConversationalData = updateNonConversationalDataWithAction(
          nonConversationalData,
          message
        );
      } else {
        updatedNonConversationalData = updateNonConversationalDataWithoutAction(
          nonConversationalData,
          message,
          dispatch
        );
      }

      if (!message.options.updateInBackground) {
        updatedNonConversationalData = {
          ...updatedNonConversationalData,
          selectedTab: message?.options?.tabId,
        };
      }

      dispatch({
        type: RENDER_MESSAGE_TYPE_CALENDAR,
        data: { [conversationId]: updatedNonConversationalData },
      });
    } else {
      const data = {
        [conversationId]: {
          components: [message],
        },
      };

      if (!message.options.updateInBackground) {
        data[conversationId].selectedTab = message.options.tabId;
      }

      dispatch({
        type: RENDER_MESSAGE_TYPE_CALENDAR,
        data: data,
      });
    }
  };

export const handleCalendarChange =
  (conversationId, options, field, value, parentTabId) => (dispatch) => {
    const nonConversationalState = store.getState().v2.NonConversational;

    if (!_.isEmpty(nonConversationalState)) {
      const nonConversationalData = nonConversationalState[conversationId];

      if (nonConversationalData?.components) {
        const updatedComponents = nonConversationalData.components.map((item) => {
          if (item?.options?.tabId === options?.tabId) {
            return {
              ...item,
              options: {
                ...item.options,
                [field]: value,
              },
            };
          }

          if (parentTabId === item?.options?.tabId) {
            const updatedMessage = item.message.map((itm) => {
              if (itm?.message?.options?.tabId === options?.tabId) {
                return {
                  ...itm,
                  message: {
                    ...itm.message,
                    options: {
                      ...itm.message.options,
                      style: value,
                    },
                  },
                };
              }
              return itm;
            });
            return {
              ...item,
              message: updatedMessage,
            };
          }

          return item;
        });

        dispatch({
          type: CHANGE_CALENDAR,
          data: {
            [conversationId]: {
              ...nonConversationalData,
              components: updatedComponents,
            },
          },
        });
      }
    }
  };


export const handleCalendarToolBarChange = (payload) => (dispatch) => {
  dispatch({
    type: BG_CALENDAR_TOOLBAR,
    data: {
      bgClndrToolBarState: payload,
    },
  });
};

export const handleMapSettingsChange = (payload) => (dispatch) => {
  dispatch({
    type: SAVE_MAP_SETTINGS,
    data: {
      mapSettingsState: payload,
    },
  });
};

export const handleMessageTypeMap =
  (conversationId, message) => (dispatch) => {
    const nonConversationalState = store.getState().v2.NonConversational;
    const nonConversationalStateExists =
      nonConversationalState && !_.isEmpty(nonConversationalState);

    if (nonConversationalStateExists) {
      const nonConversationalData = nonConversationalState?.[conversationId];
      let updatedNonConversationalData;

      if (message?.options?.action) {
        updatedNonConversationalData = updateNonConversationalDataWithAction(
          nonConversationalData,
          message
        );
      } else {
        updatedNonConversationalData = updateNonConversationalDataWithoutAction(
          nonConversationalData,
          message,
          dispatch
        );
      }

      if (!message.options.updateInBackground) {
        updatedNonConversationalData = {
          ...updatedNonConversationalData,
          selectedTab: message?.options?.tabId,
        };
      }

      dispatch({
        type: RENDER_MESSAGE_TYPE_MAP,
        data: { [conversationId]: updatedNonConversationalData },
      });
    } else {
      const data = {
        [conversationId]: {
          components: [message],
        },
      };

      if (!message.options.updateInBackground) {
        data[conversationId].selectedTab = message.options.tabId;
      }

      dispatch({
        type: RENDER_MESSAGE_TYPE_MAP,
        data: data,
      });
    }
  };

const updateMessageStyle = (message, item) => {
  return message.map((msg, index) => {
    const newMessage = { ...msg };
    newMessage.message.options.style =
      item?.message[index]?.message?.options.style;
    return newMessage;
  });
};

const createUpdatedComponents = (nonConversationalData, message) => {
  let componentsList = [];
  let found = false;

  const updatedComponents = nonConversationalData.components.map((item) => {
    componentsList.push(item.options.tabId);
    const itemTabId = item.options && item.options.tabId;
    const messageTabId = message?.options && message?.options.tabId;

    if (itemTabId && messageTabId && itemTabId === messageTabId) {
      found = true;
      const updatedMessages = updateMessageStyle(message?.message, item);
      const updatedMessage = {
        ...message,
        message: updatedMessages,
        containerSelectedTabIndex: item.containerSelectedTabIndex,
      };
      return updatedMessage;
    }
    return item;
  });

  if (!found) {
    updatedComponents.push({
      ...message,
      containerSelectedTabIndex:
        nonConversationalData.containerSelectedTabIndex || 0,
    });
  }

  return updatedComponents;
};

const dispatchMessageTypeContainer = (dispatch, conversationId, data) => {
  dispatch({
    type: RENDER_MESSAGE_TYPE_CONTAINER,
    data: { [conversationId]: data },
  });
};

const handleNewConversation = (dispatch, conversationId, message) => {
  const updateInBackground =
    message.options && message.options.updateInBackground;
  const data = { components: [message] };

  if (!updateInBackground) {
    data.selectedTab = message.options.tabId;
  }

  data.containerSelectedTabIndex = 0;

  dispatchMessageTypeContainer(dispatch, conversationId, data);
};

const handleExistingConversation = (
  dispatch,
  conversationId,
  nonConversationalData,
  message
) => {
  const updatedComponents = createUpdatedComponents(
    nonConversationalData,
    message
  );

  const updatedNonConversationalData = {
    ...nonConversationalData,
    components: updatedComponents,
  };

  const updateInBackground =
    message.options && message.options.updateInBackground;
  if (!updateInBackground) {
    updatedNonConversationalData.selectedTab = message.options.tabId;
  }

  dispatchMessageTypeContainer(
    dispatch,
    conversationId,
    updatedNonConversationalData
  );
};

export const handleMessageTypeContainer =
  (conversationId, message) => (dispatch) => {
    const nonConversationalState = store.getState().v2.NonConversational;

    if (nonConversationalState && !_.isEmpty(nonConversationalState)) {
      const nonConversationalData = nonConversationalState[conversationId];

      if (
        nonConversationalData &&
        !_.isEmpty(nonConversationalData) &&
        !_.isEmpty(nonConversationalData.components)
      ) {
        handleExistingConversation(
          dispatch,
          conversationId,
          nonConversationalData,
          message
        );
      } else {
        handleNewConversation(dispatch, conversationId, message);
      }
    } else {
      handleNewConversation(dispatch, conversationId, message);
    }
  };

export const handleContainerTabChange =
  (conversationId, message, containerSelectedTabIndex) => (dispatch) => {
    const nonConversationalState = store.getState().v2.NonConversational;

    if (!_.isEmpty(nonConversationalState)) {
      const nonConversationalData = nonConversationalState[conversationId];

      if (
        !_.isEmpty(nonConversationalData) &&
        !_.isEmpty(nonConversationalData.components)
      ) {
        const updatedComponents = nonConversationalData.components.map(
          (item) => {
            const itemTabId = item.options?.tabId;
            const messageTabId = message.options?.tabId;

            if (itemTabId && messageTabId && itemTabId === messageTabId) {
              return {
                ...item,
                containerSelectedTabIndex: containerSelectedTabIndex,
              };
            }
            return item;
          }
        );

        const updatedNonConversationalData = {
          ...nonConversationalData,
          components: updatedComponents,
        };

        dispatch({
          type: CHANGE_CONTAINER_SELECTED_TAB,
          data: {
            [conversationId]: updatedNonConversationalData,
          },
        });
      }
    }
  };

export const resetContainerFields = (conversationId, message) => (dispatch) => {
  if (
    store.getState().v2.NonConversational &&
    !_.isEmpty(store.getState().v2.NonConversational)
  ) {
    let NonConversationalData = _.cloneDeep(
      store.getState().v2.NonConversational[conversationId]
    );

    // search for the message
    for (let i = 0; i < NonConversationalData.components.length; i++) {
      if (
        NonConversationalData.components[i] &&
        NonConversationalData.components[i].options &&
        message?.options &&
        NonConversationalData.components[i].options.tabId ===
        message.options.tabId
      ) {
        for (
          let j = 0;
          j < NonConversationalData.components[i].message.length;
          j++
        ) {
          // check if it is form type
          if (
            NonConversationalData.components[i].message[j].type ===
            MessageTypeConstants.MESSAGE_TYPE_FORM2
          ) {
            // reset for fields in forms
            for (
              let k = 0;
              k <
              NonConversationalData.components[i].message[j].message.fields
                .length;
              k++
            ) {
              if (
                !NonConversationalData.components[i].message[j].message.fields[
                  k
                ].readOnly
              ) {
                NonConversationalData.components[i].message[j].message.fields[
                  k
                ].value = "";
                if (
                  NonConversationalData.components[i].message[j].message.fields[
                    k
                  ].results &&
                  !_.isEmpty(
                    NonConversationalData.components[i].message[j].message
                      .fields[k].results
                  )
                ) {
                  NonConversationalData.components[i].message[j].message.fields[
                    k
                  ].results = [];
                }
              }
            }
          }
        }
      }
    }

    dispatch({
      type: RESET_CONTAINER_FIELDS,
      data: {
        [conversationId]: NonConversationalData,
      },
    });
  }
};

export const handleMessageTypeForm2 = (conversationId, message) => (dispatch) => {
  const nonConversationalDataFromState = store.getState().v2.NonConversational;

  if (nonConversationalDataFromState && !_.isEmpty(nonConversationalDataFromState)) {
    handleExistingNonConversationalDataForm2(nonConversationalDataFromState, conversationId, message, dispatch);
  } else {
    handleNewNonConversationalDataForm2(conversationId, message, dispatch);
  }
};

export const handlePromptOnClose = (conversationId, promptOnClose = false) => (dispatch) => {
  const nonConversationalDataFromState = store.getState().v2.NonConversational[conversationId];
  let nonConversationalData = handleForm2PromptOnCloseAction(nonConversationalDataFromState, promptOnClose);

  dispatch({
    type: RENDER_MESSAGE_TYPE_FORM2,
    data: {
      [conversationId]: nonConversationalData,
    },
  });

}

const handleMessageTypeForm2WithAction = (nonConversationalData, message) => {
  switch (message?.options?.action) {
    case "change":
      // here we set the prompt dialog to true when some value in form is changed
      nonConversationalData = handleMessageTypeForm2ChangeAction(nonConversationalData, message, true);
      break;
    case "validation":
    case "results":
      nonConversationalData = handleMessageTypeForm2ResultAction(nonConversationalData, message);
      break;
  }
  return nonConversationalData;
}

const handleMessageTypeForm2WithComponents = (nonConversationalData, message) => {
  // This maps the existing components to their IDs
  const componentsList = nonConversationalData.components.map((item) => item.options.tabId);

  // This checks if the new message's ID is already in the list
  const messageExists = componentsList.includes(message.options.tabId);

  // If the message exists, replace it. Otherwise, add the new message to the end.
  const updatedComponents = messageExists
    ? nonConversationalData.components.map((item) =>
      item.options.tabId === message.options.tabId ? message : item
    )
    : [...nonConversationalData.components, message];

  // Return a new object with the old data but updated components
  return { ...nonConversationalData, components: updatedComponents };
};

const handleMessageTypeForm2WithoutComponents = (nonConversationalData, message) => {
  return {
    ...nonConversationalData,
    components: [message],
  };
}

const handleMessageTypeForm2WithoutAction = (nonConversationalData, message) => {
  if (
    nonConversationalData &&
    !_.isEmpty(nonConversationalData) &&
    !_.isEmpty(nonConversationalData.components)
  ) {
    nonConversationalData = handleMessageTypeForm2WithComponents(nonConversationalData, message);
  } else {
    nonConversationalData = handleMessageTypeForm2WithoutComponents(nonConversationalData, message);
  }

  if (
    !message?.options?.hasOwnProperty("updateInBackground") ||
    !message?.options?.updateInBackground
  ) {
    nonConversationalData = {
      ...nonConversationalData,
      // When the form opens up in the modal, the top level tab focus won't be changed  
      ...(!message?.options?.modal && { selectedTab: message?.options?.tabId }),
    };
  }

  return nonConversationalData;
}

const handleExistingNonConversationalDataForm2 = (nonConversationalDataFromState, conversationId, message, dispatch) => {
  let nonConversationalData = nonConversationalDataFromState[conversationId];

  if (message?.options?.action) {
    nonConversationalData = handleMessageTypeForm2WithAction(nonConversationalData, message);
  } else {
    nonConversationalData = handleMessageTypeForm2WithoutAction(nonConversationalData, message);
  }

  dispatch({
    type: RENDER_MESSAGE_TYPE_FORM2,
    data: {
      [conversationId]: nonConversationalData,
    },
  });
};


const handleNewNonConversationalDataForm2 = (conversationId, message, dispatch) => {
  const selectedTab = (!message?.options?.hasOwnProperty("updateInBackground") || !message?.options?.updateInBackground)
    ? message?.options?.tabId
    : undefined;

  dispatch({
    type: RENDER_MESSAGE_TYPE_FORM2,
    data: {
      [conversationId]: {
        ...(selectedTab && { selectedTab }),
        components: [message],
      },
    },
  });
};

export const resetForm2Fields = (conversationId, message) => (dispatch) => {
  if (
    store.getState().v2.NonConversational &&
    !_.isEmpty(store.getState().v2.NonConversational)
  ) {
    let NonConversationalData = _.cloneDeep(
      store.getState().v2.NonConversational[conversationId]
    );

    // search for the message
    for (let i = 0; i < NonConversationalData.components.length; i++) {
      if (
        NonConversationalData.components[i] &&
        NonConversationalData.components[i].options &&
        message?.options &&
        NonConversationalData.components[i].options.tabId ===
        message.options.tabId
      ) {
        // search for the non readonly field and reset the value
        for (
          let j = 0;
          j < NonConversationalData.components[i].message.length;
          j++
        ) {
          if (!NonConversationalData.components[i].message[j].readOnly) {
            NonConversationalData.components[i].message[j].value = "";
            if (
              NonConversationalData.components[i].message[j].results &&
              !_.isEmpty(NonConversationalData.components[i].message[j].results)
            ) {
              NonConversationalData.components[i].message[j].results = [];
            }
          }
        }
      }
    }

    dispatch({
      type: RESET_FORM2_FIELDS,
      data: {
        [conversationId]: NonConversationalData,
      },
    });
  }
};

const handleExistingNonConversationalDataHtml = (conversationId, message, dispatch) => {
  const nonConversationalData = store.getState().v2.NonConversational[conversationId];

  let updatedNonConversationalData = { ...nonConversationalData };

  if (!message.options.external) {
    if (
      nonConversationalData &&
      !_.isEmpty(nonConversationalData) &&
      !_.isEmpty(nonConversationalData.components)
    ) {
      const componentsList = nonConversationalData.components.map((item) =>
        item.options.tabId === message.options.tabId ? message : item
      );

      if (!componentsList.some(item => item.options.tabId === message.options.tabId)) {
        componentsList.push(message);
      }

      updatedNonConversationalData = {
        ...updatedNonConversationalData,
        components: componentsList,
      };
    } else {
      updatedNonConversationalData = {
        ...updatedNonConversationalData,
        components: [message],
      };
    }

    if (
      !message?.options?.hasOwnProperty("updateInBackground") ||
      !message?.options?.updateInBackground
    ) {
      updatedNonConversationalData = {
        ...updatedNonConversationalData,
        selectedTab: message?.options?.tabId,
      };
    }
  } else {
    if (message.options.url) {
      window.open(message.options.url, "_blank");
    } else {
      let wnd = window.open('', "_blank");
      wnd.document.write(message.options.content);
      wnd.document.close();
    }
  }

  dispatch({
    type: RENDER_MESSAGE_TYPE_HTML,
    data: {
      [conversationId]: updatedNonConversationalData,
    },
  });
}


const handleNewNonConversationalDataHtml = (conversationId, message, dispatch) => {
  let nonConversationalData = {};

  if (
    !message?.options?.hasOwnProperty("updateInBackground") ||
    !message?.options?.updateInBackground
  ) {
    nonConversationalData = {
      selectedTab: message.options.tabId,
      components: [message],
    };
  } else {
    nonConversationalData = {
      components: [message],
    };
  }

  dispatch({
    type: RENDER_MESSAGE_TYPE_HTML,
    data: {
      [conversationId]: nonConversationalData,
    },
  });
};

export const handleMessageTypeHtml =
  (conversationId, message) => (dispatch) => {
    if (
      store.getState().v2.NonConversational &&
      !_.isEmpty(store.getState().v2.NonConversational)
    ) {
      handleExistingNonConversationalDataHtml(conversationId, message, dispatch);
    } else {
      handleNewNonConversationalDataHtml(conversationId, message, dispatch);
    }
  };

// Remove the component associated with the deleted tab
const removeDeletedComponent = (components, deletedTabId) => {
  return components.filter((item) => item?.options?.tabId !== deletedTabId);
};

const getNewSelectedTab = (components, currentSelectedTab, deletedTabId) => {
  if (deletedTabId !== currentSelectedTab) {
    // Case 1: An unselected tab is deleted, keep the current selected tab
    return currentSelectedTab;
  }

  const deletedTabIndex = components.findIndex(
    (item) => item?.options?.tabId === deletedTabId
  );

  // Case 2: Current selected tab is deleted and there is a previous tab
  if (deletedTabIndex > 0) {
    const previousTab = components[deletedTabIndex - 1];
    if (previousTab?.options?.tabId) {
      return previousTab.options.tabId;
    }
  }

  // Case 3: Current selected tab is deleted and there is no previous tab but there is a next tab
  if (deletedTabIndex < components.length) {
    const nextTab = components[deletedTabIndex + 1];
    if (nextTab?.options?.tabId) {
      return nextTab.options.tabId;
    }
  }

  // Case 4: Current selected tab is deleted and there is neither a previous nor a next tab
  return "";
};

// Create a new non-conversational data object
const createUpdatedNonConversationalData = (
  nonConversationalData,
  updatedComponents,
  newSelectedTab
) => {
  return {
    ...nonConversationalData,
    components: updatedComponents,
    selectedTab: newSelectedTab,
  };
};

// The main function
export const removeNonConversationalMessages =
  (conversationId, message) => (dispatch) => {
    const nonConversationalData =
      store.getState().v2.NonConversational[conversationId];
    const deletedTabId = message?.options?.tabId;

    if (
      !_.isEmpty(nonConversationalData) &&
      !_.isEmpty(nonConversationalData.components) &&
      deletedTabId
    ) {
      const updatedComponents = removeDeletedComponent(
        nonConversationalData.components,
        deletedTabId
      );
      const newSelectedTab = getNewSelectedTab(
        nonConversationalData.components,
        nonConversationalData.selectedTab,
        deletedTabId
      );
      const updatedNonConversationalData = createUpdatedNonConversationalData(
        nonConversationalData,
        updatedComponents,
        newSelectedTab
      );

      dispatch({
        type: REMOVE_APP,
        data: {
          [conversationId]: updatedNonConversationalData,
        },
      });
    }
  };

export const resetNonConversational = () => (dispatch) => {
  dispatch({
    type: RESET_NONCONVENTIONAL,
    data: {},
  });
};

export const updateFilterFlags = (conversationId, message) => (dispatch) => {
  if (
    store.getState().v2.NonConversational &&
    !_.isEmpty(store.getState().v2.NonConversational)
  ) {
    let NonConversationalData = _.cloneDeep(
      store.getState().v2.NonConversational[conversationId]
    );

    if (
      NonConversationalData &&
      !_.isEmpty(NonConversationalData) &&
      !_.isEmpty(NonConversationalData.components)
    ) {
      NonConversationalData.components.forEach((item) => {
        if (
          item?.options?.tabId &&
          message?.options?.tabId &&
          item?.options?.tabId === message?.options?.tabId
        ) {
          let newMessage = _.cloneDeep(item);
          newMessage.options = message.options;
          switch (item.messageType) {
            case MessageTypeConstants.MESSAGE_TYPE_CALENDAR:
              dispatch(handleMessageTypeCalendar(conversationId, newMessage));
              break;
            case MessageTypeConstants.MESSAGE_TYPE_MAP:
              dispatch(handleMessageTypeTable(conversationId, newMessage));
              break;
            case "form2":
              console.log("<<< hit here")
              break;
            case MessageTypeConstants.MESSAGE_TYPE_TABLE:
              dispatch(handleMessageTypeTable(conversationId, newMessage));
              break;
          }
        }
        if (message?.options?.parentTabId === item?.options?.tabId) {
          item.message.forEach((itm) => {
            if (itm?.message?.options?.tabId === message?.options?.tabId) {
              itm.message.options.view = message.options.view;
              itm.message.options.style = message.options.style;
              itm.message.options.openDrawer = message.options.openDrawer;
              itm.message.options.showFilterSearchInput =
                message.options.showFilterSearchInput;
              itm.message.options.isNewFilter = message.options.isNewFilter;
              itm.message.options.parentTabId = item?.options?.tabId;
              if (itm.message.options.openDrawer) {
                dispatch(renderNonconversationalFilter(itm.message));
              }
            }
          });
          let newMessageContainer = _.cloneDeep(item);
          dispatch(
            handleMessageTypeContainer(conversationId, newMessageContainer)
          );
        }
      });
    }
  }
};

const updateComponentsListWithMessageTimeLine = (nonConversationalData, message) => {
  let componentsList = [];

  const updatedComponents = nonConversationalData.components.map((item) => {
    componentsList.push(item.options.tabId);

    if (
      item?.options?.tabId &&
      message?.options?.tabId &&
      item?.options?.tabId === message?.options?.tabId
    ) {
      if (message?.options?.pullDown) {
        return {
          ...nonConversationalData,
          pullDownMenuComponent: message
        };
      } else {
        return updateComponentWithMessageTimeLine(item, message);
      }
    }

    return item;
  });

  return {
    components: updatedComponents,
    componentsList,
    nonConversationalData: { ...nonConversationalData, components: updatedComponents }
  };
};

const updateComponentWithMessageTimeLine = (component, message) => {
  let updatedComponent;

  if (message?.options?.action === "loadMore") {
    updatedComponent = handleLoadMoreActionTimeLine(component, message);
  } else {
    updatedComponent = {
      ...message,
      isBookmarkOnly: component?.isBookmarkOnly,
    };
  }

  // Handle `updateInBackground` option
  const updateInBackground = message?.message?.options?.updateInBackground;
  if (updateInBackground === undefined || !updateInBackground) {
    // Note that we're creating a new object here, rather than mutating `updatedComponent`.
    updatedComponent = {
      ...updatedComponent,
      selectedTab: message?.message?.options?.tabId,
    };
  }

  return updatedComponent;
};

const handleLoadMoreActionTimeLine = (component, message) => {
  // We destructure properties that we'll use more than once to avoid repeated object property lookup.
  const { message: messageContent, options } = message;
  const { rows: messageRows = [] } = messageContent || {};
  const { message: componentMessage } = component;
  const { rows: componentRows = [] } = componentMessage || {};

  let updatedComponent = { ...component };

  // It's crucial here that we create a new object for `message` and `rows`, rather than mutating them.
  if (messageRows.length !== 0) {
    updatedComponent = {
      ...updatedComponent,
      ...message,
      isListEnd: false,
      isBookmarkOnly: component?.isBookmarkOnly,
      message: {
        ...messageContent,
        rows: [...componentRows, ...messageRows],
      },
    };
  } else {
    updatedComponent = {
      ...updatedComponent,
      isBookmarkOnly: component?.isBookmarkOnly,
      isListEnd: true,
    };
  }

  return updatedComponent;
};

const handleComponentsExistTimeline = (nonConversationalData, message) => {
  let { components, componentsList, nonConversationalData: updatedNonConversationalData } = updateComponentsListWithMessageTimeLine(nonConversationalData, message);

  if (
    !componentsList.includes(message.options.tabId) &&
    !message?.options?.pullDown
  ) {
    updatedNonConversationalData = { ...updatedNonConversationalData, selectedTab: message?.message?.options?.tabId };
    components = [...components, message];
  }

  return { ...updatedNonConversationalData, components };
};


const handleComponentsNotExistTimeline = (nonConversationalData, message) => {
  if (message?.options?.pullDown) {
    nonConversationalData = {
      ...nonConversationalData,
      components: [],
      pullDownMenuComponent: message,
    };
  } else {
    if (
      !message?.message?.options.hasOwnProperty("updateInBackground") ||
      !message?.message?.options?.updateInBackground
    ) {
      nonConversationalData = {
        ...nonConversationalData,
        selectedTab: message?.message?.options?.tabId,
        components: [message],
      };
    } else {
      nonConversationalData = {
        ...nonConversationalData,
        components: [message],
      };
    }
  }
  return nonConversationalData;
};

const handleExistingNonConversationalDataTimeline = (conversationId, message, dispatch) => {
  const nonConversationalData = store.getState().v2.NonConversational[conversationId];

  let updatedNonConversationalData;

  if (
    nonConversationalData &&
    !_.isEmpty(nonConversationalData) &&
    !_.isEmpty(nonConversationalData.components)
  ) {
    updatedNonConversationalData = handleComponentsExistTimeline(nonConversationalData, message);
  } else {
    updatedNonConversationalData = handleComponentsNotExistTimeline(nonConversationalData, message);
  }

  dispatch({
    type: RENDER_MESSAGE_TYPE_TIMELINE,
    data: {
      [conversationId]: updatedNonConversationalData,
    },
  });
};

const handleNewNonConversationalDataTimeline = (conversationId, message, dispatch) => {
  let nonConversationalData = {};

  if (message?.options?.pullDown) {
    nonConversationalData = {
      components: [],
      pullDownMenuComponent: message,
    };
  } else {
    if (
      !message?.message?.options?.hasOwnProperty("updateInBackground") ||
      !message?.message?.options?.updateInBackground
    ) {
      nonConversationalData = {
        selectedTab: message?.message?.options?.tabId,
        components: [message],
      };
    } else {
      nonConversationalData = {
        components: [message],
      };
    }
  }

  dispatch({
    type: RENDER_MESSAGE_TYPE_TIMELINE,
    data: {
      [conversationId]: nonConversationalData,
    },
  });
};

export const handleMessageTypeTimeline = (conversationId, message) => (dispatch) => {
  if (
    store.getState().v2.NonConversational &&
    !_.isEmpty(store.getState().v2.NonConversational)
  ) {
    handleExistingNonConversationalDataTimeline(conversationId, message, dispatch);
  } else {
    handleNewNonConversationalDataTimeline(conversationId, message, dispatch);
  }
};

export const handleMessageTypeChat = (conversationId, message) => (dispatch) => {
  if (message) {
    initializeBotContext({
      userDomain: store.getState().selectedDomain.userDomain,
      botId: "im-bot",
    }).then(() => {
      const temp = message;
      temp.botId = 'im-bot';
      temp.bot = null;

      dispatch({
        type: RENDER_MESSAGE_TYPE_CHAT,
        data: {
          componentInWindow: {
            [conversationId]: temp,
          },
        },
      });
    });
  }
};

export const handleComponentsExistSurvey = (NonConversationalData, message) => {
  let componentsList = []; // Use to maintain the order of tabs in components
  let updatedNonConversationalData = { ...NonConversationalData };
  NonConversationalData.components.forEach((item, i) => {
    componentsList.push(NonConversationalData.components[i].options.tabId);
    if (
      item?.options?.tabId &&
      message?.options?.tabId &&
      item?.options?.tabId === message?.options?.tabId
    ) {
      if (message?.options?.pullDown) {
        updatedNonConversationalData = {
          ...updatedNonConversationalData,
          pullDownMenuComponent: message
        }
      } else {
        const components = NonConversationalData.components;
        updatedNonConversationalData = {
          ...updatedNonConversationalData,
          selectedTab: message?.options?.tabId,
          components: [...components.slice(0, i), {
            ...message,
            options: {
              ...message.options,
              ...item.options,
            },
          }, ...components.slice(i + 1)]
        };
        if (
          !message?.message?.options?.hasOwnProperty("updateInBackground") ||
          !message?.message?.options?.updateInBackground
        ) {
          updatedNonConversationalData = {
            ...updatedNonConversationalData,
            selectedTab: message?.options?.tabId
          };
        }
      }
    } else if (message?.options?.pullDown) {
      updatedNonConversationalData = {
        ...updatedNonConversationalData,
        pullDownMenuComponent: message
      };
    }
  });
  if (
    !componentsList.includes(message.options.tabId) &&
    !message?.options?.pullDown
  ) {
    const components = NonConversationalData.components;
    updatedNonConversationalData = {
      ...updatedNonConversationalData,
      selectedTab: message?.options?.tabId
    };
    const data = {
      ...message,
      options: { ...message.options, ...message.message },
    };
    updatedNonConversationalData = {
      ...updatedNonConversationalData,
      components: [...components, data]
    };
  }
  return updatedNonConversationalData;
};

export const handleComponentsNotExistSurvey = (NonConversationalData, message) => {
  let updatedNonConversationalData = { ...NonConversationalData };
  if (message?.options?.pullDown) {
    updatedNonConversationalData = {
      ...updatedNonConversationalData,
      components: [],
      pullDownMenuComponent: message,
    };
  } else {
    if (
      !message?.message?.options.hasOwnProperty("updateInBackground") ||
      !message?.message?.options?.updateInBackground
    ) {
      updatedNonConversationalData = {
        ...updatedNonConversationalData,
        selectedTab: message?.options?.tabId,
        components: [message],
      };
    } else {
      updatedNonConversationalData = {
        ...updatedNonConversationalData,
        components: [message],
      };
    }
  }
  return updatedNonConversationalData;
};


export const handleExistingNonConversationalDataSurvey = (conversationId, message, dispatch) => {
  let NonConversationalData = store.getState().v2.NonConversational[conversationId];
  let updatedNonConversationalData = { ...NonConversationalData };

  if (
    NonConversationalData &&
    !_.isEmpty(NonConversationalData) &&
    !_.isEmpty(NonConversationalData.components)
  ) {
    updatedNonConversationalData = handleComponentsExistSurvey(updatedNonConversationalData, message);
  } else {
    updatedNonConversationalData = handleComponentsNotExistSurvey(updatedNonConversationalData, message);
  }

  dispatch({
    type: RENDER_MESSAGE_TYPE_SURVEY,
    data: {
      [conversationId]: updatedNonConversationalData,
    },
  });
};

export const handleNewNonConversationalDataSurvey = (conversationId, message, dispatch) => {
  let NonConversationalData = {};
  let updatedNonConversationalData = { ...NonConversationalData };

  if (message?.options?.pullDown) {
    updatedNonConversationalData = {
      ...updatedNonConversationalData,
      components: [],
      pullDownMenuComponent: message,
    };
  } else {
    if (
      !message?.message?.options?.hasOwnProperty("updateInBackground") ||
      !message?.message?.options?.updateInBackground
    ) {
      updatedNonConversationalData = {
        ...updatedNonConversationalData,
        selectedTab: message?.options?.tabId,
        components: [message],
      };
    } else {
      updatedNonConversationalData = {
        updatedNonConversationalData,
        components: [message],
      };
    }
  }

  dispatch({
    type: RENDER_MESSAGE_TYPE_SURVEY,
    data: {
      [conversationId]: updatedNonConversationalData,
    },
  });
};

export const handleMessageTypeSurvey = (conversationId, message) => (dispatch) => {
  if (store.getState().v2.NonConversational && !_.isEmpty(store.getState().v2.NonConversational)) {
    handleExistingNonConversationalDataSurvey(conversationId, message, dispatch);
  } else {
    handleNewNonConversationalDataSurvey(conversationId, message, dispatch);
  }
};

const handleExistsComponentsDashboard = (NonConversationalData, message) => {
  let componentsList = [];
  let updatedConversationalData = { ...NonConversationalData };
  NonConversationalData.components.forEach((item, i) => {
    componentsList.push(NonConversationalData.components[i].options.tabId);
    if (
      item?.options?.tabId &&
      message?.options?.tabId &&
      item?.options?.tabId === message?.options?.tabId
    ) {
      if (message?.options?.pullDown) {
        updatedConversationalData = {
          ...updatedConversationalData,
          pullDownMenuComponent: message
        };
      } else {
        if (
          !message?.message?.options?.hasOwnProperty(
            "updateInBackground"
          ) ||
          !message?.message?.options?.updateInBackground
        ) {
          updatedConversationalData = {
            ...updatedConversationalData,
            selectedTab: message?.options?.tabId
          };
        }
      }
    } else if (message?.options?.pullDown) {
      updatedConversationalData = {
        ...updatedConversationalData,
        pullDownMenuComponent: message
      };
    }
  });
  updatedConversationalData = {
    ...updatedConversationalData,
    selectedTab: message?.options?.tabId,
    components: [...components, message]
  };

  return updatedConversationalData;
};

const handleNonExistsComponentsDashboard = (NonConversationalData, message) => {
  let updatedConversationalData = { ...NonConversationalData };
  if (message?.options?.pullDown) {
    updatedConversationalData = {
      ...updatedConversationalData,
      components: [],
      pullDownMenuComponent: message,
    };
  } else {
    if (
      !message?.message?.options.hasOwnProperty("updateInBackground") ||
      !message?.message?.options?.updateInBackground
    ) {
      updatedConversationalData = {
        ...updatedConversationalData,
        selectedTab: message?.message?.options?.tabId,
        components: [message],
      };
    } else {
      updatedConversationalData = {
        ...updatedConversationalData,
        components: [message],
      };
    }
  }

  return updatedConversationalData;
};

export const handleExistsNonConversationalDashboard =
  (conversationId, message) => (dispatch) => {
    let NonConversationalData = store.getState().v2.NonConversational[conversationId];

    if (
      NonConversationalData &&
      !_.isEmpty(NonConversationalData) &&
      !_.isEmpty(NonConversationalData.components)
    ) {
      NonConversationalData = handleExistsComponentsDashboard(NonConversationalData, message);
    } else {
      NonConversationalData = handleNonExistsComponentsDashboard(NonConversationalData, message);
    }

    dispatch({
      type: RENDER_MESSAGE_TYPE_DASHBOARD,
      data: {
        [conversationId]: NonConversationalData,
      },
    });
  };

export const handleNewNonConversationalDashboard =
  (conversationId, message) => (dispatch) => {
    let NonConversationalData = {};
    if (message?.options?.pullDown) {
      NonConversationalData = {
        components: [],
        pullDownMenuComponent: message,
      };
    } else {
      if (
        !message?.message?.options?.hasOwnProperty("updateInBackground") ||
        !message?.message?.options?.updateInBackground
      ) {
        NonConversationalData = {
          selectedTab: message?.options?.tabId,
          components: [{
            ...message,
            message: [{
              "id": "dashboard",
              "tabId": "dashboard",
              "title": "Dashboard",
              "hidden": false,
              "index": 0,
              "onlineStatus": 0,
              "quickView": true,
              ...message?.options,
            }],
            options: {
              ...message?.options,
              "parent": null,
              "formId": "dashboard",
              "controlId": "dashboard",
              "title": "Dashboard",
              "description": "Join meeting",
              "allowMinimize": true,
              "allowClose": true,
              "minimizeOnConfirm": false,
              "updateInBackground": false,
              "readOnly": false,
              "allowEdit": true,
              "modal": false,
            }
          }],
        };
      } else {
        NonConversationalData = {
          components: [message],
        };
      }
    }

    dispatch({
      type: RENDER_MESSAGE_TYPE_DASHBOARD,
      data: {
        [conversationId]: NonConversationalData,
      },
    });
  };

export const handleMessageTypeDashboard = (conversationId, message) => (dispatch) => {
  if (store.getState().v2.NonConversational && !_.isEmpty(store.getState().v2.NonConversational)) {
    handleExistsNonConversationalDashboard(conversationId, message, dispatch);
  } else {
    handleNewNonConversationalDashboard(conversationId, message, dispatch);
  }
};
