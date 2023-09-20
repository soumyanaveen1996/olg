import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import _ from "lodash";
import PingServiceClient from "../../Services/Clients/PingServiceClient";
import QueueServiceClient from "../../Services/Clients/QueueServiceClient";
import Config from "../../Utils/Config";

import { styled } from "@mui/material/styles";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Chip,
} from "@mui/material";

const short = require("short-uuid");

const GridMainContainer = styled("div")(() => ({
	width: "100% !important",
	height: "auto",
	overflow: "scroll",
}));

const PaperContainer = styled(Paper)(({ theme }) => ({
	margin: theme.spacing(2),
}));

const TableMainConatiner = styled(TableContainer)(({ theme }) => ({
	margin: theme.spacing(2),
}));

const MainTable = styled(Table)(() => ({
	minWidth: 650,
}));

const ButtonContainer = styled(Button)(({ theme }) => ({
	borderRadius: "20px",
	border: "none",
	padding: "8px 20px",
	marginRight: theme.spacing(2),
	backgroundColor: "#638dff",
	color: "#FFFFFF",
	fontFamily: "SF Pro Text Bold",
	fontSize: 12,
	boxShadow: "none",
	"&:hover": {
		backgroundColor: "#4c71d6",
	},
	"&:focus": {
		boxShadow: "0 0 6px 0 #638dff !important",
	},
	"&:disabled": {
		backgroundColor: "#aeb8d6",
		color: "#e8ecf8",
	},
}));

const TableRowContainer = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(even)": {
		backgroundColor: theme.palette.action.hover,
	},
}));

