import React from "react";
import Spinner from "react-spinkit";
import "./Spinner.css";
import { connect } from "react-redux";
import AirplaneLoader from "./AirplaneLoader";

const SpinnerFM = (props) => {
	if (!props.show) {
		return null;
	}
	if (window.location.href.includes("airindia")) {
		return <AirplaneLoader />;
	}
	return (
		<div
			style={{
				position: "fixed",
				width: "100%",
				height: "100%",
				zIndex: 9999,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Spinner name="ball-clip-rotate-multiple" color="#638DFF" />
		</div>
	);
};

const mapActionToProps = {};

const mapDataToProps = (state) => {
	return {
		show: state.spinner.loading,
	};
};

export default connect(mapDataToProps, mapActionToProps)(SpinnerFM);
