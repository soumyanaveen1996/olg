import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Popover from "@mui/material/Popover";

import MenuItem from "./MenuItem";
import MenuBgItem from "./MenuBgItem";
import SubMenuItem from "./SubMenuItem";

const DivContainer = styled("div")(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	"& .menuContainer": {
		marginTop: theme.spacing(4),
		width: theme.breakpoints.values.md + 60,
		"& .menuItem": {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
	},
}));

const PopoverContainer = styled(Popover)(({ theme }) => ({
	marginTop: "6px",
}));

export default function Menu({ message, handleAction }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedMenu, setSelectedMenu] = useState(null);

	const onMenuItemClick = (menu) => {
		handleAction(menu.id);
	};

	const handlePopoverOpen = (menu) => (event) => {
		event.preventDefault();

		if (!menu.submenu) {
			handleAction(menu.id);
		} else {
			setSelectedMenu(menu);
			setAnchorEl(event.currentTarget);
		}
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
		setSelectedMenu(null);
	};

	const open = Boolean(anchorEl);

	let menuEntries = message?.menuEntries;
	menuEntries = [...menuEntries];
	return (
		<DivContainer>
			<div className="menuContainer">
				<Grid
					container
					spacing={1}
					direction="row"
					justifyContent="center"
					alignItems="center"
				>
					{menuEntries.map((menuEntry, i) => (
						<Grid
							item
							xs
							key={menuEntry.id}
							className="menuItem"
						>
							{!menuEntry.label && !menuEntry.description ? (
								<MenuBgItem
									menuEntry={menuEntry}
									isActive={selectedMenu?.id === menuEntry.id}
									onHandlePopOverOpen={handlePopoverOpen(menuEntry)}
								/>
							) : (
								<MenuItem
									menuEntry={menuEntry}
									isActive={selectedMenu?.id === menuEntry.id}
									onHandlePopOverOpen={handlePopoverOpen(menuEntry)}
								/>
							)}
						</Grid>
					))}
				</Grid>
				<PopoverContainer
					open={open && Boolean(selectedMenu?.submenu)}
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					onClose={handlePopoverClose}
				>
					<SubMenuItem
						items={selectedMenu?.submenu}
						onItemClick={onMenuItemClick}
					/>
				</PopoverContainer>
			</div>
		</DivContainer>
	);
}