const PingStatusPage = () => {
	const [toggleTest1, setToggleTest1] = useState(false);
	const [toggleTest2, setToggleTest2] = useState(false);
	const [isCookieAccepted, setIsCookieAccepted] = useState(null)
	let url = "./json/" + Config.pingServerDataFile;
	const [, setServerData1] = useState(null);
	const serverData = useRef(null);
	const udpTestUrl = useRef(null);
	const loopbackIframe1 = useRef(null);
	const loopbackIframe2 = useRef(null);

	function setUpData(data) {
		loopbackIframe1.current = data.loopbackIframe1;
		loopbackIframe2.current = data.loopbackIframe2;
		console.log("loaded json: ", loopbackIframe1.current);
		let formattedServerData = {};
		data &&
			data.servers.forEach((server, i) => {
				server.urls.forEach((url, j) => {
					url.protocols.forEach((protocol, k) => {
						protocol.ports.forEach((port) => {
							formattedServerData[short.generate()] = {
								serverLocation: server.location,
								urlAddress: url.address,
								urlDescription: url.description,
								protocolName: protocol.name,
								protocolTestPath: protocol.testPath,
								port,
								status: null,
							};
						});
					});
				});
			});

		serverData.current = formattedServerData;
		setServerData1(_.cloneDeep(serverData.current));
		udpTestUrl.current = data.udpTestUrl;
	}

	useEffect(() => {
		fetch(url, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setUpData(myJson);
			});

	}, []);

	useEffect(() => {
	}, [JSON.stringify(serverData.current)]);

	const testServices = (k, v) => {
		try {
			serverData.current[k] = {
				...v,
				status: "Pending",
			};
			setServerData1(_.cloneDeep(serverData.current));
			switch (v.protocolName) {
				case "GRPC":
					PingServiceClient.fetchUserDetails({
						host_url: `https://${v.urlAddress}:${v.port}${v.protocolTestPath || ""
							}`,
					})
						.then((res) => {
							serverData.current[k] = {
								...v,
								status: "Success",
							};
							setServerData1(_.cloneDeep(serverData.current));
						})
						.catch((err) => {
							serverData.current[k] = {
								...v,
								status: "Failed",
							};
							setServerData1(_.cloneDeep(serverData.current));
						});
					break;
				case "TCP":
					axios
						.get(`https://${v.urlAddress}:${v.port}${v.protocolTestPath || ""}`)
						.then((res) => {
							serverData.current[k] = {
								...v,
								status: "Success",
							};
							setServerData1(_.cloneDeep(serverData.current));
						})
						.catch((err) => {
							serverData.current[k] = {
								...v,
								status: "Failed",
							};
							setServerData1(_.cloneDeep(serverData.current));
						});
					break;
				case "UDP":
					//UDP is tested by a separate server, it can't be tested via browser
					axios
						.get(`https://${udpTestUrl.current + v.urlAddress}`)
						.then((res) => {
							serverData.current[k] = {
								...v,
								status: "Success",
							};
							setServerData1(_.cloneDeep(serverData.current));
						})
						.catch((err) => {
							serverData.current[k] = {
								...v,
								status: "Failed",
							};
							setServerData1(_.cloneDeep(serverData.current));
						});
					break;

				default:
					break;
			}
		} catch (error) {
			serverData.current[k] = {
				...v,
				status: "Failed",
			};
			setServerData1(_.cloneDeep(serverData.current));
		}
	};

	const testThirdPartyCookiesEnabled = () => {
		let testSocket = QueueServiceClient.setupQueueMessageStream(
		);
		testSocket.connect();
		setTimeout(() => {
			let isCookieAcc = localStorage.getItem("thirdPartyEnabled")
			if (isCookieAcc === "false") {
				setIsCookieAccepted("Failed")
			} else {
				setIsCookieAccepted("Success")
			}
			testSocket = null;
		}, 1000);
	}

	const runAllTest = () => {
		Object.entries(serverData.current).forEach(([k, v]) => {
			testServices(k, v);
		});
		testThirdPartyCookiesEnabled();
	};

	const toggleLoopbackTest = (val) => {
		if (val === 1) {
			setToggleTest1((prevVal) => {
				return !prevVal;
			});
			setToggleTest2(false);
		} else {
			setToggleTest2((prevVal) => {
				return !prevVal;
			});
			setToggleTest1(false);
		}
	};

	const status = (type) => {
		switch (type) {
			case "Success":
				return <Chip size="small" label="Success" color="primary" />;
			case "Failed":
				return <Chip size="small" label="Failed" color="secondary" />;
			case "Pending":
				return <Chip size="small" label="Pending" />;
			default:
				return null;
		}
	};

	if (serverData.current === null || loopbackIframe2.current === null) {
		return null;
	}

	const passTheRow = (urlAddress, portAddress) => {
		if (urlAddress === "frontm.ai" && portAddress == "443") {
			return false;
		}
		if (urlAddress == "grpcprod.frontm.ai") {
			return false;
		}
		if (urlAddress == "gw.frontm.ai") {
			return false;
		}
		return true;
	};

	const changeUrlAddressToLabel = (urlAddress, portAddress) => {
		if (urlAddress == "frontm.ai" && portAddress == "443") {
			return "Graphics";
		} else if (portAddress == "9000" && urlAddress == "frontm.ai") {
			return "Voip Calling";
		} else if (urlAddress == "onship.app") {
			return `Home Page`;
		} else if (urlAddress == "gw.frontm.ai") {
			return "Data";
		} else if (portAddress == "443" && urlAddress == "loft.frontm.ai") {
			return "Conference Calling Server 1";
		} else if (portAddress == "10000" && urlAddress == "loft.frontm.ai") {
			return "Media Server 1";
		} else if (portAddress == "443" && urlAddress == "telemed.frontm.ai") {
			return "Conference Calling Server 2";
		} else if (portAddress == "10000" && urlAddress == "telemed.frontm.ai") {
			return "Media Server 2";
		} else if (
			urlAddress == "pstn-prod.frontm.ai" ||
			urlAddress == "pstn-dev.frontm.ai"
		) {
			return "International Calling";
		}
	};

	let cookieStatus = () => {
		if (!isCookieAccepted) {
			return null;
		}
		if (isCookieAccepted == "Success") {
			return status("Success")
		} else {
			return status("Failed")
		}
	}

	return (
		<GridMainContainer>
			<PaperContainer elevation={0}>
				<ButtonContainer
					onClick={runAllTest}
					variant="contained"
					color="primary"
				>
					Verify Permissions
				</ButtonContainer>

				<TableMainConatiner component={Paper}>
					<MainTable size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell>Status</TableCell>
								{/* <TableCell>Server Location</TableCell> */}
								<TableCell>Service</TableCell>
								<TableCell>Port</TableCell>

								{/* <TableCell>URL Description</TableCell> */}
								<TableCell>Protocol</TableCell>
								{/* <TableCell>TestPath</TableCell> */}
								{/* <TableCell>Port</TableCell> */}
							</TableRow>
						</TableHead>
						<TableBody>
							{Object.entries(serverData.current).map(([k, v]) => {
								if (passTheRow(v.urlAddress, v.port)) {
									return (
										<TableRowContainer key={k}>
											<TableCell>{status(v.status)}</TableCell>
											{/* <TableCell>{v.serverLocation}</TableCell> */}
											<TableCell>
												{changeUrlAddressToLabel(v.urlAddress, v.port)}
											</TableCell>
											<TableCell>
												<Button
													onClick={() => testServices(k, v)}
													variant="outlined"
													color="primary"
													size="small"
												>
													PORT {v.port}
												</Button>
											</TableCell>
											{/* <TableCell>{v.urlDescription}</TableCell> */}
											<TableCell>{v.protocolName}</TableCell>
											{/* <TableCell>{v.protocolTestPath}</TableCell> */}
											{/* <TableCell>{v.port}</TableCell> */}
										</TableRowContainer>
									);
								}
							})}
							<TableCell >
								{cookieStatus()}
							</TableCell>
							<TableCell>
								Allow all cookies
							</TableCell>
						</TableBody>
					</MainTable>
				</TableMainConatiner>
				<br />
				<ButtonContainer
					onClick={() => toggleLoopbackTest(1)}
					variant="contained"
					color="primary"
				>
					{/* {toggleTest1
						? "Stop " + loopbackIframe1.current.title + " audio and video test"
						: "Start " +
						  loopbackIframe1.current.title +
						  " audio and video test"} */}
					Verify Media Service 1
				</ButtonContainer>

				<ButtonContainer
					onClick={() => toggleLoopbackTest(2)}
					variant="contained"
					color="primary"
				>
					{/* {toggleTest2
						? "Stop " + loopbackIframe2.current.title + " audio and video test"
						: "Start " +
						  loopbackIframe2.current.title +
						  " audio and video test"} */}
					Verify Media Service 2
				</ButtonContainer>
				<div id="loopback_container">
					{toggleTest1 && (
						<iframe
							src={loopbackIframe1.current.url}
							width="100%"
							height={1000}
							allow="camera;microphone"
						/>
					)}
					{toggleTest2 && (
						<iframe
							src={loopbackIframe2.current.url}
							width="100%"
							height={1000}
							allow="camera;microphone"
						/>
					)}
				</div>
			</PaperContainer>
		</GridMainContainer>
	);
};

export default PingStatusPage;
