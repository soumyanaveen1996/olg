import React from "react";

export default function ErrorMessage({ element }) {
	let notValid =
		Object.prototype.hasOwnProperty.call(element, "validationResult") &&
		!element.validationResult;
	let validationMessage = element.validationMessage;

	// console.log('errorMessage ====== ', element, notValid);

	if (!notValid) {
		return null;
	}
	// return <div style={{ color: "#E5453B" }}>{validationMessage}</div>;
	return (
		<div
			style={{
				backgroundColor: "#E5453B",
				color: "#fff",
				padding: "5px",
				borderRadius: "0 5px 5px 5px",
				lineHeight: 1,
				minwidth: "50%",
				marginTop: "2px",
				marginRight: "10px",
				maxWidth: "90%",
				float: "right",
			}}
		>
			{validationMessage}
		</div>
	);
}
