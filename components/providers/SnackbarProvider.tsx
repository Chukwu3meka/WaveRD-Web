"use client";

import { Zoom } from "@mui/material";
import { ReactChildren } from "interfaces/components/others/shared.interface";
import { SnackbarProvider as ClientSnackbarProvider } from "notistack";

const SnackbarProvider = ({ children }: ReactChildren) => (
  <ClientSnackbarProvider TransitionComponent={Zoom} maxSnack={3} preventDuplicate anchorOrigin={{ horizontal: "right", vertical: "top" }}>
    {children}
  </ClientSnackbarProvider>
);

export default SnackbarProvider;
