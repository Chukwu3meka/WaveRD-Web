"use client";

import Ellipsis from "components/shared/ellipsis";
import Autocomplete from "@mui/material/Autocomplete";

import { Fragment } from "react";
import { Paper, TextField, Typography, Box, CircularProgress, Stack } from "@mui/material";
import { RegisterSelectGameWorld } from "interfaces/components/games.interface/register.interface";

const SelectGameWorld = ({ gameWorlds, loadingWorlds, formData, onGameWorldChange, onGameWorldInputChange }: RegisterSelectGameWorld) => (
  <Paper elevation={3}>
    <Autocomplete
      fullWidth
      options={gameWorlds}
      loading={loadingWorlds}
      filterOptions={(x) => x}
      onChange={onGameWorldChange}
      noOptionsText="Game world not found"
      inputValue={formData.gameWorldInput}
      onInputChange={onGameWorldInputChange}
      disableClearable={!formData.gameWorldInput}
      getOptionLabel={(option) => option.title ?? option}
      isOptionEqualToValue={(option, value) => option.ref === value.ref}
      renderOption={({ key, ...optionProps }, option) => (
        <Box key={key} component="li" {...optionProps}>
          <Stack position="relative">
            <Ellipsis lines={1}>{option?.title}</Ellipsis>

            <Box sx={{ position: "absolute", top: -12, right: -18 }}>
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
          variant="outlined"
          label="Select Game world"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loadingWorlds ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  </Paper>
);

export default SelectGameWorld;
