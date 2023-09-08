import React, { useState, useRef, useEffect } from "react";
import { IconButton, Tooltip, TextField, InputAdornment } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useSelector, shallowEqual } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import { isEmpty } from "ramda";
import { styled } from "@mui/material/styles";

const LookupDropCustom = styled("li")(() => ({
	display: "flex",
	width: "100%",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between !important",
	padding: "8px 20px",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: "#eeeeee",
	},
}));

const filter = createFilterOptions();

const FMFilterComponent = ({
	options,
	handleAction,
	updateReduxFlags,
	setActiveFilterName,
	addNewFilter,
}) => {
	const [filterName, setFilterName] = useState(function () {
		return options?.activeFilterName
			? { value: options?.activeFilterName, title: options?.activeFilterName }
			: null;
	});
	const [filters] = useState(function () {
		return (
			options?.availableFilters?.map((item) => {
				return { ...item, title: item.name, value: item.name };
			}) || []
		);
	});
	const isOnline = useSelector((state) => state.user.isOnline, shallowEqual);
	const clickedActions = useRef(false);

	useEffect(() => {
		if (clickedActions.current) {
			setTimeout(() => {
				clickedActions.current = false;
			}, 500);
		}
	}, [clickedActions.current]);

	const handleOnClickFilter = () => {
		if (filters?.length) {
			updateReduxFlags({
				openDrawer: false,
				showFilterSearchInput: true,
			});
		} else {
			updateReduxFlags({
				openDrawer: false,
				showFilterSearchInput: true,
				isNewFilter: true,
			});
		}
	};

	const handleActionClick = (option, action) => {
		clickedActions.current = true;
		handleAction(action, option.title);
	};

	return (
		<>
			<Tooltip title="Filter">
				{options?.showFilterSearchInput || options?.activeFilterName ? (
					<Autocomplete
						sx={{
							minWidth: 260,
							backgroundColor: "#fff",
							"& input[type=text]": { height: 3 },
						}}
						fullWidth
						value={filterName?.value || null}
						onChange={(event, newValue) => {
							if (!clickedActions.current) {
								if (typeof newValue === "string") {
									setFilterName({
										title: newValue,
										value: newValue,
									});
									handleAction("filter", newValue.inputValue);
								} else if (newValue && newValue.title) {
									// Create a new value from the user input
									setFilterName({
										title: newValue.value,
										value: newValue.value,
									});
									if (newValue.title.startsWith("Add ")) {
										setActiveFilterName(newValue.value);
										updateReduxFlags({
											openDrawer: true,
											showFilterSearchInput: true,
											isNewFilter: true,
										});
										addNewFilter();
									} else {
										handleAction(
											"filter",
											newValue.inputValue || newValue.value
										);
									}
								}
							} else {
								console.log("HERr");
							}
						}}
						filterOptions={(options, params) => {
							// Sometimes bot send name as array for corrupted filter which crash webapp
							// It's handle by filter out incorrect data
							let filteredOptions = options.filter(
								(option) => typeof option.name === "string"
							);
							let filteredIncorrectOptions = options.filter(
								(option) => typeof option.name !== "string"
							);
							if (!isEmpty(filteredIncorrectOptions)) {
								console.error(
									"Incorrect Filter Options: ",
									filteredIncorrectOptions
								);
								console.table(filteredIncorrectOptions);
							}
							const filtered = filter(filteredOptions, params);
							// Suggest the creation of a new value
							if (params.inputValue !== "") {
								filtered.push({
									value: params.inputValue,
									title: `Add "${params.inputValue}"`,
								});
							}
							return filtered;
						}}
						selectOnFocus
						clearOnBlur
						handleHomeEndKeys
						id="free-solo-with-text-demo"
						options={filters}
						getOptionLabel={(option) => {
							// Value selected with enter, right from the input
							if (typeof option === "string") {
								return option;
							}
							// Add "xxx" option created dynamically
							if (option.inputValue) {
								return option.inputValue;
							}
							// Regular option
							return option.title;
						}}
						groupBy={(option) => option.set}
						renderOption={(props, option) =>
							option?.title?.startsWith("Add ") ? (
								<LookupDropCustom {...props}>
									<span>{option?.title}</span>
								</LookupDropCustom>
							) : (
								<LookupDropCustom {...props}>
									<span>{option?.title}</span>
									{!option?.readOnly && ( //
										<div>
											<Tooltip
												onClick={(e) => {
													handleActionClick(option, "editFilter");
													e.stopPropagation();
												}}
												title="Edit"
											>
												<EditOutlinedIcon
													sx={{
														color: "#44485a",
														opacity: 0.7,
														marginRight: "10px",
													}}
												/>
											</Tooltip>
											<Tooltip
												onClick={(e) => {
													handleActionClick(option, "filterDelete");
													e.stopPropagation();
												}}
												title="Delete"
											>
												<DeleteOutlineOutlinedIcon
													sx={{
														color: "#44485a",
														opacity: 0.7,
													}}
												/>
											</Tooltip>
										</div>
									)}
								</LookupDropCustom>
							)
						}
						freeSolo
						renderInput={(params) => {
							return (
								<TextField
									sx={{
										"& > *:first-child": { paddingRight: "9px !important" },
									}}
									{...params}
									placeholder="Filter Name"
									variant="outlined"
									fullWidths
									InputProps={{
										...params.InputProps,
										endAdornment: (
											<InputAdornment position="end">
												<ClearIcon
													sx={{
														color: "rgba(0, 0, 0, 0.54)",
														cursor: "pointer",
													}}
													onClick={(e) => {
														handleAction("clearFilter");
														updateReduxFlags({
															openDrawer: false,
															showFilterSearchInput: false,
														});
														e.stopPropagation();
													}}
												/>
											</InputAdornment>
										),
									}}
								/>
							);
						}}
					/>
				) : (
					<IconButton
						sx={{
							display: "inline-flex",
							justifyContent: "center",
							width: "40px",
							height: "40px",
							padding: "8px",
							objectFit: "contain",
							borderRadius: "6px",
						}}
						aria-label="FilterList"
						disabled={!isOnline}
						onClick={() => handleOnClickFilter()}
						size="large"
					>
						<FilterListIcon color={"#98B0C8"} />
					</IconButton>
				)}
			</Tooltip>
		</>
	);
};

export default FMFilterComponent;
