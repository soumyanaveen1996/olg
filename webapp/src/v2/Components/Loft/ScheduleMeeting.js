import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  ModalContainer,
  CloseIconContainer,
  CssTextField,
  JoinMeetingMainContainer,
  ScheduleContainer,
  ScheduleDateContainer,
  ScheduleModalContainer,
  MeetingUserContainer,
  AddGuestButton,
  CancelButton,
  ConfirmButton,
  MeetingFooter,
  MeetingUserItem,
  ContactListContainer, MeetingGuestList,
} from './styles';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Avatar from "../../../Components/Common/Avatar";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Config from '../../../Utils/Config';
import moment from 'moment';
import { getAuthData } from '../../../Services/StorageService';

let baseURL = Config.gRPCURL;

const InvitePeople = ({ toggleModal, isOpen, guestList }) => {
  const contacts = useSelector((state) => state.contacts);
  const profileImages = useSelector((state) => state.profileImages);
  const [contactList, setContactList] = React.useState([]);
  const [selectedGuests, setGuests] = React.useState([]);

  useEffect(() => {
    const list = [...contacts?.accepted, ...contacts?.localContacts];
    let sortedContacts = list.sort((contactA, contactB) => {
      const nameA = contactA.type
        ? contactA.name || ""
        : contactA.userName || "";
      const nameB = contactB.type
        ? contactB.name || ""
        : contactB.userName || "";
      if (nameA.toUpperCase() > nameB.toUpperCase()) {
        return 1;
      }
      return -1;
    });
    sortedContacts = sortedContacts.map((item) => ({
      ...item,
      selected: false,
    }));
    setContactList(sortedContacts);
  }, []);

  const handleChange = (userId) => {
    const indexOf = contactList.findIndex((i) => i.userId === userId);
    if(selectedGuests.includes(userId)){
      const findIndex = selectedGuests.indexOf(userId);
      const temp = selectedGuests;
      temp.splice(findIndex, 1);
      setGuests(temp);
      contactList[indexOf] = {
        ...contactList[indexOf],
        selected: false
      }
    } else {
      setGuests([...selectedGuests, userId]);
      contactList[indexOf] = {
        ...contactList[indexOf],
        selected: true
      }
    }
    setContactList(contactList);
  }

  const sendInvite = () => {
    const selectedList = contactList.filter((i) => i.selected);
    guestList(selectedList);
    toggleModal(false);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainer>
          <CloseIconContainer onClick={toggleModal}>
            <CloseIcon />
          </CloseIconContainer>
          <Typography variant="h6" component="h2" textAlign="center">
            Invite people
          </Typography>
          <CssTextField
            label="Search"
            type="text"
            size="small"
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
            }}
          />
          <ContactListContainer>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormGroup>
                {contactList?.map((item, number) => <FormControlLabel
                  key={item?.userId}
                  control={
                    <Checkbox checked={selectedGuests?.includes(item?.userId)} onChange={() => handleChange(item?.userId)} name={item?.userId} />}
                  label={<MeetingUserItem>
                    <Avatar
                      color="bg-fm-primary"
                      name={item?.name || item?.userName || ""}
                      size={40}
                      height={40}
                      imgSrc={profileImages && profileImages[item?.userId]}
                    />
                    <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
                      {item?.userName}
                    </Typography>
                  </MeetingUserItem>}
                />)}
              </FormGroup>
            </FormControl>
          </ContactListContainer>
          <MeetingFooter>
            <CancelButton>Cancel</CancelButton>
            <ConfirmButton onClick={sendInvite}>Send invitations</ConfirmButton>
          </MeetingFooter>
        </ModalContainer>
      </Modal>
    </div>
  )
}

