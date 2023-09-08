import React from "react";
import Mandatory from "./Mandatory";
import InfoIcon from "./InfoIcon";
import ErrorMessage from "./ErrorMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TimeField({
	isReadOnly = false,
	element,
	action,
	completed,
	onBlurField,
}) {
	let ev = element.value;
	if (element.value) {
		let newDt = new Date();
		newDt.setHours(ev[0]);
		newDt.setMinutes(ev[1]);
		ev = newDt;
	}

	let content = (isReadOnly && (
		<div
			className="d-flex flex-row justify-content-between readOnlyForm"
			style={{ width: "100%", paddingLeft: "30px", paddingRight: "30px" }}
		>
			<label htmlFor={element.id}>
				<Mandatory element={element} />
				{element.title}
			</label>
			<label>{ev || ""}</label>
		</div>
	)) || (
		<div className="form-group px-4" style={{ width: "100%" }}>
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
				{/*<input*/}
				{/*  type="time"*/}
				{/*  disabled={completed === true || element.readOnly}*/}
				{/*  className="form-control form-content-input"*/}
				{/*  id={element.id}*/}
				{/*  value={element.value}*/}
				{/*  onChange={e => {*/}
				{/*    action(e.target.value);*/}
				{/*  }}*/}
				{/*  style={{ width: "170px" }}*/}
				{/*  onBlur={onBlurField}*/}
				{/*/>*/}

				<DatePicker
					selected={ev}
					onChange={(value) => {
						action([value.getHours(), value.getMinutes()]);
					}}
					disabled={element.readOnly || false}
					showTimeSelect
					showTimeSelectOnly
					timeIntervals={15}
					dateFormat="h:mm aa"
					onBlur={onBlurField}
				/>
			</div>
			<ErrorMessage element={element} />
		</div>
	);
	return content;
}
