import Link from "next/link";
import Ellipsis from "components/shared/ellipsis";

import { SearchOutlined as SearchIcon } from "@mui/icons-material";
import { SearchProps } from "interfaces/components/apihub/endpoints.interface";
import { TextField, Autocomplete, Divider, Typography, Stack, Button } from "@mui/material";

const Search = ({ searchResult, onInputChange, inputValue, getEndpoint, searchEndpoints }: SearchProps) => (
  <Stack spacing={1} direction="row" alignItems="flex-end">
    <Autocomplete
      freeSolo
      fullWidth
      size="small"
      options={searchResult}
      inputValue={inputValue}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onInputChange={(e, newInputValue) => onInputChange(newInputValue)}
      filterOptions={(options) => options} // Return all options without filtering
      getOptionLabel={(option) => (typeof option === "string" ? inputValue : option.title)}
      renderOption={(props, { title, description, id }) => (
        <li {...props} key={id}>
          <Stack mb={1} onClick={() => getEndpoint(id)}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={1} sx={{ width: "100%" }}>
              <Link href={`/apihub/endpoint/${id}`}>
                <Typography maxWidth="80%" fontSize=".8em" noWrap sx={{ textTransform: "uppercase" }}>
                  {title}
                </Typography>
              </Link>
            </Stack>

            <Divider sx={{ width: "90%", my: 1, alignSelf: "flex-end" }} />

            <Link href={`/apihub/endpoint/${id}`}>
              <Ellipsis lines={2} display="block" variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 2 }}>
                {description}
              </Ellipsis>
            </Link>
          </Stack>
        </li>
      )}
      renderInput={(params) => <TextField {...params} label={<Stack direction="row">Start typing to search endpoints</Stack>} />}
    />

    <Button href="" variant="contained" onClick={searchEndpoints} sx={{ height: 43, px: 3 }} startIcon={<SearchIcon />}>
      Search
    </Button>
  </Stack>
);

export default Search;
