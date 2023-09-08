import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const MainBox = styled(Paper)(() => ({
  backgroundColor: '#ffffff',
  height: "50vh",
  margin: "10px 0",
  borderRadius: 10,
  padding: "20px 30px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderTop: "6px solid #c4d8ff",
  "& .MuiFormControlLabel-root": {
    marginBottom: 10
  }
}));

const SurveyNameBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
}));

const SurveyTitle = styled(Typography)(() => ({
  color: "#44485a",
  fontFamily: "SF Pro Text Bold",
  fontSize: 20,
  marginBottom: 20,
}));

const IntroductionText = styled(Typography)(() => ({
  color: "rgba(44, 47, 68, 0.5)",
  fontFamily: "SF Pro Text Regular",
  fontSize: 16,
  marginBottom: 20,
}));

const ProgressTitle = styled(Typography)(() => ({
  color: "#98b0c8",
  fontFamily: "SF Pro Text Bold",
  fontSize: 16,
}));

const PrimaryButton = styled(Button)(() => ({
  border: "none",
  padding: "7px 45px",
  borderRadius: 20,
  textTransform: "inherit",
  backgroundColor: "#638dff",
  color: "#FFFFFF",
  fontFamily: "SF Pro Text Bold",
  fontSize: 14,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#4c71d6",
    border: "none",
  },
  "&:focus": {
    boxShadow: "0 0 6px 0 #638dff !important",
  },
  "&:disabled": {
    backgroundColor: "#aeb8d6",
    color: "#e8ecf8",
  },
}));

const SecondaryButton = styled(Button)(() => ({
  border: "none",
  padding: "7px 45px",
  borderRadius: 20,
  textTransform: "inherit",
  backgroundColor: "#e0e8ff",
  color: "#638dff",
  fontFamily: "SF Pro Text Bold",
  fontSize: 14,
  boxShadow: "none",
  marginRight: 10,
  "&:hover": {
    backgroundColor: "#eef2ff",
    border: "none",
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

const ButtonsBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

export {
  MainBox,
  SurveyNameBox,
  IntroductionText,
  ProgressTitle,
  PrimaryButton,
  SecondaryButton,
  ButtonsBox,
  SurveyTitle,
}