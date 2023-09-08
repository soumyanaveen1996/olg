import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  CssTextField,
  ModalContainer,
  MeetingLinkContainer,
  CloseIconContainer,
} from './styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';

const MeetingLink = ({ toggleModal, isOpen }) => {
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
            Meeting room ID
          </Typography>
          <Typography sx={{ mt: 2 }} textAlign="center">
            This is the URL for your future meeting. Please copy.
          </Typography>
          <MeetingLinkContainer>
            <CssTextField
              type="text"
              size="small"
              fullWidth
              variant="outlined"
              value="frontm.ai/meet/12345"
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="copy content"
                      edge="end"
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </MeetingLinkContainer>
        </ModalContainer>
      </Modal>
    </div>
  );
}

export default MeetingLink;
