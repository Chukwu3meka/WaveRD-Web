import { useState } from "react";
import { useSnackbar } from "notistack";

import { AppUIDeleteDialog } from ".";
import { IAppUIDeleteDialogContainerProps } from "@interface/builder/deleteDialog-interface";

const RemoveBookingContainer = ({ deleteHandler, open, closeDialog, label }: IAppUIDeleteDialogContainerProps) => {
  const { enqueueSnackbar } = useSnackbar(),
    confirmTextInstruction = `Delete ${label}`,
    [confirmText, setConfirmText] = useState("");

  const deleteBooking = () => () => {
    if (confirmText === confirmTextInstruction) {
      try {
        deleteHandler();
        enqueueSnackbar(`${label} deleted successfully`, { variant: "success" });
      } catch {
        enqueueSnackbar(`Failed to delete ${label}, Kindly try again later`, { variant: "error" });
      }
    } else {
      enqueueSnackbar(`Enter 'Delete ${label}' to confirm deletion`, { variant: "error" });
    }
  };

  return <AppUIDeleteDialog {...{ confirmText, setConfirmText, confirmTextInstruction, deleteBooking, open, closeDialog, label }} />;
};

export default RemoveBookingContainer;
