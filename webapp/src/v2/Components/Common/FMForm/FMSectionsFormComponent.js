/* eslint-disable no-inner-declarations */
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TableCell from "@mui/material/TableCell";
import { Table } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FMTable } from "../../Common";

const MainTable = styled(Table)(() => ({
	width: "100%",
	"& .MuiTableCell-root": {
		borderBottom: "none",
	},
}));

const AccordionTable = styled(TableContainer)(() => ({
	// width: "60%",
	overflowX: "inherit",
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
		border: "none",
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
	},
}));

const TitleTypography = styled(Typography)(() => ({
	color: "#44485A",
	fontFamily: "SF Pro Display Bold",
	fontSize: 16,
}));

const AccordionM = styled((props) => (
	<Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	alignSelf: "center",
	margin: "15px 30px",
	borderRadius: "20px",
	boxShadow: "0 2px 4px 0 #dbe4f9",
	"&:before": {
		display: "none",
	},
	"&.MuiAccordion-root:first-of-type": {
		marginTop: "36px",
	},
}));

const AccordionSummaryM = styled((props) => (
	<AccordionSummary
		expandIcon={
			!Boolean(props.disableiconflag) && (
				<ExpandMoreIcon
					sx={{
						fontSize: "1.75rem",
						color: "#44485A",
					}}
				/>
			)
		}
		aria-controls="panel1d-content"
		id="panel1d-header"
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#44485A" : "white",
	borderRadius: "10px",
	flexDirection: "row-reverse",
	"& .MuiAccordionSummary-expandIcon": {
		transform: "rotate(90deg)",
	},
	"& .MuiAccordionSummary-expandIcon.Mui-expanded": {
		transform: "rotate(270deg)",
	},
	"& .MuiAccordionSummary-content": {
		marginLeft: 8,
	},
	"& .MuiAccordionSummary-content > .MuiTypography-body1 ": {
		fontWeight: 600,
	},
}));

const AccordionDetailsM = styled(AccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: "0px",
}));

const Container = styled("div")(({ theme }) => ({
	// display: "flex",
	// justifyContent: "center",
	// flexDirection: "column",
	// maxWidth: "55%",
	width: "60%",
	// [theme.breakpoints.between("md", "lg")]: {
	// 	width: "70%",
	// 	transition: "width 2s",
	// },
	paddingLeft: 16,
	minWidth: "max-content",
}));

const StyledGrid = styled(Grid)({
	// maxWidth: "55%",
	width: "55%",
	marginLeft: "14px !important",
});

