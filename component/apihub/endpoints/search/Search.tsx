import * as React from "react";
import { TextField, Autocomplete, Box, Divider, Stack, Typography } from "@mui/material";
import { styled, lighten, darken } from "@mui/system";
import { SearchProps } from "@interface/apihub/endpoints-interface";

export default function Search({ searchResult, onInputChange, onValueChange, value, inputValue }: SearchProps) {
  return (
    <Autocomplete
      fullWidth
      value={value}
      onChange={onValueChange}
      inputValue={inputValue}
      onInputChange={onInputChange}
      id="country-select-demo"
      // sx={{ width: '100%' }}

      options={searchResult}
      // renderInput={(params) => <TextField {...params} label="Controllable" />}
      //
      // options={searchResult}
      // autoHighlight
      // getOptionLabel={(option) => option.title}
      renderOption={(props, { title, category, description, id }) => (
        <Stack key={id} component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
          {/* <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          /> */}
          <Stack direction="row" justifyContent="space-between">
            <Typography noWrap>{title}</Typography>
            <Typography color="text.secondary">{category}</Typography>
          </Stack>
          <Divider component="li" />

          <Typography
            sx={{ mt: 0.5, ml: 2 }}
            color="text.secondary"
            display="block"
            variant="caption"
            sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>
            {description}
          </Typography>
        </Stack>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Start typing to search"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
