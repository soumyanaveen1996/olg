import React from "react";
import {
	ClickAwayListener,
	Grow,
	Paper,
	Popper,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
} from "@mui/material";
import Image from "@mui/icons-material/Image";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";

const ListBlock = styled(List)(({ theme }) => ({
	width: "100%",
	maxWidth: 360,
	backgroundColor: theme.palette.background.paper,
}));

const NestedBlock = styled(ListItem)(({ theme }) => ({
	paddingLeft: `${(props) => (props.submenu ? theme.spacing(4) : "inherit")}`,
}));

const IconWrapperBlock = styled("div")(() => ({
	textAlign: "center",
}));

const ImgTag = styled("img")(() => ({
	width: "100%",
	height: "auto",
	maxHeight: "1.2em",
	maxWidth: "2em",
	color: "inherit",
}));

const ImgBlock = styled(Image)(() => ({
	width: "100%",
	height: "auto",
	maxWidth: "2em",
	color: "inherit",
	maxHeight: "1em",
}));

const ListItemIconBlock = styled(ListItemIcon)(() => ({
	minWidth: "34px",
}));

const ListItemStyleBlock = styled("div")(() => ({
	display: "contents",
}));

const PopperBlock = styled(Popper)(() => ({
	width: "15vw",
}));

const FMPullDownMenuComponent = ({ message, handleAction }) => {
	const [open, setOpen] = React.useState(false);
	const [openSubMenu, setOpenSubMenu] = React.useState([]);
	const anchorRef = React.useRef(null);
	const prevOpen = React.useRef(open);
	const [selectedIndex, setSelectedIndex] = React.useState(null);

	const handleListItemClick = (itemid) => {
		setSelectedIndex(itemid);
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		}
	}

	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}
		prevOpen.current = open;
	}, [open]);

	const handleSubMenu = (id) => {
		if (openSubMenu.includes(id)) {
			setOpenSubMenu(openSubMenu.filter((i) => i !== id));
		} else {
			setOpenSubMenu([...openSubMenu, id]);
		}
	};

	const renderList = (item, index, submenu = false) => {
		if (item.submenu) {
			return (
				<>
					<NestedBlock button key={item.id} submenu={submenu}>
						<ListItemStyleBlock
							onClick={(e) => {
								// handleAction(item.id);
								// handleClose(e);
								handleSubMenu(item.id);
							}}
						>
							<ListItemIconBlock>
								<IconWrapperBlock>
									{item.icon ? (
										<ImgTag src={item.icon} alt="" />
									) : (
										<ImgBlock fontSize="small" />
									)}
								</IconWrapperBlock>
							</ListItemIconBlock>
							<ListItemText primary={item.label} />
						</ListItemStyleBlock>
						{openSubMenu.includes(item.id) ? (
							<ExpandLess onClick={() => handleSubMenu(item.id)} />
						) : (
							<ExpandMore onClick={() => handleSubMenu(item.id)} />
						)}
					</NestedBlock>
					<Collapse
						in={openSubMenu.includes(item.id)}
						timeout="auto"
						unmountOnExit
					>
						<List component="div" disablePadding>
							{item.submenu.map((subitem) => renderList(subitem, index, true))}
						</List>
					</Collapse>
				</>
			);
		} else {
			return (
				<NestedBlock
					button
					key={item.id}
					submenu={submenu}
					selected={selectedIndex === item.id}
					onClick={(e) => {
						handleAction(item.id);
						handleClose(e);
						handleListItemClick(item.id);
					}}
				>
					<ListItemIconBlock>
						<IconWrapperBlock>
							{item.icon ? (
								<ImgTag src={item.icon} alt="" />
							) : (
								<ImgBlock fontSize="small" />
							)}
						</IconWrapperBlock>
					</ListItemIconBlock>
					<ListItemText primary={item.label} />
				</NestedBlock>
			);
		}
	};

	return (
		<div>
			<IconButton
				ref={anchorRef}
				aria-controls={open ? "menu-list-grow" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
				size="large"
			>
				<MenuIcon />
			</IconButton>
			<PopperBlock
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				placement="bottom-start"
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === "bottom" ? "center top" : "center bottom",
							zIndex: 10000,
						}}
					>
						<Paper elevation={2}>
							<ClickAwayListener onClickAway={handleClose}>
								<ListBlock
									component="nav"
									aria-labelledby="nested-list-subheader"
									autoFocusItem={open}
									id="menu-list-grow"
									onKeyDown={handleListKeyDown}
								>
									{message.menuEntries.map((item, index) =>
										renderList(item, index)
									)}
								</ListBlock>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</PopperBlock>
		</div>
	);
};

export default FMPullDownMenuComponent;
