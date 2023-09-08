import React, { Component } from "react";
import Spinner from "react-spinkit";
import "./Spinner.css";
export const NoStateSpinner = ({ show }) => {
	return (
		<div style={{ margin: "20px auto", zIndex: 9999 }}>
			{" "}
			<Spinner name="line-scale" color="blue" />{" "}
		</div>
	);
};
