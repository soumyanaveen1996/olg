import React, { Component } from "react";
import _ from "lodash";
class Tab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: null,
		};
	}

	componentDidMount() {
		this.setState({ selectedTab: this.props.tabs[0] });
	}

	changeTab = (tabName) => {
		let tabs = this.props.tabs;
		this.setState({
			selectedTab:
				tabs[
					tabs.findIndex((tab) => {
						return tab.tabName === tabName;
					})
				],
		});
	};

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props.tabs, prevProps.tabs)) {
			this.setState({ selectedTab: this.props.tabs[0] });
		}
	}

	render() {
		let { tabs } = this.props;
		let selectedTab = this.state.selectedTab;
		if (!selectedTab) {
			return null;
		}
		let TabComponent = selectedTab.tabComponent,
			tabProps = selectedTab.tabProps;

		let tabNodes = tabs.map((tab) => {
			let activeClassName = "";
			if (tab.tabName === selectedTab.tabName) {
				activeClassName = "chat-tab-active";
			}
			return (
				<li role="presentation" className="nav-item" key={tab.name}>
					<a
						className={"nav-link show " + activeClassName}
						style={{ borderRadius: "0px" }}
						onClick={(e) => {
							e.preventDefault();
							this.changeTab(tab.tabName);
						}}
					>
						{tab.tabName}
					</a>
				</li>
			);
		});

		return (
			<div className="dad-tabs">
				<ul className="nav nav-pills" style={{ borderBottom: "0px" }}>
					{tabNodes}
				</ul>

				<div className="tab-content p-3">
					<div className="">
						<TabComponent {...tabProps} />
					</div>
				</div>
			</div>
		);
	}
}

export default Tab;
