import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { search } from "../../Services/ContactsService";
import { findNewParticipants } from "../../Services/ChannelsService";
import SelectableMember from "./SelectableMember";
import Avatar from "../Common/Avatar";
import { connect } from "react-redux";

class AddMembersView extends Component {
	constructor(props) {
		super(props);
		let members = this.props.members || [];
		let memberDetails = this.props.memberDetails || [];
		let channelName = this.props.channelName;
		this.state = {
			search: "",
			contactsFromRedux: [],
			contacts: [],
			members: [...members],
			memberDetails: [...memberDetails],
			channelName: channelName,
		};
	}

	// componentDidMount() {
	// search(this.state.search).then(contacts => {
	//   console.log("Manish componentDidMount search response :: ", contacts)
	//   this.setState({ contacts });
	// });
	// }

	componentDidMount() {
		this.setState({
			contactsFromRedux: this.props.contactsComingFromRedux.accepted,
		});
	}

	toggleMember = (member) => {
		let { members, memberDetails } = this.state;
		let newMemberDetails = [...memberDetails];
		let memberId = member.userId;
		let index = members.indexOf(memberId);

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
			members.push(memberId);
		} else {
			members.splice(index, 1);
		}
		this.setState({
			members: [...members],
			memberDetails: [...newMemberDetails],
		});
	};

	removeParticipants(member) {
		let { members, memberDetails } = this.state;
		let newMemberDetails = [...memberDetails];
		let memberId = member.userId;
		let index = members.indexOf(memberId);
		let findIndex = newMemberDetails.findIndex((x) => x.userId === memberId);
		if (findIndex > -1) {
			newMemberDetails.splice(findIndex, 1);
		}

		if (index > -1) {
			members.splice(index, 1);
		}

		this.setState({
			members: [...members],
			memberDetails: [...newMemberDetails],
		});
	}

	onSearch = (e) => {
		this.setState({ search: e.target.value });
	};

	searchContacts = (e) => {
		e.preventDefault();
		let query = this.state.search;

		let thisUsercontacts = this.state.contactsFromRedux;
		if (thisUsercontacts) {
			let sortedContactsFromQuery = [];
			thisUsercontacts.forEach((eachContact) => {
				if (
					eachContact.userName
						.toLowerCase()
						.includes(query.toLocaleLowerCase()) ||
					eachContact.emailAddress
						.toLowerCase()
						.includes(query.toLocaleLowerCase())
				) {
					sortedContactsFromQuery.push(eachContact);
				}
			});
			this.setState({ contacts: sortedContactsFromQuery });
		}

		// const userDomain = this.props.selectedDomain.userDomain;
		// findNewParticipants({
		// 	channelName: this.state.channelName,
		// 	userDomain: userDomain,
		// 	queryString: this.state.search,
		// }).then((contacts) => {
		// 	this.setState({ contacts });
		// });
		// search(this.state.search, this.props.selectedDomain).then(contacts => {
		//   console.log("Manish contacts :: ", contacts);
		//   this.setState({ contacts });
		// });
	};

	addMembers = () => {
		this.state.members &&
			this.state.members.length > 0 &&
			this.props.addMembers(this.state.members, this.state.memberDetails);
	};

	render() {
		let { search, contacts, members, memberDetails } = this.state;
		let { isReadOnly } = this.props;

		return (
			<div className="p-2">
				<div className="Contacts-searcharea">
					{!isReadOnly && (
						<>
							<form onSubmit={this.searchContacts}>
								<input
									placeholder="Search Contacts"
									type="text"
									className="form-control form-control-lg"
									onChange={this.onSearch}
									value={search}
								/>
							</form>
							<p style={{ marginTop: "1rem" }}>Selected</p>
						</>
					)}
					<Scrollbars
						autohide="true"
						style={{
							height: isReadOnly ? "50vh" : "150px",
							borderBottom: "1px solid #e9e9e9",
						}}
					>
						<div className="flex" style={{ height: "100%" }}>
							{memberDetails.map((elem, index) => {
								return (
									<div className="d-flex" key={index}>
										{!isReadOnly && (
											<span
												onClick={this.removeParticipants.bind(this, elem)}
												className="remove-selection"
											>
												<span aria-hidden="true">×</span>
											</span>
										)}
										<div className="p-2">
											<Avatar
												color="bg-fm-primary"
												name={elem.userName}
												size={40}
												height={40}
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

					{!isReadOnly && (
						<Scrollbars autohide="true" style={{ height: "300px" }}>
							<div className="flex">
								<div className="pt-2">
									{contacts && contacts.length > 0 && (
										<div>
											{contacts.map((contact, index) => (
												<div className="my-3" key={index}>
													<SelectableMember
														key={contact.userId}
														contact={contact}
														email={contact.emailAddress}
														selected={members.indexOf(contact.userId) !== -1}
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
					)}
				</div>
				<hr />

				<div className="d-flex justify-content-center">
					<a onClick={this.addMembers} className="btn btn-sm btn-open">
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

const mapStateToProps = (state) => ({
	contactsComingFromRedux: state.contacts,
});

export default connect(mapStateToProps)(AddMembersView);

// export default ;

//
// {members.length > 0 && (
//   <div className="mt-2">
//     <div>Selected</div>
//     <Scrollbars autohide style={{ height: "200px" }}>
//       <div className="flex">
//         <div className="pt-2">
//           {members &&
//           members.length > 0 && (
//             <div>
//               {members.map(contact => (
//                 <div className="my-3">
//                   <SelectableMember
//                     key={contact.userId}
//                     contact={contact}
//                     email={contact.emailAddress}
//                     selected={
//                       members.indexOf(contact.userId) !== -1
//                     }
//                     toggleMember={this.toggleMember}
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </Scrollbars>
//   </div>
// )}
//
// <hr />
