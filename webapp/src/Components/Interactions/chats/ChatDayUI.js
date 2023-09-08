import moment from "moment";
import React from "react";
import { isNotificationMessage, isNormalMessage, chatDayFormats } from "../../../Utils/Helpers";

const ChatDayUI = ({ chat, index, lastMessage }) => {
  if (!chat) {
    return null;
  }

  let dateToShow = null;

  // Only show day if the new message is on different date than the previous one or if it's a new message.
  if (isNotificationMessage(chat.messageType) || isNormalMessage(chat.messageType)) {
    if (index === 0) {
      dateToShow = moment(chat.createdOn).calendar(chatDayFormats)
    } else if (!moment(chat.createdOn).isSame(moment(lastMessage.createdOn), "date")) {
      dateToShow = moment(chat.createdOn).calendar(chatDayFormats)
    }
  }

  if (dateToShow) {
    return (
      <div className="chat-date-sepatator position-relative my-5">
        <hr />
        <span>
          {dateToShow}
        </span>
      </div>
    )
  }

  return null;

};

export default ChatDayUI;
