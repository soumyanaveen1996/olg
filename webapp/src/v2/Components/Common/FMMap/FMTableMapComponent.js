import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(() => ({
	"& .head": {
		backgroundColor: "#e8e8e8",
		fontSize: 12,
		color: "#2a2d3c",
		fontWeight: 600,
	},
}));

const MainContainer = styled("div")(() => ({
	width: "100%",
}));

const PaperContainer = styled(Paper)(({ theme }) => ({
	width: "100%",
	marginBottom: theme.spacing(2),
}));

const MainTable = styled(Table)(() => ({
	minWidth: 750,
}));

const MainTableRow = styled(TableRow)(() => ({
	"&.Mui-selected, &.Mui-selected:hover": {
		backgroundColor: "#E6F6FA",
	},
}));

function EnhancedTableHead(props) {
	const { options, selectedRow, rows, handleSelectAllRows } = props;

	return (
		<TableHead>
			<TableRow>
				<StyledTableCell padding="none" align="left"></StyledTableCell>
				{options.selectableRows && (
					<StyledTableCell>
						<Checkbox
							checked={
								selectedRow && rows && selectedRow.length === rows?.length
									? true
									: false
							}
							onChange={(e) => handleSelectAllRows(e)}
							color="primary"
						/>
					</StyledTableCell>
				)}
				{options?.rowMenu && options?.rowMenu.length ? (
					<StyledTableCell size="small" />
				) : null}
				{options.actionableRows ? <StyledTableCell size="small" /> : null}
				{options?.columnNames &&
					Object.entries(options.columnNames)?.map(([k, v], i) => (
						<StyledTableCell key={`${k}-${i}`}>{v}</StyledTableCell>
					))}
			</TableRow>
		</TableHead>
	);
}

export default function FMTableMapComponent({
	optionsDetails,
	message,
	handleAction,
	handleCall,
	conversationId,
	parentTabId,
	parentDocId,
}) {
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("calories");
	const [selected, setSelected] = useState([]);
	const [rows, setRows] = useState([]);
	const [selectedRow, setSelectedRow] = useState(null);

	const handleSelectAllRows = (e) => {
		if (e.target.checked) {
			setSelectedRow(rows);
		} else {
			setSelectedRow(null);
		}
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	return (
		<MainContainer>
			<PaperContainer>
				<TableContainer component={Paper}>
					<MainTable
						size="medium"
						stickyHeader
						aria-labelledby="tableTitle"
						aria-label="enhanced table"
					>
						<EnhancedTableHead
							options={optionsDetails}
							rows={message}
							selectedRow={selectedRow}
							handleSelectAllRows={handleSelectAllRows}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{message?.map((row, index) => {
								const isEven = !!(index % 2);
								const isItemSelected = isSelected(row.name);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<MainTableRow
										onClick={(event) => handleClick(event, row.name)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										sx={
											isEven && {
												backgroundImage:
													"linear-gradient(rgba(244,244,244,0.8), rgba(244,244,244,0.8))",
												"&.Mui-selected, &.Mui-selected:hover": {
													backgroundImage:
														"linear-gradient(rgba(244,244,244,0.5), rgba(244,244,244,0.5)), linear-gradient(#E6F6FA, #E6F6FA)",
												},
											}
										}
										key={index}
										selected={isItemSelected}
									>
										<TableCell padding="checkbox" color="primary">
											<Checkbox
												checked={isItemSelected}
												color={"primary"}
												inputProps={{ "aria-labelledby": labelId }}
											/>
										</TableCell>
										{optionsDetails?.columnNames &&
											Object.entries(optionsDetails.columnNames)?.map(
												([k, v], i) => (
													<StyledTableCell key={`${k}-${i}`}>
														{v !== "value" && v !== "infoHTML"
															? row[v]
															: "dummyValue"}
													</StyledTableCell>
												)
											)}
									</MainTableRow>
								);
							})}
						</TableBody>
					</MainTable>
				</TableContainer>
			</PaperContainer>
		</MainContainer>
	);
}
