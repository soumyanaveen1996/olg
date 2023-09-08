import { styled } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const CssTextField = styled(TextField)({
  "& .MuiFormHelperText-root": {
    color: "#e5453b !important",
  },
  "& label": {
    fontSize: 14,
    color: "#2c2f44",
    fontFamily: "SF Pro Text Light",
    textTransform: "inherit",
  },
  "& label.MuiInputLabel-shrink": {
    fontSize: "0.9rem",
  },
  "& label.Mui-focused": {
    color: "#638dff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#c4d8ff",
    },
    "&:hover fieldset": {
      borderColor: "#92afff",
    },
    "&.Mui-disabled": {
      backgroundColor: "#f4f7fb !important",
      "& fieldset": {
        borderColor: "#c4d8ff",
      },
    },
    "&.Mui-error": {
      "& fieldset": {
        borderColor: "#f2a29d !important",
      },
    },
    "&.Mui-focused fieldset": {
      borderColor: "#638dff",
    },
    "& .MuiOutlinedInput-input.Mui-disabled": {
      color: "#44485a",
      "-webkit-text-fill-color": "#44485a",
    },
    fontSize: 14,
    borderRadius: 6,
    fontFamily: "SF Pro Text Regular",
    color: "#2c2f44",
    backgroundColor: "white",
  },
  "& .MuiInputLabel-asterisk": {
    color: "#e5453b",
  },
});

const MainContainer = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  padding: "16px",
  overflow: "auto",
  backgroundColor: "#f4f7fb",
  display: "flex",
  alignItems: "center",
}));

const MeetingBtnContainer = styled("div")(() => ({
  display: 'flex',
  flexDirection: "column",
  gap: 10
}));

const MainButton = styled(Button)(() => ({
  border: "none",
  padding: "7px 45px",
  borderRadius: 20,
  textTransform: "inherit",
  "&:hover": {
    border: "none",
  },
}));

const ConfirmButton = styled(MainButton)(() => ({
  backgroundColor: "#638dff",
  color: "#FFFFFF",
  fontFamily: "SF Pro Text Bold",
  fontSize: 14,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#4c71d6",
  },
  "&:focus": {
    boxShadow: "0 0 6px 0 #638dff !important",
  },
  "&:disabled": {
    backgroundColor: "#aeb8d6",
    color: "#e8ecf8",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  borderRadius: 10,
  marginLeft: 20
}));

const MeetingItem = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f6f8fc',
  padding: theme.spacing(2.5),
  borderRadius: 10,
  cursor: "pointer"
}));

const MeetingItemContainer = styled("div")(({ theme }) => ({
  gap:10,
  display: "flex",
  flexDirection: "column"
}));

const CancelButton = styled(MainButton)(() => ({
  backgroundColor: "#e0e8ff",
  color: "#638dff",
  border: "none",
  fontFamily: "SF Pro Text Bold",
  fontSize: 14,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#eef2ff",
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

const MeetingItemTitle = styled(Typography)(({ theme }) => ({
  color: '#638dff',
  fontSize: 16
}));

const MeetingDate = styled(Typography)(({ theme }) => ({
  color: '#818181',
  fontSize: 14
}));

const MeetingTitleContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between"
}));

const Title = styled(Typography)(() => ({
  textAlign: 'center'
}));

const ButtonGrid = styled(Grid)(() => ({
  padding: "0 53px !important",
}));

const ModalContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  backgroundColor: '#FFFFFF',
  boxShadow: 24,
  padding: 32,
  borderRadius: 15,
}));

const MeetingLinkContainer = styled(Grid)(() => ({
  padding: "20px 30px"
}));

const CloseIconContainer = styled("div")(() => ({
  position: "absolute",
  top: "11px",
  right: "19px",
  cursor: "pointer",
}));

const JoinMeetingHeader = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: 'center',
  marginTop: 10,
}));

const JoinMeetingEdit = styled("div")(() => ({
  backgroundColor: "#e0e8ff",
  borderRadius: 15,
  padding: 13,
  display: "flex",
  cursor: 'pointer'
}));

const JoinMeetingMainContainer = styled("div")(() => ({
  borderTop: "1px solid #e0e8ff",
  borderBottom: "1px solid #e0e8ff",
  margin: "23px 0px",
}));

const MeetingUserItem = styled("div")(() => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
}));

const MeetingUserContainer = styled("div")(() => ({
  backgroundColor: "#e9efff",
  padding: "12px 21px",
  margin: "13px 0px",
  borderRadius: 10,
}));

const MeetingGuestList = styled("div")(() => ({
  padding: "10px 0",
  display: "flex",
  flexDirection: "column",
  gap: 10,
}));

const MeetingFooter = styled("div")(() => ({
  display: "flex",
  gap: 10,
  justifyContent: "center",
}));

const ScheduleContainer = styled("div")(() => ({
  padding: "30px 0",
}));

const ScheduleDateContainer = styled("div")(() => ({
  display: "flex",
  gap: 10,
}));

const ContactListContainer = styled("div")(() => ({
  height: "40vh",
  display: "flex",
  overflowY: "scroll",
  marginBottom: "15px"
}));

const ScheduleModalContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 518,
  backgroundColor: '#FFFFFF',
  boxShadow: 24,
  padding: 32,
  borderRadius: 15,
}));

const AddGuestButton = styled(Button)(() => ({
  color: "#638dff",
  fontFamily: "SF Pro Text Bold",
  fontSize: 14,
  boxShadow: "none",
  textTransform: "inherit",
  "&:hover": {
    color: "#4c71d6",
  },
  "&:focus": {
    boxShadow: "0 0 6px 0 #638dff !important",
  },
  "&:disabled": {
    color: "#e8ecf8",
  },
}));

const LoaderContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center'
}));

export {
  CssTextField,
  MainContainer,
  MeetingBtnContainer,
  ConfirmButton,
  Item,
  MeetingItem,
  MeetingItemContainer,
  CancelButton,
  MeetingItemTitle,
  MeetingDate,
  MeetingTitleContainer,
  Title,
  ButtonGrid,
  ModalContainer,
  MeetingLinkContainer,
  CloseIconContainer,
  JoinMeetingHeader,
  JoinMeetingEdit,
  JoinMeetingMainContainer,
  MeetingUserItem,
  MeetingUserContainer,
  MeetingGuestList,
  MeetingFooter,
  ScheduleContainer,
  ScheduleDateContainer,
  ScheduleModalContainer,
  AddGuestButton,
  ContactListContainer,
  LoaderContainer,
}