const ScheduleMeeting = ({ toggleModal, isOpen, editData, clearData }) => {
  const {
    user: { userTimezone },
  } = getAuthData();
  const defaultUserTimezone = "Etc/UTC";
  moment.tz.setDefault(userTimezone || defaultUserTimezone);

  const [isInvitePeople, setInvitePeople] = React.useState(false);
  const toggleInvitePeopleModal = () => setInvitePeople(!isInvitePeople);
  const isEdit = editData && Object.keys(editData).length > 0;

  const meetingDate = isEdit && moment(editData?.scheduledStartTime)
    .tz(userTimezone || defaultUserTimezone)
    .format("MM/DD/YYYY");
  const meetingStartTime = isEdit && moment(editData?.scheduledStartTime)
    .tz(userTimezone || defaultUserTimezone)
    .format("HH:mm");
  const meetingEndTime = isEdit && moment(editData?.scheduledEndTime)
    .tz(userTimezone || defaultUserTimezone)
    .format("HH:mm");

  const [date, setDate] = React.useState(meetingDate || null);
  const [startTime, setStartTime] = React.useState(meetingStartTime || null);
  const [endTime, setEndTime] = React.useState(meetingEndTime || null);
  const [guestList, setGuestList] = React.useState([]);
  const [notes, setNotes] = React.useState(editData?.meetingName || "");

  const { sessionId } = useSelector((state) => state.user.auth);
  const { userDomain } = useSelector((state) => state.selectedDomain);

  const profileImages = useSelector((state) => state.profileImages);

  const onCreateMeeting = () => {
    const dateTimeStamp = date && startTime && moment(`${date} ${startTime}`)
      .tz(userTimezone || defaultUserTimezone)
      .format("x");
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
          "meetingName": notes,
          "scheduledStartTime": dateTimeStamp || startTime,
          "scheduledEndTime": endTime,
          "participants": guestList?.filter((i) => i.emailAddress !== "")
        }
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        toggleModal(false);
        setNotes("");
        setDate(null);
        setStartTime(null);
        setEndTime(null);
        setGuestList([]);
      });
  }

  const onEditMeeting = () => {
    const dateTimeStamp = date && startTime && moment(`${date} ${startTime}`)
      .tz(userTimezone || defaultUserTimezone)
      .format("x");
    const url = `${baseURL}/grpc/videocall.VideoCallService/EditMeeting`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionId: sessionId,
      },
      body: JSON.stringify({
        userDomain: userDomain,
        "data": {
          "meetingId": editData?.meetingId,
          "meetingName": notes,
          "scheduledStartTime": dateTimeStamp || startTime,
          "scheduledEndTime": endTime,
          "participants": [...editData?.participants, ...guestList?.filter((i) => i.emailAddress !== "")]
        }
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        clearData();
        toggleModal(false);
        setNotes("");
        setDate(null);
        setStartTime(null);
        setEndTime(null);
        setGuestList([]);
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
        disableEscapeKeyDown
      >
        <ScheduleModalContainer>
          <CloseIconContainer onClick={() => {
            clearData();
            toggleModal();
          }}>
            <CloseIcon />
          </CloseIconContainer>
          <Typography variant="h6" component="h2" textAlign="center">
            Add a meeting name
          </Typography>
          <JoinMeetingMainContainer>
            <ScheduleContainer>
              <ScheduleDateContainer>
                <div style={{ width: "85%" }}>
                  <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <CssTextField
                      variant="outlined"
                      size="small" {...params} />}
                  />
                </div>
                <ScheduleDateContainer>
                  <TimePicker
                    inputFormat="HH:mm"
                    label="start time"
                    value={startTime}
                    onChange={(newValue) => {
                      setStartTime(newValue);
                    }}
                    renderInput={(params) => <CssTextField
                      variant="outlined"
                      size="small" {...params} />}
                  />
                  <TimePicker
                    inputFormat="HH:mm"
                    label="start time"
                    value={endTime}
                    onChange={(newValue) => {
                      setEndTime(newValue);
                    }}
                    renderInput={(params) => <CssTextField
                      variant="outlined"
                      size="small" {...params} />}
                  />
                </ScheduleDateContainer>
              </ScheduleDateContainer>
              <MeetingUserContainer>
                <Typography sx={{ color: "#b4afaf" }} variant="subtitle2" mb={1}>
                  Guests
                </Typography>
                {isEdit && (
                  <MeetingGuestList>
                    {editData?.participants?.map((item) => (
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
                )}
                {guestList?.length > 0 ? (
                  <MeetingGuestList>
                    {guestList.map(({ userId, userName, name }) => (
                      <MeetingUserItem>
                        <Avatar
                          color="bg-fm-primary"
                          name={name || userName || ''}
                          size={40}
                          height={40}
                          imgSrc={profileImages && profileImages[userId]}/>
                        <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
                          {userName}
                        </Typography>
                      </MeetingUserItem>
                    ))}
                  </MeetingGuestList>
                  ) : (
                  <AddGuestButton
                    onClick={toggleInvitePeopleModal}
                    variant="text"
                    startIcon={<AddIcon sx={{ color: '#638dff' }}/>}
                  >Add guests</AddGuestButton>
                  )}
              </MeetingUserContainer>
              <CssTextField
                type="text"
                size="small"
                fullWidth
                variant="outlined"
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </ScheduleContainer>
          </JoinMeetingMainContainer>
          <MeetingFooter>
            <CancelButton onClick={() => {
              clearData();
              toggleModal();
            }}>Cancel</CancelButton>
            <ConfirmButton onClick={isEdit ? onEditMeeting : onCreateMeeting}>Done</ConfirmButton>
          </MeetingFooter>
          <InvitePeople
            isOpen={isInvitePeople}
            toggleModal={toggleInvitePeopleModal}
            guestList={setGuestList}
          />
        </ScheduleModalContainer>
      </Modal>
    </div>
  );
}

export default ScheduleMeeting;
