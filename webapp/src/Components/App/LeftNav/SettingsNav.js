/* eslint-disable react/no-deprecated */
import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import MenuArrow from "../../Common/MenuArrow";

class SettingsNav extends PureComponent {
	constructor(props) {
		super(props);
		// this.state = { active: this.props.active };
		this.state = { active: false };
	}

	openChannel = (channel) => {
		this.props.initiateChannelConversation(channel, () =>
			this.props.history.push("/offlinelms/app/chats")
		);
	};

	render() {
		let { pageName } = this.props;
		let { active } = this.state;

		let classNames = "d-flex justify-content-between align-items-center";
		if (!active) {
			classNames += " appnav-link";
		}

		return (
			<li className="manage-intro">
				<div className={classNames}>
					<a
						onClick={() => {
							let newActive = !active;
							this.setState({ active: newActive });
							if (newActive) {
								this.props.openSettings();
							} else {
								this.props.closeSettings();
							}
						}}
						className="list-item active d-flex align-items-center justify-content-between"
						style={{
							fontSize: "14px",
							color: "#fff",
							marginBottom: 0,
							width: "100%",
						}}
					>
						{/*{active && (*/}
						{/*<span className="combined-shape" style={{ display: "block" }} />*/}
						{/*)}*/}
						{/*<span*/}
						{/*style={{*/}
						{/*height: "20px",*/}
						{/*width: "20px",*/}
						{/*display: "flex",*/}
						{/*justifyContent: "center",*/}
						{/*alignItems: "center",*/}
						{/*borderRadius: "50%",*/}
						{/*backgroundColor: "#2A2D3C"*/}
						{/*// border: "1px solid #638DFF"*/}
						{/*}}*/}
						{/*>*/}
						{/*<i*/}
						{/*className="icon-cog"*/}
						{/*style={{ color: "#fff", fontSize: "10px" }}*/}
						{/*/>*/}
						{/*</span>*/}

						<span className="list-title text-white fs14">Manage</span>
						<MenuArrow
							className="appnav-link-ext"
							onOpen={() => {
								this.setState({ active: true });
								this.props.openSettings();
							}}
							onClose={() => {
								this.setState({ active: false });
								this.props.closeSettings();
							}}
							open={active}
						/>
					</a>
				</div>

				{active && (
					<ul>
						<li style={{ paddingTop: "0px", margin: "0px 10px" }}>
							<NavLink
								to="/app/catalog"
								className="appnav-link"
								activeClassName="appnav-link-active"
								style={{ margin: "0px" }}
							>
								<div className="d-flex align-items-center justify-content-start">
									{pageName === "Chatbots" && (
										<span
											className="combined-shape"
											style={{ display: "block", marginLeft: "-23px" }}
										/>
									)}
									<span className="fs14">Applications</span>
								</div>
							</NavLink>
						</li>
						<li style={{ margin: "0px 10px" }}>
							<NavLink
								to="/app/groups"
								className="appnav-link"
								activeClassName="appnav-link-active"
								style={{ margin: "0px" }}
							>
								<div className="d-flex align-items-center justify-content-start">
									{pageName === "Channels" && (
										<span
											className="combined-shape"
											style={{ display: "block", marginLeft: "-23px" }}
										/>
									)}

									<span className="fs14">Groups</span>
								</div>
							</NavLink>
						</li>
						<li style={{ margin: "0px 10px" }}>
							<NavLink
								to="/app/contacts"
								className="appnav-link"
								activeClassName="appnav-link-active"
								style={{ margin: "0px" }}
							>
								<div className="d-flex align-items-center justify-content-start">
									{pageName === "Contacts" && (
										<span
											className="combined-shape"
											style={{ display: "block", marginLeft: "-23px" }}
										/>
									)}

									<span className="fs14">Contacts</span>
								</div>
							</NavLink>
						</li>
					</ul>
				)}
			</li>
		);
	}
}

export default SettingsNav;
