import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Typography, Button } from "@mui/material";
import { connect } from "react-redux";
import { changeSelectedConversation } from "../../State/actions/chats";

const GridContainer = styled("div")(({ theme }) => ({
	flexGrow: 1,
	background: theme.palette.action.selected,
	paddingTop: "20%",
}));

const StopCounter = styled(Button)(({ theme }) => ({
	marginLeft: theme.spacing(1),
}));

const ErrorBoundaryComponent = () => {
	const [counter, setCounter] = React.useState(10);
	const [status, setStatus] = React.useState("working");

	React.useEffect(() => {
		let secondCounterId;
		let counterId;
		if (status === "working") {
			counterId = setTimeout(() => setCounter(counter - 1), 1000);
		}

		if (counter === 0) {
			refreshPage();
		}
		return () => {
			clearTimeout(counterId);
			clearTimeout(secondCounterId);
		};
	}, [counter, status]);

	const refreshPage = () => {
		stopTimers();
		if (!["localhost"].includes(window.location.hostname)) {
			window.location.reload();
		}
	};
	const stopTimers = () => {
		setStatus("paused");
	};

	return (
		<GridContainer>
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
			>
				<Grid item>
					<Typography variant="h2" gutterBottom>
						Something went wrong.
					</Typography>
					<Typography variant="subtitle1" gutterBottom>
						Page will refresh in {counter} sec.
					</Typography>
					<Button variant="outlined" color="primary" onClick={refreshPage}>
						Refresh Now
					</Button>
					<StopCounter
						variant="outlined"
						color="secondary"
						onClick={stopTimers}
					>
						Stop Page Refresh
					</StopCounter>
				</Grid>
			</Grid>
		</GridContainer>
	);
};

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidCatch(error, info) {
		console.log(error, info);
		let updatedConversation = this.props.selectedConversation;
		if (updatedConversation) {
			updatedConversation["hasError"] = true;
		}
		this.props.changeSelectedConversation(updatedConversation);
	}

	render() {
		if (this.props.selectedConversation?.hasError) {
			return <ErrorBoundaryComponent />;
		}
		if (
			this.props.selectedConversation &&
			!this.props.selectedConversation.hasError
		) {
			return this.props.children;
		}
		return this.props.children;
	}
}

const mapStateToProps = (state) => {
	return { selectedConversation: state.chats.selectedConversation };
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeSelectedConversation: (updatedConversation) =>
			dispatch(changeSelectedConversation(updatedConversation, true)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
