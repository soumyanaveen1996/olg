import React from "react";
import { Prompt } from "react-router-dom";

import ModalPopup from "../../ModalMessages/ModalPopup";
export class RouteLeavingGuard extends React.Component {
	state = {
		modalVisible: false,
		lastLocation: null,
		confirmedNavigation: false,
	};
	showModal = (location) =>
		this.setState({
			modalVisible: true,
			lastLocation: location,
		});
	closeModal = (callback) =>
		this.setState(
			{
				modalVisible: false,
			},
			callback
		);
	handleBlockedNavigation = (nextLocation) => {
		const { confirmedNavigation } = this.state;
		const { shouldBlockNavigation } = this.props;
		if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
			this.showModal(nextLocation);
			return false;
		}

		return true;
	};
	handleConfirmNavigationClick = () =>
		this.closeModal(() => {
			const { navigate } = this.props;
			const { lastLocation } = this.state;
			if (lastLocation) {
				this.setState(
					{
						confirmedNavigation: true,
					},
					() => {
						// Navigate to the previous blocked location with your navigate function
						navigate(lastLocation.pathname);
					}
				);
			}
		});
	render() {
		const { when } = this.props;
		const { modalVisible, lastLocation } = this.state;
		return (
			<div>
				<Prompt when={when} message={this.handleBlockedNavigation} />
				{/* <CustomModal
          visible={modalVisible}
          onCancel={this.closeModal}
          onConfirm={this.handleConfirmNavigationClick}
        /> */}
				{modalVisible && (
					<ModalPopup size="sm" noHeader>
						<div className="py-1">
							<div style={{ textAlign: "center" }}>
								<p className="fs17" style={{ color: "#4f5b7d" }}>
									Your changes are not saved. Do you still want to leave?
								</p>
							</div>
							<div>
								<div
									className="py-2 d-flex justify-content-center align-items-center mt-3"
									onClose={this.closeConfirmCancel}
									style={{ width: "60%", paddingLeft: "40%" }}
								>
									<button
										type="button"
										className="btn btn-lg btn-cancel m-1"
										onClick={() => {
											this.setState({
												modalVisible: false,
											});
										}}
										style={{
											height: "40px",
											width: "110%",
											borderRadius: "20px",
											backgroundColor: "rgba(99, 141, 255, 0.1)",
											margin: "0 21.4px 0 0",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											padding: "15px 55px 15px 55px",
										}}
									>
										No
									</button>
									<button
										type="button"
										className="btn btn-lg btn-open m-1"
										onClick={this.handleConfirmNavigationClick}
										style={{
											height: "40px",
											width: "110%",
											borderRadius: "20px",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											margin: "0 21.4px 0 0",
											padding: "15px 55px 15px 55px",
										}}
									>
										Yes
									</button>
								</div>
							</div>
						</div>
					</ModalPopup>
				)}
			</div>
		);
	}
}
export default RouteLeavingGuard;
