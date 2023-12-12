import React, { Component } from "react";
import RPC from "../../Services/Clients/RPC";
import OfflineBanner from "./OfflineBanner";
import {
	hideAppNotificationModal,
	removeAppNotification,
} from "../../State/actions/appNotifications";
import { connect } from "react-redux";
import { setUserOnline } from "../../Services/StorageService";
import SlowNetworkBanner from "./SlowNetworkBanner";

const BannerStyle = {
	BannerBackgroundStyle: {
		padding: "2px 10px 2px 55px",
		fontWeight: 700,
	},

	retryNowStyle: {
		textDecoration: "underline",
		fontWeight: 500,
	},

	closeBannerStyle: {
		fontWeight: "400",
		fontSize: "14px",
		float: "right",
		display: "flex",
		width: "25px",
		borderRadius: "50%",
		height: "25px",
		justifyContent: "center",
		alignItems: "center",
	},
};
class Banner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slowInternet: false,
		};
	}

	changeNetworkHandler = (e) => {
		if (e.target.downlink <= 0.15 && e.target.downlink > 0) {
			this.setState({ slowInternet: true });
		} else if (e.target.downlink > 0.15 && this.state.slowInternet) {
			this.setState({ slowInternet: false });
		}
	};

	componentDidMount() {
		window.addEventListener("offline", () => {
			var isOnline =
				typeof (navigator || {}).onLine == "undefined"
					? false
					: (navigator || {}).onLine
					? true
					: false;

			if (!isOnline) {
				this.resetCounter(true, 5);
			}
		});

		window.addEventListener("online", () => {
			var isOnline =
				typeof (navigator || {}).onLine == "undefined"
					? true
					: (navigator || {}).onLine
					? true
					: false;

			if (isOnline) {
				if (this.props.latestAPIRequest) {
					let {
						url,
						request,
						responseType,
						requestSerializeFn,
						responseDeserializeFn,
						options = {},
						noSpinner,
					} = this.props.latestAPIRequest;
					console.log("Back Online--> Reset Stream");
					window.dispatchEvent(new Event("stream_closed"));
					this.props.latestAPIRequest &&
						RPC.rpcCall(
							url,
							request,
							responseType,
							requestSerializeFn,
							responseDeserializeFn,
							options,
							noSpinner
						);
				}

				clearInterval(window.interval);
				this.props
					.setBannerVisibility(false)
					.then(() => {
						this.props.setCounter(5);
					})
					.then(() => {
						clearInterval(window.interval);
					});
			}
		});

		if (
			navigator.connection &&
			navigator.connection.downlink <= 0.15 &&
			navigator.connection.downlink > 0
		) {
			this.setState({ slowInternet: true });
		}
		// Register for event changes:
		if (navigator.connection) {
			navigator.connection.onchange = this.changeNetworkHandler;
		}
	}

	componentWillUnmount() {
		clearInterval(window.interval);
	}

	checkConnection = () => {
		if (window.navigator.onLine) {
			if (this.props.latestAPIRequest) {
				let {
					url,
					request,
					responseType,
					requestSerializeFn,
					responseDeserializeFn,
					options = {},
					noSpinner,
				} = this.props.latestAPIRequest;
				this.props.latestAPIRequest &&
					RPC.rpcCall(
						url,
						request,
						responseType,
						requestSerializeFn,
						responseDeserializeFn,
						options,
						noSpinner
					);
			}

			clearInterval(window.interval);
			this.props.setBannerVisibility(false);
			setUserOnline(true);
		} else {
			this.resetCounter(true, 5);
			setUserOnline(false);
		}
	};

	resetCounter = (visibility, counter) => {
		clearInterval(window.interval);
		this.props
			.setBannerVisibility(visibility)
			.then(() => {
				return this.props.setCounter(counter);
			})
			.then(() => {
				this.countdown();
			});
	};

	tick = () => {
		if (this.props.counter === 0) {
			this.checkConnection();
		}
		this.props.setCounter(this.props.counter - 1);
	};

	countdown = () => {
		window.interval = setInterval(this.tick, 1000);
	};

	handleCloseBanner = () => {
		clearTimeout(window.interval);
		this.resetCounter(false, 5);
	};

	closeSlowInternetBanner = () => {
		this.props.setBannerVisibility(true);
		this.setState({ slowInternet: false });
	};

	render() {
		let { visibility } = this.props;
		const { slowInternet } = this.state;
		// if (visibility) {
		// 	let trash_btns = document.getElementsByClassName("mapbox-gl-draw_trash");
		// 	let polygon_btns = document.getElementsByClassName(
		// 		"mapbox-gl-draw_polygon"
		// 	);
		// 	if (trash_btns.length) {
		// 		trash_btns[0].setAttribute("disabled", "");
		// 	}
		// 	if (polygon_btns.length) {
		// 		polygon_btns[0].setAttribute("disabled", "");
		// 	}
		// 	return <OfflineBanner BannerStyle={BannerStyle} />;
		// }
		var trash_btns = document.getElementsByClassName("mapbox-gl-draw_trash");
		let polygon_btns = document.getElementsByClassName(
			"mapbox-gl-draw_polygon"
		);
		if (trash_btns.length) {
			trash_btns[0].removeAttribute("disabled");
		}
		if (polygon_btns.length) {
			polygon_btns[0].removeAttribute("disabled");
		}
		if (!visibility && slowInternet) {
			return (
				<SlowNetworkBanner
					BannerStyle={BannerStyle}
					closeSlowInternetBanner={this.closeSlowInternetBanner}
				/>
			);
		}
		return null;
	}
}

const mapActionsToProps = {
	removeAppNotification,
	hideAppNotificationModal,
};

const mapDataToProps = (state) => {
	return {
		show: state.appNotification.show,
		notifications: state.appNotification.notifications,
		notificationTypes: state.appNotification.notificationTypes,
	};
};

export default connect(mapDataToProps, mapActionsToProps)(Banner);
