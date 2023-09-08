import React, { Component, Fragment } from "react";
import {
	FormControl,
	FormLabel,
	Radio,
	FormControlLabel,
	RadioGroup,
	useRadioGroup,
	Card, OutlinedInput, MenuItem, Box, InputLabel, InputAdornment, CircularProgress, Typography, TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ModalPopup from "../ModalMessages/ModalPopup";
import { Label } from "reactstrap";
import { Search } from "@mui/icons-material";
import { toast } from "react-toastify";
import UserServiceClient from "../../Services/Clients/UserServiceClient";
import Mandatory from "../../v2/Components/Common/FMForm/Mandatory";
import { FormControlSingle, StyledAutocomplete, StyledSelect, StyledTextField, styles } from "./styles";

const StyledFormControlLabel = styled((props) => (
	<FormControlLabel {...props} />
))(({ theme, checked }) => ({
	".MuiFormControlLabel-label": checked && {
		color: "#638dff",
	},
}));
function CustomFormControlLabel(props) {
	const radioGroup = useRadioGroup();

	let checked = false;

	if (radioGroup) {
		checked = radioGroup.value === props.value;
	}

	return <StyledFormControlLabel checked={checked} {...props} />;
}

class AddRole extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disableCancel: true,
			role: "",
			rank: "",
			isDirty: false,
			statusOfSeaFearer: "shore",
			rankList: [],
			sailingStatus: true,
			shipName: "",
			shipIMO: "",
			dataLoaded: true,
			imoDataLoaded: true,
			shipList: [],
			imoError: false,
			shipNameError: false,
			isShipNameOpen: false,
			defaultShipOption: "",
			rolesObject: {}
		};
		this.searchTimer = null;
	}


	componentDidMount() {
		this.setConfig()
	}

	setConfig = async () => {
		let res = await UserServiceClient.getLevel3Ranks()
		if (res) {
			let rolesObject = res;
			let { rankLevel3, rankLevel2, rankLevel1, shipName, shipIMO, sailingStatus } = this.props.userData;
			let statusOfSeaFearer = rankLevel1 ? rankLevel1 : "shore", shipList = [];

			if (rankLevel2 && rankLevel3) {
				const rankList = rolesObject[statusOfSeaFearer].filter((x) => x.info === rankLevel2)[0].level2
				this.setState({
					statusOfSeaFearer,
					role: rankLevel2,
					rankList,
					rank: rankLevel3,
					rolesObject
				})

			}
			if (sailingStatus == false) {
				shipName, shipIMO = ["", ""]
			}

			if (!shipIMO || !shipName) {
				sailingStatus = false
			}

			if (shipName) {
				shipList = [{ label: shipName, shipName, IMO: shipIMO }]
			}
			this.setState({ shipName, shipIMO, sailingStatus, shipList, rolesObject })
		}
	}

	componentWillUnmount() {
		clearInterval(this.loadPreState);
	}

	fetchRanks = async () => {

	}

	saveProfile = (e) => {
		let { role, rank, shipName, shipIMO, sailingStatus, statusOfSeaFearer } = this.state;
		if (role == "" || rank == "") {
			return toast["warn"]("Please select a role.", { position: toast.POSITION.TOP_CENTER, });
		}
		if (sailingStatus == true && (!shipName || !shipIMO)) {
			return toast["warn"]("Please add Vessel details.", { position: toast.POSITION.TOP_CENTER, });
		}

		let data = {
			rankLevel1: statusOfSeaFearer,
			rankLevel2: role,
			rankLevel3: rank,
			role,
			rank,
			sailingStatus,
		};
		if (sailingStatus) {
			data = { ...data, shipName, shipIMO }

		}
		this.setState({ disableCancel: true, isDirty: false });
		this.props.save(e, data);
	};

	radioHandler = (statusOfSeaFearer) => {
		//Initialising state when radio changes
		this.setState({ statusOfSeaFearer }, () => {
			this.setState({ role: "", rank: "", rankList: [] })
		});
	};

	cancel = () => {
		// this.setState({ disableCancel: true });
		this.closeConfirmCancel();
	};

	closeConfirmCancel = () => {
		this.setState({ confirmCancel: false });
	};

	handleRoleChange = (data) => {
		// When role is changed, Rank dropdown is initialised
		const rankList = this.state.rolesObject[this.state.statusOfSeaFearer].filter(x => x.info === data)[0].level2
		this.setState({
			role: data,
			rankList,
			rank: ""
		})
	}

	handleRankChange = (e) => {
		this.setState({ rank: e.target.value })
	}

	handleIsSailing = (sailingStatus) => {
		this.setState({
			sailingStatus,
			shipIMO: (sailingStatus == false ? "" : this.props.userData.shipIMO),
			shipName: (sailingStatus == false ? "" : this.props.userData.shipName)
		})
	}

	getShipDetails = async (searchKey, field) => {
		if (field === "shipName" && searchKey.length < 8) {
			this.setState({ dataLoaded: true, shipNameError: true })
			return toast["error"]("Please enter at least eight characters to search for a vessel by name or search it using the IMO number", { position: toast.POSITION.TOP_CENTER })
		}
		let payload = { [field]: searchKey }
		const res = await UserServiceClient.getShipDetails(payload)
		if (res) {
			if (field === "shipName") {
				this.setState({ dataLoaded: true, shipList: res.ships.map((x) => ({ ...x, label: x.shipName })) })

			} else {
				this.setState({ imoError: (res.ships.length == 0), imoDataLoaded: true })
			}
		}
	}
	handleShipNameSearch = (e) => {
		clearTimeout(this.searchTimer);
		if (e.target.value != "") {
			this.searchTimer = setTimeout(() => {
				this.getShipDetails(e.target.value, e.target.name)
			}, 1000)
			if (e.target.name == "shipName") {
				this.setState({
					shipName: e.target.value,
					searchKey: e.target.value,
					dataLoaded: false,
					shipNameError: false
				})
			} else {
				this.setState({
					shipIMO: e.target.value,
					imoDataLoaded: false,
					imoError: false,
				})
			}
		} else {
			this.setState({
				[e.target.name]: e.target.value, imoError: false, shipNameError: false, dataLoaded: true
			})
		}



	}

	handleShipSelect = ({ shipName, IMO }) => {
		let { imoError, imoDataLoaded, shipNameError } = this.state;
		let data = {
			searchKey: "",
			shipName,
			shipIMO: IMO,
		}
		if (imoError) data.imoError = false;
		if (shipNameError) data.shipNameError = false;
		if (!imoDataLoaded) clearTimeout(this.searchTimer); data.imoDataLoaded = true;
		this.setState(data, () => {
			clearTimeout(this.searchTimer);
		})
	}

	setOpen = (data) => {
		this.setState({ isShipNameOpen: data })
	}

	render() {
		const { addNotification } = this.props;
		const { statusOfSeaFearer, rolesObject, role, rank, sailingStatus, rankList, shipIMO, searchKey, shipName, shipNameError, shipList, dataLoaded, imoDataLoaded, imoError, isShipNameOpen } = this.state;
		return (
			<>
				<div
					className="Catalog-sidebarRole d-flex align-items-center sidebar-sm"
					id="sidebar-collapse"
					style={Object.assign({}, this.props.style, {
						overflowY: "auto",
						// height: `calc(70vh - 70px ${
						// 	addNotification.show ? "- 130px" : null
						// })`,
					})}
				>
					{this.state.confirmCancel && (
						<ModalPopup size="sm" noHeader>
							<div className="py-1">
								<div style={{ textAlign: "center" }}>
									<p className="fs17" style={{ color: "#4f5b7d" }}>
										Your changes are not saved. Do you still want to leave?
									</p>
								</div>
								<div>
									<div
										className="py-2 d-flex justify-content-center align-items-center mt-3"
										onClose={this.closeConfirmCancel}
										style={{ width: "60%", paddingLeft: "40%" }}
									>
										<button
											type="button"
											className="btn btn-lg btn-cancel m-1"
											onClick={this.closeConfirmCancel}
											style={{ ...styles.styleObj2, backgroundColor: "rgba(99, 141, 255, 0.1)" }}
										>
											No
										</button>
										<button
											type="button"
											className="btn btn-lg btn-open m-1"
											onClick={this.props.roleHide}
											style={styles.styleObj2}
										>
											Yes
										</button>
									</div>
								</div>
							</div>
						</ModalPopup>
					)}
					<div style={{ flexDirection: "column", display: "inline-block" }}>
						<FormControl>

							<Label id="radio-buttons-group-label" className="rolelabel">
								Are you a seafarer?
							</Label>

							<RadioGroup
								aria-labelledby="radio-buttons-group-label"
								value={this.state.role}
								name="radio-buttons-group"
								style={{ display: "block", padding: "1em", columns: "190px 2" }}
							>
								<div
									style={styles.styleObj1}
								>
									<CustomFormControlLabel
										style={{ display: "flex" }}
										value="Yes"
										control={<Radio style={{ color: "#638dff" }} />}
										label="yes"
										checked={statusOfSeaFearer === "ship"}
										onClick={(e) => this.radioHandler("ship")}
									/>
								</div>
								<div
									style={styles.styleObj1}
								>
									<CustomFormControlLabel
										style={{ display: "flex" }}
										value="No"
										control={<Radio style={{ color: "#638dff" }} />}
										label="no"
										checked={statusOfSeaFearer === "shore"}
										onClick={(e) => this.radioHandler("shore")}
									/>
								</div>
							</RadioGroup>

							<Label id="select-role-label" className="rolelabel">
								What is your role?
							</Label>



							{rolesObject && (<Box sx={{ px: "15px", display: "flex", flexDirection: "column" }} >
								<FormControlSingle sx={{ mb: "15px" }}>
									<InputLabel id="role-type">Type</InputLabel>
									<StyledSelect
										labelId="role-type"
										id="select-role"
										single
										value={role}
										onChange={(e) => this.handleRoleChange(e.target.value)}
										input={<OutlinedInput label="Type" />}
										variant="outlined"
										MenuProps={styles.selectMenuProps}
									>
										{/* {Object.keys(rolesObject[statusOfSeaFearer]).map((name, i) => (<MenuItem key={i} value={name} > {name} </MenuItem>))} */}
										{rolesObject[statusOfSeaFearer] && rolesObject[statusOfSeaFearer].map((name, i) => (<MenuItem key={i} value={name.info} > {name.info} </MenuItem>))}
									</StyledSelect>
								</FormControlSingle>
								<FormControlSingle sx={{ mb: "25px" }}>
									<InputLabel id="rank-type">Rank</InputLabel>
									<StyledSelect
										labelId="rank-type"
										id="select-rank"
										single
										disabled={role === ""}
										value={rank}
										onChange={this.handleRankChange}
										input={<OutlinedInput label="Rank" />}
										variant="outlined"
										MenuProps={styles.selectMenuProps}
									>
										{rankList?.map((name) => (<MenuItem key={name.info} value={name.info} > {name.info} </MenuItem>))}
									</StyledSelect>
								</FormControlSingle>
							</Box>)}


							<FormControl>
								<Label id="sailing-label" className="rolelabel">
									Are you sailing?
								</Label>
								<RadioGroup
									aria-labelledby="radio-buttons-group-label"
									name="radio-buttons-group"
									style={{ display: "block", padding: "1em", columns: "190px 2" }}
								>
									<div
										style={styles.styleObj1}
									>
										<CustomFormControlLabel
											style={{ display: "flex" }}
											value="Yes"
											control={<Radio style={{ color: "#638dff" }} />}
											label="yes"
											checked={sailingStatus == true}
											onClick={(e) => this.handleIsSailing(true)}
										/>
									</div>
									<div
										style={styles.styleObj1}
									>
										<CustomFormControlLabel
											style={{ display: "flex" }}
											value="No"
											control={<Radio style={{ color: "#638dff" }} />}
											label="no"
											checked={sailingStatus === false}
											onClick={(e) => this.handleIsSailing(false)}
										/>
									</div>
								</RadioGroup>
							</FormControl>
							{sailingStatus == true && (<Box sx={{ px: "15px", display: "flex", flexDirection: "column" }}>
								<StyledAutocomplete sx={{ mb: "10px" }}
									islabelvisible={true}
									open={isShipNameOpen}
									size="medium"
									id={"shipNameDropdown"}
									name={"shipName"}
									autoHighlight={true}
									loading={!dataLoaded}
									disableClearable
									onOpen={() => { this.setOpen(true); }}
									onClose={() => { this.setOpen(false); }}
									options={shipList || null}
									getOptionLabel={(option) => option.label || ""}
									isOptionEqualToValue={(option, value) => option.label == value.label}
									inputValue={shipName}
									defaultValue={shipName}
									onChange={(e, value) => this.handleShipSelect(value)}
									renderInput={(params) => <StyledTextField
										{...params}
										name={"shipName"}
										value={shipName}
										label={(<>Vessel Name<Mandatory mandatory /></>)}
										onChange={this.handleShipNameSearch}
										error={shipNameError}
										InputProps={{
											...params.InputProps,
											endAdornment: (
												<Fragment>
													<InputAdornment position="start" sx={{ color: "#638dff", mr: 3 }}>
														{!dataLoaded
															? <CircularProgress size={20} thickness={4} sx={{ color: "#638dff" }} />
															: <Search sx={{ color: "#638dff" }} />
														}
													</InputAdornment>
													{params.InputProps.endAdornment}
												</Fragment>
											)
										}}
									/>}

								/>
								<FormControl >
									<StyledTextField
										fullWidth
										value={shipIMO}
										name="shipIMO"
										label={(<>Vessel IMO<Mandatory mandatory /></>)}
										variant="outlined"
										onChange={this.handleShipNameSearch}
										error={imoError}
										InputProps={{
											endAdornment: !imoDataLoaded && (
												<InputAdornment position="start">
													<CircularProgress size={20} thickness={4} sx={{ color: "#638dff" }} />
												</InputAdornment>
											),
										}}
									></StyledTextField>
								</FormControl>
							</Box>)}

						</FormControl>
					</div>

					<div
						className="py-2 d-flex justify-content-center align-items-center mt-30"
						onClose={this.closeConfirmCancel}
						style={{ width: "100%" }}
					>
						<button
							type="button"
							className="btn btn-lg btn-cancel m-1"
							onClick={() => {
								this.setState({ confirmCancel: true });
							}}
							// disabled={this.state.disableCancel}
							style={{ ...styles.styleObj2, backgroundColor: "rgba(99, 141, 255, 0.1)" }}
						>
							Cancel
						</button>
						<button
							type="button"
							className="btn btn-lg btn-open m-1"
							onClick={this.saveProfile}
							style={styles.styleObj2}
							disabled={!imoDataLoaded || imoError}
						>
							Save
						</button>
					</div>
				</div>
			</>
		);
	}
}
export default AddRole;
