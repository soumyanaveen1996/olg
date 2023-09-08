import React from "react";

export default function ButtonsField({
	element,
	action,
	completed,
	onBlurField,
	isReadOnly,
}) {
	return (
		<div className="d-flex flex-row">
			{element.options.map((elem, inx) => {
				return (
					<button
						key={inx}
						style={{ padding: "5 15px", marginRight: "5px" }}
						className="btn btn-open mb-1"
						onClick={(e) => {
							e.preventDefault();
							action(elem);
						}}
						disabled={completed}
					>
						{elem.label}
					</button>
				);
			})}
		</div>
	);
}
