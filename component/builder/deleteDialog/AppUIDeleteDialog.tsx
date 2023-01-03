import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { IAppUIDeleteDialogProps } from "@interface/appui/deleteDialog-interface";

const AppUIDeleteDialog = ({
  open,
  confirmText,
  deleteBooking,
  setConfirmText,
  confirmTextInstruction,
  closeDialog,
  label,
}: IAppUIDeleteDialogProps) => (
  <Dialog open={open} onClose={() => closeDialog()}>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you absolutely sure? This action cannot be undone. This will permanently delete this {label}.
        <br />
        <br />
        <i>Please type </i>'<b>{confirmTextInstruction}</b>'<i> to confirm.</i>
      </DialogContentText>
      <TextField
        autoFocus
        id="confirm"
        fullWidth
        type="text"
        margin="dense"
        variant="standard"
        value={confirmText}
        placeholder={`Enter '${confirmTextInstruction}' to confirm`}
        onChange={(e) => setConfirmText(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" onClick={() => closeDialog()}>
        Cancel
      </Button>
      <Button variant="outlined" onClick={deleteBooking()}>
        Delete {label}
      </Button>
    </DialogActions>
  </Dialog>
);

export default AppUIDeleteDialog;
