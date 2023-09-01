import React, { PureComponent } from "react";
import Mandatory from "./Mandatory";
import CheckBox from "./CheckBox";
import MenuArrow from "../../../../Common/MenuArrow";
import InfoIcon from "./InfoIcon";
import ErrorMessage from "./ErrorMessage";

export default class MultiSelect extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	showOptions = () => {
		this.setState({ showOptions: true });
	};

	closeOptions = () => {
		this.setState({ showOptions: false });
	};

	render() {
		let {
			element,
			action,
			completed,
			onBlurField,
			isReadOnly = false,
		} = this.props;
		let { options = [], value } = element;
		let { showOptions } = this.state;

		let content = (isReadOnly && (
			<div
				className="d-flex flex-row justify-content-between readOnlyForm"
				style={{ width: "100%", paddingLeft: "30px", paddingRight: "30px" }}
				key={element.id}
			>
				<label htmlFor={element.id}>
					<Mandatory element={element} />
					{element.title}
				</label>
				<label>{value || ""}</label>
			</div>
		)) || (
				<div
					className="form-group px-4"
					style={{ width: "100%" }}
					key={element.id}
				>
					<hr />
					<label className="d-flex justify-content-between align-items-center">
						<div className="d-flex align-items-center">
							<span className="has-arrow">
								<Mandatory element={element} />
								{element.title}
							</span>
							{element && element.info && (
								<span className="ml-2">
									<InfoIcon id={`tooltip-${element.id}`} info={element.info} />
								</span>
							)}
						</div>
						<MenuArrow
							onOpen={this.showOptions}
							onClose={this.closeOptions}
							color="#638DFF"
						/>
					</label>
					{showOptions &&
						options.map((option, index) => {
							return (
								<CheckBox
									key={index}
									checked={value && value.indexOf(option) !== -1}
									option={option}
									action={action}
									disabled={element.readOnly}
									id={element.id + "_MultiSelect_" + index}
									onBlur={onBlurField}
								/>
							);
						})}
					<ErrorMessage element={element} />
					<hr />
				</div>
			);
		return content;
	}
}
