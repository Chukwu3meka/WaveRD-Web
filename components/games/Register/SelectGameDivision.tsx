"use client";

import Ellipsis from "components/shared/ellipsis";
import Autocomplete from "@mui/material/Autocomplete";

import { Fragment } from "react";
import { Box, Stack } from "@mui/material";
import { Paper, TextField, Typography } from "@mui/material";

const SelectGameDivision = ({ onDivisionChange, divisions, division }: any) => (
  <Paper elevation={3}>
    <Autocomplete
      fullWidth
      options={divisions}
      // inputValue={division}
      filterOptions={(x) => x}
      noOptionsText="Division not found"
      getOptionLabel={(option) => option.title ?? option}
      onInputChange={onDivisionChange}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
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
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Division"
          size="small"
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
