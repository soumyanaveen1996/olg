import { createRoot } from "react-dom/client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "!mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapStyles from "./MapStyles";
import MarkerComponent from "./MarkerComponent";
import MapSettingsButton from "./MapSettingsButton";
import MapSearchButton from "./MapSearchButton";
import LinearProgress from "@mui/material/LinearProgress";
import MapSideDrawer from "./MapSideDrawer";
import ImportOverlayPopup from "./ImportOverlayPopup";
import clsx from "clsx";
import MapVesselPopupComponent from "./MapVesselPopupComponent";
import "./Map.css";
import Config from "../../../../Utils/Config";
import { useSelector, useDispatch } from "react-redux";

import GenericAjax from "../../../../Services/GenericAjax";
import { showSnackbarV2 } from "../../../Store/Notification/NotificationAction";
import { getAuthData } from "../../../../Services/StorageService";
import Box from "@mui/material/Box";
import _ from "lodash";

const R = require("ramda");

mapboxgl.accessToken =
	"pk.eyJ1IjoibXVkaXRnb2VsMzAxMSIsImEiOiJja3owMDRleXowZmxhMnBvMDB3bHZ3bGRzIn0.G4VeYTsyIBmj9CGeG7VB6Q";

const loadNewGeoJson = (
	mapRef,
	fullFilePath,
	setIsDownloading,
	isMountedRef,
	overlayVal
) => {
	setIsDownloading(true);
	fetch(fullFilePath)
		.then((res) => res.json())
		.then((data) => {
			if (isMountedRef.current) {
				setIsDownloading(false);
				addGeoJsonSource(mapRef, overlayVal, data);
			}
			addGeoJsonLayer(mapRef, overlayVal);
		})
		.catch((err) => {
			if (isMountedRef.current) {
				setIsDownloading(false);
			}
			console.log("error in fetching ", err);
		});
};

const addGeoJsonSource = (mapRef, layerId, data) => {
	if (mapRef && mapRef.getSource && !mapRef.getSource(layerId)) {
		mapRef.addSource(layerId, {
			type: "geojson",
			data: {
				...data,
			},
		});
	}
};

const addGeoJsonLayer = (mapRef, layerId) => {
	if (mapRef && mapRef.getLayer && !mapRef.getLayer(layerId)) {
		mapRef.addLayer({
			id: layerId,
			type: "line",
			source: layerId,
			layout: {
				"line-join": "round",
				"line-cap": "round",
			},
			paint: {
				"line-color": "#A9A9A9",
				"line-width": 0.5,
				"line-opacity": 0.5,
			},
		});
	}
};

const removeGeoJsonLayer = (mapRef, layerId) => {
	if (mapRef && mapRef.getLayer(layerId)) {
		mapRef.removeLayer(layerId);
	}
};

const processGeoFieldPoints = (msgArr) => {
	let markerPtsArr = [];
	msgArr.forEach((msg, index) => {
		const key = Object.keys(msg)[0];
		const fields = msg[key].fields;
		const obj = {};
		fields.forEach((field) => {
			if (field.id === "vesselName") {
				obj[field.title] = field.value || "Dummy Vessel Name";
				return;
			}
			if (field.id === "vesselCaptainName") {
				obj[field.title] = field.value || "Dummy Vessel Captain Name";
				return;
			}
			obj[field.title] = field.value;
		});
		markerPtsArr.push(obj);
	});

	return markerPtsArr;
};

const processQuickViewGEoPoints = (msgArr, options) => {
	let markerPtsArr = [];
	msgArr.forEach((msg, index) => {
		const key = Object.keys(msg)[0];
		const fields = msg[key].fields;
		const obj = {};
		fields.forEach((field) => {
			let column = options?.columnTemplate?.find(
				(item) => item.id.toLowerCase().trim() === field.id.toLowerCase().trim()
			);
			let title = column.title ? column.title : field.title;
			if (field.id === "vesselName") {
				obj[title] = field.value || "Dummy Vessel Name";
				return;
			}
			if (field.id === "vesselCaptainName") {
				obj[title] = field.value || "Dummy Vessel Captain Name";
				return;
			}
			if (title === "id" || title === "Id") {
				obj.quickViewOfId = field.quickView;
				obj[title] = field.value;
			} else if (field.quickView) {
				obj[title] = field.value;
			}
		});
		markerPtsArr.push(obj);
	});
	return markerPtsArr;
};

const processAreaCRUD = (data, e) => {
	let array_data = [];
	data.features.forEach((feature, index) => {
		let itm = {};
		itm.id = feature.id;
		itm.type = "geo_area_field";
		let objArr;

		feature.geometry.coordinates.forEach((itmArr) => {
			objArr = itmArr.map(([long, lat]) => {
				let lgln = new mapboxgl.LngLat(long, lat);
				const lglnWrapped = {
					longitude: lgln.wrap().lng,
					longitude_full: lgln.lng,
					latitude: lgln.wrap().lat,
					latitude_full: lgln.lat,
				};
				return lglnWrapped;
			});
		});
		itm.value = objArr;

		itm.color = feature.properties.color;
		itm.width = feature.properties.width;
		itm.title = feature.properties.title;
		array_data.push(itm);
	});
	return array_data;
};

