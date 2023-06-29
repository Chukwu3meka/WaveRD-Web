import Ellipsis from "@component/shared/ellipsis";
import { TextField, Autocomplete, Divider, Stack, Typography } from "@mui/material";

import { SearchProps } from "@interface/apihub/endpoints-interface";

export default function Search({ searchResult, onInputChange, onValueChange, value, inputValue, getEndpoint, isOptionEqualToValue }: SearchProps) {
  return (
    <Autocomplete
      fullWidth
      value={value}
      onChange={(e, newValue) => onValueChange(newValue)}
      inputValue={inputValue}
      onInputChange={(e, newInputValue) => onInputChange(newInputValue)}
      options={searchResult}
      filterOptions={(options) => options} // Return all options without filtering
      isOptionEqualToValue={(option, value) => isOptionEqualToValue(option, value)}
      getOptionLabel={(option) => (typeof option === "string" ? inputValue : option.title)}
      renderOption={(props, { title, description, id }) => (
        <Stack key={id} component="li" mb={1} {...props}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={1} sx={{ width: "100%" }}>
            <Typography maxWidth="80%" fontSize=".8em" noWrap sx={{ textTransform: "uppercase" }} onClick={() => getEndpoint(id)}>
              {title}
            </Typography>
          </Stack>

          <Divider sx={{ width: "90%", my: 1, alignSelf: "flex-end" }} />

          <Ellipsis sx={{ mt: 0.5, ml: 2 }} maxlines={2} color="text.secondary" display="block" variant="caption" onClick={() => getEndpoint(id)}>
            {description}
          </Ellipsis>
        </Stack>
      )}
      renderInput={(params) => <TextField {...params} placeholder="Start typing to search" inputProps={{ ...params.inputProps }} />}
    />
  );
}
