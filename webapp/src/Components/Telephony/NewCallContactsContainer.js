/* eslint-disable react/no-deprecated */
import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchContacts } from "../../State/actions/contacts";

import { fetchWalletBalance } from "../../Services/VoipServices";
import { createConversation } from "../../State/actions/chats";
import CallHistoryContainer from "./CallHistoryContainer";
import _ from "lodash";
import { makeCall } from "../../State/actions/phone";

const prefixText = (color = "#808080") => ({
	alignItems: "center",
	display: "flex",
	":before": {
		content: '"Filter by:"',
		color: color,
		display: "block",
		marginRight: 8,
	},
});

const colourStyles = {
	control: (styles) => ({
		...styles,
		border: "1px solid rgb(232, 233, 238)",
		boxShadow: "none",
		backgroundColor: "white",
		color: "#808080",
	}),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		return {
			...styles,
			color: isSelected ? "#fff" : "#808080",
		};
	},
	input: (styles) => ({ ...styles, ...prefixText() }),
	placeholder: (styles) => ({
		...styles,
		...prefixText(),
	}),
	singleValue: (styles, { isSelected }) => ({
		...styles,
		color: isSelected ? "#808080" : "#808080",
		...prefixText(),
	}),
};
class NewCallContactsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userBalance: 0,
			display: "recents",
			selectedOption: "",
			allContacts: [],
			allOptions: [
				{ label: "All contacts", value: "allContacts" },
				{ label: "People", value: "people" },
				{ label: "Vessels", value: "vessels" },
			],
		};
	}

	componentDidMount() {
		// console.log("this 1", this.props);
		if (!this.props.isAnonymousUser) {
			this.props.fetchContacts({
				selectedDomain: this.props.selectedDomain.userDomain,
			});
			this.getBalance();
		}
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props, prevProps)) {
			let contacts = [
				...this.props.accepted,
				...this.props.localContacts,
				...this.props.vessels,
			];
			this.setState({ allContacts: [...contacts] });
			this.searchContacts(this.state.searchText, contacts);
		}
	}

	doSearch = (searchText) => {
		let contacts = [
			...this.props.accepted,
			...this.props.localContacts,
			...this.props.vessels,
		];
		this.searchContacts(searchText, contacts);
	};

	getBalance = async () => {
		let walletBalance = await fetchWalletBalance();
		this.setState({ userBalance: walletBalance });
	};

	searchContacts = (searchText, contacts) => {
		if (!searchText || !searchText.length) {
			this.setState({
				contacts: contacts,
				selectedOption: "",
				searchText: null,
			});
			return;
		}
		let filtered = contacts.filter(function (contact) {
			let field1 = contact.name ? contact.name : contact.userName,
				field2 = contact.emailAddress;
			let select = false;
			try {
				select =
					(field1 &&
						field1.toLowerCase().search(searchText.toLowerCase()) !== -1) ||
					(field2 &&
						field2.toLowerCase().search(searchText.toLowerCase()) !== -1);
			} catch (e) {}
			return select;
		});
		this.setState({
			contacts: filtered,
			searchText,
		});
	};

	getCredits = () => {
		let botsArray = [...this.props.bots];
		let digitalWallet = botsArray.find((obj) => obj.botId === "DigitalWallet");
		// console.log("Top-up =============", digitalWallet);
		if (digitalWallet) {
			this.props.onCloseDialler();
			this.props.createConversation(digitalWallet, this.props.userId);
		} else {
			alert("You need to install the Digital Wallet bot");
		}
	};

	makePhoneCall = async (phone, callMode) => {
		let { emailAddress } = this.props;
		if (callMode === "sat") {
			this.props.makeCall("sat", emailAddress, phone, phone, null, "on-call");
		} else {
			this.props.makeCall("phone", emailAddress, phone, phone, null, "on-call");
		}
	};

	handleChangeFilter = (selectedOption) => {
		this.setState({ selectedOption });
		let allContacts = this.state.allContacts;
		let newContact = [];
		switch (selectedOption.value) {
			case "people":
				allContacts.forEach((elem) => {
					if (!elem.type) {
						newContact.push(elem);
					}
				});
				break;
			case "vessels":
				allContacts.forEach((elem) => {
					if (elem.type) {
						newContact.push(elem);
					}
				});
				break;
			default:
				newContact = [...allContacts];
				break;
		}

		this.setState({ contacts: [...newContact] });

		// let filterContacts = this
	};

	showContacts = () => {
		this.setState({ display: "contacts" });
	};

	showRecentCalls = () => {
		this.setState({ display: "recents" });
	};

	showCreateConversation = () => this.setState({ openDialPad: true });
	closeCreateConversation = () => this.setState({ openDialPad: false });

	render() {
		let { contacts = [], searchText, display, selectedOption } = this.state;

		// let showText = "Filter by: All contacts";

		return (
			<div>
				<div className="px-1 pb-1 d-flex justify-content-between align-items-center">
					{/* <div>
            <ContactsSearch
              search={this.doSearch}
              containerStyle={{
                height: "40px",
                width: "100%",
                border: "0px",
                borderRadius: 0,
                backgroundColor: "transparent"
              }}
              iconStyle={{
                fontWeight: "bold",
                fontSize: "16px",
                paddingLeft: 0,
                paddingRight: 0
              }}
              textBoxStyle={{
                position: "inherit",
                alignSelf: "center",
                paddingLeft: "17px",
                paddingRight: "7px",
                backgroundColor: "transparent",
                color: "#fff",
                "::placeholder": {
                  color: "red"
                }
              }}
            />
          </div> */}
					{/* <div>
            <a
              className="btn"
              style={{
                backgroundColor: "#fff",
                width: "120px",
                borderRadius: "20px",
                color: "#2FC76F"
              }}
              onClick={this.props.showDialPad}
            >
              Dialpad
            </a>
          </div> */}
				</div>
				{/* <div className="credit-container row justify-content-between px-5">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Call to phone</span>
            <span>Current balance : $ {this.state.userBalance}</span>
          </div>

          <div>
            <div
              className="get-credit"
              style={{ cursor: "pointer" }}
              onClick={this.getCredits}
            >
              <a>
                <span>Top-up</span>
              </a>
            </div>
          </div>
        </div> */}

				{/* <div
          className="d-flex justify-content-between align-items-center"
          style={{
            height: "40px",
            backgroundColor: "#F4F4F4"
          }}
        >
          <a
            className="d-flex justify-content-center align-items-center"
            style={{
              color: display === "contacts" ? "#00A7D6" : "#4A4A4A",
              fontSize: "14px",
              width: "50%",
              height: "100%",
              borderRight: "1px solid #E9E9E9",
              borderBottom: display === "contacts" ? "2px solid #00A7D6" : "0px"
            }}
            onClick={this.showContacts}
          >
            FrontM Contacts
          </a>
          <a
            className="d-flex justify-content-center align-items-center"
            style={{
              color: display === "recents" ? "#00A7D6" : "#4A4A4A",
              fontSize: "14px",
              width: "50%",
              height: "100%",
              borderRight: "1px solid #E9E9E9",
              borderBottom: display === "recents" ? "2px solid #00A7D6" : "0px"
            }}
            onClick={this.showRecentCalls}
          >
            Recent Calls
          </a>
        </div> */}

				{/* {display === "contacts" && (
          <div className="px-5">
            <FormGroup check className="mt-3" style={{ paddingLeft: 0 }}>
              <Select
                placeholder={"All contacts"}
                value={selectedOption}
                options={this.state.allOptions}
                onChange={this.handleChangeFilter}
                styles={colourStyles}
              />
            </FormGroup>
          </div>
        )} */}

				<div className="d-flex flex " style={{ marginTop: "13px" }}>
					{/* {display === "contacts" && (
            <ContactsListForCall
              contacts={contacts}
              searchText={searchText}
              height={"350px"}
              onCloseDialler={this.props.onCloseDialler}
            />
          )} */}

					{/* {display === "recents" && ( */}
					<CallHistoryContainer
						height={"350px"}
						user={this.props.user.user}
						balance={this.props.balance}
						noBalance={() => this.props.noBalance()}
						emailAddress={this.props.emailAddress}
						closeCallHistory={this.props.onCloseDialler}
					/>
					{/* )} */}

					{/* <div className="btn-dialpad">
            <a
              onClick={this.showCreateConversation}
              className="btn btn-default d-inline-flex justify-content-center align-items-center"
            >
              <img src="/img/tab-dialpad-icon@2x.png" width="10" alt="" />
              <span>Dialpad</span>
            </a>
          </div> */}
				</div>
				{/* 
        {this.state.openDialPad && (
          <ModalPopup
            onClose={this.closeCreateConversation}
            size="sm"
            noHeader
            className="dialler-modal"
          >
            <DiallerKeyPad
              makePhoneCall={this.makePhoneCall}
              onClose={this.closeCreateConversation}
            />
          </ModalPopup>
        )} */}
			</div>
		);
	}
}

const mapActionToProps = {
	fetchContacts: fetchContacts,
	createConversation: createConversation,
	makeCall: makeCall,
};

const mapDataToProps = (state, props) => {
	return {
		user: state.user,
		isAnonymousUser: state.user.isAnonymousUser,
		balance: state.user.balance,
		accepted: state.contacts.accepted,
		localContacts: state.contacts.localContacts,
		vessels: state.contacts.vessels,
		userId: state.user.user.userId,
		emailAddress: state.user.user.emailAddress,
		bots: state.user.botSubscriptions,
		geoData: state.user.geoData,
	};
};

export default connect(
	mapDataToProps,
	mapActionToProps
)(NewCallContactsContainer);
