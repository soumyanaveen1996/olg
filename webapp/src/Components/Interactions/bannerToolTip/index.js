import React, { Component } from "react";
import {
	BANNER_TYPE_INFO,
	BANNER_TYPE_ERROR,
	BANNER_TYPE_SUCCESS,
} from "../../../Utils/Constants";

const infoBannerStyle = {
	backgroundColor: "#FEC901",
	color: "#fff",
	padding: 10,
	border: 1,
	marginBottom: 2,
};

const successBannerStyle = {
	backgroundColor: "#2FC76F",
	color: "#fff",
	padding: 10,
	border: 1,
	marginBottom: 2,
};

const errorBannerStyle = {
	backgroundColor: "#E5453B",
	color: "#fff",
	padding: 10,
	border: 1,
	marginBottom: 2,
};

const retryNowStyle = {
	color: "black",
	textDecoration: "underline",
};

const closeBannerStyle = {
	color: "rgb(255, 255, 255)",
	fontWeight: "400",
	fontSize: "14px",
	float: "right",
	display: "flex",
	width: "25px",
	borderRadius: "50%",
	height: "25px",
	justifyContent: "center",
	alignItems: "center",
	border: "1px solid rgb(255, 255, 255)",
};

class BannerToolTip extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	UNSAFE_componentWillReceiveProps(newProps) {
		if (newProps.location.pathname !== this.props.location.pathname) {
			this.handleCloseBanner();
		}
	}

	handleCloseBanner = () => {
		this.props.closeBanner();
	};

	render() {
		let { bannerType, message } = this.props.bannerDetails || "";
		if (bannerType === BANNER_TYPE_INFO) {
			return (
				<div style={infoBannerStyle}>
					<span style={{ color: "#fff" }}>{message}</span>
					<a style={closeBannerStyle} onClick={this.handleCloseBanner}>
						X
					</a>
				</div>
			);
		} else if (bannerType === BANNER_TYPE_ERROR) {
			return (
				<div style={errorBannerStyle}>
					<span style={{ color: "#fff" }}>{message}</span>
					<a style={closeBannerStyle} onClick={this.handleCloseBanner}>
						x
					</a>
				</div>
			);
		} else if (bannerType === BANNER_TYPE_SUCCESS) {
			return (
				<div style={successBannerStyle}>
					<span style={{ color: "#fff" }}>{message}</span>
					<a style={closeBannerStyle} onClick={this.handleCloseBanner}>
						X
					</a>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default BannerToolTip;
