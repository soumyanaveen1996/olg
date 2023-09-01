import React, { useEffect } from 'react';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LinkIcon from '@mui/icons-material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
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
  LoaderContainer
} from './styles';
import ScheduleMeeting from './ScheduleMeeting';
import MeetingLink from './MeetingLink';
import JoinMeeting from './JoinMeeting';
import Config from "./../../../Utils/Config";
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { getAuthData } from '../../../Services/StorageService';
import { chatDayFormats } from '../../../Utils/Helpers';
import { joinMeeting } from './data';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

let baseURL = Config.gRPCURL;

const LoftContainer = () => {
  useEffect(() => {
    window.document.title = "Loft";
  }, []);
  const [meetingList, setMeetingList] = React.useState([]);
  const [isScheduleMeeting, setScheduleMeeting] = React.useState(false);
  const [isMeetingLink, setMeetingLink] = React.useState(false);
  const [isJoinMeeting, setJoinMeeting] = React.useState(false);
  const [loading, setLoader] = React.useState(false);
  const [meetingInfo, setMeetingInfo] = React.useState({});
  const [accessId, setAccessId] = React.useState("");

  const toggleScheduleMeetingModal = () => setScheduleMeeting(!isScheduleMeeting);
  const toggleMeetingLinkModal = () => setMeetingLink(!isMeetingLink);
  const toggleJoinMeetingModal = () => setJoinMeeting(!isJoinMeeting);

  const {
    user: { userTimezone },
  } = getAuthData();
  const defaultUserTimezone = "Etc/UTC";

  const { sessionId } = useSelector((state) => state.user.auth);
  const { userDomain } = useSelector((state) => state.selectedDomain);

  const dateToShow = (value) => value && moment(value).calendar(chatDayFormats);

  useEffect(() => {
    setLoader(true);
    const url = `${baseURL}/grpc/videocall.VideoCallService/GetNextMeetings`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionId: sessionId,
      },
      body: JSON.stringify({
        userDomain: userDomain,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setMeetingList(myJson?.content);
        setLoader(false);
      });
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      joinMeeting(sessionId, accessId);
    }
  };

  const onCreateMeeting = () => {
    const url = `${baseURL}/grpc/videocall.VideoCallService/CreateMeeting`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionId: sessionId,
      },
      body: JSON.stringify({
        userDomain: userDomain,
        "data": {
          "meetingName": "Instant meeting"
        }
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        // toggleModal(false);
        if(myJson?.meetingId)
          joinMeeting(sessionId, myJson?.meetingId);
      });
  }

  return (
    <MainContainer>
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Grid container spacing={2}>
          <ButtonGrid item xs={6} md={5}>
            <Title variant="h4" component="h2" pb={2} pt={4}>
              Reliable video conferencing
            </Title>
            <Title variant="h5" component="h2" pb={3} pt={2}>
              Even on satellite internet below 256Kbps
            </Title>
            <MeetingBtnContainer>
              <ConfirmButton startIcon={<VideoCallIcon />} onClick={onCreateMeeting}>Start meeting now</ConfirmButton>
              <CancelButton startIcon={<CalendarMonthIcon />} onClick={toggleScheduleMeetingModal}>Schedule meeting</CancelButton>
              <CancelButton startIcon={<LinkIcon />} onClick={toggleMeetingLinkModal}>Generate meeting link</CancelButton>
            </MeetingBtnContainer>

            <Title variant="h6" component="h6" pb={3} pt={2}>
              Or
            </Title>

            <CssTextField
              type="text"
              size="small"
              fullWidth
              label="Access with ID"
              variant="outlined"
              onChange={(e) => setAccessId(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </ButtonGrid>
          <Grid item xs={6} md={7}>
            <Item>
              <Typography variant="h5" component="h2" pb={2}>
                Next meetings
              </Typography>
              <MeetingItemContainer>
                <LoaderContainer>
                  <Fade
                    in={loading}
                    style={{
                      transitionDelay: loading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                  >
                    <CircularProgress />
                  </Fade>
                </LoaderContainer>
                {meetingList?.map(({meetingId, meetingName, scheduledStartTime, scheduledEndTime, ...items}) =>
                  <MeetingItem key={meetingId} onClick={() => {
                    setMeetingInfo({meetingId, meetingName, scheduledStartTime, scheduledEndTime, ...items});
                    toggleJoinMeetingModal();
                  }}>
                    <MeetingTitleContainer>
                      <MeetingItemTitle variant="h6" component="h6">
                        {meetingName}
                      </MeetingItemTitle>
                      <EditOutlinedIcon sx={{ color: "#818181" }} />
                    </MeetingTitleContainer>
                    <MeetingDate>
                      {dateToShow(scheduledStartTime)}
                      {"\t"}{moment(scheduledStartTime)
                        .tz(userTimezone || defaultUserTimezone).format("LT")} - {moment(scheduledEndTime)
                      .tz(userTimezone || defaultUserTimezone).format("LT")}
                    </MeetingDate>
                </MeetingItem>)}
              </MeetingItemContainer>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <ScheduleMeeting
        toggleModal={toggleScheduleMeetingModal}
        isOpen={isScheduleMeeting}
        editData={meetingInfo}
        clearData={() => setMeetingInfo({})}
      />
      <MeetingLink toggleModal={toggleMeetingLinkModal} isOpen={isMeetingLink} />
      <JoinMeeting
        toggleModal={toggleJoinMeetingModal}
        isOpen={isJoinMeeting}
        meetingInfo={meetingInfo}
        onEdit={() => {
          toggleJoinMeetingModal(false);
          toggleScheduleMeetingModal(true);
        }}
        clearData={() => setMeetingInfo({})}
      />
    </MainContainer>
  )
};

export default LoftContainer