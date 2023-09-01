import React, { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material";

const StyledTableCellHead = styled(TableCell)(({ theme }) => ({
	fontSize: 12,
	color: "#2a2d3c",
	fontWeight: 600,
	whiteSpace: "nowrap",
	textTransform: "capitalize",
	backgroundColor: "transparent",
	padding: "10px 16px",
	borderBottom: "none",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	backgroundColor: "#e9eff8",
}));

const TableHeadComponent = ({
	options,
	isRowMenuAvialable,
	selectedRow,
	rows,
	handleSelectAllRows,
	showMandatory,
}) => {
	const [allowEdit, setAllowEdit] = useState(false);
	const [allowDelete, setAllowDelete] = useState(false);

	useEffect(() => {
		if (options?.allowEdit) {
			setAllowEdit(true);
		}
		if (options?.allowDelete) {
			setAllowDelete(true);
		}
	}, []);
	const isEdit = options?.rowMenu?.find((i) => i.name.includes("Edit"))?.name;
	const isDelete = options?.rowMenu?.find((i) =>
		i.name.includes("Delete")
	)?.name;
	const isOtherMenu = options?.rowMenu?.length > 0;

	//  &&
	// options?.rowMenu.length &&
	// options.rowMenu.filter((i) => {
	// 	if (i.name === isEdit) return;
	// 	if (i.name === isDelete) return;
	// 	return i;
	// })?.length > 0;

	return (
		<TableHead>
			<StyledTableRow>
				<StyledTableCellHead size="small" />

				{options.selectableRows && (
					<StyledTableCellHead>
						<Checkbox
							checked={
								!!(selectedRow && rows && selectedRow.length === rows?.length)
							}
							indeterminate={
								selectedRow &&
								selectedRow.length > 0 &&
								rows &&
								selectedRow.length < rows?.length
							}
							onChange={(e) => handleSelectAllRows(e)}
							color="primary"
						/>
					</StyledTableCellHead>
				)}

				{options?.rowMenu && options?.rowMenu.length && isOtherMenu ? (
					<StyledTableCellHead size="small" />
				) : isRowMenuAvialable ? (
					<StyledTableCellHead size="small" />
				) : null}

				{options.actionableRows ? <StyledTableCellHead size="small" /> : null}
				{options?.columnNames &&
					Object.entries(options.columnNames)?.map(([k, v], i) => {
						let column = options?.columnTemplate?.find((item) => item.id === k);
						return (
							<StyledTableCellHead key={`${k}-${i}`}>
								{showMandatory && column?.mandatory ? (
									<>
										<span style={{ color: "red" }}>*</span> {v}
									</>
								) : (
									v
								)}
							</StyledTableCellHead>
						);
					})}
				{Boolean(allowEdit) || Boolean(allowDelete) ? (
					<StyledTableCellHead size="small" />
				) : null}
			</StyledTableRow>
		</TableHead>
	);
};

export default TableHeadComponent;
