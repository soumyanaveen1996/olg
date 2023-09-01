import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { search } from "../../Services/ContactsService";
import SelectableMember from "./SelectableMember";
import Avatar from "../Common/Avatar";

class ManageAdminsView extends Component {
	constructor(props) {
		super(props);
		let members = this.props.members || [];
		let memberDetails = this.props.memberDetails || [];
		let channelOnwer = this.props.channelOwner;
		let channelAdmins = this.props.channelAdmins;

		this.state = {
			search: "",
			contacts: [],
			channelOnwer: channelOnwer,
			members: [...members],
			addAdmin: [],
			adminDetails: [...channelAdmins],
			memberDetails: [...memberDetails],
		};
	}

	componentDidMount() {
		let admins = [];
		this.state.adminDetails.map((elem) => {
			admins.push(elem.userId);
		});

		this.setState({ addAdmin: [...admins] });
	}

	toggleMember = (member) => {
		console.log("adding member ", member);
		let admins = [];
		let { members, adminDetails } = this.state;
		let newMemberDetails = [...adminDetails];
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

		newMemberDetails.map((elem) => {
			admins.push(elem.userId);
		});
		this.setState({
			members: [...members],
			adminDetails: [...newMemberDetails],
			addAdmin: [...admins],
		});
	};

	removeParticipants(member) {
		let admins = [];
		let { members, adminDetails } = this.state;
		let newMemberDetails = [...adminDetails];
		let memberId = member.userId;
		let index = members.indexOf(memberId);
		let findIndex = newMemberDetails.findIndex((x) => x.userId === memberId);
		if (findIndex > -1) {
			newMemberDetails.splice(findIndex, 1);
		}

		if (index > -1) {
			members.splice(index, 1);
		}

		newMemberDetails.map((elem) => {
			admins.push(elem.userId);
		});

		this.setState({
			members: [...members],
			adminDetails: [...newMemberDetails],
			addAdmin: [...admins],
		});
	}

	onSearch = (e) => {
		this.setState({ search: e.target.value });
	};

	searchContacts = (e) => {
		e.preventDefault();
		search(this.state.search).then((contacts) => this.setState({ contacts }));
	};

	addAdmins = () => {
		// console.log("all admins ", this.state.addAdmin);

		this.props.addAdmins(this.state.addAdmin);
	};

	render() {
		let { memberDetails, adminDetails } = this.state;
		const { isReadOnly } = this.props;
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

					{!isReadOnly && <p style={{ marginTop: "1rem" }}>Selected</p>}
					<Scrollbars
						autohide="true"
						style={{
							height: isReadOnly ? "50vh" : "150px",
							borderBottom: "1px solid #e9e9e9",
						}}
					>
						<div className="flex" style={{ height: "100%" }}>
							{adminDetails.map((elem, index) => {
								return (
									<div className="d-flex" key={index}>
										{!isReadOnly && (
											<>
												{!elem.role || elem.role === "" ? (
													<span
														onClick={this.removeParticipants.bind(this, elem)}
														className="remove-selection"
													>
														<span aria-hidden="true">×</span>
													</span>
												) : (
													<span className="remove-selection" />
												)}
											</>
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
									{memberDetails && memberDetails.length > 0 && (
										<div>
											{memberDetails.map((contact) => (
												<div className="my-3" key={contact.userId}>
													<SelectableMember
														contact={contact}
														email={contact.emailAddress}
														toggleMember={this.toggleMember}
													/>
												</div>
											))}
										</div>
									)}

									{(!memberDetails || memberDetails.length === 0) && (
										<div className="text-center mt-4">
											There are no paticipants
										</div>
									)}
								</div>
							</div>
						</Scrollbars>
					)}
				</div>
				<hr />

				<div className="d-flex justify-content-center">
					<a
						onClick={isReadOnly ? this.props.cancel : this.addAdmins}
						className="btn btn-sm btn-open"
					>
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

export default ManageAdminsView;
