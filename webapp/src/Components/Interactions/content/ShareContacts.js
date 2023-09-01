import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars-2";
import { search } from "../../../Services/ContactsService";
import SelectableMember from "../../Channels/SelectableMember";
import Avatar from "../../Common/Avatar";

class ShareContacts extends PureComponent {
	constructor(props) {
		super(props);
		let contactIds = this.props.contactIds || [];
		let memberDetails = this.props.memberDetails || [];
		this.state = {
			search: "",
			contacts: [...memberDetails],
			contactIds: [...contactIds],
			memberDetails: [],
		};
	}

	componentDidMount() {
		// search(this.state.search).then(contacts => this.setState({ contacts }));
	}

	toggleMember = (member) => {
		let { contactIds, memberDetails } = this.state;
		let newMemberDetails = [...memberDetails];
		let memberId = member.userId;
		let index = contactIds.indexOf(memberId);

		if (newMemberDetails.length === 0) {
			newMemberDetails.push(member);
		} else {
			let findIndex = newMemberDetails.findIndex((x) => x.userId === memberId);

			if (findIndex > -1) {
				newMemberDetails.splice(findIndex, 1);
			} else {
				newMemberDetails.push(member);
			}
		}

		if (index === -1) {
			contactIds.push(memberId);
		} else {
			contactIds.splice(index, 1);
		}
		this.setState({
			contactIds: [...contactIds],
			memberDetails: [...newMemberDetails],
		});
	};

	removeParticipants(member) {
		let { contactIds, memberDetails } = this.state;
		let newMemberDetails = [...memberDetails];
		let memberId = member.userId;
		let index = contactIds.indexOf(memberId);
		let findIndex = newMemberDetails.findIndex((x) => x.userId === memberId);
		if (findIndex > -1) {
			newMemberDetails.splice(findIndex, 1);
		}

		if (index > -1) {
			contactIds.splice(index, 1);
		}

		this.setState({
			contactIds: [...contactIds],
			memberDetails: [...newMemberDetails],
		});
	}

	onSearch = (e) => {
		this.setState({ search: e.target.value });
	};

	searchContacts = (e) => {
		e.preventDefault();
		search(this.state.search).then((contacts) => this.setState({ contacts }));
	};

	sendContacts = () => {
		// console.log("all contact", this.state);

		this.props.shareContacts(this.state.memberDetails);
	};

	render() {
		let { contacts, memberDetails, contactIds } = this.state;
		// console.log("all contacts ", contacts);

		return (
			<div className="p-2">
				<div className="Contacts-searcharea">
					{/* <form onSubmit={this.searchContacts}>
            <input
              placeholder="Search Contacts"
              type="text"
              className="form-control form-control-lg"
              onChange={this.onSearch}
              value={search}
            />
          </form> */}

					<p style={{ marginTop: "1rem" }}>Selected</p>
					<Scrollbars
						autohide="true"
						style={{ height: "150px", borderBottom: "1px solid #e9e9e9" }}
					>
						<div className="flex" style={{ height: "100%" }}>
							{memberDetails.map((elem, index) => {
								return (
									<div className="d-flex" key={index}>
										<span
											onClick={this.removeParticipants.bind(this, elem)}
											className="remove-selection"
										>
											<span aria-hidden="true">×</span>
										</span>
										<div className="p-2">
											<Avatar
												color="bg-fm-primary"
												name={elem.userName}
												style={{ borderRadius: "50%" }}
												size={40}
												height={40}
												imgSrc={
													this.props.allProfileImages &&
													this.props.allProfileImages[elem.userId]
												}
											/>
										</div>
										<div className="p-2 d-flex align-items-center">
											<span className="user-name-text">{elem.userName}</span>
										</div>
										<div className="ml-auto d-flex align-items-center">
											<span className="user-position">{elem.role}</span>
										</div>
									</div>
								);
							})}
						</div>
					</Scrollbars>

					<Scrollbars autohide="true" style={{ height: "300px" }}>
						<div className="flex">
							<div className="pt-2">
								{contacts && contacts.length > 0 && (
									<div>
										{contacts.map((contact) => (
											<div className="my-3" key={contact.userId}>
												<SelectableMember
													allProfileImages={
														this.props.allProfileImages &&
														this.props.allProfileImages
													}
													selected={contactIds.indexOf(contact.userId) !== -1}
													contact={contact}
													email={contact.emailAddress}
													toggleMember={this.toggleMember}
												/>
											</div>
										))}
									</div>
								)}

								{(!contacts || contacts.length === 0) && (
									<div className="text-center mt-4">
										No Contacts found for the given search criteria.
									</div>
								)}
							</div>
						</div>
					</Scrollbars>
				</div>
				<hr />

				<div className="d-flex justify-content-center">
					<a onClick={this.sendContacts} className="btn btn-sm btn-open">
						Done
					</a>
					<a
						className="btn btn-sm btn-install ml-2"
						onClick={this.props.cancel}
					>
						Cancel
					</a>
				</div>
			</div>
		);
	}
}

ShareContacts.propTypes = {
	allProfileImages: PropTypes.object.isRequired,
};

export default ShareContacts;
