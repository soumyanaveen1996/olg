import React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Image from "@mui/icons-material/Image";

const ListTag = styled(List)(({ theme }) => ({
	padding: 0,
	boxSizing: "border-box",
	width: "300px",
	"& .icon": {
		height: 50,
		width: 50,
	},
	"& .MuiListItem-root": {
		padding: 0,
		cursor: "pointer",
		"&:nth-of-type(odd)": {
			borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
		},
	},
}));

export default function SubMenuItem({
	items = [],
	onItemClick,
	isSecondSub = false,
}) {
	const [openMenuId, setOpenMenuId] = React.useState(null);

	const onSelectMenuItem = (item) => () => {
		if (item.submenu) setOpenMenuId(item.id === openMenuId ? null : item.id);
		else {
			onItemClick(item);
		}
	};

	return (
		<ListTag
			sx={
				isSecondSub
					? {
							paddingLeft: 4,
					  }
					: ""
			}
			disablePadding={isSecondSub}
			component="div"
		>
			{items.map((item) => (
				<React.Fragment key={item.id}>
					<ListItem
						onClick={onSelectMenuItem(item)}
						disableGutters
						component="div"
					>
						<ListItemIcon>
							<div>
								{item.icon ? (
									<img className="icon" src={item.icon} alt="" />
								) : (
									<Image className="icon" />
								)}
							</div>
						</ListItemIcon>
						<ListItemText primary={item.label} />
						{item?.submenu ? (
							openMenuId === item.id ? (
								<ExpandLess />
							) : (
								<ExpandMore />
							)
						) : null}
					</ListItem>

					{item?.submenu ? (
						<Collapse in={openMenuId === item.id} timeout="auto" unmountOnExit>
							<SubMenuItem items={item.submenu} isNestedSub />
						</Collapse>
					) : null}
				</React.Fragment>
			))}
		</ListTag>
	);
}
