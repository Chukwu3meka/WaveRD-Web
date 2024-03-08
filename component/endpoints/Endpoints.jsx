import { Fragment } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Autocomplete from "@mui/material/Autocomplete";
import ListItemButton from "@mui/material/ListItemButton";

import { styles } from ".";

const Endpoints = ({ endpoints, selectedID, selectAPIHandler }) => (
  <div className={styles.endpoints}>
    <Autocomplete
      color=""
      // size="small"
      disablePortal
      id="search footballer"
      options={[]}
      // options={playerSearchOptions}
      // onChange={setSearchTermHandler}
      fullWidth
      noOptionsText="Api not found"
      loadingText="searching database..."
      // onInputChange={playerSearchInputAutoComplete}
      // getOptionLabel={(option) => option?.name || null}
      // isOptionEqualToValue={(option, value) => option.name === value.name}
      renderInput={(params) => (
        <TextField
          color="primary"
          {...params}
          label={
            <Typography>
              {/* <IconButton aria-label="mongodb" component="span">
                <SearchIcon />
              </IconButton>  */}
              Search Endpoint...
            </Typography>
          }
        />
      )}
    />

    <List sx={{ width: "100%", maxWidth: 360 }}>
      {endpoints?.map(({ title, _id }, i, arr) => (
        <Fragment key={_id}>
          <ListItemButton disabled={selectedID === _id} alignItems="flex-start" onClick={selectAPIHandler(_id)}>
            <ListItemText
              primary={
                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.light">
                  {title}
                </Typography>
              }
            />
          </ListItemButton>

          {i !== arr.length - 1 && <Divider variant="middle" component="li" />}
        </Fragment>
      ))}
    </List>
  </div>
);

export default Endpoints;
