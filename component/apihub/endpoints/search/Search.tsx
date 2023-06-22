// dependencies
import Ellipsis from "@component/shared/ellipsis";
import { TextField, Autocomplete, Divider, Stack, Typography } from "@mui/material";

// interface
import { SearchProps, SearchResult } from "@interface/apihub/endpoints-interface";

export default function Search({ searchResult, onInputChange, onValueChange, value, inputValue }: SearchProps) {
  return (
    <Autocomplete
      fullWidth
      value={value as unknown as SearchResult}
      onChange={(e, newValue) => onValueChange(newValue)}
      inputValue={inputValue}
      onInputChange={(e, newInputValue) => onInputChange(newInputValue)}
      id="country-select-demo"
      autoHighlight
      options={searchResult as SearchResult[]}
      getOptionLabel={(option) => option.title}
      renderOption={(props, { title, category, description, id }) => (
        <Stack key={id} component="li" mb={1} {...props}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={1} sx={{ width: "100%" }}>
            <Typography maxWidth="80%" noWrap sx={{ textTransform: "uppercase" }}>
              {title}
            </Typography>
            <Typography maxWidth="20%" noWrap color="text.secondary" fontSize=".8em" sx={{ textTransform: "lowercase" }}>
              {category}
            </Typography>
          </Stack>
          <Divider sx={{ width: "90%", my: 1, alignSelf: "flex-end" }} />

          <Ellipsis sx={{ mt: 0.5, ml: 2 }} maxLines={2} color="text.secondary" display="block" variant="caption">
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
