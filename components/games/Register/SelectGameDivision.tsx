"use client";

import Ellipsis from "components/shared/ellipsis";
import Autocomplete from "@mui/material/Autocomplete";

import { Fragment } from "react";
import { Box, Stack } from "@mui/material";
import { Paper, TextField, Typography } from "@mui/material";
import { RegisterSelectGameDivision } from "interfaces/components/games.interface/register.interface";

const SelectGameDivision = ({ onDivisionChange, divisions, division }: RegisterSelectGameDivision) => (
  <Paper elevation={3}>
    <Autocomplete
      fullWidth
      options={divisions}
      onInputChange={onDivisionChange}
      noOptionsText="No division found"
      getOptionLabel={(option) => option?.title}
      isOptionEqualToValue={(option, value) => option.ref === value.ref}
      value={division ? divisions.find((x) => x.ref === division) : null}
      renderOption={({ key, ...optionProps }, option) => (
        <Box key={key} component="li" {...optionProps}>
          <Stack position="relative">
            <Ellipsis lines={1}>{option?.title}</Ellipsis>

            <Box sx={{ position: "absolute", top: -12, right: -12 }}>
              <Typography variant="caption" fontSize=".6em">
                {option?.unmanaged > 99 ? "99+" : option?.unmanaged}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label="Select Division"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: <Fragment>{params.InputProps.endAdornment}</Fragment>,
          }}
        />
      )}
    />
  </Paper>
);

export default SelectGameDivision;
