import React, { Component } from "react";

class NestedDropdown extends Component {
	getMenuItemTitle = (menuItem, index, depthLevel) => {
		if (menuItem) {
			return menuItem.label;
		}
	};

	getMenuItem = (
		menuItem,
		index,
		depthLevel,
		controlOptions,
		sendMenuMessage
	) => {
		let title = this.getMenuItemTitle(menuItem, index, depthLevel);
		if (menuItem && menuItem.submenu && menuItem.submenu.length > 0) {
			return (
				<li key={menuItem.id}>
					<a
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						{title}
						<img
							style={{ width: "6px", height: "10px" }}
							src="/img/menu-chevron-right@2x.png"
							alt=""
						/>
					</a>
					<NestedDropdown
						config={menuItem.submenu}
						depthLevel={depthLevel + 1}
						submenu={true}
						controlOptions={controlOptions}
						sendMenuMessage={sendMenuMessage}
					/>
					<hr />
				</li>
			);
		} else {
			if (menuItem) {
				return (
					<li
						key={menuItem.id}
						onClick={(e) => sendMenuMessage(e, menuItem, controlOptions)}
					>
						<a> {title}</a> <hr />
					</li>
				);
			}
		}
	};

	render() {
		let { config, depthLevel, controlOptions, sendMenuMessage } = this.props;

		let options = [];
		config.forEach((item, index) => {
			options.push(
				this.getMenuItem(
					item,
					index,
					depthLevel,
					controlOptions,
					sendMenuMessage
				)
			);
		});

		if (this.props.submenu && this.props.submenu === true) {
			return <ul>{options}</ul>;
		}
		return <ul className="nested-dropdown">{options}</ul>;
	}
}

export default NestedDropdown;
