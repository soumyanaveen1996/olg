import UserServiceClient from "./Clients/UserServiceClient";
import {
  getDataFromLFStorage,
  LFStorageKeys,
  saveDataInLFStorage,
} from "./LFStorage";
import Capabilities from "../Utils/capability";
import tell from "./TellBotContext";
import ServiceClientUtils from "./Clients/ServiceClientUtils";
import { getAuthData } from "./StorageService";
import _ from "lodash";
import AgentGuardServiceClient from "./Clients/AgentGuardServiceClient";
import { changeBotWaitLoader } from "../State/actions/loader";
import store from "../State/configureStore";
import { addLog } from "../Services/UtilsService";
import ConversationContext from "../Utils/capability/ConversationContext.js";
import { NEW_SERVER_MESSAGE_RECEIVED } from "../State/actions/chats";
import { ADD_NEW_USER_ASSOCIATION } from "../State/actions/contacts";
import {
  getUserDetails,
  sortByModifiedOn,
} from "../Services/InteractionsService";
import ConversationServiceClient from "../Services/Clients/ConversationServiceClient";

export let botContext = {};
export let retryCount = 1;
export let processing = false;
export let queue = [];
export let queueLength = 0;
export let alreadyProcessedMsgs = [];

export function activateEnterpriseBots(code) {
  return UserServiceClient.subscribeDomain({
    verificationCode: code,
  });
}

export const initializeBotContext = async ({ userDomain, botId }) => {
  try {
    let userDomainBots = await getDataFromLFStorage(userDomain);

    let dependencyList = await getDataFromLFStorage(LFStorageKeys.DEPENDENCIES);
    console.log(
      `%c Initializing bot ${botId} for ${userDomain} domain`,
      "color: green;"
    );

    if (userDomainBots?.length && dependencyList?.length) {
      botContext = userDomainBots.filter((bot) => bot?.botId === botId)[0];
      botContext.botManifest = botContext;
      botContext.userDetails = getAuthData().user;
      botContext.botState = {};

      botContext["capabilities"] = { ...Capabilities };
      const dependency = botContext.dependencies;

      for (const key in dependency) {
        if (!_.isEmpty(dependency[key])) {
          let keyName = key;
          let botDependency = dependencyList.filter(
            (item) =>
              item.remoteDependencies === keyName &&
              item.version === dependency[keyName].version
          );
          if (
            botDependency.length &&
            dependency[keyName].version === botDependency[0].version
          ) {
            try {
              var botModule = null;
              let myBot = eval(botDependency[0].Content);
              if (typeof myBot != "object") {
                //The new framework doesn't return the bot object, it creates a global variable called botModule and assigns the bot to it
                myBot = botModule;
              }
              botContext.capabilities[keyName] = myBot;
            } catch (error) {
              console.error(
                `Failed to eval the bot code. Kindly check the bot dependency (${keyName}) >>`,
                error
              );
            }
          }
        }
      }

      //====================================================
      botContext.getCapability = (name) => {
        if (botContext.capabilities[name]) {
          return botContext.capabilities[name];
        } else {
          console.error(
            "This capability is not supported on this device: [" + name + "]"
          );
        }
      };

      botContext.setConversationContext = (context) => {
        botContext.conversationContext = context;
      };

      botContext.getConversationContext = () => {
        return botContext.conversationContext;
      };

      botContext.updateConversationContextId = (contextId) => {
        return botContext.updateConversationContextId(contextId);
      };

      botContext.getBotKey = () => {
        return botContext?.botId;
      };

      // Actual botId.
      botContext.getBotId = () => {
        return botContext?.botId;
      };

      botContext.tell = (payload) =>
        new Promise((resolve) => {
          tell(payload, botContext);
          // const botId = botContext.getBotId();
          if (typeof payload === "string") {
            const Message = botContext.getCapability("Message");
            let message = new Message();
            message.stringMessage(payload);
            message.messageByBot(true);
            resolve(message);
          } else {
            payload.messageByBot(true);
            resolve(payload);
          }
        });

      botContext.done = () =>
        new Promise((resolve) => {
          resolve(botContext.done());
        });

      botContext.wait = (shouldWait = true) => {
        store.dispatch(changeBotWaitLoader(shouldWait));
        return shouldWait;
      };

      // botContext.log = (payload) => {
      //   if (store.getState().user.isOnline) {
      //     return new Promise((resolve) => {
      //       if (botContext.log) {
      //         setTimeout(() => {
      //           addLog(payload)
      //             .then(() => {
      //               resolve();
      //             })
      //             .catch((err) => {
      //               resolve();
      //               console.error("Error in bot context log: ", err);
      //             });
      //         }, 2000);
      //       } else {
      //         resolve();
      //       }
      //     });
      //   }
      // };

      botContext.devMode = (payload) =>
        new Promise((resolve) => {
          if (botContext.devMode) {
            resolve(payload);
          } else {
            resolve();
          }
        });
      //=======================================================
      if (botContext?.botContent?.length) {
        try {
          var botModule = null;
          let myBot2 = eval(botContext.botContent);
          if (typeof myBot2 != "object") {
            //The new framework doesn't return the bot object, it creates a global variable called botModule and assigns the bot to it
            myBot2 = botModule;
          }
          botContext.botContent = myBot2;
        } catch (error) {
          console.error(
            "Failed to eval the bot code. Kindly check the bot >>",
            error
          );
        }
      }
      console.log("%c Initialized BotContext >> ", "color: green;", botContext);

      // correting necessary fields for the im-bot
      if (botContext?.botId === "im-bot") {
        botContext = await adjustIMBotContext(botContext);
      }
      return botContext;
    }
  } catch (error) {
    console.error("**ERROR**", error);
  }
};

