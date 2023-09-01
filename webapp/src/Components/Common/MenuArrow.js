/* eslint-disable react/no-deprecated */
import React, { PureComponent } from "react";
import _ from "lodash";
class MenuArrow extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { open: this.props.open || false };
	}
	toggleMenu = () => {
		let newVal = !this.state.open;
		this.setState({ open: newVal });
		if (newVal) {
			this.props.onOpen();
		} else {
			this.props.onClose();
		}
	};

	componentDidMount() {
		this.setState({ open: this.props.open || false });
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props.open, prevProps.open)) {
			this.setState({ open: this.props.open || false });
		}
	}

	render() {
		let { open } = this.state;

		if (open) {
			return (
				<i
					className={
						this.props.className
							? this.props.className + " icon-chevron-up"
							: "icon-chevron-up"
					}
					style={{
						color: this.props.color || "#fff",
						fontWeight: "bold",
						fontSize: "10px",
						float: "right",
						padding: "5px",
					}}
					onClick={this.toggleMenu}
				/>
			);
		}

		return (
			<i
				className={
					this.props.className
						? this.props.className + " icon-chevron-down"
						: "icon-chevron-down"
				}
				style={{
					color: this.props.color || "#fff",
					fontWeight: "bold",
					fontSize: "10px",
					padding: "5px",
				}}
				onClick={this.toggleMenu}
			/>
		);
	}
}

export default MenuArrow;
