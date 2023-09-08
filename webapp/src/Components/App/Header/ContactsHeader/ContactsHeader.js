import React, { Component } from "react";
import cx from "classnames";
import styles from "./ContactsHeader.module.css";
import UserInfo from "../UserInfo";
import NewContactButton from "../../../Contacts/NewContactButton";
import Avatar from "../../../Common/Avatar";
import StickeyHeader from "../../../StickeyHeader/stickeyHeader";
import _ from "lodash";
import OfflineSwitch from "../../../OfflineSwitch/OfflineSwitch";
import CollapsableSidebar from "../../../CollapsableNavBar/CollapsableSidebar";

class ContactsHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayState: true,
		};
	}

	render() {
		let { userName, logout, notification, location, selectedContactStore } =
			this.props;
		let contactSelected;

		contactSelected = { ...selectedContactStore };

		// if (selectedContactStore && _.isEmpty(selectedContactStore)) {
		//   if (location.state && !_.isEmpty(location.state.selectedContact)) {
		//     contactSelected = { ...location.state.selectedContact };
		//   }
		// }
		// console.log(
		//   "this is the props on --------",
		//   selectedContactStore,
		//   location
		// );

		return (
			<React.Fragment>
				<div
					className={cx(
						styles.container,
						"d-flex align-items-center justify-content-between"
					)}
				>
					{!_.isEmpty(contactSelected) &&
					!(location.state && location.state.showSidebar) &&
					this.props.showSideBar ? (
						<div className="d-flex align-items-center">
							<Avatar
								className={styles.avatar}
								name={contactSelected.userName || ""}
								size={30}
								height={30}
								color="bg-info"
								imgSrc={contactSelected.profilePhoto || ""}
							/>
							<h5 className="title_header">
								{contactSelected.userName ||
									location.state.selectedContact.userName}
							</h5>
						</div>
					) : (
						<div
							className={cx(
								styles.container,
								"d-flex align-items-center justify-content-between"
							)}
						>
							{" "}
							<div className="d-flex align-items-center">
								<CollapsableSidebar />
								<h5 className="title_header">Contacts</h5>
							</div>
							<div>
								<NewContactButton
									contacts={this.props.contacts}
									selectedDomain={this.props.selectedDomain}
									fetchContacts={this.props.fetchContacts}
									newContactAdded={this.props.newContactAdded}
									selectedContactAction={this.props.selectedContactAction}
									allProfileImages={this.props.allProfileImages}
								/>
							</div>
						</div>
					)}
				</div>
				<div
					className={cx(
						styles.stickeyHeader_container,
						"sticky d-flex align-items-center justify-content-end"
					)}
				>
					<StickeyHeader openRecharge={this.props.openRecharge} />
				</div>

				<OfflineSwitch />
				<div className={"d-flex align-items-center justify-content-end"}>
					{!this.props.isAnonymousUser && (
						<div>
							<UserInfo
								userId={this.props.user.userId}
								userName={userName}
								logout={logout}
								notification={notification}
							/>
						</div>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default ContactsHeader;
