import React, { Component } from "react";
import RPC from "../../Services/Clients/RPC";
import { setUserOnline } from "../../Services/StorageService";
const offlineBannerStyle = {
	backgroundColor: "#FEEFB3",
	color: "#696969",
	padding: 10,
	border: 1,
	marginBottom: 2,
};

const retryNowStyle = {
	color: "black",
	textDecoration: "underline",
};

const closeBannerStyle = {
	color: "#696969",
	fontWeight: "bold",
	fontSize: "14px",
	float: "right",
	padding: "5px",
	transform: "scaleY(1)",
	pointer: "cursor",
	paddingTop: 3,
	paddingBottom: 3,
	paddingRight: 15,
	align: "center",
	backgroundColor: "#CCC",
	textShadow: "2px",
};

class offlineBanner extends Component {
	constructor(props) {
		super(props);
		this.checkConnection = this.checkConnection.bind(this);
		this.countdown = this.countdown.bind(this);
		this.tick = this.tick.bind(this);
		this.resetCounter = this.resetCounter.bind(this);
		this.handleCloseBanner = this.handleCloseBanner.bind(this);
	}

	componentDidMount() {
		window.addEventListener("offline", (event) => {
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

		window.addEventListener("online", (event) => {
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
	}

	componentWillUnmount() {
		clearInterval(window.interval);
	}

	checkConnection() {
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
	}

	resetCounter(visibility, counter) {
		clearInterval(window.interval);
		this.props
			.setBannerVisibility(visibility)
			.then(() => {
				return this.props.setCounter(counter);
			})
			.then(() => {
				this.countdown();
			});
	}

	tick() {
		if (this.props.counter === 0) {
			this.checkConnection();
		}
		this.props.setCounter(this.props.counter - 1);
	}

	countdown() {
		window.interval = setInterval(this.tick, 1000);
	}

	handleCloseBanner() {
		this.resetCounter(false, 5);
	}

	render() {
		let { visibility, counter } = this.props;
		console.log("[offlineBanner/index.js] this.props = ", this.props);
		return visibility ? (
			<div style={offlineBannerStyle}>
				You are offline. Some functionalities are not available.
				{/* Try connecting again in {counter} seconds.{" "} */}
				{/* <a style={retryNowStyle} onClick={this.checkConnection}>
					{" "}
					Try Now{" "}
				</a>
				<a style={closeBannerStyle} onClick={this.handleCloseBanner}>
					X
				</a> */}
			</div>
		) : null;
	}
}

export default offlineBanner;
