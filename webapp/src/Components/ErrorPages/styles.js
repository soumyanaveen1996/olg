import { Button, Grid, Typography, styled } from "@mui/material";

// Styled components
export const AuthBtn = styled(Button)(() => ({
    width: "210px",
}));

export const Subtitle = styled(Typography)(() => ({
    fontWeight: 600,
}));

export const GridMainContainer = styled(Grid)(({ theme }) => ({
    flexGrow: 1,
    textAlign: "center",
    padding: theme.spacing(3),
    justifyContent: "center",
    flexDirection: "column",
}));