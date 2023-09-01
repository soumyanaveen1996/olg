import React, { PureComponent } from "react";
import { SmallCircleButton } from "../Common/SmallCircleButton";
import NumberPad from "./NumberPad";
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class DiallingScreen extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			digits: "",
			timeToConnect: 0,
			timerId: null,
			isConnecting: false,
		};
	}

	componentDidMount() {
		//console.log("Mounted Dialler", this.state.isConnecting);
		if (this.state.isConnecting === true) {
			const timerId = setInterval(() => {
				console.log("TIme To Connect", this.state.timeToConnect);
				if (this.state.timeToConnect === 45) {
					this.setState({ isConnecting: false });
					clearInterval(this.state.timerId);
					return;
				}
				this.setState({
					timeToConnect: this.state.timeToConnect + 1,
					isConnecting: true,
				});
			}, 1000);

			this.setState({ timerId });
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.timerId);
	}

	showNumPad = () => {
		this.setState({ showNumPad: true });
	};

	hideNumPad = () => {
		this.setState({ showNumPad: false });
	};

	sendNumber = (digit) => {
		this.setState({ digits: this.state.digits + "" + digit });
		this.props.sendNumber(digit);
	};

	render() {
		let {
			disconnectCall,
			phoneNumber,
			onCall,
			toggleMute,
			muted,
			isSatellite,
		} = this.props;
		let { digits, showNumPad, timeToConnect, isConnecting } = this.state;
		const percentage = Math.round((timeToConnect / 45) * 100);
		return (
			<div
				className="p-3"
				style={{
					backgroundImage: "linear-gradient(#51555a,#272e35)",
					minHeight: "575px",
					height: "auto",
					borderRadius: "0.3rem",
					overflow: "hidden",
				}}
			>
				<div className="d-flex justify-content-between">
					<div />
					{!onCall && (
						<SmallCircleButton
							backgroundColor="#2A2D3C"
							color="#fff"
							iconClass="icon-cross"
							onClick={this.props.onClose}
						/>
					)}
				</div>

				<div className="mt-2 text-center">
					<div style={{ fontSize: "30px", fontWeight: "bold", color: "#fff" }}>
						{phoneNumber}
					</div>
					{!onCall && (
						<div
							style={{ color: "#2FC76F", fontSize: "18px", fontWeight: "bold" }}
						>
							Calling...
						</div>
					)}

					{onCall && (
						<div
							style={{ color: "#2FC76F", fontSize: "18px", fontWeight: "bold" }}
						>
							{isSatellite && isConnecting ? "Connecting..." : "Connected"}
						</div>
					)}
				</div>

				<div
					className="d-flex justify-content-center align-items-center"
					style={{ marginTop: "20px" }}
				>
					{isSatellite ? (
						<CircularProgressbarWithChildren
							value={percentage}
							strokeWidth={1}
							styles={buildStyles({
								pathTransitionDuration: 0.4,
								pathColor: "#2FC76F",
								trailColor: "rgb(44, 49, 54)",
							})}
						>
							<img src="/img/calling-emptyavatar.png" />
						</CircularProgressbarWithChildren>
					) : (
						<img src="/img/calling-emptyavatar.png" />
					)}
				</div>

				{onCall && (
					<div className="mt-2 pt-2 d-flex justify-content-center">
						<SmallCircleButton
							backgroundColor="#2A2D3C"
							color="#fff"
							iconClass={muted ? "icon-mic-mute" : "icon-mic"}
							onClick={toggleMute}
							className="mx-2"
							border="0.92px solid #FFFFFF"
							size={60}
						/>
						<SmallCircleButton
							backgroundColor="#2A2D3C"
							color="#fff"
							iconFile={
								this.state.showNumPad ? null : "/img/tab-dialpad-icon@2x.png"
							}
							iconClass={this.state.showNumPad ? "icon-cross" : null}
							onClick={
								this.state.showNumPad ? this.hideNumPad : this.showNumPad
							}
							className="mx-2"
							border="0.92px solid #FFFFFF"
							size={60}
						/>
						{/*<SmallCircleButton*/}
						{/*backgroundColor="#2A2D3C"*/}
						{/*color="#fff"*/}
						{/*iconClass="icon-volume-high"*/}
						{/*onClick={this.props.onClick}*/}
						{/*className="mx-2"*/}
						{/*border="0.92px solid #FFFFFF"*/}
						{/*size={60}*/}
						{/*/>*/}
					</div>
				)}

				{showNumPad && (
					<div className="pad">
						{digits && (
							<div
								className="mt-2 px-4 d-flex justify-content-center fs-2x"
								style={{ color: "#fff" }}
							>
								{digits}
							</div>
						)}
						<NumberPad onClick={this.sendNumber} color="#fff" />
					</div>
				)}

				<div className="d-flex justify-content-center align-items-center mt-4">
					<a
						className="d-flex justify-content-center align-items-center btn btn-danger btn-icon-o btn-sm mx-1 btn-rounded mb-2"
						style={{ height: "60px", width: "60px" }}
						onClick={disconnectCall}
					>
						{/*<img src="/img/call-endcall-btn.png" />*/}
						<img src="/img/call-endcall-btn@2x.png" width="60" />
					</a>
				</div>
			</div>
		);
	}
}

export default DiallingScreen;
