import React from "react";

const Mandatory = ({ mandatory }) => {
	if (mandatory) {
		return <sup style={{ color: "#E5453B", marginLeft: "1px" }}>*</sup>;
	}
	return null;
};

export default Mandatory;