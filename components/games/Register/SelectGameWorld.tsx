"use client";

import Ellipsis from "components/shared/ellipsis";
import Autocomplete from "@mui/material/Autocomplete";

import { Fragment } from "react";
import { Paper, TextField, Typography, Box, CircularProgress, Stack } from "@mui/material";

const SelectGameWorld = ({ gameWorlds, loadingWorlds, formData, onGameWorldChange, onGameWorldInputChange }: any) => (
  <Paper elevation={3}>
    <Autocomplete
      fullWidth
      options={gameWorlds}
      loading={loadingWorlds}
      filterOptions={(x) => x}
      disableClearable={!formData.gameWorldInput}
      noOptionsText="Game World not found"
      inputValue={formData.gameWorldInput}
      getOptionLabel={(option) => option.title ?? option}
      onChange={onGameWorldChange}
      onInputChange={onGameWorldInputChange}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
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
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Game World"
          size="small"
          variant="outlined"
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
