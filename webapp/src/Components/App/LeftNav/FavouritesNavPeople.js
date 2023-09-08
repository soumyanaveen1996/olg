/* eslint-disable react/no-deprecated */
import React, { PureComponent } from "react";
import LeftNavContact from "./LeftNavContact";
import store from "../../../State/configureStore";
import { setCallHistory } from "../../../State/actions/user";
import CachedImage from "../../Common/CachedImage";

class FavouritesNavPeople extends PureComponent {
	constructor(props) {
		super(props);
		// this.state = { active: this.props.active };
		this.state = { active: true };
	}

	openConversation = (conversation) => {};

	openWindow = () => {};

	sortContacts = (contacts) => {
		return contacts.sort((contactA, contactB) => {
			const nameA = contactA.type ? contactA.name : contactA.userName;
			const nameB = contactB.type ? contactB.name : contactB.userName;
			if (nameA.toUpperCase() > nameB.toUpperCase()) {
				return 1;
			}
			return -1;
		});
	};

	openContact = (contact) => {
		const { history } = this.props;

		this.props.selectedContactAction(contact);
		const selectedContactsCallHistory =
			contact &&
			this.props.contactsCallHistory &&
			this.props.contactsCallHistory[contact.userId];
		if (
			!selectedContactsCallHistory ||
			(selectedContactsCallHistory && selectedContactsCallHistory.length === 0)
		) {
			store.dispatch(setCallHistory(contact.userId));
		}
		history.push({
			pathname: "/app/contacts",
			state: {
				onlyVoip: true,
				selectedContact: contact,
				showSidebar: false,
			},
		});
	};

	render() {
		let { selectedConversation, peopleFav: favourites } = this.props;
		if (!favourites) {
			return <div />;
		}
		favourites = this.sortContacts(favourites);
		let classNames =
			"d-flex justify-content-between align-items-center appnav-link-link";

		if (favourites.length > 0) {
			return (
				<li className="favorites-intro">
					<div className={classNames}>
						<a
							className="list-item active d-flex align-items-center justify-content-between no-pointer"
							style={{
								fontSize: "14px",
								color: "#fff",
								marginBottom: 0,
								width: "100%",
							}}
						>
							<div className="d-flex align-items-center">
								<CachedImage
									imgClassName="section-icon"
									imgKey={"menuFavIcon"}
									image={"/img/menu-favs@2x.png"}
								/>
								<span className={"list-title text-white fs14 "}>
									Favourites
								</span>
							</div>
						</a>
					</div>

					<ul>
						{favourites.map((contact, index) => (
							<li key={index} style={{ margin: "0px", paddingTop: "0px" }}>
								<div key={contact.userId}>
									<LeftNavContact
										userId={this.props.userId}
										allProfileImages={this.props.allProfileImages}
										key={contact.userId}
										contact={contact}
										openContact={this.openContact}
										active={
											selectedConversation &&
											selectedConversation.contact &&
											contact.userId === selectedConversation.contact.userId
										}
									/>
								</div>
							</li>
						))}
					</ul>
				</li>
			);
		} else {
			return null;
		}
	}
}

export default FavouritesNavPeople;
