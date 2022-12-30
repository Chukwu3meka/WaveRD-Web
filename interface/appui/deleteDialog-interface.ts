export interface IAppUIDeleteDialogContainerProps {
  open: boolean;
  label: string;
  closeDialog: Function;
  deleteHandler: Function;
}
export interface IAppUIDeleteDialogProps {
  open: boolean;
  label: string;
  confirmText: string;
  closeDialog: Function;
  deleteBooking: Function;
  setConfirmText: Function;
  confirmTextInstruction: string;
}