function FMSectionsFormComponent({
	conversation,
	fields,
	options,
	collectionData,
	handleAction,
	updateRedux,
	handleConfirm,
	handleCancel,
	genericError,
	renderFields,
	disableSubmit,
	parentTabId,
	parentDocId,
}) {
	const [expanded, setExpanded] = React.useState(function () {
		const expandedArr = Object.entries(options.sections).map(
			([section_id, section_value], index) => {
				if (
					!section_value.collapsable ||
					!section_value.defaultCollapsableState
				) {
					return section_id;
				}
			}
		);
		return expandedArr;
	});

	const sections_available = Object.keys(options.sections) || [];

	const processed_fields = fields.filter((fld, index) => {
		if (fld.section) {
			if (sections_available.includes(fld.section)) {
				if (fld.column !== null && fld.column !== undefined) {
					if (
						Number.isInteger(fld.column) &&
						fld.column + 1 >= 1 &&
						fld.column + 1 <= options.sections[fld.section].columns
					) {
						return true;
					}
					console.warn(
						"This field does not have the right value for column property",
						fld
					);
					return false;
				}
				console.warn("This field does not have column property", fld);
				return false;
			}
			console.warn(
				"This field does not have right value for section property",
				fld
			);
			return false;
		}
		console.warn("This field does not have section property", fld);
		return false;
	});

	const handleChange = (sectionId) => (event, newExpanded) => {
		setExpanded((prevVal) =>
			newExpanded
				? [...prevVal, sectionId]
				: prevVal.filter((vl) => vl !== sectionId)
		);
	};

	const showForCollectionTpl = ({ options, rows }) => {
		return <FMTable
			conversation={conversation}
			options={options}
			message={rows}
			{...options}
			parentTabId={parentTabId}
			parentDocId={parentDocId}
		/>
	};

	const showRegularTpl = (processed_fields_by_section_id, section_value) => (
		<TableBody>
			{Array.isArray(processed_fields_by_section_id) && section_value.columns === 2
				? processed_fields_by_section_id?.map(
					([field1, field2], index) => {
						const comp1 = field1 && renderFields(field1, true);
						const comp2 = field2 && renderFields(field2, true);
						return (
							<TableRow key={field1.id}>
								{comp1}
								{field2 ? comp2 : null}
							</TableRow>
						);
					}
				)
				: processed_fields_by_section_id?.map((field, index) => {
					const comp = renderFields(field, true);
					return <TableRow key={field.id}>{comp}</TableRow>;
				})}
		</TableBody>
	);

	const arr = Object.entries(options.sections)
		.filter(([section_id, section_value]) => !section_value.hidden)
		.map(([section_id, section_value], index) => {
			let processed_fields_by_section_id = processed_fields.filter(
				(fld) => section_id === fld.section
			);

			if (section_value.columns === 2) {
				let array = [];
				let mem_of_array = [];
				const blank_field = { type: "blank" };
				const no_field = { type: "no_field" };

				for (let i = 0; i < processed_fields_by_section_id.length; i++) {
					if (processed_fields_by_section_id[i].column === 0) {
						if (mem_of_array[0]) {
							if (
								["file_field", "buttons_field"].includes(mem_of_array[0].type)
							) {
								mem_of_array[1] = no_field;
							} else {
								mem_of_array[1] = blank_field;
							}
							array = [...array, [...mem_of_array]];
							mem_of_array = [];
						}
						mem_of_array[0] = processed_fields_by_section_id[i];
					} else if (processed_fields_by_section_id[i].column === 1) {
						if (mem_of_array[0]) {
							if (
								["file_field", "buttons_field"].includes(mem_of_array[0].type)
							) {
								mem_of_array[1] = no_field;
								array = [...array, [...mem_of_array]];
								mem_of_array = [];
								mem_of_array[0] = blank_field;
								mem_of_array[1] = processed_fields_by_section_id[i];
								array = [...array, [...mem_of_array]];
								mem_of_array = [];
							} else {
								mem_of_array[1] = processed_fields_by_section_id[i];
								array = [...array, [...mem_of_array]];
								mem_of_array = [];
							}
						} else {
							mem_of_array[0] = blank_field;
							mem_of_array[1] = processed_fields_by_section_id[i];
							array = [...array, [...mem_of_array]];
							mem_of_array = [];
						}
					}
				}
				if (mem_of_array[0] && !mem_of_array[1]) {
					if (["file_field", "buttons_field"].includes(mem_of_array[0].type)) {
						mem_of_array[1] = no_field;
					} else {
						mem_of_array[1] = blank_field;
					}
					array = [...array, [...mem_of_array]];
				} else if (!mem_of_array[0] && mem_of_array[1]) {
					mem_of_array[0] = blank_field;
					array = [...array, [...mem_of_array]];
				}
				// console.log("hiiiiiii", processed_fields_by_section_id, array);
				processed_fields_by_section_id = array;
			}

			return (
				<AccordionM
					key={index}
					expanded={!section_value.collapsable || expanded.includes(section_id)}
					onChange={handleChange(section_id)}
				>
					<AccordionSummaryM
						disableiconflag={(!section_value.collapsable).toString()}
						sx={!section_value.collapsable && { pointerEvents: "none" }}
					>
						<TitleTypography>{section_value.label}</TitleTypography>
					</AccordionSummaryM>
					<AccordionDetailsM>
						<AccordionTable>
							<MainTable aria-label="customized table">
								{section_value.forCollection ? showForCollectionTpl(collectionData[section_id]) : showRegularTpl(processed_fields_by_section_id, section_value)}
							</MainTable>
						</AccordionTable>
					</AccordionDetailsM>
				</AccordionM>
			);
		});
	return (
		<>
			<Container>{arr}</Container>
			{(options?.confirm || options?.cancel) && (
				<TableContainer>
					<MainTable aria-label="customized table">
						<TableBody>
							<TableRow>
								<TableCell colSpan={2}>
									<StyledGrid
										container
										spacing={2}
										direction="row"
										justifyContent="left"
										alignItems="center"
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
												<CancelButton
													variant="outlined"
													onClick={() => handleCancel()}
												>
													{options?.cancel}
												</CancelButton>
											)}
										</Grid>
									</StyledGrid>
								</TableCell>
							</TableRow>
						</TableBody>
					</MainTable>
				</TableContainer>
			)}
		</>
	);
}

export default FMSectionsFormComponent;
