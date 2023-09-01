/* eslint-disable react/no-deprecated */
import React from "react";
import {
	Form,
	FormGroup,
	Label,
	Input,
	Dropdown,
	DropdownMenu,
	DropdownToggle,
} from "reactstrap";
import _ from "lodash";
import Select from "react-select";

export default class ChannelsFilterMenu extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false,
			filters: { ...this.props.filters },
		};
	}

	componentDidMount() {
		this.setState({ filters: { ...this.props.filters } });
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props.filters, prevProps.filters)) {
			this.setState({ filters: { ...this.props.filters } });
		}
	}

	toggle = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			dropdownOpen: !this.state.dropdownOpen,
		});
	};

	applyFilters = (e) => {
		let filters = { ...this.state.filters };
		delete filters.dropdownOpen;

		// console.log("filters ", filters);

		this.setState({});

		this.props.applyFilters(filters);
		this.toggle(e);
	};

	clearFilters = (e) => {
		this.props.clearFilters();
		this.toggle(e);
	};

	onChangeTeam = (domain) => {
		let team = domain ? { ...domain } : null;
		this.setState({ team: team });
	};

	render() {
		let { userDomains } = this.props;
		let { subscribed, created, unsubscribed, team, platform, publicChannel } =
			this.state.filters;

		// console.log("we will see the value ", this.state);

		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle
					tag="span"
					onClick={this.toggle}
					data-toggle="dropdown"
					aria-expanded={this.state.dropdownOpen}
				>
					{this.props.children}
				</DropdownToggle>
				<DropdownMenu className="conversation-dd-menu">
					<div className="px-3" style={{ fontSize: "14px", color: "#666666" }}>
						<Form>
							<FormGroup check className="mt-3">
								<Label check>
									<Input
										type="checkbox"
										checked={subscribed.value}
										onChange={(e) => {
											let subscribed = this.state.filters.subscribed;
											subscribed.value = !subscribed.value;
											this.setState(
												{ subscribed: { ...subscribed } },
												console.log(this.state.filters.subscribed)
											);
										}}
									/>{" "}
									Subscribed
								</Label>
							</FormGroup>

							<FormGroup check className="mt-3">
								<Label check>
									<Input
										type="checkbox"
										checked={created.value}
										onChange={(e) => {
											let created = this.state.filters.created;
											created.value = !created.value;
											this.setState({ created: { ...created } }, () => {
												console.log(this.state.filters.created);
											});
										}}
									/>{" "}
									Created
								</Label>
							</FormGroup>

							<FormGroup check className="mt-3">
								<Label check>
									<Input
										type="checkbox"
										checked={unsubscribed.value}
										onChange={(e) => {
											let unsubscribed = this.state.filters.unsubscribed;
											unsubscribed.value = !unsubscribed.value;
											this.setState(
												{ unsubscribed: { ...unsubscribed } },
												() => {
													console.log(this.state.filters.unsubscribed);
												}
											);
										}}
									/>{" "}
									Unsubscribed
								</Label>
							</FormGroup>

							<FormGroup check className="mt-3">
								<Label check>
									<Input
										type="checkbox"
										checked={platform.value}
										onChange={(e) => {
											let platform = this.state.filters.platform;
											platform.value = !platform.value;
											this.setState({ platform: { ...platform } });
										}}
									/>{" "}
									Platform
								</Label>
							</FormGroup>

							<FormGroup check className="mt-3">
								<Label check>
									<Input
										type="checkbox"
										checked={publicChannel.value}
										onChange={(e) => {
											let publicChannel = this.state.filters.publicChannel;
											publicChannel.value = !publicChannel.value;
											this.setState({
												publicChannel: { ...publicChannel },
											});
										}}
									/>{" "}
									Public
								</Label>
							</FormGroup>

							<FormGroup check className="mt-3" style={{ paddingLeft: 0 }}>
								<Select
									onChange={this.onChangeTeam}
									placeholder="Team"
									value={team}
									options={userDomains
										.filter((domain) => domain.domain !== "frontmai")
										.map((domain) => {
											return { label: domain.domain, value: domain.domain };
										})}
								/>
							</FormGroup>

							<div className="d-flex justify-content-center mt-4 flex-column align-items-center">
								<a className="btn btn-sm btn-open" onClick={this.applyFilters}>
									Apply filters
								</a>
								<a
									className="primary-link my-2"
									style={{ fontSize: "12px" }}
									onClick={this.clearFilters}
								>
									Clear filters and show all
								</a>
							</div>
						</Form>
					</div>
				</DropdownMenu>
			</Dropdown>
		);
	}
}
