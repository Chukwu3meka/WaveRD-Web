import { EventHandler } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

interface SuccessDialogProps {
  open: boolean;
  exists: boolean;
  handleClose: EventHandler<any>;
}

const SuccessDialog = ({ open, handleClose, exists }: SuccessDialogProps) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Success Dialog!!!</DialogTitle>
    <DialogContent>
      <DialogContentText>
        You have successfully {exists ? "updated this endpoint" : "created a new endpoint"}. Kindly click the button below to return to Endpoints page
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="contained" onClick={handleClose}>
        Back
      </Button>
    </DialogActions>
  </Dialog>
);

export default SuccessDialog;
