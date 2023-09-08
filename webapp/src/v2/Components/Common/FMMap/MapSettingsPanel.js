import React from "react";
import {
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Divider,
	Switch,
	Typography,
	Link,
	Checkbox,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { MessageTypeConstants } from "../../../../Services/Message";
import { sendAMessage } from "../../../../State/actions/chats";
import { useSelector } from "react-redux";
import { handleMapSettingsChange } from "../../../Containers/NonConversational/Store/NonConversationalAction";
import _ from "lodash";
import { styled } from "@mui/material/styles";

const FormControlLabelBlock = styled(Typography)(() => ({
	fontSize: "14px",
	color: "#2a2d3c",
	letterSpacing: "-0.36px",
}));

const FormControlWeatherOverlayLbl = styled("span")(() => ({
	fontSize: "14px",
	letterSpacing: "-0.36px",
	whiteSpace: "nowrap",
	margin: "auto",
	marginLeft: 0,
	color: "#44485a !important",
}));

const FormControlNoAutoCapitalize = styled(Typography)(() => ({
	fontSize: "14px",
	color: "#2a2d3c",
	letterSpacing: "-0.36px",
	textTransform: "none",
}));

const FieldsLabelStyles = styled(FormLabel)(() => ({
	color: "#9c9ea7 !important",
	marginBottom: "20px",
}));

const DividerStyle = styled(Divider)(() => ({
	backgroundColor: "#f4f4f4",
}));

const WeatherOverlay = styled(FormControl)(({ theme }) => ({
	margin: theme.spacing(3),
	flexDirection: "row",
}));

const FormControlBlock = styled(FormControl)(({ theme }) => ({
	margin: theme.spacing(3),
}));

function MapSettingsPanel({
	setMapTypeCallback,
	overlayVal,
	isDownloading,
	setOverlayValCallBack,
	mapContainer,
	mapType = "sat",
	currentUserDomain,
	weatherChecked,
	setWeatherChecked,
	addAllWeatherLayers,
	removeAllWeatherLayers,
	setImgOverlayShudOpen,
	state,
	setState,
	parentTabId,
	conversation,
	mapRef,
	user,
	currentBotId,
	options,
	limitedSettingsCntrl,
}) {
	const botWaitLoader = useSelector((state) => state.loader.botWaitLoader);
	const handleChange = (event) => {
		const val = event.target.checked;
		setWeatherChecked(() => {
			localStorage.setItem(`mapWeatherOverlay_${user}${currentBotId}`, val);
			val
				? addAllWeatherLayers(
						mapRef,
						options?.mapOptions?.weatherOverlayOptions
				  )
				: removeAllWeatherLayers(
						mapRef,
						options?.mapOptions?.weatherOverlayOptions
				  );
			return val;
		});
	};

	const handleMapStyleRadioChange = (mapContainer) => (event) => {
		const val = event.target.value;
		setMapTypeCallback(val);
		dispatch(handleMapSettingsChange({ "map-settings-key": val }));
	};

	const handleOverlaysRadioClick = (event) => {
		const val = event.target.value;
		if (!isDownloading) {
			setOverlayValCallBack(val);
		}
	};

	const handleAreasChange = (event) => {
		const newState = { ...state, [event.target.name]: event.target.checked };
		setState(newState);
		handleAction(newState);
	};

	const dispatch = useDispatch();

	const handleAction = (newState) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options?.parent?.length ? parentTabId : options.tabId,
			action: "showAreas",
			content: newState,
			currentField: null,
			docId: null,
		};
		dispatch(sendAMessage(responseChat, true));
	};

	return (
		<form className="map-settings-panel">
			{options?.mapOptions?.weatherOverlay && (
				<>
					<WeatherOverlay component="fieldset">
						<FormControlWeatherOverlayLbl>
							Weather overlay
						</FormControlWeatherOverlayLbl>
						<Switch
							checked={weatherChecked}
							onChange={handleChange}
							inputProps={{ "aria-label": "controlled" }}
							color="primary"
						/>
					</WeatherOverlay>
					<DividerStyle variant="middle" />
				</>
			)}
			<FormControlBlock
				component="fieldset"
				style={
					currentUserDomain === "t2mtest" ||
					!_.isObject(options?.mapOptions?.geoJsonUrl)
						? { display: "none" }
						: { backgroundColor: "transparent" }
				}
			>
				<FieldsLabelStyles component="div">Overlays</FieldsLabelStyles>
				<RadioGroup
					aria-label="overlays"
					name="overlays"
					value={overlayVal}
					onChange={handleOverlaysRadioClick}
				>
					{_.isObject(options?.mapOptions?.geoJsonUrl) &&
						Object.keys(options?.mapOptions?.geoJsonUrl).map((layerName) => (
							<FormControlLabel
								value={layerName}
								key={layerName}
								control={<Radio color="primary" />}
								disabled={isDownloading}
								label={
									<FormControlNoAutoCapitalize>
										{layerName}
									</FormControlNoAutoCapitalize>
								}
							/>
						))}
					<FormControlLabel
						value="None"
						control={<Radio color="primary" />}
						disabled={isDownloading}
						label={<FormControlLabelBlock>None</FormControlLabelBlock>}
					/>
				</RadioGroup>
				{options?.mapOptions?.editableOverlay && (
					<Link
						component="button"
						variant="body2"
						onClick={(e) => {
							e.preventDefault();
							setImgOverlayShudOpen(true);
						}}
					>
						+ Import new overlay
					</Link>
				)}
			</FormControlBlock>
			<DividerStyle variant="middle" />
			<FormControlBlock component="fieldset">
				<FieldsLabelStyles component="div">Map view</FieldsLabelStyles>
				<RadioGroup
					aria-label="mapStyle"
					name="mapStyle"
					value={mapType}
					onChange={handleMapStyleRadioChange(mapContainer)}
				>
					<FormControlLabel
						value="sat"
						control={<Radio color="primary" />}
						label={<FormControlLabelBlock>Satellite</FormControlLabelBlock>}
					/>
					<FormControlLabel
						value="vector"
						control={<Radio color="primary" />}
						label={<FormControlLabelBlock>Vector</FormControlLabelBlock>}
					/>
				</RadioGroup>
			</FormControlBlock>
			<DividerStyle
				variant="middle"
				sx={!options?.mapOptions?.showAreaFilterOnMap && { display: "none" }}
			/>
			<FormControlBlock
				component="fieldset"
				sx={!options?.mapOptions?.showAreaFilterOnMap && { display: "none" }}
			>
				<FieldsLabelStyles component="div">Areas</FieldsLabelStyles>
				<FormGroup aria-label="areas" name="areas" onChange={handleAreasChange}>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								checked={state.restricted}
								name="restricted"
								disabled={botWaitLoader}
							/>
						}
						label={
							<FormControlLabelBlock>Restricted areas</FormControlLabelBlock>
						}
					/>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								checked={state.radioSilence}
								name="radioSilence"
								disabled={botWaitLoader}
							/>
						}
						label={
							<FormControlLabelBlock>Radio silence areas</FormControlLabelBlock>
						}
					/>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								checked={state.portalTracking}
								name="portalTracking"
								disabled={botWaitLoader}
							/>
						}
						label={
							<FormControlLabelBlock>
								Portal tracking areas
							</FormControlLabelBlock>
						}
					/>
				</FormGroup>
			</FormControlBlock>
		</form>
	);
}

export default React.memo(MapSettingsPanel);
