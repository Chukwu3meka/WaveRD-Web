import React from "react";
import { Error } from "@mui/icons-material";
import { IconButton, Typography, Stack } from "@mui/material";

const DataNotFound = () => {
  return (
    <Stack spacing={2} alignItems="center">
      <IconButton sx={{ fontSize: "7em" }}>
        <Error fontSize="inherit" />
      </IconButton>
      <Typography component="h3" fontSize="2em">
        Data Not Found
      </Typography>
      <Typography color="text.secondary">Sorry, the requested data could not be found.</Typography>
    </Stack>
  );
};

export default DataNotFound;
