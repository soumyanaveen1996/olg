import React from "react";
import { useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";

const FMNavLoader = () => {
	const botWaitLoader = useSelector((state) => state.loader.botWaitLoader);
	if (botWaitLoader) {
		return <LinearProgress style={{ zIndex: 999, marginBottom: "-4px" }} />;
	}
	return null;
};

export default FMNavLoader;
