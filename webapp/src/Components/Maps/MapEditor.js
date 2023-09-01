import React, { useState, useContext, useEffect } from "react";
import { ButtonGroup, Button } from "reactstrap";
import circle from "@turf/circle";
import bbox from "@turf/bbox";
import bboxPolygon from "@turf/bbox-polygon";
import short from "short-uuid";
import { MapDrawActionContext } from "../Maps/MapEditorActionContext";

let translator = short();

const getPolygon = (map) => {
	let radius = window.innerHeight * 0.8;
	let { lng, lat } = map.getCenter();
	let _circle = circle([lng, lat], radius, { steps: 64 });
	let _box = bbox(_circle);
	let { type, properties, geometry } = bboxPolygon(_box);

	return [
		{
			id: translator.generate(),
			type,
			properties,
			geometry,
		},
	];
};

const getTriangle = (map) => {
	let [feature_traingle] = getPolygon(map);
	let new_geometry = removeFourth(feature_traingle?.geometry?.coordinates[0]);
	feature_traingle.geometry.coordinates[0] = new_geometry;
	return [feature_traingle];
};

const removeFourth = ([a, b, c, d, e]) => [a, b, c, e];

const MODES = {
	polygon: getPolygon,
	triangle: getTriangle,
	// circle: getCircle,
	clear: null,
};

const MapEditor = ({ map }) => {
	// const [box, setBox] = useState([]);
	const [mode, setMode] = useState(null);
	const [boxColor, setBoxColor] = useState({
		stroke: "rgb(0, 120, 255)",
		fill: "rgb(0, 120, 255, 0.5)",
	});
	const { shapeContext, colorContext, boxContext } =
		useContext(MapDrawActionContext);

	// Get Value Changes from React context

	let { color } = colorContext;
	let { shape } = shapeContext;
	let { box, setBox } = boxContext;

	const switchColor = (color) => setBoxColor(color);
	const switchMode = (mode) => {
		setBox([]);
		let modeHandler = MODES[mode];
		let currentMap = map?.current ? map.current.getMap() : null;
		if (currentMap && modeHandler) {
			let feature_set = modeHandler(currentMap);
			setBox(feature_set);
			//Change Mode to Edit
			mode = "edit";
			return;
		}
		if (!modeHandler) {
			return setMode(null);
		}
		if (!currentMap) {
			throw new Error("Map has not Loaded");
		}
	};

	// Recalculate Switch Mode Only if 'shape' or 'color' changes
	useEffect(() => switchMode(shape), [shape]);
	useEffect(() => switchColor(color), [color]);

	const onSelect = (obj) => {};

	const onUpdate = (obj) => {
		let { data } = obj;
		setBox(data);
	};

	return null;
};

export default React.memo(MapEditor);
