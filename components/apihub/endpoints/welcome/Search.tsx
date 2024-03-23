import Link from "next/link";
import Ellipsis from "components/shared/ellipsis";
import LoadingButton from "@mui/lab/LoadingButton";

import { SearchOutlined as SearchIcon } from "@mui/icons-material";
import { SearchProps } from "interfaces/components/apihub.interface";
import { TextField, Autocomplete, Divider, Typography, Stack, IconButton } from "@mui/material";

const Search = ({ loading, searchResult, onInputChange, inputValue, getEndpoint, onValueChange, searchEndpoints }: SearchProps) => (
  <Stack spacing={1} direction="row" alignItems="flex-end">
    <Autocomplete
      freeSolo
      fullWidth
      size="small"
      disabled={loading}
      options={searchResult}
      inputValue={inputValue}
      onChange={(e, newValue) => onValueChange(newValue)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onInputChange={(e, newInputValue) => onInputChange(newInputValue)}
      filterOptions={(options) => options} // Return all options without filtering
      getOptionLabel={(option) => (typeof option === "string" ? inputValue : option.title)}
      renderOption={(props, { title, description, id }) => (
        <Link href={`/apihub/endpoint/${id}`} key={id}>
          <Stack component="li" mb={1} {...props} onClick={() => getEndpoint(id)}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={1} sx={{ width: "100%" }}>
              <Typography maxWidth="80%" fontSize=".8em" noWrap sx={{ textTransform: "uppercase" }}>
                {title}
              </Typography>
            </Stack>

            <Divider sx={{ width: "90%", my: 1, alignSelf: "flex-end" }} />

            <Ellipsis lines={2} display="block" variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 2 }}>
              {description}
            </Ellipsis>
          </Stack>
        </Link>
      )}
      renderInput={(params) => <TextField {...params} label={<Stack direction="row">Start typing to search endpoints</Stack>} />}
    />

    <LoadingButton
      href=""
      loading={loading}
      variant="contained"
      onClick={searchEndpoints}
      sx={{ height: 43, px: 3 }}
      startIcon={<SearchIcon />}>
      Search
    </LoadingButton>
  </Stack>
);

export default Search;
