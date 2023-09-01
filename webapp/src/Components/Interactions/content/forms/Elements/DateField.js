import React from "react";
import Mandatory from "./Mandatory";
import InfoIcon from "./InfoIcon";
import ErrorMessage from "./ErrorMessage";

export default function DateField({
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
				<div className="d-flex flex-column">
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
					<input
						type="date"
						disabled={element.readOnly}
						className="form-control form-content-input"
						id={element.id}
						value={element.value}
						onChange={(e) => {
							action(e.target.value);
						}}
						style={{ width: "170px" }}
						onBlur={onBlurField}
					/>
				</div>
				<ErrorMessage element={element} />
			</div>
		);
	return content;
}
