import React, { Component } from "react";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import Avatar from "../../Common/Avatar";
import Config from "../../../Utils/Config";
import { connect } from "react-redux";
import { setSelectedDomain } from "../../../State/actions/user";
import { storeDomainSelected } from "../../../Services/StorageService";
const R = require("ramda");

class DomainsFilterMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false,
		};
	}

	toggle = () => {
		this.setState((prevState) => ({
			dropdownOpen: !prevState.dropdownOpen,
		}));
	};

	selectedItem(key, data) {
		// console.log(data);
		this.props.seletedDoamin(data);
		this.props.setSelectedDomain(data);
		storeDomainSelected(data);
	}

	showNewProvideDialog = () => {
		this.props.showNewProvider();
	};

	render() {
		let { domains } = this.props;
		// console.log("all prop in domain ", this.props);

		return (
			<div className="domain-div">
				<Dropdown direction="end" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
					<DropdownToggle caret>
						{" "}
						{!this.state.dropdownOpen && (
							<img
								loading="lazy"
								src="/img/dropdown-arrow-down.png"
								alt="down-arrow"
							/>
						)}
						{this.state.dropdownOpen && (
							<img
								loading="lazy"
								src="/img/dropdown-arrow-up.png"
								alt="up-arrow"
							/>
						)}
					</DropdownToggle>
					<DropdownMenu
						style={{ backgroundColor: "rgb(42, 45, 60)", padding: "5px 0 0" }}
					>
						{domains.map((data, index) => {
							return (
								<DropdownItem
									key={index}
									onClick={this.selectedItem.bind(this, index, data)}
									style={{
										display: "flex",
										alignItems: "center",
										padding: "5px",
									}}
								>
									<Avatar
										imgSrc={`${R.prop("contentURL", Config)}` + data.logoUrl}
										size={20}
										height={20}
										style={{
											marginRight: "10px",
										}}
									/>

									<span>{data.name}</span>
								</DropdownItem>
							);
						})}
						{/* <DropdownItem divider /> */}
						<DropdownItem
							onClick={this.showNewProvideDialog}
							style={{
								position: "sticky",
								bottom: "0px",
								backgroundColor: "rgb(42, 45, 60)",
								border: "1px solid #638DFF",
								borderRadius: "6px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								padding: "5px",
							}}
						>
							<img
								loading="lazy"
								src="/img/plus-icon.png"
								alt="plus"
								width={10}
								className="mr-1"
							/>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		);
	}
}

const mapActionsToProps = {
	setSelectedDomain: setSelectedDomain,
};

export default connect(null, mapActionsToProps)(DomainsFilterMenu);
