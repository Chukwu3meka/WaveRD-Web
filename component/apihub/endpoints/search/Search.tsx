import Ellipsis from "@component/shared/ellipsis";
import { TextField, Autocomplete, Divider, Stack, Typography, Box } from "@mui/material";

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
        <Box key={id} component="li" mb={1} {...props}>
          <Stack onClick={() => getEndpoint(id)}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={1} sx={{ width: "100%" }}>
              <Typography maxWidth="80%" fontSize=".8em" noWrap sx={{ textTransform: "uppercase" }}>
                {title}
              </Typography>
            </Stack>

            <Divider sx={{ width: "90%", my: 1, alignSelf: "flex-end" }} />

            <Ellipsis maxlines={2} display="block" variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 2 }}>
              {description}
            </Ellipsis>
          </Stack>
        </Box>
      )}
      renderInput={(params) => <TextField {...params} placeholder="Start typing to search" inputProps={{ ...params.inputProps }} />}
    />
  );
}
