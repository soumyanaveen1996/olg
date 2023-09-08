import React, { Component } from "react";
import ModalPopup from "../ModalMessages/ModalPopup";
import Dialler from "./Dialler";
import { Tooltip } from "reactstrap";
import CachedImage from "../Common/CachedImage";
import classNames from "classnames";
import { connect } from "react-redux";
class DiallerButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createConv: false,
			callHistoryToolTipOpen: false,
		};
	}

	showCreateConversation = () => this.setState({ createConv: true });
	closeCreateConversation = () => this.setState({ createConv: false });
	toggle = () => {
		this.setState({
			callHistoryToolTipOpen: !this.state.callHistoryToolTipOpen,
		});
	};

	render() {
		return (
			<div className="recent-calls-intro" id="recentCallHistory">
				<a
					style={{
						borderRadius: "2px",
						boxShadow: "none",
						padding: ".5rem 0.1rem",
						color: "#638DFF",
					}}
					onClick={this.showCreateConversation}
					className={classNames(
						"btn btn-default d-inline-flex justify-content-center align-items-center",
						{ disabled: !this.props.isUserOnline }
					)}
				>
					<CachedImage
						imgKey={"callIcon"}
						image={"/img/recent-calls-icon@2x.png"}
						width={"32"}
					/>

					{/*<span*/}
					{/*className="dot ml-2 d-flex align-items-center justify-content-center"*/}
					{/*style={{ backgroundColor: "#2FC76F" }}*/}
					{/*>*/}
					{/*<img*/}
					{/*// src="/img/tab-dialpad-icon@2x.png"*/}
					{/*src="/img/call-receivecall-btn@2x.png"<img src="/img/call-receivecall-btn@2x.png" width="60" />*/}
					{/*style={{*/}
					{/*height: "15px",*/}
					{/*width: "10px"*/}
					{/*}}*/}
					{/*/>*/}
					{/*</span>*/}
				</a>

				{this.state.createConv && (
					<ModalPopup
						onClose={this.closeCreateConversation}
						size="sm"
						title="Recent Calls"
						className="dialler-modal"
					>
						<Dialler
							selectedDomain={this.props.selectedDomain}
							onClose={this.closeCreateConversation}
							geoData={this.props.geoData}
							noBalance={() => this.props.noBalance()}
						/>
					</ModalPopup>
				)}
				<Tooltip
					target={"recentCallHistory"}
					placement={"bottom"}
					isOpen={this.state.callHistoryToolTipOpen}
					toggle={this.toggle}
					delay={{ show: 0, hide: 0 }}
				>
					Call history
				</Tooltip>
			</div>
		);
	}
}

const mapDataToProps = (state) => {
	let user = state.user;
	return {
		isUserOnline: user.isOnline,
	};
};

export default connect(mapDataToProps)(DiallerButton);
