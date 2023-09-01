import React from "react";

export default function CheckBox({
	id,
	action,
	option,
	checked,
	disabled,
	onBlur,
}) {
	return (
		<input
			id={id + "_checkbox"}
			checked={checked}
			type="checkbox"
			label={option}
			className="d-flex align-items-center"
			onClick={() => {
				action(option);
			}}
			disabled={disabled}
			onBlur={onBlur}
		/>
	);
}
