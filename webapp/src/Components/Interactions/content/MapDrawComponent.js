import React, { useState, useContext, useEffect } from "react";
import WindowTitle from "./WindowComponent/WindowTitle";
import WindowMinClose from "./WindowComponent/WindowMinClose";
import { MessageTypeConstants } from "../../../Services/Message";
import Draggable from "react-draggable";
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import "../Interactions.css";
import { MapDrawActionContext } from "../../Maps/MapEditorActionContext";

export const SHADES = {
	blue: {
		stroke: "rgb(0, 120, 255)",
		fill: "rgb(0, 120, 255, 0.5)",
	},
	skyBlue: {
		stroke: "rgb(102, 203, 237)",
		fill: "rgb(102, 203, 237, 0.5)",
	},
	green: {
		stroke: "rgb(0, 223, 81)",
		fill: "rgb(0, 223, 81, 0.5)",
	},
	orange: {
		stroke: "rgb(233, 203, 84)",
		fill: "rgb(233, 203, 84, 0.5)",
	},
	red: {
		stroke: "rgb(233, 90, 98)",
		fill: "rgb(233, 90, 98, 0.5)",
	},
	pink: {
		stroke: "rgb(233, 81, 190)",
		fill: "rgb(233, 81, 190, 0.5)",
	},
};