const adjustIMBotContext = async (botContext, conversationId) => {
  let chats = store.getState().chats;
  let userInfo = store.getState().user.user;

  if (botContext.conversationContext) {
    botContext.conversationContext.conversationId =
      conversationId || chats.selectedConversation.conversationId;
    botContext.conversationContext.participants =
      chats.selectedConversation.participants;
  } else {
    let context = await ConversationContext.createNewConversationContext(
      botContext,
      {
        userId: userInfo.userId,
        info: { userName: userInfo.userName },
      },
      conversationId || chats.selectedConversation.conversationId
    );
    if (
      Array.isArray(context.participants) &&
      context.participants.length === 1
    ) {
      context.participants = chats.selectedConversation.participants;
    }
    botContext["conversationContext"] = context;
  }
  return botContext;
};

export const pushAsyncMsg = (message) => {
  queue[queueLength++] = message;
  let usersAssociation = store.getState().contacts.usersAssociation;

  // fetch & fill the user details for group chat message
  if (message.bot == "im-bot" && !usersAssociation[message.createdBy]) {
    getUserDetails(message.createdBy)
      .then((sender) => {
        store.dispatch({
          type: ADD_NEW_USER_ASSOCIATION,
          data: { userId: sender.userId, userName: sender.userName },
        });
        queueMicrotask(() => {
          processAsyncMsg();
        });
      })
      .catch((err) => console.log("Unable to get user details", err));
  } else {
    queueMicrotask(() => {
      processAsyncMsg();
    });
  }
};

export const top = () => {
  if (queueLength > 0) {
    return queue[0];
  } else {
    return undefined;
  }
};

export const clear = () => {
  while (top()) {
    pop();
  }
};

export const pop = () => {
  if (queueLength > 0) {
    const val = queue.shift();
    queueLength--;
    return val;
  } else {
    return undefined;
  }
};

export const processAsyncMsg = async () => {
  if (processing) {
    return;
  }
  processing = true;
  while (top()) {
    const message = top();
    for (let i = 0; i < retryCount; ++i) {
      try {
        if (!alreadyProcessedMsgs.includes(message.messageId)) {
          const success = await callBotContextAsyncResult(message);
          if (success) {
            alreadyProcessedMsgs.push(message.messageId);
            break;
          }
        }
      } catch (e) {
        console.log("Error in handling message:", e);
      }
    }
    pop();
  }
  processing = false;
};

