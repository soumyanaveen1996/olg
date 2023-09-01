import React from "react";
import Mandatory from "./Mandatory";
import InfoIcon from "./InfoIcon";
import ErrorMessage from "./ErrorMessage";

export default function TextField({
	isReadOnly,
	chat,
	element,
	action,
	completed,
	onBlurField,
	type,
}) {
	let closeAllow = false;

	if (chat?.options && !chat?.options.allowClose) {
		closeAllow = false;
	} else {
		closeAllow = true;
	}

	let content = isReadOnly ? (
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
	) : (
		<div className="form-group px-4" style={{ width: "100%" }} key={element.id}>
			<div className="d-flex flex-column input-container">
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
				{/* Bad Workaround fro AI- change ASAP */}
				{type === "airindia" && element.id === "flightNumber" ? (
					<div className="flight-number-container">
						<span className="flight-prefix">{"AI- "}</span>
						<input
							type="text"
							disabled={(closeAllow && completed === true) || element.readOnly}
							className="form-control form-content-input ai-form-input"
							id={element.id}
							value={element.value || ""}
							onChange={(e) => {
								action(e.target.value);
							}}
							placeholder=""
							onBlur={onBlurField}
							maxLength={element.maxLength}
						/>
					</div>
				) : (
					<input
						type="text"
						disabled={(closeAllow && completed === true) || element.readOnly}
						className="form-control form-content-input"
						id={element.id}
						value={element.value || ""}
						onChange={(e) => {
							action(e.target.value);
						}}
						placeholder=""
						onBlur={onBlurField}
						maxLength={element.maxLength}
					/>
				)}
				{element.maxLength && typeof element.charCounter === "undefined" && (
					<span className="char-left-text-field">
						{element.maxLength} characters left
					</span>
				)}
				{element.maxLength && element.charCounter && (
					<span className="char-left-text-field">
						{element.charCounter} characters left
					</span>
				)}
			</div>
			<ErrorMessage element={element} />
		</div>
	);

	return content;
}
