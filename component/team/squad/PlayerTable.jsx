import clubStore from "@source/clubStore";
import Image from "next/image";
import playerStore from "@source/playerStore";
import { connect } from "react-redux";
import { fetchSquadAction, fetchPlayerAction } from "@store/actions";

import { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import router from "next/router";

import { styles, ViewPlayerContainer } from "./";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import SentimentVeryDissatisfied from "@mui/icons-material/SentimentVeryDissatisfied";
import InsertEmoticon from "@mui/icons-material/InsertEmoticon";
import SportsSoccer from "@mui/icons-material/SportsSoccer";

import { Alert, Paper, Typography, Table, TableRow, TableBody, TableCell, TableHead, TableContainer, Button } from "@mui/material";

import Slider, { SliderThumb } from "@mui/material/Slider";
// import { styled } from "@mui/material/styles";
import { styled } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const PlayerTable = ({ player, auth, clickHandler, loading }) => {
  if (!player) return null;

  const [tabValue, setTabValue] = useState(0);
  const [offerValue, setOfferValue] = useState(Math.round(playerStore(player.ref).value + 5));

  const transferPeriod = [0, 6, 7].includes(new Date().getMonth());

  const handleChange = (_, newValue) => setTabValue(newValue);

  const injuryReturnDate = new Date();
  injuryReturnDate.setDate(injuryReturnDate.getDate() + player.injury.daysLeftToRecovery);

  return (
    <Paper elevation={2}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleChange} allowScrollButtonsMobile variant="scrollable">
            <Tab label="Player Stat" />
            <Tab label="Emotion" />
            <Tab label="Transfer" />
            <Tab label="History" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">MP</TableCell>
                  <TableCell align="center">G</TableCell>
                  <TableCell align="center">A</TableCell>
                  <TableCell align="center">CS</TableCell>
                  <TableCell align="center">Y</TableCell>
                  <TableCell align="center">R</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">League</TableCell>
                  <TableCell align="center">{player.league?.mp}</TableCell>
                  <TableCell align="center">{player.league?.goal}</TableCell>
                  <TableCell align="center">{player.league?.assist}</TableCell>
                  <TableCell align="center">{player.league?.cs}</TableCell>
                  <TableCell align="center">{player.league?.yellow}</TableCell>
                  <TableCell align="center">{player.league?.red}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Champ</TableCell>
                  <TableCell align="center">{player.champLeag?.mp}</TableCell>
                  <TableCell align="center">{player.champLeag?.goal}</TableCell>
                  <TableCell align="center">{player.champLeag?.assist}</TableCell>
                  <TableCell align="center">{player.champLeag?.cs}</TableCell>
                  <TableCell align="center">{player.champLeag?.yellow}</TableCell>
                  <TableCell align="center">{player.champLeag?.red}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Cup</TableCell>
                  <TableCell align="center">{player.cup?.mp}</TableCell>
                  <TableCell align="center">{player.cup?.goal}</TableCell>
                  <TableCell align="center">{player.cup?.assist}</TableCell>
                  <TableCell align="center">{player.cup?.cs}</TableCell>
                  <TableCell align="center">{player.cup?.yellow}</TableCell>
                  <TableCell align="center">{player.cup?.red}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <p>
            <IconButton size="small" color={player.session >= 0 ? "success" : "error"}>
              {player.session >= 0 ? <InsertEmoticon /> : <SentimentVeryDissatisfied />} &nbsp; {player.emotion}
            </IconButton>
          </p>
          <p>
            {player.session >= 0
              ? `Player is happy at ${clubStore(player.club).nickname}`
              : "Player is unhappy and is considering free transfer"}
          </p>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", gap: 1 }}>
            {auth.club === player.club ? (
              <>
                <LoadingButton loading={loading} variant="outlined" onClick={clickHandler("list")}>
                  {player.transfer?.forcedListed || player.transfer?.listed ? "Remove from" : "Add to"} transfer list
                </LoadingButton>
                {player.transfer?.locked ? (
                  <Typography color="orange">Transfer ban in place, wait till next transfer period</Typography>
                ) : transferPeriod ? (
                  <LoadingButton color="error" loading={loading} variant="outlined" onClick={clickHandler("release")}>
                    Release Player
                  </LoadingButton>
                ) : (
                  <Typography color="orange">Out of transfer Season</Typography>
                )}
              </>
            ) : (
              <>
                <Button variant="outlined" sx={{ marginBottom: 1 }} onClick={clickHandler("target")}>
                  {player.transfer.target ? "Remove from" : "Add to"} transfer target
                </Button>
                {player.transfer?.locked ? (
                  <Typography color="orange">Transfer ban in place, wait till next transfer period</Typography>
                ) : !transferPeriod && player.club !== "club000000" ? (
                  <Typography variant="body1" color="green">
                    Wait till January or Summer Transfer
                  </Typography>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    {!player.transfer.offers.includes(auth.club) ? (
                      player.budget >
                      Math.round(
                        playerStore(player.ref).value +
                          (playerStore(player.ref).rating >= 90
                            ? 100
                            : playerStore(player.ref).rating >= 87
                            ? 70
                            : playerStore(player.ref).rating >= 80
                            ? 50
                            : playerStore(player.ref).rating >= 77
                            ? 40
                            : playerStore(player.ref).rating >= 75
                            ? 35
                            : playerStore(player.ref).rating >= 70
                            ? 20
                            : playerStore(player.ref).rating >= 67
                            ? 10
                            : 5)
                      ) ? (
                        <>
                          <Typography variant="body1">
                            My Tansfer Budget:
                            {player.budget > 0 ? ` $${player.budget}m` : ` -$${Math.abs(player.budget)}m`}
                          </Typography>

                          <PrettoSlider
                            value={offerValue}
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            onChange={(_, value) => setOfferValue(value)}
                            min={Math.round(
                              playerStore(player.ref).value -
                                (playerStore(player.ref).rating >= 87
                                  ? 0
                                  : playerStore(player.ref).rating >= 80
                                  ? 3
                                  : playerStore(player.ref).rating >= 75
                                  ? 7
                                  : 10)
                            )}
                            max={Math.round(
                              playerStore(player.ref).value +
                                (playerStore(player.ref).rating >= 90
                                  ? 100
                                  : playerStore(player.ref).rating >= 87
                                  ? 70
                                  : playerStore(player.ref).rating >= 80
                                  ? 50
                                  : playerStore(player.ref).rating >= 77
                                  ? 40
                                  : playerStore(player.ref).rating >= 75
                                  ? 35
                                  : playerStore(player.ref).rating >= 70
                                  ? 20
                                  : playerStore(player.ref).rating >= 67
                                  ? 10
                                  : 5)
                            )}
                          />

                          <Button variant="contained" sx={{ marginBottom: 1 }} onClick={clickHandler("offer", { offerValue })}>
                            {`Send $${offerValue}m Offer`}
                          </Button>
                        </>
                      ) : (
                        <Typography variant="body1" color="red">
                          Insufficient funds to pull this
                        </Typography>
                      )
                    ) : (
                      <Typography variant="body1" color="green">
                        Awaiting response
                      </Typography>
                    )}

                    {player.transfer.offers?.length ? (
                      <main>
                        <Typography variant="body2" textAlign="left">
                          Club(s) In Contact
                        </Typography>

                        {player.transfer.offers.map((club) => (
                          <span style={{ margin: 5 }} key={club}>
                            <Image src={`/images/club/${club}.webp`} alt="Picture of the author" width={20} height={20} />
                          </span>
                        ))}
                      </main>
                    ) : null}
                  </Box>
                )}
              </>
            )}
            <Alert severity="info">
              {auth.club === player.club
                ? "Players can only be released during transfer period"
                : "Players can only be signed during January and Summer transfer period, while free agents can be signed at any time"}
            </Alert>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">MP</TableCell>
                  <TableCell align="center">G</TableCell>
                  <TableCell align="center">A</TableCell>
                  <TableCell align="center">CS</TableCell>
                  <TableCell align="center">Y</TableCell>
                  <TableCell align="center">R</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">{player.history?.mp}</TableCell>
                  <TableCell align="center">{player.history?.goal}</TableCell>
                  <TableCell align="center">{player.history?.assist}</TableCell>
                  <TableCell align="center">{player.history?.cs}</TableCell>
                  <TableCell align="center">{player.history?.yellow}</TableCell>
                  <TableCell align="center">{player.history?.red}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <p>
            {player.injury.daysLeftToRecovery
              ? `${player.name} is recovering from ${
                  player.injury.injuryType
                } and is expected to resume training on ${injuryReturnDate.toDateString()}`
              : `${player.name} is fit`}
          </p>
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default PlayerTable;