const addMarkers = (
	markerGeoPts,
	mapRef,
	popupShudOpenCallback,
	setRowIdCallback,
	handleScrollToItem
) => {
	// create marker point sources
	const markerSource = createMarkersSource(markerGeoPts);
	mapRef.addSource("points", markerSource);
	mapRef.addLayer({
		id: "points",
		type: "circle",
		source: "points",
		paint: {
			"circle-radius": 1,
			"circle-color": "transparent",
		},
	});
	markerGeoPts
		.filter(
			(point) =>
				point?.value?.latitude <= 90 &&
				point?.value?.latitude >= -90 &&
				point?.value?.longitude >= -180 &&
				point?.value?.longitude <= 180
		)
		.forEach((point, index, filteredArr) => {
			const ref = React.createRef();
			ref.current = document.createElement("div");
			ref.current.style.textAlign = "center";
			const root = createRoot(ref.current);
			root.render(
				<MarkerComponent
					key={`marker-${point?.value?.longitude}`}
					id={point.id || point.Id}
					longitude={point?.value?.longitude}
					latitude={point?.value?.latitude}
					markerSize={point?.markerSize}
					markerColor={point?.color || point?.markerColor}
					iconType={point?.iconType}
					iconDirection={point?.value?.direction}
					msisdn={point?.MSISDN}
					vesselType={point["tooltip"]}
					onClick={() => {
						popupShudOpenCallback(true, point);
						setRowIdCallback(point);
						handleScrollToItem(filteredArr.length - index - 1);
						const elem = document.getElementById(`${point.id || point.Id}`);
						if (elem) {
							const ele1 = elem.getElementsByClassName("outer-first-child");
							const ele2 = elem.getElementsByClassName("inner-first-child");
							if (ele1 && ele1.length) {
								ele1[0].style.display = "block";
							}
							if (ele2 && ele2.length) {
								ele2[0].style.display = "block";
							}
						}
					}}
					markerData={point?.value}
				/>
			);
			new mapboxgl.Marker({
				element: ref.current,
				draggable: point?.draggable,
			})
				.setLngLat([point?.value?.longitude, point?.value?.latitude])
				.addTo(mapRef);
		});
};

const createMarkersSource = (markerGeoPts) => {
	const features = [];
	const markerSource = {
		type: "geojson",
		data: {
			type: "FeatureCollection",
			features: features,
		},
	};

	markerGeoPts
		.filter(
			(point) =>
				point?.value?.latitude <= 90 &&
				point?.value?.latitude >= -90 &&
				point?.value?.longitude >= -180 &&
				point?.value?.longitude <= 180
		)
		.forEach((point) => {
			const feature = {
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [point?.value?.longitude, point?.value?.latitude],
				},
				properties: { point: point },
			};
			features.push(feature);
		});
	return markerSource;
};

const addRoutes = (vesselRoutesGeoPts, mapOptions) => {
	const features = [];
	const routesSource = {
		type: "geojson",
		data: {
			type: "FeatureCollection",
			features: features,
		},
	};
	const routeTypeMap = { vessel: 1, plane: 2 };
	const routeFields = mapOptions?.routeFields || [{}];

	let coords;
	routeFields.forEach((routeField) => {
		const properties = {};
		coords = [];
		const feature = {
			type: "Feature",
			properties: properties,
			geometry: {
				type: "LineString",
				coordinates: coords,
			},
		};
		if (routeField.routeType === routeTypeMap["vessel"]) {
			properties.color = routeField.routeColour;
			properties.width = routeField.routeWidth;
			vesselRoutesGeoPts.forEach((routePt) =>
				routeField.routeId === routePt?.routeId
					? coords.push([routePt?.value?.longitude, routePt?.value?.latitude])
					: coords
			);
			features.push(feature);
		}
	});
	return routesSource;
};

const addAreas = (areaGeoPts, visibleVal) => {
	const features = [];
	const areasSource = {
		type: "geojson",
		data: {
			type: "FeatureCollection",
			features: features,
		},
	};
	if (Array.isArray(areaGeoPts)) {
		areaGeoPts.forEach((areaGeoPt) => {
			const properties = {};
			const coords = [];
			const feature = {
				id: areaGeoPt.id,
				type: "Feature",
				properties: properties,
				geometry: {
					type: "Polygon",
					coordinates: [coords],
				},
			};
			properties.color = areaGeoPt.color || "green";
			properties.width = areaGeoPt.width || 2;
			properties.id = areaGeoPt.id;
			properties.visibility = visibleVal || "none";
			properties.title = areaGeoPt.title || "Placeholder Title";
			let firstLng, firstLat, lngth, lastLng, lastLat;
			if (Array.isArray(areaGeoPt.value)) {
				areaGeoPt.value.forEach((item) => {
					const longi = item?.longitude_full || item?.longitude;
					const lati = item?.latitude_full || item?.latitude;
					coords.push([longi, lati]);
				});
				firstLng =
					areaGeoPt.value[0].longitude_full || areaGeoPt.value[0].longitude;
				firstLat =
					areaGeoPt.value[0].latitude_full || areaGeoPt.value[0].latitude;
				lngth = areaGeoPt.value.length;
				lastLng =
					areaGeoPt.value[lngth - 1].longitude_full ||
					areaGeoPt.value[lngth - 1].longitude;
				lastLat =
					areaGeoPt.value[lngth - 1].latitude_full ||
					areaGeoPt.value[lngth - 1].latitude;
				if (firstLng !== lastLng || firstLat !== lastLat) {
					coords.push([firstLng, firstLat]);
				}

				features.push(feature);
			}
		});
	}
	return areasSource;
};

const getPolygonsTopVertexList = (areaGeoPts, mapOptions) => {
	const features = [];
	const topVerticesSource = {
		type: "geojson",
		data: {
			type: "FeatureCollection",
			features: features,
		},
	};
	if (Array.isArray(areaGeoPts)) {
		areaGeoPts.forEach((areaGeoPt) => {
			const properties = {};
			let coords = [];
			const feature = {
				id: areaGeoPt.id,
				type: "Feature",
				properties: properties,
				geometry: {
					type: "Point",
					coordinates: [],
				},
			};
			if (Array.isArray(areaGeoPt.value)) {
				coords = [
					areaGeoPt?.value[0]?.longitude,
					areaGeoPt?.value[0]?.latitude,
				];
				feature.geometry.coordinates = coords;
				properties.color = areaGeoPt.color || "green";
				properties.width = areaGeoPt.width || 2;
				properties.id = areaGeoPt.id;
				properties.title = areaGeoPt.title || "Placeholder Title";
				features.push(feature);
			}
		});
	}
	return topVerticesSource;
};

