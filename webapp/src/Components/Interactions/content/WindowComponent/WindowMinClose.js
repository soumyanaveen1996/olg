import React from "react";

const WindowMinClose = ({
	windowElem,
	index,
	chat,
	responseMessageType,
	minimizeWindow,
	closeWindow,
	iconType,
}) => {
	return (
		<div className="d-flex flex-row minimize-close-icon-container non-grabbale-component">
			{windowElem.options.allowMinimize && (
				<a
					className="minimize-icon"
					onTouchEnd={(e) => {
						e.stopPropagation();
						minimizeWindow(windowElem, index);
					}}
					onClick={(e) => {
						e.stopPropagation();
						minimizeWindow(windowElem, index);
					}}
				>
					{iconType === "maximize-icon" ? (
						<img src="/offlinelms/img/maximize-icon@2x.png" alt="maximize-icon" />
					) : (
							<img src="/offlinelms/img/minimize-icon@2x.png" alt="minimize-icon" />
					)}
				</a>
			)}
			{windowElem.options.allowClose && (
				<a
					className="close-icon"
					// onTouchEnd={(e) => {
					// 	e.stopPropagation();
					// 	closeWindow(index, responseMessageType, chat.options);
					// }}
					onClick={(e) => {
						e.stopPropagation();
						closeWindow(index, responseMessageType, chat?.options);
					}}
				>
					<img src="/offlinelms/img/close-icon@2x.png" alt="close-icon" />
				</a>
			)}
		</div>
	);
};

export default WindowMinClose;

//old code from componentInWindow

/* <div className="d-flex flex-row minimize-close-icon-container">
                          {elem.options.allowMinimize && (
                            <a
                              className="minimize-icon"
                              onClick={e => this.minimizeWindow(e, elem, index)}
                            >
                              <img
                                src="/offlinelms/img/maximize-icon@2x.png"
                                alt="minimize-icon"
                              />
                            </a>
                          )}
                          {elem.options.allowClose && (
                            <a
                              className="close-icon"
                              onClick={e =>
                                this.closeWindow(
                                  e,
                                  index,
                                  elem.messageType,
                                  chat.options
                                )
                              }
                            >
                              <img
                                src="/offlinelms/img/close-icon@2x.png"
                                alt="close-icon"
                              />
                            </a>
                          )}
                        </div> */
