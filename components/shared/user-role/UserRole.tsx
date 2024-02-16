"use client";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { Info as InfoIcon } from "@mui/icons-material";
import { UserRoleProps } from "interfaces/components/shared.interface";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const StyledFab = styled(Fab)({
  position: "fixed",
  bottom: 20,
  right: 20,
  left: 0,
  marginLeft: "auto",
});

const UserRole = ({ role, toggleHandler, showDialog }: UserRoleProps) => {
  switch (role) {
    case "test":
      return (
        <>
          <StyledFab color="error" size="medium" aria-label="user-role-info" draggable onClick={toggleHandler}>
            <InfoIcon />
          </StyledFab>
          <Dialog open={showDialog} onClose={toggleHandler} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"User Role Notification"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Kindly be informed that this is a test account mainly for visual assistance and certain actions are restricted. You can create a standard user account via
                signup to enjoy premium contents or signin if you already have an account with SoccerMASS to persist changes you make.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={toggleHandler} autoFocus>
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    default:
      return null;
  }
};

export default UserRole;