const getMapStyle = (mapType) => {
	switch (mapType) {
		case "sat":
			return MapStyles.STREET_SATELLITE_Arabian_Gulf;
		case "streetSat":
			return MapStyles.STREET_SATELLITE_Arabian_Gulf;
		case "vector":
		default:
			return MapStyles.VECTOR_Arabian_Gulf;
	}
};

const addAllWeatherSources = (
	timeSlices,
	twcApiKey,
	mapRef,
	weatherChecked,
	weatherOverlayOptions
) => {
	timeSlices
		.then((res) => res.json())
		.then((res) => {
			const radarTimeSlices = res.seriesInfo.satrad.series;
			const latestTimeSlice = radarTimeSlices[0].ts;
			const latestCloudsFcstTimeSlice = res.seriesInfo.cloudsFcst.series[0].ts; //change according to layer satrad, cloudsFcst
			const latestCloudsFcstForcastTimeSlice =
				res.seriesInfo.cloudsFcst.series[0].fts[0];
			const latestCwindSpeedNMTimeSlice =
				res.seriesInfo.windSpeedNM.series[0].ts; //change according to layer satrad, cloudsFcst

			// insert the latest time for satellite & radar into the source data URL
			if (weatherOverlayOptions?.radar) {
				mapRef.addSource("twcRadar", {
					type: "raster",
					tiles: [
						"https://api.weather.com/v3/TileServer/tile/satrad?ts=" +
						latestTimeSlice +
						"&xyz={x}:{y}:{z}&apiKey=" +
						twcApiKey,
					],
					tileSize: 1024,
				});
			}
			if (weatherOverlayOptions?.cloud) {
				mapRef.addSource("twcClouds", {
					type: "raster",
					tiles: [
						"https://api.weather.com/v3/TileServer/tile/cloudsFcst?ts=" +
						latestCloudsFcstTimeSlice +
						"&fts=" +
						latestCloudsFcstForcastTimeSlice +
						"&xyz={x}:{y}:{z}&apiKey=" +
						twcApiKey,
					],
					tileSize: 1024,
				});
			}
			if (weatherOverlayOptions?.windSpeed) {
				mapRef.addSource("windSpeedNM", {
					type: "raster",
					tiles: [
						"https://api.weather.com/v3/TileServer/tile/windSpeedNM?ts=" +
						latestCwindSpeedNMTimeSlice +
						"&xyz={x}:{y}:{z}&apiKey=" +
						twcApiKey,
					],
					tileSize: 1024,
				});
			}
			weatherChecked && addAllWeatherLayers(mapRef, weatherOverlayOptions);
		});
};

const addAllWeatherLayers = (mapRef, weatherOverlayOptions) => {
	if (weatherOverlayOptions?.cloud) {
		mapRef.addLayer({
			id: "clouds",
			type: "raster",
			source: "twcClouds",
			paint: {
				"raster-opacity": 0.3,
			},
		});
	}
	if (weatherOverlayOptions?.radar) {
		mapRef.addLayer({
			id: "radar",
			type: "raster",
			source: "twcRadar",
			paint: {
				"raster-opacity": 0.3,
			},
		});
	}
	if (weatherOverlayOptions?.windSpeed) {
		mapRef.addLayer({
			id: "windSpeed",
			type: "raster",
			source: "windSpeedNM",
			paint: {
				"raster-opacity": 0.3,
			},
		});
	}
};

const removeAllWeatherLayers = (mapRef, weatherOverlayOptions) => {
	if (weatherOverlayOptions?.radar) {
		if (mapRef && mapRef.getLayer("radar")) {
			mapRef.removeLayer("radar");
		}
	}
	if (weatherOverlayOptions?.cloud) {
		if (mapRef && mapRef.getLayer("clouds")) {
			mapRef.removeLayer("clouds");
		}
	}
	if (weatherOverlayOptions?.windSpeed) {
		if (mapRef && mapRef.getLayer("windSpeed")) {
			mapRef.removeLayer("windSpeed");
		}
	}
};

// 1. Add WMS Sources
const addWMSSources = (map) => {
	// RCXL Oceans WMS Source
	map.addSource("rcxl-oceans", {
		type: "raster",
		tiles: [
			"https://maps.oceanwise.eu/data/demo/frontm_rcxl-oceans/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=256&HEIGHT=256&LAYERS=RCXL-Oceans&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96"
		],
		tileSize: 256
	});

	// ENC WMS Source
	map.addSource("enc-wms", {
		type: "raster",
		tiles: [
			"https://maps.oceanwise.eu/data/demo/frontm_enc/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=256&HEIGHT=256&LAYERS=ENC&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96"
		],
		tileSize: 256
	});
}

// 2. Add WMS Layers
const addWMSLayers = (map) => {
	// RCXL Oceans WMS Layer
	map.addLayer({
		id: "rcxl-oceans-layer",
		type: "raster",
		source: "rcxl-oceans",
		layout: { "visibility": "visible" }
	});

	// ENC WMS Layer
	map.addLayer({
		id: "enc-wms-layer",
		type: "raster",
		source: "enc-wms",
		layout: { "visibility": "visible" }
	});
}

