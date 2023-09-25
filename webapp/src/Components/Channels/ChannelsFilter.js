/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Badge } from "reactstrap";
import "./../Catalog/Catalog.css";
import ChannelsFilterMenu from "./ChannelsFilterMenu";

class ChannelsFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allFilters: { ...this.props.filters },
		};
	}
	removeFilter = (name) => {
		let filters = this.props.filters;
		filters[name].value = false;
		this.props.applyFilters(filters);

		let { allFilters } = this.state;
		allFilters[name].value = false;
		this.setState({ allFilters: { ...allFilters } });
	};

	clearFilters = () => {
		let { allFilters } = this.state;

		Object.keys(allFilters).forEach((elem) => {
			allFilters[elem].value = false;
		});

		this.props.clearFilters();
	};

	render() {
		let { allFilters = {} } = this.state;
		// console.log("all the filters data ", allFilters);

		let keys = Object.keys(allFilters);
		return (
			<div className="d-flex">
				<div className="d-flex">
					Filter
					<span className="ml-2">
						<ChannelsFilterMenu
							filters={allFilters}
							clearFilters={this.clearFilters}
							applyFilters={this.props.applyFilters}
							userDomains={this.props.user.domains}
						>
							<img
								loading="lazy"
								src="/offlinelms/img/collapse-gray-arrow.png"
								style={{
									height: "6px",
									width: "11px",
									transform: "scaleY(1)",
									pointer: "cursor",
								}}
							/>
						</ChannelsFilterMenu>
					</span>
				</div>
				<div className="ml-4">
					{keys.map((k, indx) => {
						if (allFilters[k].value) {
							return (
								<span key={indx} className="mx-2">
									<Badge color="filter">
										<a
											className="mr-2"
											onClick={() => {
												this.removeFilter(k);
											}}
										>
											<span className="icon-cross" />
										</a>
										{allFilters[k].label}
									</Badge>
								</span>
							);
						} else {
							return null;
						}
					})}
				</div>
			</div>
		);
	}
}

export default ChannelsFilter;
