import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  ModalContainer,
  CloseIconContainer,
  JoinMeetingHeader,
  JoinMeetingEdit,
  JoinMeetingMainContainer,
  MeetingUserItem,
  MeetingUserContainer,
  MeetingGuestList,
  ConfirmButton,
  CancelButton,
  MeetingFooter,
} from './styles';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Avatar from "../../../Components/Common/Avatar";
import { useSelector } from 'react-redux';
import { getAuthData } from '../../../Services/StorageService';
import Config from '../../../Utils/Config';
import moment from 'moment-timezone';
import { chatDayFormats } from '../../../Utils/Helpers';

let baseURL = Config.gRPCURL;

const JoinMeeting = ({ toggleModal, isOpen, meetingInfo, onEdit, clearData }) => {
  const {
    user: { userTimezone },
  } = getAuthData();
  const defaultUserTimezone = "Etc/UTC";

  const { sessionId } = useSelector((state) => state.user.auth);
  const { userDomain } = useSelector((state) => state.selectedDomain);

  const profileImages = useSelector((state) => state.profileImages);
  const dateToShow = (value) => value && moment(value).calendar(chatDayFormats);

  const joinMeeting = () => {
    const url = `${baseURL}/grpc/videocall.VideoCallService/JoinMeeting`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionId: sessionId,
      },
      body: JSON.stringify({
        "meetingId": meetingInfo?.meetingId,
        "joinUserEmail": ""
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        const options = {};
        options.wnd = window.open('/jitsi', "_blank");
        options.wnd['jitsiVideoCall'] = { options: myJson, message: myJson };
      });
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => {
          clearData();
          toggleModal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainer>
          <CloseIconContainer onClick={() => {
            clearData();
            toggleModal();
          }}>
            <CloseIcon />
          </CloseIconContainer>
          <JoinMeetingHeader>
            <div>
              <Typography variant="h6" component="h2">
                Meeting room ID
              </Typography>
              <Typography sx={{ color: "#b4afaf" }} variant="subtitle2">
                {dateToShow(meetingInfo?.scheduledStartTime)}
                {"\t"}{moment(meetingInfo?.scheduledStartTime)
                .tz(userTimezone || defaultUserTimezone).format("LT")} - {moment(meetingInfo?.scheduledEndTime)
                .tz(userTimezone || defaultUserTimezone).format("LT")}
              </Typography>
            </div>
            <JoinMeetingEdit onClick={onEdit}>
              <BorderColorOutlinedIcon sx={{ fontSize: "18px", color: "#638dff" }} />
            </JoinMeetingEdit>
          </JoinMeetingHeader>
          <JoinMeetingMainContainer>
            <MeetingUserContainer>
              <Typography sx={{ color: "#b4afaf" }} variant="subtitle2" mb={1}>
                Guests
              </Typography>
              <MeetingGuestList>
                {meetingInfo?.participants?.map((item) => (
                  <MeetingUserItem>
                    <Avatar
                      color="bg-fm-primary"
                      name={item}
                      size={40}
                      height={40}
                    />
                    <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
                      {item}
                    </Typography>
                  </MeetingUserItem>
                ))}
              </MeetingGuestList>
            </MeetingUserContainer>
            <MeetingUserContainer>
              <Typography sx={{ color: "#b4afaf" }} variant="subtitle2" mb={1}>
                Notes
              </Typography>
              <Typography variant="subtitle2">
                {meetingInfo?.meetingName}
              </Typography>
            </MeetingUserContainer>
          </JoinMeetingMainContainer>
          <MeetingFooter>
            <CancelButton onClick={() => {
              clearData();
              toggleModal();
            }}>Cancel</CancelButton>
            <ConfirmButton onClick={joinMeeting}>Join meeting</ConfirmButton>
          </MeetingFooter>
        </ModalContainer>
      </Modal>
    </div>
  );
}

export default JoinMeeting;