export const callBotContextAsyncResult = async (rawMessage) => {
  console.log(
    "%c Async message send from backend to bot(asyncResult) >> ",
    "color: green;",
    rawMessage
  );
  if (
    rawMessage.bot === "im-bot" &&
    parseInt(rawMessage.contentType) === 1001
  ) {
    window.lastMsg = {
      messageId: rawMessage.messageId,
      conversationId: rawMessage.conversation,
      contentType: rawMessage.contentType,
      messageContent: rawMessage.details[0].message,
      createdBy: rawMessage.createdBy,
    };
    try {
      const { content } = await ConversationServiceClient.fetchTimeLine();
      let recents = content ? content.conversations : [];
      let favourites = content ? content.favourites : [];

      favourites.forEach((conversation) => {
        conversation.favourite = true;
      });
      let timeLine = [...recents, ...favourites];
      sortByModifiedOn(timeLine);

      store.dispatch({
        type: "TIME_LINE_RECEIVED",
        data: {
          timeLine: timeLine,
          userId: store.getState().user.user.userId,
          changeCurrent: false,
        },
      });

      const {
        contacts: accepted,
        ignored,
        localContacts,
        sites,
      } = await UserServiceClient.getContacts(
        store.getState().selectedDomain.userDomain
      );
      localContacts.forEach((elem) => {
        elem["contactType"] = "local";
      });
      let vesselContacts = [];
      if (sites && typeof sites === "string") {
        vesselContacts = [...JSON.parse(sites)];
      } else {
        vesselContacts = [...sites];
      }

      store.dispatch({
        type: "CONTACTS_RECEIVED",
        data: {
          accepted: accepted,
          ignored: ignored,
          localContacts: localContacts,
          vessels: vesselContacts,
        },
      });
    } catch (error) {
      console.log("unable to get contacts", error);
    }
  }
  // Check if the botId in current botContext and the async msg are same
  else if (rawMessage.bot === botContext?.botId) {
    rawMessage.details = ServiceClientUtils.parseBytesContent(
      rawMessage.details
    );
    if (rawMessage.conversation) {
      window.lastMsg = {
        messageId: rawMessage.messageId,
        conversationId: rawMessage.conversation,
        contentType: rawMessage.contentType,
        messageContent: rawMessage.details[0].message,
      };
    }
    return (
      botContext.botContent &&
      botContext.botContent.asyncResult(rawMessage, null, null, botContext)
    );
  } else if (rawMessage.bot === "im-bot" && rawMessage.contentType === 10) {
    // show the notification count even if some other bot is interacted with
    rawMessage.details = ServiceClientUtils.parseBytesContent(
      rawMessage.details
    );
    const message = {
      ...rawMessage,
      addedByBot: true,
      botKey: null,
      contentType: rawMessage.contentType.toString(),
      message: rawMessage.details[0].message,
      uuid: rawMessage.messageId,
      createdOn: new Date(rawMessage.createdOn),
      messageDate: new Date(rawMessage.createdOn),
      messageType: "string",
      options: null,
      status: 0,
    };
    delete message.details;
    store.dispatch({
      type: NEW_SERVER_MESSAGE_RECEIVED,
      data: { message, conversationId: message.conversation },
    });
  }
};

