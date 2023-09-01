import React from "react";
import Mandatory from "./Mandatory";
import CheckBox from "./CheckBox";
import InfoIcon from "./InfoIcon";
import ErrorMessage from "./ErrorMessage";

export default function CheckBoxField({
	isReadOnly = false,
	element,
	action,
	completed,
	onBlurField,
}) {
	let { options = [], value } = element;
	// console.log('checkbox element ===== ', element);
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
			<div className="d-flex flex-column">
				{value.map((elem, inx) => {
					{
						/* <label>{value || ''}</label> */
					}
					return (
						<CheckBox
							key={inx}
							checked={elem}
							option={elem}
							disabled={true}
							id={elem.id + "_CheckBoxField_" + inx}
						/>
					);
				})}
			</div>
		</div>
	)) || (
			<div className="form-group px-4" style={{ width: "100%" }} key={element.id}>
				<label htmlFor={element.id}>
					<div className="d-flex align-items-center">
						<Mandatory element={element} />
						{element.title}
						{element && element.info && (
							<span className="ml-2">
								<InfoIcon id={`tooltip-${element.id}`} info={element.info} />
							</span>
						)}
					</div>
				</label>
				{options.map((option, index) => {
					return (
						<CheckBox
							key={index}
							checked={value && value.indexOf(option) !== -1}
							option={option}
							action={action}
							disabled={completed || element.readOnly}
							id={element.id + "_CheckBoxField_" + index}
						/>
					);
				})}
				<ErrorMessage element={element} />
			</div>
		);
	return content;
}
