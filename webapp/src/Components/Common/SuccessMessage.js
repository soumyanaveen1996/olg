import React from "react";

const SuccessMessage = (props) => {
	return (
		<div className="alert-success-custom" role="alert">
			<span style={{ display: "inlineBlock" }}>{props.message}</span>
		</div>
	);
};

export default SuccessMessage;
