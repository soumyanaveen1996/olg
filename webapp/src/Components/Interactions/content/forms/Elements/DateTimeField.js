import React from "react";
import Mandatory from "./Mandatory";
import InfoIcon from "./InfoIcon";
import ErrorMessage from "./ErrorMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimeField({
	isReadOnly = false,
	element,
	action,
	completed,
	onBlurField,
}) {
	if (element.value) {
		element.value = new Date(element.value).getTime();
	}
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
					{/*<input*/}
					{/*  type="datetime-local"*/}
					{/*  disabled={completed === true || element.readOnly}*/}
					{/*  className="form-control form-content-input"*/}
					{/*  id={element.id}*/}
					{/*  value={element.value}*/}
					{/*  onChange={e => {*/}
					{/*    action(e.target.value);*/}
					{/*  }}*/}
					{/*  style={{ width: "200px" }}*/}
					{/*  onBlur={onBlurField}*/}
					{/*/>*/}

					{/*<DatePicker*/}
					{/*  selected={element.value}*/}
					{/*  onChange={value => {*/}
					{/*    action(value);*/}
					{/*  }}*/}
					{/*  showTimeSelect*/}
					{/*  timeFormat="HH:mm"*/}
					{/*  timeIntervals={15}*/}
					{/*  dateFormat="MMMM d, yyyy h:mm aa"*/}
					{/*  timeCaption="time"*/}
					{/*  onBlur={onBlurField}*/}
					{/*/>*/}

					<DatePicker
						selected={element.value}
						onChange={(value) => {
							if (value) {
								action(value.getTime());
							} else {
								action(null);
							}
						}}
						onCalendarClose={onBlurField}
						disabled={element.readOnly || false}
						timeInputLabel="Time:"
						dateFormat="MM/dd/yyyy HH:mm"
						showTimeInput
					/>
				</div>
				<ErrorMessage element={element} />
			</div>
		);

	return content;
}
