import React from "react";
import { useDispatch } from "react-redux";
import { Grid, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ModalPopup from "../../ModalMessages/ModalPopup";
import { enable2faAuthModal } from "../../../State/actions/user";
import history from "../../../Services/History";

const GridMainContainer = styled(Grid)(({ theme }) => ({
	flexGrow: 1,
	textAlign: "center",
	padding: theme.spacing(3),
	justifyContent: "center",
	flexDirection: "column",
}));

const Subtitle = styled(Typography)(() => ({
	fontWeight: 600,
}));

const AuthBtn = styled(Button)(({ theme }) => ({
	width: "210px",
	marginTop: theme.spacing(2),
}));

const Enable2faAuthModal = () => {
	const dispatch = useDispatch();
	const closeModal = () => {
		dispatch(enable2faAuthModal(false));
	};

	return (
		<>
			<ModalPopup
				onClose={closeModal}
				size="md"
				noHeader
				className="dialler-modal"
				keyboard={false}
				backdrop="static"
				noBorder="no-border"
			>
				<>
					<GridMainContainer container spacing={3}>
						<Grid item xs={12}>
							<img src="./img/security-icon.png" alt="security" />
						</Grid>
						<Grid item xs={12}>
							<Subtitle variant="subtitle1">
								Two-factor authentication needed
							</Subtitle>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="subtitle1" gutterBottom>
								Please activate the two-factor authentication to open this app
							</Typography>
							<AuthBtn
								variant="contained"
								color="primary"
								size="small"
								onClick={() => {
									closeModal();
									history.push("/app/my-profile");
								}}
							>
								Go to settings
							</AuthBtn>
						</Grid>
					</GridMainContainer>
				</>
			</ModalPopup>
		</>
	);
};

export default Enable2faAuthModal;
