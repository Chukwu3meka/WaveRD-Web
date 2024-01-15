"use client";

import useSWR from "swr";
import { useEffect } from "react";
import * as authService from "services/auth.service";
import { LinearProgress, Stack } from "@mui/material";
import { useStoreContext } from "components/providers/StoreContext";

import { ReactChildren } from "interfaces/components/shared.interface";

export default function GlobalLayout({ children }: ReactChildren) {
  const { setDetails } = useStoreContext().user,
    { data, isLoading } = useSWR(authService.URL, authService.getDetails, { shouldRetryOnError: false });

  useEffect(() => {
    if (!isLoading) setDetails(data);
  }, []);

  if (isLoading)
    return (
      <Stack sx={{ width: "100%", color: "green" }}>
        <LinearProgress color="inherit" />
      </Stack>
    );

  return children;
}
