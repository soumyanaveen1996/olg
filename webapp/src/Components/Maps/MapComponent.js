/* eslint-disable react/no-unsafe */
import React, { Component } from "react";
import ReactMapGL, { Popup, FlyToInterpolator } from "react-map-gl";
import * as d3 from "d3-ease";
import _ from "lodash";
import Config from "../../Utils/Config";
import "./maps.css";
import WebMercatorViewport from "viewport-mercator-project";
import MapStyles from "./MapStyles";
import PolylineOverlay from "./PolyLineOverlay";
import MarkerComponent from "./MarkerComponent";
import CircleRoute from "./CircleRoute";
import { isFloat } from "../Interactions/content/MapContentView";
import "mapbox-gl/dist/mapbox-gl.css";
import HTMLCard from "../Interactions/cards/maps/HTMLCard";
import MapEditor from "./MapEditor";
import { MessageTypeConstants } from "../../Services/Message";

import { MapDrawActionContext } from "../Maps/MapEditorActionContext";

const R = require("ramda");

export default class MapComponent extends Component {
	constructor(props) {
		super(props);

		let {
			width,
			height,
			fitBounds,
			boundPointsCord = [],
			toFitBounds,
			boundPoints = [],
			latitude,
			longitude,
			zoom,
		} = this.props;

		if (toFitBounds) {
			const viewport = new WebMercatorViewport({
				width,
				height,
			});
			let bounds = boundPoints.map((d) => {
				let lon = parseFloat(d.longitude);
				let lat = parseFloat(d.latitude);

				return [lon, lat];
			});
			const bounded = viewport.fitBounds(bounds, {
				padding: 40,
			});

			latitude = bounded.latitude;
			longitude = bounded.longitude;
			zoom = bounded.zoom;
		}

		// console.log("bound cordinates ", fitBounds, boundPointsCord);
		// if (fitBounds) {
		//   const viewport = new WebMercatorViewport({
		//     width,
		//     height
		//   });
		//   const bounds = viewport.fitBounds(boundPointsCord, {
		//     padding: 40,
		//     offset: [0, -40]
		//   });

		//   console.log("we will see bound ", bounds);
		// }

		this.state = {
			polyLines: (this.props.polyLines && [...this.props.polyLines]) || [],
			markers: [],
			planeRoutes: [],
			viewport: {
				latitude: parseFloat(latitude),
				longitude: parseFloat(longitude),
				zoom: zoom,
				bearing: 0,
				pitch: 0,
			},
		};
		this.mapRef = React.createRef();
	}

