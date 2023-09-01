import React from "react";

export default function Mandatory({ element }) {
	if (element.mandatory) {
		return <sup style={{ color: "#E5453B", marginLeft: "1px" }}>*</sup>;
	}
	return null;
}
