// dependencies
import Ellipsis from "@component/shared/ellipsis";
import { TextField, Autocomplete, Divider, Stack, Typography } from "@mui/material";

// interface
import { SearchProps, SearchResult } from "@interface/apihub/endpoints-interface";

export default function Search({ searchResult, onInputChange, onValueChange, value, inputValue, getEndpoint, isOptionEqualToValue }: SearchProps) {
  return (
    <Autocomplete
      fullWidth
      value={value as unknown as SearchResult}
      onChange={(e, newValue) => onValueChange(newValue)}
      inputValue={inputValue}
      onInputChange={(e, newInputValue) => onInputChange(newInputValue)}
      id="country-select-demo"
      autoComplete={false}
      options={searchResult as SearchResult[]}
      isOptionEqualToValue={(option, value) => isOptionEqualToValue(option, value)}
      getOptionLabel={(option) => option.title}
      renderOption={(props, { title, category, description, id }) => (
        <Stack key={id} component="li" mb={1} {...props}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={1} sx={{ width: "100%" }}>
            <Typography maxWidth="80%" noWrap sx={{ textTransform: "uppercase" }} onClick={() => getEndpoint(id)}>
              {title}
            </Typography>
            <Typography maxWidth="20%" noWrap color="text.secondary" fontSize=".8em" sx={{ textTransform: "lowercase" }} onClick={() => getEndpoint(id)}>
              {category}
            </Typography>
          </Stack>
          <Divider sx={{ width: "90%", my: 1, alignSelf: "flex-end" }} />

          <Ellipsis sx={{ mt: 0.5, ml: 2 }} maxlines={2} color="text.secondary" display="block" variant="caption" onClick={() => getEndpoint(id)}>
            {description}
          </Ellipsis>
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