const FMMap = ({
	options,
	message,
	rows,
	onStyleChange,
	conversation,
	messageType,
	mapContainer,
	showAreaList,
	handleMapAreasClick,
	nomagnifyerCntrl,
	noFullScreencontrol,
	nosettingsCntrl,
	limitedSettingsCntrl,
	nomapsearchCntrl,
	noSideDrawer,
	parentTabId = null,
	inContainer,
	field,
	handleAction,
	mapCssStyles,
}) => {
	const {
		chats: {
			selectedConversation: {
				conversationId: selectedConversationId,
				bot: { botId: currentBotId },
				userDomain: currentUserDomain,
			},
			userId: user,
		},
	} = useSelector((state) => state);

	let map = useRef(null);
	let areaRoutesSourceRef = useRef(null);
	const mapContainerRef = useRef(null);
	const [shudOpen, setShudOpen] = useState(false);
	const [imgOverlayShudOpen, setImgOverlayShudOpen] = useState(false);
	const [rowData, setRowData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [markerArr, setMarkerArr] = useState(message || []);
	const [checked, setChecked] = useState([]);
	const [weatherChecked, setWeatherChecked] = useState(() => {
		if (options?.mapOptions?.weatherOverlay) {
			if (localStorage.getItem(`mapWeatherOverlay_${user}${currentBotId}`)) {
				return (
					localStorage.getItem(`mapWeatherOverlay_${user}${currentBotId}`) ===
					"true"
				);
			}
		}
		return false;
	});

	const [state, setState] = useState({
		restricted: options?.mapOptions?.showAreas?.restricted || false,
		radioSilence: options?.mapOptions?.showAreas?.radioSilence || false,
		portalTracking: options?.mapOptions?.showAreas?.portalTracking || false,
	});

	const geoJsonObject = options?.mapOptions?.geoJsonUrl;

	const [overlayVal, setOverlayVal] = useState(() => {
		if (!_.isObject(geoJsonObject)) {
			return "";
		}
		if (["t2m", "t2mtest"].includes(currentUserDomain)) {
			return "None";
		}
		if (localStorage.getItem(`mapOverlay_${user}${currentBotId}`)) {
			return localStorage.getItem(`mapOverlay_${user}${currentBotId}`);
		}
		return "EEZ";
	});
	const [isDownloading, setIsDownloading] = useState(false);
	const isMountedRef = useRef(true);
	const dispatch = useDispatch();

	const geoPoints = processGeoFieldPoints(markerArr);

	const [zoom, setZoom] = useState(() => {
		if (localStorage.getItem(`mapZoom_${user}${currentBotId}`)) {
			return localStorage.getItem(`mapZoom_${user}${currentBotId}`);
		}
		return options?.mapOptions?.region?.zoom || 1;
	});

	const [lng, setLng] = useState(() => {
		if (localStorage.getItem(`mapCenterLng_${user}${currentBotId}`)) {
			return localStorage.getItem(`mapCenterLng_${user}${currentBotId}`);
		}
		return options?.mapOptions?.region?.longitude || 0;
	});

	const [lat, setLat] = useState(() => {
		if (localStorage.getItem(`mapCenterLat_${user}${currentBotId}`)) {
			return localStorage.getItem(`mapCenterLat_${user}${currentBotId}`);
		}
		return options?.mapOptions?.region?.latitude || 0;
	});

	const {
		user: { userTimezone },
	} = getAuthData();

	const [mapType, setMapType] = useState(() => {
		if (localStorage.getItem(`mapStyle_${user}${currentBotId}`)) {
			return localStorage.getItem(`mapStyle_${user}${currentBotId}`);
		}
		return options?.mapOptions?.type === "streetSat"
			? "sat"
			: options?.mapOptions?.type;
	});

	const [fileScope, setFileScope] = useState("bot");

	const [scopeId, setScopeId] = useState(() => {
		switch (fileScope) {
			case "bot": {
				return currentBotId;
			}

			case "domain": {
				return currentUserDomain;
			}

			case "conversation":
			default: {
				return selectedConversationId;
			}
		}
	});

	const [mainMenuToggle, setMainMenuToggle] = useState(false);
	let rowDetailsForQuickViewRef = useRef(null);
	const listRef = useRef(null);

	const downloadFile = (
		mapRef,
		targetOverlayUrl,
		setIsDownloading,
		isMountedRef,
		targetOverlay
	) => {
		setIsLoading(true);
		setIsDownloading(true);
		const fileName = targetOverlayUrl?.split("/").pop();
		GenericAjax.downloadSignedUrlFile(
			`${R.prop("filesAPI", Config)}/downloadwithsignedurl/${fileScope || "conversation"
			}/${scopeId}/${fileName}`
		)
			.then((res) => {
				if (res?.signedUrl) {
					GenericAjax.downloadFile(res.signedUrl)
						.then((blob) => {
							const url = window.URL.createObjectURL(blob);
							loadNewGeoJson(
								mapRef,
								url,
								setIsDownloading,
								isMountedRef,
								targetOverlay
							);
							setIsLoading(false);
						})
						.catch((error) => {
							console.error("ERROR in getting file from signed url", error);
							dispatch(showSnackbarV2("error", "Failed to download file"));
							setIsLoading(false);
							setIsDownloading(false);
						});
				}
			})
			.catch((error) => {
				console.error("ERROR in genrate Signed Url", error);
				dispatch(showSnackbarV2("error", "Failed to generate signed url"));
				setIsLoading(false);
				setIsDownloading(false);
			});
	};

	const setMapTypeCallback = useCallback((newStyle) => {
		setMapType(newStyle);
		localStorage.setItem(`mapStyle_${user}${currentBotId}`, newStyle);
	}, []);

	const setOverlayValCallBack = useCallback((overLay) => {
		setOverlayVal((value) => {
			const currentOverlay = value;
			const targetOverlay = overLay;

			// If currentOverlay's layer exists, hide it.
			if (map.current && map.current.getLayer(currentOverlay)) {
				map.current.setLayoutProperty(currentOverlay, "visibility", "none");
			}

			if (targetOverlay && (targetOverlay !== "None") && map.current && map.current.getLayer) {
				if (map.current.getLayer(targetOverlay)) {
					map.current.setLayoutProperty(targetOverlay, "visibility", "visible");
				} else {
					if (["EEZ", "FAO"].includes(targetOverlay)) {
						loadNewGeoJson(
							map.current,
							geoJsonObject[targetOverlay],
							setIsDownloading,
							isMountedRef,
							targetOverlay
						);
					} else {
						downloadFile(
							map.current,
							geoJsonObject[targetOverlay],
							setIsDownloading,
							isMountedRef,
							targetOverlay
						);
					}
				}
			}

			localStorage.setItem(`mapOverlay_${user}${currentBotId}`, targetOverlay);
			return targetOverlay;
		});
	}, []);

	const popupShudOpenCallback = (param, row) => {
		setShudOpen(param);
		setRowData(row);
		const qVgeoPoints = processQuickViewGEoPoints(markerArr, options);
		rowDetailsForQuickViewRef.current = qVgeoPoints.find(
			(geoPt) =>
				geoPt.id === (row.id || row.Id) || geoPt.Id === (row.id || row.Id)
		);
	};

	const setRowIdCallback = (row) => {
		setRowId(row.id || row.Id);
		row.type == "geo_area_field" &&
			makeOnlyClickedAreaVisible(row.id || row.Id);
	};

	const flyToCallback = (row) => {
		const clicked_row_details = geoPoints.filter(
			(geoPt) => geoPt.id === (row.id || row.Id)
		);

		let valid_clicked_row_details, val;
		if (row.type == "geo_area_field") {
			valid_clicked_row_details = clicked_row_details.filter(
				(point) =>
					point?.value[0]?.longitude >= -180 &&
					point?.value[0]?.longitude <= 180 &&
					point?.value[0]?.latitude >= -90 &&
					point?.value[0]?.latitude <= 90
			);
			val = valid_clicked_row_details[0]?.value[0];
		} else if (row.type == "geo_point_field") {
			valid_clicked_row_details = clicked_row_details.filter(
				(point) =>
					point?.value?.longitude >= -180 &&
					point?.value?.longitude <= 180 &&
					point?.value?.latitude >= -90 &&
					point?.value?.latitude <= 90
			);
			val = valid_clicked_row_details[0]?.value;
		}
		if (valid_clicked_row_details && valid_clicked_row_details.length) {
			const currentZoom = localStorage.getItem(
				`mapZoom_${user}${currentBotId}`
			);
			const currentZoomParsed = parseFloat(currentZoom);
			const maxZoom = currentZoomParsed > 13 ? currentZoomParsed : 13;
			const maxAreaZoom = currentZoomParsed > 2 ? currentZoomParsed : 2;
			map.current.flyTo({
				center: [val?.longitude, val?.latitude],
				zoom: row.type == "geo_area_field" ? maxAreaZoom : maxZoom,
				bearing: 0,
				speed: 1.5,
				curve: 1,
				easing: (t) => t,
				essential: true,
			});
		}
	};

	const makeOnlyClickedAreaVisible = (row_id) => {
		let features = areaRoutesSourceRef.current.data.features;
		features.forEach((feature) =>
			feature.properties.id == row_id
				? (feature.properties.visibility = "visible")
				: (feature.properties.visibility = "none")
		);
		map.current
			.getSource("areas-source")
			.setData(areaRoutesSourceRef.current.data);
		let area_label_ref_ele =
			document.getElementsByClassName("area-label-class");
		if (area_label_ref_ele) {
			Array.from(area_label_ref_ele, (ele) => {
				if (ele.style.visibility == "visible") {
					ele.style.visibility = "hidden";
				}
			});
		}
		let curr_area = document.getElementById(`${row_id}_area_label`);
		curr_area && (curr_area.style.visibility = "visible");
	};

	const scrollToIndex = (index) => {
		if (listRef.current) {
			listRef.current.scrollToItem(index, "auto");
			let elem = document.getElementById(`list-item-wrapper-${index}`);
			if (elem) {
				elem.scrollIntoView();
			}
		}
	};

	// This function will scroll to the desired index when called.
	const handleScrollToItem = (markerIndex) => {
		setTimeout(() => scrollToIndex(markerIndex || 0), 100);
	};

	useEffect(() => {
		isMountedRef.current = true;
		let mapOptions = {
			container: mapContainerRef.current,
			style: getMapStyle(mapType),
			center: [lng, lat],
			zoom: zoom,
			minZoom: 2,
		};

		if (!mapboxgl.supported()) {
			alert("Your browser does not support Mapbox GL");
			return;
		}

		if (mapboxgl.getRTLTextPluginStatus() === "unavailable") {
			mapboxgl.setRTLTextPlugin(
				"https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
				null,
				true // Lazy load the plugin only when text is in arabic
			);
		}

		map.current = new mapboxgl.Map(mapOptions);

		map.current.boxZoom.disable();

		if (!noFullScreencontrol) {
			map.current.addControl(new mapboxgl.FullscreenControl());
		}
		if (!nomagnifyerCntrl) {
			map.current.addControl(
				new mapboxgl.NavigationControl({ showCompass: false, showZoom: true })
			);
		}

		const controlsContainer = document.getElementsByClassName(
			"mapboxgl-control-container"
		)[0];

		if (inContainer) {
			controlsContainer.style.position = "absolute";
			controlsContainer.style.top = 0;
			controlsContainer.style.right = 0;
			const sideNavbarEarBtn = document.getElementById("sideNavbarEarBtn");
			sideNavbarEarBtn.style.zIndex = "1";
		}

		if (limitedSettingsCntrl) {
			const settingsBtnContainer =
				document.getElementsByClassName("v2-map-menu-btn-ns")[0];
			settingsBtnContainer.style.top = "-375px";

			const mapSettingsPanel =
				document.getElementsByClassName("map-settings-panel")[0];
			mapSettingsPanel && (mapSettingsPanel.style.maxHeight = "35vh");
		}

		controlsContainer.classList.add("controls-custom-class");

		// Define the event handler function separately
		function handleMoveEnd() {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
			localStorage.setItem(
				`mapZoom_${user}${currentBotId}`,
				map.current.getZoom().toFixed(2)
			);
			localStorage.setItem(
				`mapCenterLng_${user}${currentBotId}`,
				map.current.getCenter().lng.toFixed(4)
			);
			localStorage.setItem(
				`mapCenterLat_${user}${currentBotId}`,
				map.current.getCenter().lat.toFixed(4)
			);
		}

		// Add the event listener using the separate function
		map.current.on("moveend", handleMoveEnd);

		let mainRouter = document.getElementById("main-router");

		map.current.on("load", handleOnLoad);
		let createArea = null;
		let updateArea = null;
		let deleteArea = null;
		let handleModeChange = null;
		function handleOnLoad() {
			addWMSSources(map.current);
			addWMSLayers(map.current);
			if (options?.mapOptions?.weatherOverlay) {
				const twcApiKey = "2ec2232d72f1484282232d72f198421d";
				const timeSlices = fetch(
					"https://api.weather.com/v3/TileServer/series/productSet/PPAcore?apiKey=" +
					twcApiKey
				);
				addAllWeatherSources(
					timeSlices,
					twcApiKey,
					map.current,
					weatherChecked,
					options?.mapOptions?.weatherOverlayOptions
				);
			}

			const markerGeoPts = geoPoints.filter(
				(pt) => pt.type === "geo_point_field" && pt.pointType === "marker"
			);
			markerGeoPts.reverse();
			addMarkers(
				markerGeoPts,
				map.current,
				popupShudOpenCallback,
				setRowIdCallback,
				handleScrollToItem
			);

			const vesselRoutesGeoPts = geoPoints.filter((pt) => !!pt.routeId);
			const vesselRoutesSource = addRoutes(
				vesselRoutesGeoPts,
				options?.mapOptions
			);
			map.current.addSource("multiple-lines-source", vesselRoutesSource);
			map.current.addLayer({
				id: "multiple-lines-layer",
				type: "line",
				source: "multiple-lines-source",
				layout: { "line-cap": "round", "line-join": "round" },
				paint: {
					"line-color": ["get", "color"],
					"line-width": ["get", "width"],
				},
			});

			let areaGeoPts, topVerticesSource;
			if (field && field.type === "map_area") {
				areaRoutesSourceRef.current = addAreas(
					field.value,
					options?.mapOptions?.showAreaFilterOnMap ? "visible" : "none"
				);
				topVerticesSource = getPolygonsTopVertexList(
					field.value,
					options?.mapOptions
				);
			} else {
				areaGeoPts = geoPoints.filter((pt) => pt.type === "geo_area_field");
				areaRoutesSourceRef.current = addAreas(
					areaGeoPts,
					options?.mapOptions?.showAreaFilterOnMap ? "visible" : "none"
				);
				topVerticesSource = getPolygonsTopVertexList(
					areaGeoPts,
					options?.mapOptions
				);
			}
			if (field) {
				if (field.readOnly !== true) {
					const area_styles = [
						{
							id: "gl-draw-polygon-fill-inactive",
							type: "fill",
							filter: [
								"all",
								["==", "active", "false"],
								["==", "$type", "Polygon"],
								["!=", "mode", "static"],
							],
							paint: {
								"fill-color": [
									"case",
									["==", ["get", "user_class_id"], 1],
									["get", "user_color"],
									["==", ["get", "user_class_id"], 2],
									["get", "user_color"],
									["get", "user_color"],
								],
								"fill-outline-color": "#3bb2d0",
								"fill-opacity": 0.2,
							},
						},
						{
							id: "gl-draw-polygon-fill-active",
							type: "fill",
							filter: [
								"all",
								["==", "active", "true"],
								["==", "$type", "Polygon"],
							],
							paint: {
								"fill-color": "#fbb03b",
								"fill-outline-color": "#fbb03b",
								"fill-opacity": 0.1,
							},
						},
						{
							id: "gl-draw-polygon-midpoint",
							type: "circle",
							filter: [
								"all",
								["==", "$type", "Point"],
								["==", "meta", "midpoint"],
							],
							paint: {
								"circle-radius": 3,
								"circle-color": "#fbb03b",
							},
						},
						{
							id: "gl-draw-polygon-stroke-inactive",
							type: "line",
							filter: [
								"all",
								["==", "active", "false"],
								["==", "$type", "Polygon"],
								["!=", "mode", "static"],
							],
							layout: {
								"line-cap": "round",
								"line-join": "round",
							},
							paint: {
								"line-color": ["get", "user_color"],
								"line-width": ["get", "user_width"],
							},
						},
						{
							id: "gl-draw-polygon-stroke-active",
							type: "line",
							filter: [
								"all",
								["==", "active", "true"],
								["==", "$type", "Polygon"],
							],
							layout: {
								"line-cap": "round",
								"line-join": "round",
							},
							paint: {
								"line-color": "#fbb03b",
								"line-dasharray": [0.2, 2],
								"line-width": 2,
							},
						},
						{
							id: "gl-draw-line-inactive",
							type: "line",
							filter: [
								"all",
								["==", "active", "false"],
								["==", "$type", "LineString"],
								["!=", "mode", "static"],
							],
							layout: {
								"line-cap": "round",
								"line-join": "round",
							},
							paint: {
								"line-color": "#3bb2d0",
								"line-width": 2,
							},
						},
						{
							id: "gl-draw-line-active",
							type: "line",
							filter: [
								"all",
								["==", "$type", "LineString"],
								["==", "active", "true"],
							],
							layout: {
								"line-cap": "round",
								"line-join": "round",
							},
							paint: {
								"line-color": "#fbb03b",
								"line-dasharray": [0.2, 2],
								"line-width": 2,
							},
						},
						{
							id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
							type: "circle",
							filter: [
								"all",
								["==", "meta", "vertex"],
								["==", "$type", "Point"],
								["!=", "mode", "static"],
							],
							paint: {
								"circle-radius": 5,
								"circle-color": "#fff",
							},
						},
						{
							id: "gl-draw-polygon-and-line-vertex-inactive",
							type: "circle",
							filter: [
								"all",
								["==", "meta", "vertex"],
								["==", "$type", "Point"],
								["!=", "mode", "static"],
							],
							paint: {
								"circle-radius": 3,
								"circle-color": "#fbb03b",
							},
						},
						{
							id: "gl-draw-point-point-stroke-inactive",
							type: "circle",
							filter: [
								"all",
								["==", "active", "false"],
								["==", "$type", "Point"],
								["==", "meta", "feature"],
								["!=", "mode", "static"],
							],
							paint: {
								"circle-radius": 5,
								"circle-opacity": 1,
								"circle-color": "#fff",
							},
						},
						{
							id: "gl-draw-point-inactive",
							type: "circle",
							filter: [
								"all",
								["==", "active", "false"],
								["==", "$type", "Point"],
								["==", "meta", "feature"],
								["!=", "mode", "static"],
							],
							paint: {
								"circle-radius": 3,
								"circle-color": "#3bb2d0",
							},
						},
						{
							id: "gl-draw-point-stroke-active",
							type: "circle",
							filter: [
								"all",
								["==", "$type", "Point"],
								["==", "active", "true"],
								["!=", "meta", "midpoint"],
							],
							paint: {
								"circle-radius": 7,
								"circle-color": "#fff",
							},
						},
						{
							id: "gl-draw-point-active",
							type: "circle",
							filter: [
								"all",
								["==", "$type", "Point"],
								["!=", "meta", "midpoint"],
								["==", "active", "true"],
							],
							paint: {
								"circle-radius": 5,
								"circle-color": "#fbb03b",
							},
						},
						{
							id: "gl-draw-polygon-fill-static",
							type: "fill",
							filter: [
								"all",
								["==", "mode", "static"],
								["==", "$type", "Polygon"],
							],
							paint: {
								"fill-color": "#404040",
								"fill-outline-color": "#404040",
								"fill-opacity": 0.1,
							},
						},
						{
							id: "gl-draw-polygon-stroke-static",
							type: "line",
							filter: [
								"all",
								["==", "mode", "static"],
								["==", "$type", "Polygon"],
							],
							layout: {
								"line-cap": "round",
								"line-join": "round",
							},
							paint: {
								"line-color": "#404040",
								"line-width": 2,
							},
						},
						{
							id: "gl-draw-line-static",
							type: "line",
							filter: [
								"all",
								["==", "mode", "static"],
								["==", "$type", "LineString"],
							],
							layout: {
								"line-cap": "round",
								"line-join": "round",
							},
							paint: {
								"line-color": "#404040",
								"line-width": 2,
							},
						},
						{
							id: "gl-draw-point-static",
							type: "circle",
							filter: [
								"all",
								["==", "mode", "static"],
								["==", "$type", "Point"],
							],
							paint: {
								"circle-radius": 5,
								"circle-color": "#404040",
							},
						},
					];
					const draw = new MapboxDraw({
						userProperties: true,
						styles: area_styles,
						displayControlsDefault: false,
						controls: {
							polygon: true,
							trash: true,
						},
					});
					map.current.addControl(draw);
					function createArea(e) {
						draw.setFeatureProperty(e.features[0].id, "color", "green");
						draw.setFeatureProperty(e.features[0].id, "width", 2);
						draw.setFeatureProperty(e.features[0].id, "title", "sample title");
						const data = draw.getAll();
						const array_data = processAreaCRUD(data, e);
						handleMapAreasClick &&
							handleMapAreasClick(
								field,
								field.type,
								field.id,
								field.title,
								array_data
							);
					}

					function updateArea(e) {
						const data = draw.getAll();
						const array_data = processAreaCRUD(data, e);
						handleMapAreasClick &&
							handleMapAreasClick(
								field,
								field.type,
								field.id,
								field.title,
								array_data
							);
					}

					function deleteArea(e) {
						const data = draw.getAll();
						const array_data = processAreaCRUD(data, e);
						handleMapAreasClick &&
							handleMapAreasClick(
								field,
								field.type,
								field.id,
								field.title,
								array_data
							);
					}

					function handleModeChange(e) {
						let data = draw.getAll();
						if (draw.getMode() == "draw_polygon") {
							var pids = [];
							const lid = data.features[data.features.length - 1].id;
							data.features.forEach((f) => {
								if (f.geometry.type === "Polygon" && f.id !== lid) {
									pids.push(f.id);
								}
							});
							draw.delete(pids);
							pids &&
								pids.length &&
								handleMapAreasClick &&
								handleMapAreasClick(
									field,
									field.type,
									field.id,
									field.title,
									[]
								);
						}
					}

					document.querySelectorAll(
						".controls-custom-class .mapboxgl-ctrl-top-right"
					)[0].style.top = "15px";
					map.current.on("draw.create", createArea);
					map.current.on("draw.delete", deleteArea);
					map.current.on("draw.update", updateArea);
					map.current.on("draw.modechange", handleModeChange);
				}
				mainRouter.style.overflow = "auto";
			} else {
				mainRouter.style.overflowY = "visible";
			}
			if (areaRoutesSourceRef.current) {
				map.current.addSource("areas-source", areaRoutesSourceRef.current);
				map.current.addLayer({
					id: "areas-source",
					type: "line",
					source: "areas-source",
					layout: {
						"line-cap": "round",
						"line-join": "round",
						visibility: "visible",
					},
					filter: ["==", "visibility", "visible"],
					paint: {
						"line-color": ["get", "color"],
						"line-width": ["get", "width"],
					},
				});
				map.current.addLayer({
					id: "areas-source-fill",
					type: "fill",
					source: "areas-source",
					layout: { visibility: "visible" },
					filter: ["==", "visibility", "visible"],
					paint: {
						"fill-color": ["get", "color"],
						"fill-opacity": 0.2,
					},
				});
			}
			if (topVerticesSource) {
				for (const marker of topVerticesSource.data.features) {
					// Create a DOM element for each marker.
					const el = document.createElement("div");
					el.className = "area-label-class";
					el.style.backgroundColor = "black";
					el.style.borderRadius = "15px";
					el.style.border = `2px solid ${marker.properties.color}`;
					el.style.minWidth = "80px";
					el.style.maxWidth = "150px";
					el.style.textAlign = "center";
					el.style.wordBreak = "break-all";
					el.style.height = "22px";
					el.style.fontSize = "12px";
					el.style.whiteSpace = "nowrap";
					el.style.overflow = "hidden";
					el.style.textOverflow = "ellipsis";
					el.style.color = "white";
					options?.mapOptions?.showAreaFilterOnMap
						? (el.style.visibility = "visible")
						: (el.style.visibility = "hidden");
					el.id = `${marker.properties.id}_area_label`;

					el.style.backgroundSize = "100%";
					el.innerHTML = `<span style='color: white;'>${marker.properties.title}</span>`;

					// Add markers to the map.
					new mapboxgl.Marker(el)
						.setLngLat(marker.geometry.coordinates)
						.addTo(map.current);
				}
			}
		}

		return () => {
			mainRouter.style.overflow = "auto";
			map.current.off("draw.create", createArea);
			map.current.off("draw.delete", deleteArea);
			map.current.off("draw.update", updateArea);
			map.current.off("draw.modechange", handleModeChange);
			map.current.off("moveend", handleMoveEnd);
			map.current.off("load", handleOnLoad);
			map.current.remove();
			mapboxgl.clearStorage((error) => {
				if (error) {
					console.error("Error clearing Mapbox storage:", error);
				} else {
					console.log("Mapbox storage cleared successfully");
				}
			});
			isMountedRef.current = false;
		};
	}, [mapType]);

	useEffect(() => {
		if (mainMenuToggle) {
			if (overlayVal && (overlayVal !== "None") && map.current && map.current.getLayer) {
				if (map.current.getLayer(overlayVal)) {
					// Check if the layer is not already visible
					if (
						map.current.getLayoutProperty(overlayVal, "visibility") !==
						"visible"
					) {
						map.current.setLayoutProperty(overlayVal, "visibility", "visible");
					}
				} else {
					if (["EEZ", "FAO"].includes(overlayVal)) {
						loadNewGeoJson(
							map.current,
							geoJsonObject[overlayVal],
							setIsDownloading,
							isMountedRef,
							overlayVal
						);
					} else {
						downloadFile(
							map.current,
							geoJsonObject[overlayVal],
							setIsDownloading,
							isMountedRef,
							overlayVal
						);
					}
				}
			}
		}
	}, [mainMenuToggle]);

	return (
		<>
			{isDownloading && (
				<LinearProgress
					style={{ position: "absolute", left: 0, right: 0, zIndex: 999 }}
				/>
			)}
			<Box id={mapContainer} ref={mapContainerRef} style={mapCssStyles} />
			<div className="v2-map-side-drawer-ns">
				{!noSideDrawer && (
					<MapSideDrawer
						rowId={rowId}
						shudOpen={shudOpen}
						mapContainer={mapContainer}
						options={options}
						geoPoints={geoPoints}
						popupShudOpenCallback={popupShudOpenCallback}
						setRowIdCallback={setRowIdCallback}
						flyToCallback={flyToCallback}
						conversation={conversation}
						parentTabId={parentTabId}
						checked={checked}
						setChecked={setChecked}
						listRef={listRef}
					/>
				)}
			</div>
			<div
				className={clsx("v2-map-searchBar-ns")}
				style={{
					marginRight: "35px",
					visibility: (
						options && options.hasOwnProperty("allowSearch")
							? !options.allowSearch
							: true
					)
						? "hidden"
						: "visible",
				}}
			>
				{!nomapsearchCntrl ? (
					<MapSearchButton options={options} handleAction={handleAction} />
				) : null}
			</div>
			<div className="v2-map-menu-btn-ns">
				{!nosettingsCntrl ? (
					<MapSettingsButton
						setMapTypeCallback={setMapTypeCallback}
						overlayVal={overlayVal}
						setOverlayValCallBack={setOverlayValCallBack}
						isDownloading={isDownloading}
						currentUserDomain={currentUserDomain}
						mapContainer={mapContainer}
						mapType={mapType}
						weatherChecked={weatherChecked}
						conversation={conversation}
						setWeatherChecked={setWeatherChecked}
						addAllWeatherLayers={addAllWeatherLayers}
						removeAllWeatherLayers={removeAllWeatherLayers}
						setImgOverlayShudOpen={setImgOverlayShudOpen}
						mapRef={map.current}
						parentTabId={parentTabId}
						user={user}
						state={state}
						setState={setState}
						currentBotId={currentBotId}
						options={options}
						limitedSettingsCntrl={limitedSettingsCntrl}
						mainMenuToggle={mainMenuToggle}
						setMainMenuToggle={setMainMenuToggle}
					/>
				) : null}
			</div>
			{
				<MapVesselPopupComponent
					mapContainer={mapContainer}
					shudOpen={shudOpen}
					rowId={rowId}
					popupShudOpenCallback={popupShudOpenCallback}
					checked={checked}
					setRowIdCallback={setRowIdCallback}
					fileScope="bot"
					rowData={rowData}
					clicked_row_details={rowDetailsForQuickViewRef.current}
					options={options}
				/>
			}
			{_.isObject(geoJsonObject) && imgOverlayShudOpen && (
				<ImportOverlayPopup
					imgOverlayShudOpen={imgOverlayShudOpen}
					parentTabId={parentTabId}
					setImgOverlayShudOpen={setImgOverlayShudOpen}
					conversation={conversation}
					options={options}
				/>
			)}
		</>
	);
};

export default FMMap;
