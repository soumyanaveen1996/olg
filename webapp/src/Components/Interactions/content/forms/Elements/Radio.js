import React from "react";

export default function Radio({ id, action, option, checked, disabled }) {
	return (
		<input
			id={id + "_radio"}
			checked={checked}
			type="radio"
			label={option}
			className="d-flex align-items-center"
			onClick={() => {
				action(option);
			}}
			disabled={disabled}
		/>
	);
}
