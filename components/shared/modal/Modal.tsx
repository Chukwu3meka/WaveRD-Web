"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, DialogTitle } from "@mui/material";
import { ModalProps } from "interfaces/components/shared.interface";

import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";

const Modal = (props: ModalProps) => {
  const router = useRouter(),
    [fullWidth, setFullWidth] = useState(true),
    { children, title, maxHeight, height } = props,
    [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md");

  const handleClose = () => {
    router.back();
  };

  const customStyles = { maxHeight, height },
    styles = Object.fromEntries(Object.entries(customStyles).filter(([_, v]) => ![null, undefined].includes(v)));

  return (
    <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open onClose={handleClose}>
      {title ? <DialogTitle>{title}</DialogTitle> : <></>}
      <DialogContent>
        <Box sx={styles}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
