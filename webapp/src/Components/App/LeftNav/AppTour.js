import React, { Component } from "react";
import ReactJoyride, { STATUS, EVENTS } from "react-joyride";
import { updateAuthData } from "../../../Services/StorageService";

class AppTour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			introDialog: this.props.newUser,
			continuous: true,
			run: this.props.newUser,
			steps: [
				{
					content: (
						<React.Fragment>
							<div>
								<h2> Welcome {this.props.userName}</h2>
								<h5>Let’s start with a quick overview.</h5>
								<button
									className="btn-260-width tour-btn"
									onClick={this.showIntro}
								>
									Explore{" "}
									{window.location.origin === "https://onship.app"
										? "onship"
										: "FrontM"}
								</button>
							</div>
						</React.Fragment>
					),
					placement: "center",
					locale: { skip: "Skip" },
					target: "body",
					styles: {
						tooltip: { width: "500px" },
						buttonNext: {
							display: "none",
						},
						buttonSkip: {
							borderTop: "1px solid #f4f4f4",
							width: "100%",
						},
					},
				},
				{
					target: ".get-credits-intro",
					content:
						"Click “Top-up” to top-up to make calls. Your current balance is also shown above.",
				},
				{
					target: ".manage-intro",
					content:
						"Click here to subscribe to new Applications, manage your contacts and groups subscriptions",
				},
				// {
				//   target: ".favorites-intro",
				//   content:
				//     "FrontM app will now help you complete this setup. The FrontM app can also answer questions you may have - click Help at any time."
				// },
				// {
				//   placement: "right-end",
				//   target: ".recent-intro",
				//   content:
				//     "FrontM App will guide you to setup your experience in the platform and help you out when you have questions or problems"
				// }
			],
		};
	}

	componentDidMount() {
		const selectedDomain = this.props.selectedDomain;
		let additionalSteps = [];
		if (selectedDomain) {
			const viewModes = selectedDomain.viewModes;
			if (viewModes && viewModes.chat && viewModes.voip) {
				additionalSteps.push({
					placement: "right-end",
					target: ".contact-config-intro",
					content:
						"Select “Add Contact” to add your contacts here - the contacts will appear on this menu. You can also invite your colleagues and friends to join FrontM to send them messages and make free app-to-app calls.",
				});
			}
			if (viewModes && viewModes.voip && !viewModes.chat) {
				additionalSteps.push({
					placement: "right-end",
					target: ".contact-config-intro",
					content:
						"Select “Add Contact” to add your contacts here - the contacts will appear on this menu. You can also invite your colleagues and friends to join FrontM to make free app-to-app calls.",
				});
			}
			if (viewModes && viewModes.apps) {
				additionalSteps.push({
					placement: "right-end",
					target: ".marketplace-config-intro",
					content:
						"FrontM service providers have created additional tools which will help answer your questions, display relevant data, show location information, or add additional functionality. Click here to see the apps you have access to install.",
				});
			}
			if (viewModes && viewModes.channels) {
				additionalSteps.push({
					placement: "right-end",
					target: ".channel-config-intro",
					content:
						"FrontM Groups are conversations involving multiple FrontM users at the same time. Click here to manage your FrontM Groups.",
				});
			}
			if (viewModes && viewModes.voip) {
				additionalSteps.push(
					{
						target: ".home-call-btn",
						content:
							"Click the dialpad to make lower cost calls to satellite phones, as well as international calls to landlines and mobile phones.",
					},
					{
						target: ".recent-calls-intro",
						content: "View your recent call history here.",
					}
				);
			}
			this.setState({ steps: [...this.state.steps, ...additionalSteps] });
		}
	}

	hideIntroDialog = () => {
		this.setState({ introDialog: false });
	};

	handleJoyrideCallback = (data) => {
		const { status, type, index, action } = data;
		if (
			[STATUS.FINISHED, STATUS.SKIPPED].includes(status) ||
			action === "stop" ||
			action === "skip" ||
			action === "close"
		) {
			this.setState({ run: false });
			this.props.updateAuthUser(false);
			updateAuthData();
		} else if ([EVENTS.STEP_BEFORE].includes(type) && index === 0) {
			this.setState({ stepIndex: 0, run: true });
		}
	};

	showIntro = (e) => {
		// console.log("this is being clicked");

		e.preventDefault();
		// this.setState({ introDialog: false, run: true, stepIndex: 1 });
		this.setState({ run: true, stepIndex: 1 });
	};

	render() {
		return (
			<div>
				<ReactJoyride
					disableCloseOnEsc={true}
					disableOverlayClose={true}
					disableBeacon={false}
					callback={this.handleJoyrideCallback}
					continuous={true}
					run={this.state.run}
					scrollToFirstStep
					showSkipButton
					stepIndex={this.state.stepIndex}
					steps={this.state.steps}
					styles={{
						options: {
							zIndex: 100000,
							primaryColor: "#638DFF",
						},
					}}
				/>
				{/* 
        {this.state.introDialog && (
          <ModalPopup onClose={this.hideIntroDialog} size="sm" noHeader>
            <div className="p-2 custom-intro-modal">
              <h1> Welcome {this.props.userName}</h1>
              <h5>Let’s start with a quick overview.</h5>

              <button
                className="btn-260-width tour-btn"
                type="button"
                style={{ cursor: "pointer" }}
                onClick={this.showIntro}
              >
                Explore FrontM
              </button>

              <div className="partition-intro" />
              <div>
                <a onClick={this.hideIntroDialog}> Skip</a>
              </div>
            </div>
          </ModalPopup>
        )} */}
			</div>
		);
	}
}

export default AppTour;
