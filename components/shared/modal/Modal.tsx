"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, DialogTitle } from "@mui/material";
import { ModalProps } from "interfaces/components/others/shared.interface";

import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";

const Modal = (props: ModalProps) => {
  const router = useRouter(),
    [fullWidth, setFullWidth] = useState(true),
    { children, title, maxHeight, height, minHeight } = props,
    [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md");

  const handleClose = () => {
    router.back();
  };

  const customStyles = { maxHeight, height, minHeight },
    styles = Object.fromEntries(Object.entries(customStyles).filter(([_, v]) => ![null, undefined].includes(v as any)));

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open
      onClose={handleClose}
      sx={{
        border: "3px solid red",
        //
        padding: "0 !important",
      }}>
      {title ? <DialogTitle>{title}</DialogTitle> : <></>}
      <DialogContent
        sx={
          {
            // padding: 2,
            // margin: "0 !important",
            // border: "3px solid red",
          }
        }>
        <Box sx={styles}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
