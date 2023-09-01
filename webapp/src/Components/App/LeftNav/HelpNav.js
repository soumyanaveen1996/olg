/* eslint-disable react/no-deprecated */
import React, { PureComponent } from "react";
import _ from "lodash";
import LeftNavBot from "./LeftNavBot";
import { FRONTM_BOT_ID, FRONTM_WEB_BOT } from "../../../Utils/Constants";

class HelpNav extends PureComponent {
	constructor(props) {
		super(props);
		// this.state = { active: this.props.active };
		this.state = { active: false, helperBotObj: null };
	}

	componentDidMount() {
		if (this.props?.selectedDomain?.assistantBotConfig) {
			let botObj = {
				botId: this.props?.selectedDomain?.assistantBotConfig.botId,
				userDomain: this.props?.selectedDomain?.userDomain,
				botName: this.props?.selectedDomain?.assistantBotConfig?.name,
				logoUrl: this.props?.selectedDomain?.assistantBotConfig?.logoUrl,
			};

			// console.log("this.props.botSubscriptions", this.props.botSubscriptions);

			// const convBot = this.props.botSubscriptions.filter(
			//   (bot) => bot.botId === botObj.botId
			// );
			// if (convBot && convBot.length === 0 && botObj.botId !== FRONTM_BOT_ID) {
			//   this.props.subscribeToBot(botObj.botId);
			// }
			this.setState({
				helperBotObj: { ...botObj },
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props?.selectedDomain?.assistantBotConfig?.botId !==
			prevState?.helperBotObj?.botId
		) {
			let botObj = {
				botId: this.props?.selectedDomain?.assistantBotConfig?.botId,
				userDomain: this.props?.selectedDomain?.userDomain,
				botName: this.props?.selectedDomain?.assistantBotConfig?.name,
				logoUrl: this.props?.selectedDomain?.assistantBotConfig?.logoUrl,
			};
			// console.log("this.props.botSubscriptions", this.props.botSubscriptions);
			// const convBot = this.props.botSubscriptions.filter(
			//   (bot) => bot.botId === botObj.botId
			// );
			// if (convBot && convBot.length === 0 && botObj.botId !== FRONTM_BOT_ID) {
			//   this.props.subscribeToBot(botObj.botId);
			// }

			this.setState({
				helperBotObj: { ...botObj },
			});
		}
	}
	openConversation = (conversation) => {
		// console.log("open conversation ", conversation);

		let { changeConversation, history } = this.props;
		changeConversation(conversation);
		history.push("/app/chats");
	};

	/*startFrontMAssistantConversation = (botId) => {
    console.log("startFrontMAssistantConversation", botId);
    // let { timeLine } = this.props;
    // let index = timeLine.findIndex(conversation => {
    //   return conversation.bot && FRONTM_BOT_ID === conversation.bot.botId;
    // });
    // this.props.changeConversation(timeLine[index], true);
    // this.props.history.push("/app/chats");

    let { timeLine } = this.props;
    if (timeLine && timeLine.length === 0) {
      this.props.getFrontMAssistant(timeLine);
    } else {
      // let index = timeLine.findIndex((conversation) => {
      //   return conversation.bot && FRONTM_BOT_ID === conversation.bot.botId;
      // });
      let index = timeLine.findIndex((conversation) => {
        return conversation.bot && botId === conversation.bot.botId;
      });
      this.props.changeConversation(timeLine[index], true);
    }
    this.setState({ active: true });
    this.props.history.push("/app/chats");
  }; */

	helperBot = (botDetails) => {
		if (botDetails.botId === FRONTM_BOT_ID) {
			return (
				<LeftNavBot
					key={FRONTM_BOT_ID}
					bot={FRONTM_WEB_BOT}
					from="app"
					createConversation={this.props.startFrontMAssistantConversation}
					active={
						!this.state.active
							? this.state.active
							: this.props.selectedConversation &&
							  this.props.selectedConversation.bot &&
							  this.props.selectedConversation.bot.botId === FRONTM_BOT_ID
					}
					firstLevel
				/>
			);
		} else {
			return (
				<LeftNavBot
					key={botDetails?.botId}
					bot={botDetails}
					from="app"
					createConversation={this.props.startConversation}
					// createConversation={startFrontMAssistantConversation}
					active={
						!this.state.active
							? this.state.active
							: this.props.selectedConversation &&
							  this.props.selectedConversation.bot &&
							  this.props.selectedConversation.bot.botId === botDetails.botId
					}
					firstLevel
				/>
			);
		}
	};

	render() {
		let {
			selectedConversation,
			startConversation,
			startFrontMAssistantConversation,
		} = this.props;
		let { helperBotObj } = this.state;

		// console.log("all the other timeline", helperBotObj);

		// let classNames =
		//   "d-flex justify-content-between align-items-center appnav-link";

		return (
			<li className="help-intro">
				{/* <div className={classNames}>
          <a
            onClick={() => {
              this.setState({ active: !active });
            }}
            className="list-item active d-flex align-items-center justify-content-between"
            style={{
              fontSize: "14px",
              color: "#fff",
              marginBottom: 0,
              width: "100%"
            }}
          >
            <div className="d-flex align-items-center">
              <img loading="lazy"
                className="section-icon"
                src="/img/sidebar-help@2x.png"
                alt="contact"
              />
              <span className={"list-title text-white fs14 "}>Help</span>
            </div>
          </a>
        </div> */}

				{/* {active && ( */}
				<ul>
					<li style={{ margin: "0px", paddingTop: "0px" }}>
						<div>
							{helperBotObj ? (
								this.helperBot(helperBotObj)
							) : (
								<LeftNavBot
									key={FRONTM_BOT_ID}
									bot={FRONTM_WEB_BOT}
									from="help"
									createConversation={
										this.props.startFrontMAssistantConversation
									}
									active={
										!this.state.active
											? this.state.active
											: this.props.selectedConversation &&
											  this.props.selectedConversation.bot &&
											  this.props.selectedConversation.bot.botId ===
													FRONTM_BOT_ID
									}
									firstLevel
								/>
							)}
							{/* <LeftNavBot
                key={FRONTM_BOT_ID}
                bot={FRONTM_WEB_BOT}
                from="help"
                createConversation={startFrontMAssistantConversation}
                active={
                  !this.state.active
                    ? this.state.active
                    : selectedConversation &&
                      selectedConversation.bot &&
                      selectedConversation.bot.botId === FRONTM_BOT_ID
                }
                firstLevel
              /> */}

							{/* {helperBotObj && (
                <LeftNavBot
                  key={this.state?.helperBotObj?.botId}
                  bot={this.state?.helperBotObj}
                  from="app"
                  createConversation={startConversation}
                  // createConversation={startFrontMAssistantConversation}
                  active={
                    !this.state.active
                      ? this.state.active
                      : selectedConversation &&
                        selectedConversation.bot &&
                        selectedConversation.bot.botId ===
                          helperBotObj.botId
                  }
                  firstLevel
                />
              )} */}
						</div>
					</li>
				</ul>
				{/* )} */}
			</li>
		);
	}
}

export default HelpNav;
