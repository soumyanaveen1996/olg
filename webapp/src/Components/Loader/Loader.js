import React from "react";
import { useSelector } from "react-redux";
import {
	Dialog,
	DialogTitle,
	DialogContentText,
	DialogContent,
	Typography,
} from "@mui/material";

import "./loader.css";
import CircularLoaderBar from "./CircularLoaderBar";

const Loader = () => {
	const loader = useSelector((state) => state.loader);
	const botsForThisDomain = useSelector((state) => state.user.botSubscriptions);

	// let loader = {
	// 	botWaitLoader: false,
	// 	process: ["This process might take some time", "Installing bot EMR"],
	// };
	if (loader?.process.length) {
		// if (true) {
		return (
			<Dialog
				fullWidth
				maxWidth={"md"}
				aria-labelledby="simple-dialog-title"
				open={loader?.process.length > 0 ? true : false}
				disableEscapeKeyDown
				style={{ textAlign: "center" }}
			>
				{/* <DialogTitle id="max-width-dialog-title">
					Process will take few moments
				</DialogTitle>
				<DialogContent>
					{loader?.process &&
						loader.process.map((item, index) => (
							<DialogContentText key={"process-" + index}>
								{item}...
							</DialogContentText>
						))}
					<div>
						<img src="/img/setupSpinner.svg" height="200" width="200" />
					</div>
				</DialogContent> */}
				<div className="circularBarComponent">
					<CircularLoaderBar botsForThisDomain={botsForThisDomain} />
				</div>

				<DialogContent>
					{loader?.process &&
						loader.process.map((item, index) => (
							<DialogContentText
								key={"process-" + index}
								fontSize="14px"
								color="#4f5b7d"
								marginBottom="10px"
							>
								{item}
							</DialogContentText>
						))}
				</DialogContent>
				<p className="Loader_Bottom_Content">
					This window will close automatically when the loading is complete
				</p>
			</Dialog>
		);
	}
	// return null;
};

export default Loader;
