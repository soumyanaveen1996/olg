import React from "react";
import ModalPopup from "../ModalMessages/ModalPopup";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { showSessionExpiredModal } from "../../State/actions/user";
import { AuthBtn, GridMainContainer, Subtitle } from "./styles";


const SessionExpiredModal = (props) => {
    const dispatch = useDispatch();

    const handleLogoutUser = () => {
        dispatch(showSessionExpiredModal(false))
        props.logout()
    }

    return (
        <>
            <ModalPopup
                size="sm"
                noHeader
                className="dialler-modal"
                keyboard={false}
                backdrop="static"
                noBorder="no-border"
            >
                <GridMainContainer container spacing={3}>
                    <Grid item xs={12}>
                        <img src="./img/security-icon.png" alt="security" />
                    </Grid>
                    <Grid item xs={12}>
                        <Subtitle variant="subtitle1" gutterBottom>
                            Due to safety measures, you will be automatically logged out of the system. Please login again to continue
                        </Subtitle>
                    </Grid>
                    <Grid item xs={12}>
                        <AuthBtn
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={handleLogoutUser}
                        >
                            Continue
                        </AuthBtn>
                    </Grid>
                </GridMainContainer>
            </ModalPopup>
        </>
    );

}


export default SessionExpiredModal;