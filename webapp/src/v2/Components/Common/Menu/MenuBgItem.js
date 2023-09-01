import { Typography, styled } from "@mui/material";
import React from "react";
import cx from "classnames";

const DivContainer = styled("div")(({ theme, background, bgImage }) => ({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: 180,
    width: 300,
    backgroundColor: background || theme.palette.primary.main,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: "20px",
    boxShadow: `0 0 20px 0 rgba(42, 45, 60, 0.1)`,
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    cursor: "pointer",

    "img": {
        width: "80%",
        height: "80%",
        objectFit: "contain",
    },

    "&.active::before": {
        content: '""',
        position: "absolute",
        display: "block",
        width: 0,
        left: "50%",
        bottom: 0,
        border: "8px solid transparent",
        borderBottom: 0,
        borderTopColor: background || theme.palette.primary.main,
        transform: "translate(-50%, 100%)",
    },

    "& .label": {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#ffffff",
    },

    "& .description": {
        fontSize: "14px",
        textAlign: "center",
    },
}));

export default function MenuBgItem({ menuEntry, isActive, onHandlePopOverOpen }) {
    return (
        <DivContainer
            className={cx({ active: isActive })}
            background={menuEntry.color}
            onClick={onHandlePopOverOpen}
        >
            <img src={menuEntry.icon} alt="" />
        </DivContainer>
    );
}
