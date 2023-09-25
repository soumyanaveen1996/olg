import React, { Component } from "react";
import { Label } from "reactstrap";
const divStyle = {
	display: "flex",
	height: "100%",
	width: "100%",
	zIndex: 9999,
	backgroundColor: "rgb(244, 244, 244)",
};

export default class Error404 extends Component {
	render() {
		return (
			<div style={divStyle}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						margin: "auto auto 35vh auto",
					}}
				>
					<img
						src="/offlinelms/img/error-illustration@3x.png"
						alt={"Error page"}
						style={{ width: "30vw", height: "auto" }}
					/>
					<Label
						className="font-weight-bold"
						style={{ fontSize: "xx-large", color: "#638dff", marginTop: "2vh" }}
					>
						404
					</Label>
					<div style={{ fontSize: "large", color: "#6c757d" }}>
						The page you requested could not be found
					</div>
				</div>
			</div>
		);
	}
}
