import React from "react";
import Slider from "rc-slider";
import Mandatory from "./Mandatory";
import InfoIcon from "./InfoIcon";
import ErrorMessage from "./ErrorMessage";

export default function SliderField({
	isReadOnly = false,
	element,
	action,
	completed,
	onBlurField,
}) {
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
			<label>{element.value || ""}</label>
		</div>
	)) || (
			<div className="form-group px-4" style={{ width: "100%" }} key={element.id}>
				<div className="d-flex flex-row">
					<label htmlFor={element.id}>
						<Mandatory element={element} />
						{element.title}
					</label>
					{element && element.info && (
						<span className="ml-2">
							<InfoIcon id={`tooltip-${element.id}`} info={element.info} />
						</span>
					)}
				</div>
				<div className="d-flex align-items-center">
					<Slider
						value={element.value}
						onChange={action}
						disabled={completed || element.readOnly}
					/>
				</div>
				<ErrorMessage element={element} />
			</div>
		);
	return content;
}
