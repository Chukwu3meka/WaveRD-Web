"use client";

import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import ConsoleService from "services/console.service";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { enqueueSnackbar } from "notistack";
import { ReactElement, Ref, forwardRef } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { ConsoleEndpointsData, ConsoleEndpointsProps } from "interfaces/components/console/apihub.interface";

const Transition = forwardRef(function Transition(props: TransitionProps & { children: ReactElement<any, any> }, ref: Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface VisibilityDialogProps {
  setData: Function;
  setReference: Function;
  reference: string | null;
  data: ConsoleEndpointsData;
  action: ConsoleEndpointsProps["actions"] | null;
}

const VisibilityDialog = ({ action, reference, setReference, data, setData }: VisibilityDialogProps) => {
  const consoleService = new ConsoleService(),
    title = data.content.find((x) => x.id === reference)?.title;

  const proceedHandler = async () => {
    setReference(null);

    if (!reference) return enqueueSnackbar("ID cannot be undefined. Kindly select a valid endpoint", { variant: "error" });

    switch (action) {
      case "visibility":
        await consoleService.toggleEndpointVisibility(reference).then(async ({ success, message }) => {
          enqueueSnackbar(message, { variant: success ? "success" : "error" }); // <=  Inform user of server response

          if (success) {
            const content = data.content,
              index = content.findIndex((x) => x.id === reference);

            //  Update UI Visibility
            content[index].visibility = !content[index].visibility;

            setData((data: ConsoleEndpointsData) => ({ ...data, content }));
          }
        });
        break;

      case "delete":
        await consoleService.deleteEndpoint(reference).then(async ({ success, message }) => {
          enqueueSnackbar(message, { variant: success ? "success" : "error" }); // <=  Inform user of server response

          if (success) {
            const content = data.content.filter((x) => x.id !== reference);
            setData((data: ConsoleEndpointsData) => ({ ...data, content }));
          }
        });
        break;

      default:
        enqueueSnackbar("Kindly select a valid action", { variant: "error" });
        break;
    }
  };

  return (
    <Dialog
      open={!!reference}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setReference(false)}
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle>Action Confirmation!!!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {action === "visibility"
            ? `Kindly, note that the visibility setting for the '${title}' endpoint will affect its accessibility for visitors, but will continue to be
      visible irrespective of current restriction settings to admins.`
            : action === "delete"
            ? `Are you sure you would like to delete this endpoint with a title of: '${title}'. Kindly be sure  about deletion request as this action is irreversible and is instant.`
            : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color={action === "delete" ? "error" : "primary"} onClick={proceedHandler} sx={{ fontWeight: "600" }}>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VisibilityDialog;
