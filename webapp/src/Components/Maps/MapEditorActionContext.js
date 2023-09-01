// Passing State Between components using React context

import React, { createContext, useState } from "react";

export const MapDrawActionContext = createContext(undefined);

export const MapDrawActionProvider = ({ children }) => {
	const [shape, setShape] = useState(null);
	const [color, setColor] = useState(null);
	const [box, setBox] = useState([]);
	const [showEditor, setShowEditor] = useState(false);

	const shapeContext = {
		shape,
		setShape,
	};

	const colorContext = {
		color,
		setColor,
	};

	const boxContext = {
		box,
		setBox,
	};

	const editorContext = {
		showEditor,
		setShowEditor,
	};

	const drawContext = {
		shapeContext,
		colorContext,
		boxContext,
		editorContext,
	};

	return (
		<MapDrawActionContext.Provider value={drawContext}>
			{children}
		</MapDrawActionContext.Provider>
	);
};
