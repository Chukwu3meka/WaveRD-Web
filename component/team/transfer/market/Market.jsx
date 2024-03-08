import Image from "next/image";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { styles, Agents } from ".";
import rolesStore, { rolesTitle } from "@source/formationStore";
import playerStore from "@source/playerStore";
import countryStore from "@source/countryStore";
import Spinner from "@component/others/Spinner";
import { searchPlayersAction } from "@store/actions";
import clubStore, { listOfClubs } from "@source/clubStore";

const maxDistance = { age: 10, value: 100, rating: 15 };
const minDistance = { age: 2, value: 10, rating: 3 };
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

const Market = (props) => {
  const { searchPlayersAction, viewPlayerHandler, randomAgents, myClub } = props,
    [page, setPage] = useState(0),
    [sortOrder, setSortOrder] = useState(false),
    [searchResult, setSearchResult] = useState([]),
    [hideSearch, setHideSearch] = useState(false),
    [searchCriteria, setSearchCriteria] = useState({
      name: "",
      club: "",
      roles: [],
      listed: "all",
      country: "",
      age: [18, 22],
      value: [130, 180],
      rating: [75, 80],
    });

  useEffect(() => {
    if (props.searchPlayers && props.searchPlayers.length) setSearchResult(props.searchPlayers);
  }, [props.searchPlayers]);

  const handleRangeChange = ({ target: { name: target } }, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;

    if (newValue[1] - newValue[0] < minDistance[target]) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance[target]);
        setSearchCriteria({ ...searchCriteria, [target]: [clamped, clamped + minDistance[target]] });
      } else {
        const clamped = Math.max(newValue[1], minDistance[target]);
        setSearchCriteria({ ...searchCriteria, [target]: [clamped - minDistance[target], clamped] });
      }
    } else if (newValue[1] - newValue[0] > maxDistance[target]) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - maxDistance[target]);
        setSearchCriteria({ ...searchCriteria, [target]: [clamped, clamped + maxDistance[target]] });
      } else {
        const clamped = Math.max(newValue[1], maxDistance[target]);
        setSearchCriteria({ ...searchCriteria, [target]: [clamped - maxDistance[target], clamped] });
      }
    } else {
      setSearchCriteria({ ...searchCriteria, [target]: newValue });
    }
  };

  const sortSearchPlayers = (tag) => () => {
    setSortOrder(!sortOrder);
    setSearchResult(
      sortOrder
        ? searchResult.sort((x, y) => playerStore(x.player)[tag] - playerStore(y.player)[tag])
        : searchResult.sort((x, y) => playerStore(y.player)[tag] - playerStore(x.player)[tag])
    );
  };

  const searchHandler = () => {
    setPage(0);
    setSearchResult([]);
    searchPlayersAction({
      ...searchCriteria,
      myClub: props.auth.club,
      name: searchCriteria.name || "search",
      club: searchCriteria.club || "search",
      country: searchCriteria.country || "search",
      roles: searchCriteria.roles.length ? searchCriteria.roles : ["search"],
    });
  };

  return (
    <Paper className={styles.market} elevation={2}>
      <main>
        <div>
          <div>
            {!hideSearch && (
              <>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" direction={{ xs: "column", sm: "row" }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="text"
                    fullWidth
                    autoComplete="off"
                    label="Player Name"
                    sx={{ minWidth: 100 }}
                    value={searchCriteria.name}
                    InputProps={{ inputProps: { maxLength: 20 } }}
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, name: e.target.value })}
                  />
                  <Autocomplete
                    sx={{ minWidth: 100 }}
                    options={countryStore}
                    autoHighlight
                    size="small"
                    fullWidth
                    id="ViewCrunch-2018"
                    getOptionLabel={(option) => option}
                    onChange={(e, newValue) => setSearchCriteria({ ...searchCriteria, country: newValue })}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ "& > span": { pl: 1 } }} {...props}>
                        <Image width={15} height={15} src={`/images/country/${option}.png`} alt="SoccerMASS" />
                        <span>{option}</span>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Choose a country"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "ViewCrunch-2018", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />

                  <Autocomplete
                    disablePortal
                    // id="combo-box-demo"
                    options={listOfClubs.filter((x) => x !== myClub)}
                    size="small"
                    sx={{ minWidth: 100 }}
                    getOptionLabel={(option) => clubStore(option).title}
                    onChange={(e, newValue) => setSearchCriteria({ ...searchCriteria, club: newValue })}
                    fullWidth
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ "& > span": { pl: 1 } }} {...props}>
                        <Image width={15} height={15} src={`/images/club/${option}.webp`} alt="SoccerMASS" />
                        <span>{clubStore(option).title}</span>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Club"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}

                    // renderInput={(params) => <TextField {...params} label="Movie" />}
                  />
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" direction={{ xs: "column", sm: "row" }}>
                  <Box sx={{ width: "100%", textAlign: "center" }}>
                    <i>{`Value $${searchCriteria.value[0]}m ~ $${searchCriteria.value[1]}m`} </i>
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      value={searchCriteria.value}
                      name="value"
                      onChange={handleRangeChange}
                      valueLabelDisplay="auto"
                      min={30}
                      max={300}
                      // getAriaValueText={valuetext}
                      size="small"
                      disableSwap
                    />
                  </Box>
                  <Box sx={{ width: "100%", textAlign: "center" }}>
                    <i>{`Age ${searchCriteria.age[0]}yrs ~ ${searchCriteria.age[1]}yrs`} </i>
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      value={searchCriteria.age}
                      name="age"
                      onChange={handleRangeChange}
                      valueLabelDisplay="auto"
                      min={15}
                      max={40}
                      size="small"
                      disableSwap
                      // getAriaValueText={valuetext}
                    />
                  </Box>
                  <Box sx={{ width: "100%", textAlign: "center" }}>
                    <i>{`Rating ${searchCriteria.rating[0]} ~ ${searchCriteria.rating[1]}`} </i>
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      value={searchCriteria.rating}
                      name="rating"
                      onChange={handleRangeChange}
                      valueLabelDisplay="auto"
                      min={60}
                      max={99}
                      size="small"
                      disableSwap
                      // getAriaValueText={valuetext}
                    />
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" direction={{ xs: "column", sm: "row" }}>
                  <Autocomplete
                    freeSolo
                    multiple
                    id="roles"
                    fullWidth
                    options={rolesStore}
                    disableCloseOnSelect
                    size="small"
                    getOptionLabel={(option) => rolesTitle[option]}
                    value={searchCriteria.roles}
                    onChange={(e, newValue) => setSearchCriteria({ ...searchCriteria, roles: newValue })}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                        {rolesTitle[option]}
                      </li>
                    )}
                    style={{ minWidth: 250 }}
                    renderInput={(params) => <TextField {...params} label="Player Roles" placeholder="Role" />}
                  />
                  <Select
                    fullWidth
                    size="small"
                    labelId="demo-simple-select-label"
                    // style={{ width: 250 }}
                    id="demo-simple-select"
                    value={searchCriteria.listed}
                    label="Listed"
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, listed: e.target.value })}>
                    <MenuItem value="listed">Listed</MenuItem>
                    <MenuItem value="not listed">Not Listed</MenuItem>
                    <MenuItem value="all">All Players</MenuItem>
                  </Select>
                  <Button variant="contained" color="primary" onClick={searchHandler} sx={{ minWidth: 100 }}>
                    search
                  </Button>
                </Stack>
              </>
            )}
          </div>
          <div>
            <IconButton onClick={() => setHideSearch(!hideSearch)} size="small">
              {hideSearch ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </IconButton>
          </div>
        </div>
        <div>
          <Typography variant="body2" color="primary" style={{ textDecoration: "underline" }}>
            Search criteria result
          </Typography>
          {searchResult?.length ? (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="center" onClick={sortSearchPlayers("age")}>
                        Age
                      </TableCell>
                      <TableCell align="center" onClick={sortSearchPlayers("rating")}>
                        Rating
                      </TableCell>
                      <TableCell align="center" onClick={sortSearchPlayers("value")}>
                        Value
                      </TableCell>
                      <TableCell align="center">Roles</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchResult?.slice(page * 25, page * 25 + 25)?.map((x) => (
                      <TableRow key={x.player}>
                        <TableCell align="left">{searchResult.indexOf(x) + 1}</TableCell>
                        <TableCell align="left" onClick={viewPlayerHandler(x.player)}>
                          <figure>
                            <Image src={`/images/club/${x.club || "club000000"}.webp`} layout="fill" alt="Club" />
                          </figure>
                          {playerStore(x.player).name}
                        </TableCell>
                        <TableCell align="center">{playerStore(x.player).age}yrs</TableCell>
                        <TableCell align="center">{playerStore(x.player).rating}&deg;</TableCell>
                        <TableCell align="center">${Math.round(playerStore(x.player).value)}m</TableCell>
                        <TableCell align="center">
                          {playerStore(x.player).roles.map((role, i, arr) => (i === arr.length - 1 ? `${role}` : `${role} `))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={searchResult.length}
                rowsPerPage={25}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
              />
            </Paper>
          ) : (
            <>
              <Spinner height />

              <Alert severity="warning">Click the "search" buttom to fetch players that match your search criteria.</Alert>
            </>
          )}
          {searchResult?.length ? (
            <Alert severity="info">
              <ol>
                <li>
                  Signing players from rival clubs are quite difficult and next to impossible if your offer is not tempting enough.
                </li>
                <li>Players with higher rating tend to reject low transfer fee.</li>
                <li>You can sort search result by clicking on either the age, value, or rating bar</li>
              </ol>
            </Alert>
          ) : null}
        </div>
      </main>
      <Agents randomAgents={randomAgents} viewPlayerHandler={viewPlayerHandler} />
    </Paper>
  );
};

const mapStateToProps = (state) => ({
    auth: state.profile.auth,
    searchPlayers: state.player.searchPlayers,
  }),
  mapDispatchToProps = { searchPlayersAction };

export default connect(mapStateToProps, mapDispatchToProps)(Market);
