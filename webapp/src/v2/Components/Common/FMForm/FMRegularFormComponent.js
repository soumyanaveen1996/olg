/* eslint-disable no-inner-declarations */
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box, styled } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	// body: {
	fontSize: 14,
	// },
}));

const StyledTableContainer = styled(TableContainer)(({ theme, isModal }) => ({
	padding: isModal ? "0 0 15px 0" : "25px 0",
	alignSelf: "center",
}));

const StyledTable = styled(Table)({
	overflowX: "inherit",
	// width: "60%",
	"& .MuiTableCell-root": {
		borderBottom: "none",
	},
});

const StyledGrid = styled(Grid)(({ theme, isModal }) => ({
	// maxWidth: "55%",
	width: !isModal ? "55%" : "auto",
	...(!isModal && { marginLeft: "30px", }),
	[theme.breakpoints.between("md", "lg")]: {
		width: "100%",
		transition: "width 2s",
	},
}));

const MainButton = styled(Button)(() => ({
	border: "none",
	padding: "7px 45px",
	borderRadius: 20,
	textTransform: "inherit",
	"&:hover": {
		border: "none",
	},
}));

const Container = styled("div")(({ theme, isModal }) => ({
	// display: "flex",
	// justifyContent: "center",
	// flexDirection: "column",
	// maxWidth: "55%",
	width: !isModal ? "60%" : "100%",
	// [theme.breakpoints.between("md", "lg")]: {
	// 	width: "100%",
	// },
	...(!isModal && { paddingLeft: 16, }),
	minWidth: "max-content",
}));

const CancelButton = styled(MainButton)(() => ({
	backgroundColor: "#e0e8ff",
	color: "#638dff",
	border: "none",
	fontFamily: "SF Pro Text Bold",
	fontSize: 14,
	boxShadow: "none",
	"&:hover": {
		backgroundColor: "#eef2ff",
	},
	"&:focus": {
		boxShadow: "0 0 6px 0 rgba(99, 141, 255, 0.6)",
		backgroundColor: "#eef2ff",
	},
	"&:disabled": {
		backgroundColor: "#e8ecf8",
		color: "#aeb8d6",
	},
}));

const ConfirmButton = styled(MainButton)(() => ({
	backgroundColor: "#638dff",
	color: "#FFFFFF",
	fontFamily: "SF Pro Text Bold",
	fontSize: 14,
	boxShadow: "none",
	"&:hover": {
		backgroundColor: "#4c71d6",
	},
	"&:focus": {
		boxShadow: "0 0 6px 0 #638dff !important",
	},
	"&:disabled": {
		backgroundColor: "#aeb8d6",
		color: "#e8ecf8",
		border: "none",
	},
}));

function FMRegularFormComponent({
	conversation,
	fields,
	options,
	handleAction,
	updateRedux,
	handleConfirm,
	handleCancel,
	genericError,
	renderFields,
	disableSubmit,
}) {
	let count = 0;
	let isModal = options?.modal;
	return (
		<>
			<Container isModal>
				<StyledTableContainer isModal component={isModal ? Box : Paper}>
					<StyledTable aria-label="customized table">
						<TableBody>
							{Array.isArray(fields) &&
								fields?.map((field, index) => {
									const comp = renderFields(field);
									if (comp !== null) {
										count++;
									}
									// if (count % 2 !== 0) {
									// 	return <StyledTableRow key={field.id}>{comp}</StyledTableRow>;
									// }
									return <TableRow key={field.id}>{comp}</TableRow>;
								})}
						</TableBody>
					</StyledTable>
				</StyledTableContainer>
			</Container>
			{(options?.confirm || options?.cancel) && (
				<StyledGrid
					container
					spacing={2}
					isModal
					marginBottom="6px"
					marginTop="0px"
					paddingBottom="8px"
					justifyContent="left"
				>
					<Grid item>
						{options?.confirm && (
							<ConfirmButton
								variant="contained"
								disabled={disableSubmit}
								onClick={() => handleConfirm()}
							>
								{options?.confirm}
							</ConfirmButton>
						)}
					</Grid>
					<Grid item>
						{options?.cancel && (
							<CancelButton variant="outlined" onClick={() => handleCancel()}>
								{options?.cancel}
							</CancelButton>
						)}
					</Grid>
				</StyledGrid>
			)}
		</>
	);
}

export default FMRegularFormComponent;