function parseInputMessage(data) {
  const Message = botContext.getCapability("Message");
  const MessageTypeConstants = botContext.getCapability("MessageTypeConstants");
  let message = new Message({ uuid: data.messageId });
  let messageType = data.messageType;

  if (messageType === MessageTypeConstants.MESSAGE_TYPE_FORM2) {
    message.form2Message(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE) {
    message.formResponseMessage(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE) {
    message.tableResponseMessage(data.message, data.options);
  } else if (
    messageType === MessageTypeConstants.MESSAGE_TYPE_SLIDER_RESPONSE
  ) {
    message.sliderResponseMessage(data.message);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_FORM_CANCEL) {
    message.formCancelMessage(data.message);
  } else if (
    messageType === MessageTypeConstants.MESSAGE_TYPE_BUTTON_RESPONSE
  ) {
    message.buttonResponseMessage(data.message);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_IMAGE) {
    message.imageMessage(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_AUDIO) {
    message.audioMessage(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_VIDEO) {
    message.videoMessage(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_SLIDER_CANCEL) {
    message.sliderCancelMessage(data.message);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_PDF) {
    message.pdfMessage(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_TEXT) {
    message.textFileMessage(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_OTHER_FILE) {
    message.otherFileMessage(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_CSV) {
    message.csvMessage(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_JAVASCRIPT) {
    message.jsMessage(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_HTML) {
    message.htmlMessage(data.message, data.options);
  } else if (
    messageType === MessageTypeConstants.MESSAGE_TYPE_STRIPE_RESPONSE
  ) {
    message.stripeResponseMessage(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_MAP_RESPONSE) {
    message.mapResponseMessage(data.message);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_CONTACT_CARD) {
    if (message.contactCard) {
      message.contactCard(data.message);
    } else {
      message.contactCardMessage(data.message);
    }
  } else if (
    messageType === MessageTypeConstants.MESSAGE_TYPE_TRACKING_VIEW_RESPONSE
  ) {
    message.trackingViewResponseMessage(data.message);
  } else if (
    messageType === MessageTypeConstants.MESSAGE_TYPE_CONTAINER_RESPONSE
  ) {
    message.containerResponse(data.message);
  } else if (
    messageType === MessageTypeConstants.MESSAGE_TYPE_SEARCH_BOX_RESPONSE
  ) {
    message.searchBoxResponseMessage(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL) {
    message.videoCallMessage(data.message, data.options);
  } else if (
    messageType === MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL_RESPONSE
  ) {
    message.videoResponseMessage(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_MENU_RESPONSE) {
    message.menuResponse(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_SOUND) {
    message.soundResponse(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_FLOORPLAN) {
    message.floorplan(data.message, data.options);
  } else if (
    messageType === MessageTypeConstants.MESSAGE_TYPE_FLOORPLAN_RESPONSE
  ) {
    message.floorplanResponse(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_GEOFENCE) {
    message.geofenceMessage(data.message, data.options);
  } else if (
    messageType === MessageTypeConstants.MESSAGE_TYPE_GEOFENCE_RESPONSE
  ) {
    message.geofenceResponse(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_CALENDAR) {
    message.calendarMessage(data.message, data.options);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_CARD_RESPONSE) {
    message.cardResponseMessage(data.message, data.options);
  } else if (
    messageType === MessageTypeConstants.MESSAGE_TYPE_AUTHORIZATION_REQUEST
  ) {
    message.authorizationRequest(data.message);
  } else if (
    messageType ===
    MessageTypeConstants.MESSAGE_TYPE_AUTHORIZATION_REQUEST_RESPONSE
  ) {
    message.authorizationRequestResponse(data.message);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_HTML_RESPONSE) {
    message.htmlResponseMessage(data.message);
  } else if (
    messageType === MessageTypeConstants.MESSAGE_TYPE_TIMELINE_RESPONSE
  ) {
    message.timelinesResponseMessage(data.message);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_SURVEY) {
    message.surveyMessage(data.message);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_CHAT) {
    message.chatMessage(data.message);
  } else if (messageType === MessageTypeConstants.MESSAGE_TYPE_DASHBOARD) {
    message.dashboardMessage(data.message);
  } else if (
    messageType === MessageTypeConstants.MESSAGE_TYPE_SURVEY_RESPONSE
  ) {
    message.surveyResponseMessage(data.message);
  } else {
    message.stringMessage(data.message);
  }
  message.setCreatedBy(botContext.userDetails.userId);
  return message;
}

const sendMessage = async (message) => {
  let conversationId = botContext?.conversationContext?.conversationId;
  if (botContext?.botId === "im-bot") {
    if(message?.type === "chatInWindow") {
      const data = store.getState()?.chats?.message?.conversation?.allowNonContactMessages;
      message.conversation = {
        ...message.conversation,
        allowNonContactMessages: data,
      }
      botContext.conversationContext = {
        ...botContext.conversationContext,
        allowNonContactMessages: data,
      }
      conversationId = message?.conversation?.conversationId;
    }
    botContext = await adjustIMBotContext(botContext, conversationId);
    let chatMessages =
      (await getDataFromLFStorage(
        `${LFStorageKeys.MESSAGES}_${conversationId}`
      )) || [];
    saveDataInLFStorage(
      `${LFStorageKeys.MESSAGES}_${conversationId}`,
      [message, ...chatMessages]
    );
  }
  let prevMessages = botContext.conversationContext
    ? await getDataFromLFStorage(
      conversationId
    )
    : [];
  const data = parseInputMessage(message);

  botContext.botContent.next(
    data,
    botContext.botState,
    prevMessages,
    botContext
  );
}

export const sendSocketReconnectionEvent = () => {
  if (_.isEmpty(botContext) || botContext?.botId === 'im-bot') return;
  const Message = botContext.getCapability("Message");
  let message = new Message({ messageType: 'onSocketReconnection', messageTypeInt: 170 });
  botContext.botContent.open instanceof Function &&
    botContext.botContent.open(message, {}, [], botContext);
}


export const sendMessageToBotContext = async (message) => {
  try {
    if (_.isEmpty(botContext)) {
      initializeBotContext({
        userDomain: store.getState().selectedDomain.userDomain,
        botId: "im-bot",
      }).then(() => sendMessage(message));
      // return AgentGuardServiceClient.execute(message);
    } else {
      sendMessage(message)
    }
  } catch (error) {
    console.error("**ERROR**sendMessageToBotContext", error);
  }
};
