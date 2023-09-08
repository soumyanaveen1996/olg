import React from "react";
import Select from "react-select";
import Mandatory from "./Mandatory";
import InfoIcon from "./InfoIcon";
import ErrorMessage from "./ErrorMessage";

export default function DropDown({
	isReadOnly = false,
	chat,
	element,
	action,
	completed,
	onBlurField,
}) {
	let value = element.value;
	// console.log('dropdown ====== ', element, isReadOnly);

	let closeAllow;

	if (chat?.options && !chat?.options.allowClose) {
		closeAllow = false;
	} else {
		closeAllow = true;
	}
	if (!isReadOnly && typeof value !== "object") {
		value = { value: value, label: value };
	}

	let { options = [] } = element;
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

					<Select
						menuPortalTarget={document.body}
						styles={{
							menuPortal: (base) => ({
								...base,
								zIndex: 9999,
							}),
						}}
						isDisabled={
							(closeAllow && completed === true) || element.readOnly // menuIsOpen={true}
						}
						id={element.id}
						onChange={(option) => {
							action(option ? option.value : null);
						}}
						aria-label={element.id}
						aria-labelledby={element.id}
						placeholder=""
						value={value}
						options={options?.map((option) => {
							return { label: option, value: option };
						})}
						isClearable={!element.mandatory}
						onBlur={onBlurField}
					/>
				</div>
				<ErrorMessage element={element} />
			</div>
		);
	return content;
}
