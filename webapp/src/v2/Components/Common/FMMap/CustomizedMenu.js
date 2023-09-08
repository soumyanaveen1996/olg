import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "center",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "center",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		border: "1px solid #d3d4d5",
		marginTop: 5,
		borderRadius: 10,
		width: 250,
		maxHeight: 200,
	},
}));

const StyledButton = styled(Button)(({ theme }) => ({
	background: "white",
	borderRadius: 6,
	border: "solid 1.2px #e8e8e8",
	color: "black",
	height: 40,
	padding: "0 10px",
	margin: "3.5px 0",
	boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
	textTransform: "capitalize",
	"&:hover": {
		background: "#d8d8d8 !important",
	},
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
	// root: {},
}));

export default function CustomizedMenu(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(null);

	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (dropdownOption) => {
		props.handleMenuItemClick(dropdownOption);
	};

	return (
		<>
			<StyledButton
				id="customized-button"
				aria-controls={open ? "customized-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				variant="contained"
				disableElevation
				onClick={handleClick}
				endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
				disableRipple
				sx={props.isVisible && { visibility: "hidden" }}
			>
				<MenuIcon />
			</StyledButton>
			<StyledMenu
				id="customized-menu"
				MenuListProps={{
					"aria-labelledby": "customized-button",
				}}
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
			>
				{Array.isArray(props?.dropdownOptions) &&
					props?.dropdownOptions.map((dropdownOption, index) => (
						<StyledMenuItem
							key={`dropdownOption${index}`}
							selected={index === selectedIndex}
							onClick={(event) => handleMenuItemClick(dropdownOption)}
						>
							<Typography variant="inherit" noWrap>
								{dropdownOption}
							</Typography>
						</StyledMenuItem>
					))}
			</StyledMenu>
		</>
	);
}
