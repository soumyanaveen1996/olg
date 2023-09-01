import React from "react";

const ErrorMessage = (props) => {
	return (
		<div className="alert-danger-custom" role="alert">
			<span style={{ display: "inlineBlock", fontSize: "12px" }}>
				{props.message}
			</span>
		</div>
	);
};

export default ErrorMessage;