const MapDrawComponent = ({
	elem,
	index,
	chat,
	closeWindow,
	bringToTop,
	minimizeWindow,
	sendAMessage,
}) => {
	// State Management
	//
	let [name, setName] = useState("");
	let [description, setDescription] = useState("");
	let [disabled, setDisabled] = useState(true);
	let [boxString, setBoxString] = useState("");

	const { shapeContext, colorContext, boxContext, editorContext } =
		useContext(MapDrawActionContext);

	let { color, setColor } = colorContext;
	let { shape, setShape } = shapeContext;
	let { box, setBox } = boxContext;
	let { setShowEditor } = editorContext;

	const isMobile = window.innerWidth <= 600;
	let x = window.innerWidth - 0.4 * window.innerWidth;
	useEffect(() => {
		setShowEditor(true);
	}, []);
	useEffect(() => {
		if (!name || name === "") {
			return setDisabled(true);
		}

		if (!description || description === "") {
			return setDisabled(true);
		}
		if (!color) {
			return setDisabled(true);
		}
		if (box.length === 0) {
			return setDisabled(true);
		}
		setDisabled(false);
	}, [name, description, color, box, setDisabled]);

	useEffect(() => {
		if (box.length === 0) {
			return setBoxString("");
		}

		let coords = box[0].geometry.coordinates[0].reduce((acc, curr) => {
			return `${acc} [${curr[0]} , ${curr[1]}]  `;
		}, "Coordinates Selected(Add points by clicking on the geofence)\n");
		setBoxString(coords);
	}, [box]);

	const resetGeoFence = () => {
		setBox([]);
		setColor(null);
		setShape(null);
		setShowEditor(false);
	};
	// console.log("making map =======", color, shape, box);

	if (elem.minimize) {
		return (
			<div
				key={elem.messageId}
				className="d-flex flex-column draggable-component draggable-form-min-container"
				style={{
					bottom: 20,
					left: 40,
				}}
				onClick={(e) => minimizeWindow(elem, index)}
			>
				<div
					className="d-flex flex-row justify-content-between align-items-center mini-window-header"
					style={{ border: 0 }}
				>
					<WindowTitle title={elem.options.title} />
					<WindowMinClose
						windowElem={elem}
						index={index}
						chat={chat}
						responseMessageType={
							MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE
						}
						minimizeWindow={minimizeWindow}
						closeWindow={closeWindow}
						iconType="maximize-icon"
					/>
				</div>
			</div>
		);
	}
	// Change
	else {
		return (
			<Draggable
				bounds="parent"
				cancel=".nonGrabbale-body"
				key={elem.messageId}
				allowAnyClick={true}
				enableUserSelectHack={false}
				onStop={() => bringToTop(index)}
				defaultPosition={{ x: isMobile ? 0 : x, y: 0 }}
			>
				<div
					key={elem.messageId}
					className="d-flex flex-column draggable-component-geofence draggable-form-component-container"
					style={{
						zIndex: elem.addClass === "bringOnTop" ? "1000" : "999",
					}}
				>
					<div className="d-flex flex-row justify-content-between align-items-center mini-window-header">
						<div className="d-flex draggable-icon-container flex-row align-items-center p-2">
							<img
								className="draggable-icon"
								src="/img/move-icon@2x.png"
								alt="draggable-icon"
							/>
						</div>
						<WindowMinClose
							windowElem={elem}
							index={index}
							chat={chat}
							responseMessageType={
								MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE
							}
							minimizeWindow={minimizeWindow}
							closeWindow={closeWindow}
							iconType="minimize-icon"
						/>
					</div>
					<div className="d-flex flex-column nonGrabbale-body form-nonGrabbale-body">
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								height: "75px",
								padding: "0 15px",
								borderBottom: "1px solid #dedede",
							}}
						>
							<h1
								style={{
									fontSize: "18px",
									fontWeight: "bold",
									margin: 0,
								}}
							>
								Create Geo Fence
							</h1>
							<h3
								style={{
									fontSize: "14px",
									fontWeight: 500,
									margin: 0,
									color: "#666",
								}}
							>
								{elem.options.description}
							</h3>
						</div>
						<div className="d-flex h-100 w-100 align-items-start flex-column justify-content-start m-2 m-md-4 draggable-component-content">
							<Form className="w-75">
								<FormGroup>
									<Label for="geofencename">Name</Label>
									<Input
										type="text"
										name="GeoFenceName"
										id="geofencename"
										placeholder="Enter a name for the Geo Fence"
										value={name}
										onChange={(e) => {
											e.preventDefault();
											setName(e.target.value);
										}}
									/>
								</FormGroup>
							</Form>
							<Form className="w-75">
								<FormGroup>
									<Label for="description">Description</Label>
									<Input
										type="textarea"
										name="Description"
										id="description"
										value={description}
										onChange={(e) => {
											e.preventDefault();
											setDescription(e.target.value);
										}}
									/>
								</FormGroup>
							</Form>
							<Form>
								<FormGroup>
									<Label>Select a shape to start</Label>
									<div className="d-flex">
										<div
											id="polygon"
											className={
												shape === "polygon"
													? "shape-polygon m-2 shape-active"
													: "shape-polygon m-2"
											}
											onClick={(e) => {
												setShape("polygon");
												setColor(SHADES.blue);
											}}
										></div>
										<div
											id="triangle"
											className={
												shape === "triangle"
													? "shape-triangle-active m-2 "
													: "shape-triangle m-2"
											}
											onClick={(e) => {
												setShape("triangle");
												setColor(SHADES.blue);
											}}
										></div>
									</div>
								</FormGroup>
							</Form>
							<Form>
								<FormGroup>
									<Label for="coords">Color Code</Label>
									<Container fluid>
										<Row>
											<Col className="p-0">
												<div
													className={
														color === SHADES.blue
															? "shape-circle shape-circle-blue m-1 shape-active shape-color-active"
															: "shape-circle shape-circle-blue m-1"
													}
													onClick={() => setColor(SHADES.blue)}
												/>
											</Col>
											<Col className="p-0">
												<div
													className={
														color === SHADES.skyBlue
															? "shape-circle shape-circle-light-blue m-1 shape-active shape-color-active"
															: "shape-circle shape-circle-light-blue m-1"
													}
													onClick={() => setColor(SHADES.skyBlue)}
												/>
											</Col>
											<Col className="p-0">
												<div
													className={
														color === SHADES.green
															? "shape-circle shape-circle-green m-1 shape-active shape-color-active"
															: "shape-circle shape-circle-green m-1"
													}
													onClick={() => setColor(SHADES.green)}
												/>
											</Col>
											<Col className="p-0">
												<div
													className={
														color === SHADES.orange
															? "shape-circle shape-circle-orange m-1 shape-active shape-color-active"
															: "shape-circle shape-circle-orange m-1"
													}
													onClick={() => setColor(SHADES.orange)}
												/>
											</Col>
											<Col className="p-0">
												<div
													className={
														color === SHADES.red
															? "shape-circle shape-circle-red m-1 shape-active shape-color-active"
															: "shape-circle shape-circle-red m-1"
													}
													onClick={() => setColor(SHADES.red)}
												/>
											</Col>
											<Col className="p-0">
												<div
													className={
														color === SHADES.pink
															? "shape-circle shape-circle-pink m-1 shape-active shape-color-active"
															: "shape-circle shape-circle-pink m-1"
													}
													onClick={() => setColor(SHADES.pink)}
												/>
											</Col>
										</Row>
									</Container>
								</FormGroup>
							</Form>
							<Form className="w-75 ">
								<FormGroup>
									<Label>Coordinates</Label>
									<Input
										className="text-area-coords"
										type="textarea"
										name="coords"
										id="coords"
										readonly={true}
										value={boxString}
									/>
								</FormGroup>
							</Form>

							<div className="d-flex w-100 mt-2 align-items-center justify-content-center">
								<button
									disabled={disabled}
									type="button"
									className="btn btn-primary mr-2"
									onClick={() => {
										let geoCoordinate = box[0];
										let responseChat = {
											messageType:
												MessageTypeConstants.MESSAGE_TYPE_GEOFENCE_RESPONSE,
											message: {
												controlId: elem.options.controlId,
												action: "save",
												content: {
													id: geoCoordinate.id,
													name,
													description,
													color,
													coordinates: box,
												},
											},
										};
										sendAMessage(responseChat, true);
										closeWindow(
											index,
											MessageTypeConstants.MESSAGE_TYPE_GEOFENCE,
											elem.options.controlId,
											{}
										);
										resetGeoFence();
									}}
								>
									Create
								</button>
								<button
									type="button"
									className="btn btn-danger"
									onClick={() => {
										closeWindow(
											index,
											MessageTypeConstants.MESSAGE_TYPE_GEOFENCE,
											elem.options.controlId,
											{}
										);
										resetGeoFence();
									}}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</Draggable>
		);
	}
};

export default MapDrawComponent;