	componentDidMount() {
		let { geoJsonUrl, options } = this.props;
		// console.log("map component props", this.props.markers);
		this.setState({ mapType: options.type });
		if (geoJsonUrl) {
			let path = R.prop("contentURL", Config);
			let fullFilePath = path + geoJsonUrl;

			const map = this.mapRef.current.getMap();
			this.loadMapGeoJson(map, fullFilePath, "Polygon");
		}
		this.props.setMapReference(this.mapRef);
		if (this.props.markers) {
			this.setState({ markers: this.props.markers });
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (
			nextProps.geoJsonUrl &&
			this.state.mapType &&
			nextProps.options.type !== this.props.options.type
		) {
			// console.log("change map mode ", nextProps.geoJsonUrl);

			let { geoJsonUrl } = nextProps;
			if (geoJsonUrl) {
				let path = R.prop("contentURL", Config);
				let fullFilePath = path + geoJsonUrl;
				const map = this.mapRef.current.getMap();
				// console.log("get the map ", map);
				if (map.getLayer("Polygon")) {
					map.removeLayer("Polygon");
				}
				if (map.getSource("Polygon")) {
					map.removeSource("Polygon");
				}

				this.setState({ mapType: nextProps.options.type }, () => {
					this.loadNewGeoJson(map, fullFilePath);
				});
			}
		}
		if (
			nextProps.geoJsonUrl &&
			nextProps.geoJsonUrl !== this.props.geoJsonUrl
		) {
			let { geoJsonUrl } = nextProps;
			if (geoJsonUrl) {
				let path = R.prop("contentURL", Config);
				let fullFilePath = path + geoJsonUrl;
				const map = this.mapRef.current.getMap();
				// console.log("get the map ", map);
				if (map.getLayer("Polygon")) {
					map.removeLayer("Polygon");
				}
				if (map.getSource("Polygon")) {
					map.removeSource("Polygon");
				}

				this.setState({ mapType: nextProps.options.type }, () => {
					this.loadNewGeoJson(map, fullFilePath);
				});
			}
		}
		if (
			(nextProps.geoJsonUrl === "null" &&
				nextProps.geoJsonUrl !== this.props.geoJsonUrl) ||
			(!nextProps.geoJsonUrl && nextProps.geoJsonUrl !== this.props.geoJsonUrl)
		) {
			console.log("on toggle ", nextProps.geoJsonUrl);
			const map = this.mapRef.current.getMap();
			if (map.getLayer("Polygon")) {
				map.removeLayer("Polygon");
			}
			if (map.getSource("Polygon")) {
				map.removeSource("Polygon");
			}
			this.setState({ mapType: nextProps.options.type });
		}

		if (
			nextProps.fitBounds !== this.props.fitBounds &&
			nextProps.boundPointsCord.length !== this.props.boundPointsCord
		) {
			if (nextProps.fitBounds) {
				let width = window.innerWidth;
				let height = window.innerHeight;

				const viewport = new WebMercatorViewport({
					width: width - 50,
					height: height - 50,
				});
				const bounds = viewport.fitBounds(nextProps.boundPointsCord, {
					padding: 40,
					offset: [0, -40],
				});
				let newLatitude = bounds.latitude;
				let newLongitude = bounds.longitude;
				let newZoom = bounds.zoom;
				// console.log("we will see bound ", bounds, newLatitude, newLongitude);

				this.setState({
					viewport: {
						latitude: parseFloat(newLatitude),
						longitude: parseFloat(newLongitude),
						zoom: newZoom,
						transitionDuration: nextProps.transitionDuration,
						bearing: bounds.bearing || 0,
						pitch: bounds.pitch || 0,
					},
					popupInfo: null,
				});
			}
		} else if (!nextProps.fitBounds) {
			if (
				nextProps.latitude !== this.state.viewport.latitude &&
				nextProps.longitude !== this.state.viewport.longitude
			) {
				this.setState({
					viewport: {
						latitude: parseFloat(nextProps.latitude),
						longitude: parseFloat(nextProps.longitude),
						zoom: nextProps.zoom,
						transitionDuration: nextProps.transitionDuration,
						transitionInterpolator: new FlyToInterpolator(),
						bearing: nextProps.bearing || 0,
						pitch: nextProps.pitch || 0,
					},
					popupInfo: null,
				});
			}
		}
		if (
			nextProps.planeRoutes &&
			this.state.planeRoutes &&
			!_.isEqual(nextProps.planeRoutes, this.state.planeRoutes)
		) {
			this.setState({
				planeRoutes: [...nextProps.planeRoutes],
				popupInfo: null,
			});
		}
		if (
			nextProps.polyLines &&
			!_.isEqual(nextProps.polyLines, this.props.polyLines)
		) {
			let newPolyLines = _.cloneDeep(nextProps.polyLines);
			this.setState({ polyLines: newPolyLines });
		}

		if (
			nextProps.markers &&
			!_.isEqual(nextProps.markers, this.state.markers)
		) {
			let newMarkers = _.cloneDeep(nextProps.markers);
			this.setState({
				markers: newMarkers,
			});
		}
	}

	polyLinesColor = () => {
		let type = this.state.mapType;
		if (!type) {
			return "#FFFB0A";
		}
		switch (type) {
			case "vector":
				return "#f8961e";

			default:
				return "#FFFB0A";
		}
	};

	loadNewGeoJson = (map, fullFilePath) => {
		console.log("new geoJson path ", fullFilePath);

		fetch(fullFilePath)
			.then((res) => res.json())
			.then((data) => {
				map.addSource("Polygon", {
					type: "geojson",
					data: {
						...data,
					},
				});
				map.addLayer({
					id: "Polygon",
					type: "line",
					source: "Polygon",
					layout: {
						"line-join": "round",
						"line-cap": "round",
					},
					paint: {
						"line-color": "#A9A9A9",
						"line-width": 1,
					},
				});
			})
			.catch((err) => {
				console.log("error in fetching ", err);
			});
	};

	loadMapGeoJson = (map, fullFilePath, id) => {
		map.on("load", function () {
			fetch(fullFilePath)
				.then((res) => res.json())
				.then((data) => {
					map.addSource(id, {
						type: "geojson",
						data: {
							...data,
						},
					});
					map.addLayer({
						id: id,
						type: "line",
						source: id,
						layout: {
							"line-join": "round",
							"line-cap": "round",
						},
						paint: {
							"line-color": "#A9A9A9",
							"line-width": 1,
						},
					});
				})
				.catch((err) => {
					console.log("error in fetching ", err);
				});
		});
	};

	_onViewportChange = (viewport) => {
		let data = {
			latitude: viewport.latitude,
			longitude: viewport.longitude,
			zoom: viewport.zoom,
			transitionDuration: 3000,
		};
		if (this.props.onchangeMapPosition) {
			this.props.onchangeMapPosition(data);
		}
		this.setState({ viewport });
	};

	_renderMarker = (mark, index) => {
		// console.log('lets see the marker ok', mark, this.props);

		if (
			!mark ||
			!mark.coordinate ||
			!isFloat(mark.coordinate.longitude) ||
			!isFloat(mark.coordinate.latitude)
		) {
			return null;
		}
		return (
			<MarkerComponent
				key={`marker-${index}`}
				markerData={mark}
				longitude={mark.coordinate.longitude}
				latitude={mark.coordinate.latitude}
				onClick={() => {
					// console.log("mark====", mark);
					this.setState({ popupInfo: mark });
				}}
				markerSize={this.props.markerSize}
				markerColor={mark.color || this.props.markerColor}
				iconType={mark.iconType}
				iconDirection={mark.coordinate.direction}
			/>
		);
	};

	_renderCallOuts = (mark, index) => {
		if (
			mark &&
			mark.callOut &&
			mark.coordinate &&
			isFloat(mark.coordinate.longitude) &&
			isFloat(mark.coordinate.latitude)
		) {
			return (
				<Popup
					key={`marker-popup-${index}`}
					tipSize={5}
					anchor="top"
					longitude={mark.coordinate.longitude}
					latitude={mark.coordinate.latitude}
					closeButton={false}
				>
					{mark.callOut.text}
				</Popup>
			);
		} else {
			return null;
		}
	};

	_renderPopup() {
		const { popupInfo } = this.state;
		// console.log("in the  pop up map", popupInfo);

		return (
			popupInfo && (
				<Popup
					tipSize={5}
					anchor="top"
					longitude={popupInfo.coordinate.longitude}
					latitude={popupInfo.coordinate.latitude}
					closeOnClick={false}
					onClose={() => this.setState({ popupInfo: null })}
				>
					{popupInfo.infoHTML ? (
						<div>
							<HTMLCard cardHTML={popupInfo.infoHTML} />
						</div>
					) : (
						<div>
							<div>
								<p>
									<strong>{popupInfo.title}</strong>
								</p>
								<p>{popupInfo.description}</p>
							</div>
						</div>
					)}
				</Popup>
			)
		);
	}

	renderPolyLines = (polyLines) => {
		if (!polyLines || polyLines.length === 0) {
			return null;
		}
		if (this.context?.editorContext?.showEditor) {
			return null;
		}

		// console.log("polyLines ********** ", polyLines);

		let nodes = [];
		polyLines.forEach((pl, index) => {
			if (pl && pl.coordinates) {
				let points = [];
				pl.coordinates.forEach((c) => {
					if (c && isFloat(c.longitude) && isFloat(c.latitude)) {
						points.push([c.longitude, c.latitude]);
					}
				});
				if (points.length > 0) {
					nodes.push(
						<PolylineOverlay
							color={pl.color}
							key={index}
							points={points}
							polyWidth={pl.width || 3}
						/>
					);
				}
			}
		});

		return nodes.length > 0 ? nodes : null;
	};

	renderPlaneRoutes = (planeRoutes) => {
		if (!planeRoutes || planeRoutes.length === 0) {
			return null;
		}
		// console.log("planeRoutes ********** ", planeRoutes);

		let nodes = [];
		planeRoutes.forEach((planeRoute, index) => {
			if (
				planeRoute &&
				planeRoute.start &&
				planeRoute.end &&
				isFloat(planeRoute.start.longitude) &&
				isFloat(planeRoute.start.latitude) &&
				isFloat(planeRoute.end.longitude) &&
				isFloat(planeRoute.end.latitude)
			) {
				nodes.push(
					<CircleRoute
						key={index}
						route={planeRoute}
						routeWidth={planeRoute.width || 3}
					/>
				);
			}
		});
		return nodes.length > 0 ? nodes : null;
	};

	_onClick = (event, options) => {
		// console.log('on click of map ====== ', event, options);
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_MAP_RESPONSE;
		responseChat.message = {
			type: MessageTypeConstants.MESSAGE_TYPE_MAP_RESPONSE,
			mapId: options.mapId,
			location: {
				latitude: event.lngLat[1],
				longitude: event.lngLat[0],
			},
		};
		// console.log('message to send ====== ', responseChat);
		this.props.sendAMessage(responseChat, true);
	};

	render() {
		const { viewport, planeRoutes, polyLines } = this.state;
		const { thumb, markers, options } = this.props;
		let mapStyle;

		if (options) {
			switch (options.type) {
				case "streetSat":
					mapStyle = MapStyles.STREET_SATELLITE;
					break;
				case "Sat":
					mapStyle = MapStyles.SATELLITE;
					break;
				default:
					mapStyle = MapStyles.MAP_WITH_MARKERS;
					break;
			}
		} else {
			mapStyle = MapStyles.MAP_WITH_MARKERS;
		}

		if (
			typeof viewport.latitude !== "number" ||
			typeof viewport.longitude !== "number"
		) {
			// console.log('checking lat long', viewport);

			return (
				<div className="text-center p-3">
					Latitude and Longitude should be valid numbers.
				</div>
			);
		}

		// if (!isFloat(viewport.longitude) || !isFloat(viewport.latitude)) {

		if (this.props.source === "frontm") {
			mapStyle = Config.mapURL;
			return (
				<ReactMapGL
					ref={this.mapRef}
					onClick={(e) => this._onClick(e, options)}
					ariaLabel="map-view"
					tabIndex="0"
					{...viewport}
					width="100%"
					className="mapGlComponent"
					height={thumb ? 200 : "100%"}
					mapStyle={mapStyle}
					onViewportChange={this._onViewportChange}
					transitionInterpolator={new FlyToInterpolator({ curve: 1, speed: 5 })}
					transitionEasing={d3.easePoly.exponent(1)}
				>
					{this.renderPolyLines(polyLines)}
					{this.renderPlaneRoutes(planeRoutes)}
					{markers && markers.map(this._renderMarker)}
					{markers && markers.map(this._renderCallOuts)}
					{this._renderPopup()}
				</ReactMapGL>
				// </div>
			);
		}

		return (
			<ReactMapGL
				ref={this.mapRef}
				onClick={(e) => this._onClick(e, options)}
				ariaLabel="map-view"
				tabIndex="0"
				{...viewport}
				width="100%"
				className="mapGlComponent"
				height={thumb ? 200 : "100%"}
				mapStyle={mapStyle}
				onViewportChange={this._onViewportChange}
				mapboxApiAccessToken={Config.mapboxApiAccessToken}
				transitionInterpolator={new FlyToInterpolator({ curve: 1, speed: 5 })}
				transitionEasing={d3.easePoly.exponent(1)}
			>
				{polyLines && this.renderPolyLines(polyLines)}
				{planeRoutes && this.renderPlaneRoutes(planeRoutes)}
				{markers && markers.map(this._renderMarker)}
				{markers && markers.map(this._renderCallOuts)}
				{this._renderPopup()}
				{this.context?.editorContext?.showEditor ? null : null}
			</ReactMapGL>
			// </div>
		);
	}
}

MapComponent.contextType = MapDrawActionContext;
