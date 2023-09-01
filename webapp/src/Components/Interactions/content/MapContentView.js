import React, { PureComponent } from "react";
import MapComponent from "../../Maps/MapComponent";
import UrlCard from "../cards/maps/UrlCard";
import DataCard from "../cards/maps/DataCard";
import ActionCard from "../cards/maps/ActionCard";
import CardInMap from "../cards/maps/CardInMap";

let CARD_COMPONENTS = {
	data_card: DataCard,
	url_card: UrlCard,
	action_card: ActionCard,
};

export function isFloat(n) {
	return Number(n) === n && n % 1 !== 0;
}

class MapContentView extends PureComponent {
	constructor(props) {
		super(props);
		this.cardRef = React.createRef();
		this.state = {
			adjustedWidth: -1,
		};
	}

	componentDidMount() {
		let containerEl = document.getElementById("chat-content-view");
		if (containerEl) {
			this.setState({ adjustedWidth: containerEl.clientWidth });
		}
	}

	setMapReference = (map) => this.setState({ mapRef: map });

	render() {
		let { data, options = {}, thumb } = this.props;
		console.log("MapcontentView =======", this.props);
		if (Array.isArray(data)) {
			data = data[0];
		}
		if (!data) {
			return null;
		}

		let { region, markers, polylines, planeRoutes, cards = [] } = data;

		// if (cards && cards.length > 0) {
		//   cards = cards.filter(card => card.cardType);
		// }

		if (
			cards &&
			markers &&
			cards.length === markers.length &&
			cards.length > 0 &&
			markers.length > 0
		) {
			for (let i = 0; i < cards.length; i++) {
				for (let j = 0; j < markers.length; j++) {
					if (cards[i].cardId === markers[j].id) {
						cards[i]["iconType"] = markers[j].iconType;
					}
				}
			}
		}

		let boundPointsMap = {};
		if (markers) {
			markers.forEach((m) => {
				if (
					m &&
					m.coordinate &&
					isFloat(m.coordinate.longitude) &&
					isFloat(m.coordinate.latitude)
				) {
					boundPointsMap[m.coordinate.longitude + "_" + m.coordinate.latitude] =
						{
							latitude: m.coordinate.latitude,
							longitude: m.coordinate.longitude,
						};
				}
			});
		}
		let pls = [];
		if (polylines) {
			polylines.forEach((polyline) => {
				if (polyline.coordinates) {
					let pl = [];
					polyline.coordinates.forEach((c) => {
						if (c && isFloat(c.longitude) && isFloat(c.latitude)) {
							boundPointsMap[c.longitude + "_" + c.latitude] = {
								latitude: c.latitude,
								longitude: c.longitude,
							};
							pl.push(c);
						}
					});
					pls.push(pl);
				}
			});
		}

		if (planeRoutes) {
			planeRoutes.forEach((planeRoute) => {
				if (
					planeRoute.start &&
					planeRoute.end &&
					isFloat(planeRoute.start.longitude) &&
					isFloat(planeRoute.start.latitude) &&
					isFloat(planeRoute.end.longitude) &&
					isFloat(planeRoute.end.latitude)
				) {
					boundPointsMap[
						planeRoute.start.longitude + "_" + planeRoute.start.latitude
					] = {
						latitude: planeRoute.start.latitude,
						longitude: planeRoute.start.longitude,
					};
					boundPointsMap[
						planeRoute.end.longitude + "_" + planeRoute.end.latitude
					] = {
						latitude: planeRoute.end.latitude,
						longitude: planeRoute.end.longitude,
					};
				}
			});
		}

		let btKeys = Object.keys(boundPointsMap);
		let boundPoints = btKeys.map((key) => boundPointsMap[key]);
		let toFitBounds = boundPoints.length > 1;
		let toShowCards = !thumb && cards && cards.length > 0;
		let { adjustedWidth } = this.state;

		if (toFitBounds && boundPoints.length === 0) {
			return null;
		}

		if (!region) {
			return null;
		}

		if (!toFitBounds && (!region.latitude || !region.longitude)) {
			return null;
		}

		return (
			<div
				className="d-flex flex-column"
				style={{ height: "100%", width: "100%" }}
			>
				<div
					style={{
						height: toShowCards ? "calc(100vh - 71px - 250px)" : "100%",
					}}
				>
					<MapComponent
						width={toFitBounds ? 500 : "100%"}
						height={toFitBounds ? (thumb ? 200 : 500) : "100%"}
						toFitBounds={toFitBounds}
						boundPoints={boundPoints}
						options={options || {}}
						latitude={region ? region.latitude : null}
						longitude={region ? region.longitude : null}
						zoom={9}
						setMapReference={this.setMapReference}
						markers={
							markers || []
							// ? markers.map(marker => {
							//     return { ...marker.coordinate, callOut: marker.callOut };
							//   })
							// : null
						}
						markerSize={20}
						markerColor={"red"}
						polyLines={polylines}
						planeRoutes={planeRoutes}
					/>
				</div>

				{adjustedWidth !== -1 && toShowCards && (
					<div
						className="p-2 d-flex"
						style={{
							backgroundColor: "rgba(255,255,255,0.4)",
							height: "250px",
							overflowX: "auto",
							width: "58vw",
						}}
						ref={this.cardRef}
					>
						{cards.map((card, index) => {
							// if (!card.cardType) {
							//   return null;
							// }
							// let CardComponent = CARD_COMPONENTS[card.cardType];
							// if (!CardComponent) {
							//   return null;
							// }

							return (
								<div key={index} className="mx-1">
									<CardInMap mapId={options.mapId} {...card} />
								</div>
							);
						})}
					</div>
				)}
			</div>
		);

		// if (data.markers) {
		//   return (
		//     <MapWithMarkers
		//       width={"100%"}
		//       height={height || "100%"}
		//       markerSize={20}
		//       markerColor={"red"}
		//       points={data.markers.map(marker => {
		//         return { ...marker.coordinate, callOut: marker.callOut };
		//       })}
		//       thumb={this.props.thumb}
		//     />
		//   );
		// }
		//
		// if (data.polylines) {
		//   return (
		//     <MapWithRoute
		//       width={500}
		//       height={200}
		//       points={data.polylines[0].coordinates}
		//       thumb={this.props.thumb}
		//     />
		//   );
		// }
	}
}

export default MapContentView;
