import * as React from "react";
import PropTypes, { number } from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./circularLoaderBar.css";

function CircularProgressWithLabel(props) {
	return (
		<Box sx={{ position: "relative", display: "inline-flex" }}>
			<CircularProgress
				thickness={1.5}
				color="secondary"
				size="15vh"
				variant="determinate"
				{...props}
			/>
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{/* <Typography component="div" variant="caption">
					Loading
				</Typography> */}

				<Typography
					style={{ wordWrap: "break-word" }}
					variant="caption"
					component="div"
					color="text.secondary"
				>
					Loading <br></br>
					<p className="circularProgressPercentage">{`${Math.round(
						props.value
					)}%`}</p>
				</Typography>
			</Box>
		</Box>
	);
}

CircularProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate variant.
	 * Value between 0 and 100.
	 * @default 0
	 */
	value: PropTypes.number.isRequired,
};

function CircularLoaderBar({ botsForThisDomain }) {
	const [progress, setProgress] = React.useState(10);
	const [numberOfBots, setNumberOfBots] = React.useState(10);

	React.useEffect(() => {
		setNumberOfBots(botsForThisDomain?.length);
		let timeStamp = Math.floor(numberOfBots / 1.5);
		timeStamp = timeStamp * 100;
		const timer = setInterval(() => {
			setProgress((prevProgress) =>
				prevProgress >= 100 ? 100 : prevProgress + 10
			);
		}, timeStamp);
		return () => {
			clearInterval(timer);
		};
	}, [numberOfBots]);

	return <CircularProgressWithLabel value={progress} />;
}

export default CircularLoaderBar;
