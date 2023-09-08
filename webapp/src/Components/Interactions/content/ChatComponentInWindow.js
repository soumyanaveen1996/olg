import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import WindowMinClose from './WindowComponent/WindowMinClose';
import { MessageTypeConstants } from '../../../Services/Message';
import ChatFieldForWindow from '../chats/ChatFieldForWindow';
import { useSelector } from 'react-redux';
import { initializeBotContext } from '../../../Services/BotsService';
import store from '../../../State/configureStore';

const ChatComponentInWindow = ({conversationId, ...props}) => {
  const [convId, setConversationId] = useState(conversationId);
  let selectedConversation = useSelector((state) => state.chats.selectedConversation);
  const { userDomain } = useSelector((state) => state.selectedDomain);
  useEffect(() => {
    setConversationId(conversationId)
  }, [conversationId]);

  const minimizeChatWindow = (windowElem, index) => {
    console.log("minimise chat window");

  };

  const closeChatWindow = (index, responseMessageType, options) => {
    setConversationId("");
    if(selectedConversation){
      initializeBotContext({
        userDomain: userDomain,
        botId: selectedConversation?.bot?.botId,
      }).then(() => {});
    }
    // let allChats = [...this.state.chatWindow];
    // if (allChats.length > 0) {
    //   let getData = allChats[index];
    //   console.log("close chat window", getData);
    //   this.props.removeChatFieldWindow(getData);
    //   allChats.splice(index, 1);
    //   this.setState({ chatWindow: [...allChats] });
    // }
  };

  return (
    <div className="component-in-window-container">
      <div>
        {convId && (
          <Draggable
            cancel=".non-grabbale-component"
            bounds="parent"
            key={convId}
            allowAnyClick={true}
            enableUserSelectHack={false}
            positionOffset={{
              x: 220,
              y: 70,
            }}
            // onStop={() => this.bringToTop(index)}
          >
            <div
              className="d-flex flex-column draggable-component draggable-form-component-container align-items-center justify-content-center responsive-draggable-card"
              style={{
                zIndex: '9999',
                boxShadow: '0 0 6px 0 rgba(0,0,0,0.2)',
                top: '50px',
                left: '20px',
                // height: height,
                maxWidth: '390px',
              }}
            >
              <div className="d-flex flex-row justify-content-between align-items-center mini-window-header w-100">
                <div className="d-flex draggable-icon-container flex-row align-items-center">
                  <img
                    className="draggable-icon"
                    src="/img/move-icon@2x.png"
                    alt="draggable-icon"
                  />
                </div>
                <WindowMinClose
                  className="non-grabbale-component"
                  windowElem={{
                    options: {
                      allowMinimize: true,
                      allowClose: true,
                    }
                  }}
                  // index={index}
                  // chat={chat}
                  responseMessageType={
                    MessageTypeConstants.MESSAGE_TYPE_CHAT
                  }
                  minimizeWindow={minimizeChatWindow}
                  closeWindow={closeChatWindow}
                  iconType="minimize-icon"
                />
              </div>
              <div className="d-flex flex-column nonGrabbale-body form-nonGrabbale-body non-grabbale-component">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    maxHeight: '75px',
                    padding: '10px 15px',
                    borderBottom: '1px solid #dedede',
                  }}
                >
                  <h1 className="form-h1-title">Chat title</h1>
                </div>
                <ChatFieldForWindow data={{
                  convId
                }} {...props} />
              </div>
              <div
                className="d-flex flex-row justify-content-between align-items-center mini-window-header border-bottom-radius-10 w-100">
                <div className="d-flex draggable-icon-container">
                  <img
                    className="draggable-icon"
                    src="/img/move-icon@2x.png"
                    alt="draggable-icon"
                  />
                </div>
              </div>
            </div>
          </Draggable>
        )}
      </div>
    </div>
  )
}

export default ChatComponentInWindow;