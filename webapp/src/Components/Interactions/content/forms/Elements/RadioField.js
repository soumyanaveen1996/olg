import React from "react";
import Mandatory from "./Mandatory";
import Radio from "./Radio";
import InfoIcon from "./InfoIcon";
import ErrorMessage from "./ErrorMessage";
export default function RadioField({
	isReadOnly = false,
	element,
	action,
	// completed,
	// onBlurField,
}) {
	let { options = [], value } = element;
	// console.log('radio element ===== ', element);

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
				<div>
					{options.map((option, index) => {
						return (
							<Radio
								key={index}
								checked={value === option}
								option={option}
								action={action}
								disabled={element.readOnly}
								id={element.id + "_RadioField_" + index}
							/>
						);
					})}
				</div>
				<ErrorMessage element={element} />
			</div>
		);
	return content;
}
