import Ellipsis from "components/shared/ellipsis";

import { SearchOutlined as SearchIcon } from "@mui/icons-material";
import { SearchProps } from "interfaces/components/apihub.interface";
import { TextField, Autocomplete, Divider, Stack, Typography, Box, IconButton } from "@mui/material";

const Search = ({ searchResult, onInputChange, onValueChange, value, inputValue, getEndpoint, isOptionEqualToValue }: SearchProps) => (
  <Autocomplete
    fullWidth
    value={value}
    options={searchResult}
    inputValue={inputValue}
    onChange={(e, newValue) => onValueChange(newValue)}
    onInputChange={(e, newInputValue) => onInputChange(newInputValue)}
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

          <Ellipsis maxLines={2} display="block" variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 2 }}>
            {description}
          </Ellipsis>
        </Stack>
      </Box>
    )}
    // renderInput={(params) => <TextField {...params} placeholder="Start typing to search" inputProps={{ ...params.inputProps }} />}

    renderInput={(params) => (
      <TextField
        sx={{ mt: 2 }}
        {...params}
        label={
          <Stack direction="row">
            <IconButton aria-label="mongodb" component="span" sx={{ mt: -1 }}>
              <SearchIcon />
            </IconButton>
            Start typing to search endpoints
          </Stack>
        }
      />
    )}
  />
);

export default Search;
