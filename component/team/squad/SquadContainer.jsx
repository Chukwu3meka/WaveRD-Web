import clubStore from "@source/clubStore";
import Image from "next/image";
import playerStore from "@source/playerStore";
import { connect } from "react-redux";
import { fetchSquadAction, fetchPlayerAction } from "@store/actions";
import Spinner from "@component/others/Spinner";

import { useState, useEffect } from "react";
import router from "next/router";
import { Paper, Alert, Table, TableRow, TableBody, TableCell, TableHead, TableContainer } from "@mui/material";

import { styles, ViewPlayerContainer } from "./";

const SquadContainer = (props) => {
  const [squad, setSquad] = useState(null);
  const [auth, setAuth] = useState(null);
  const [club, setClub] = useState(null),
    [lastSort, setLastSort] = useState("desc"),
    [viewPlayer, setViewPlayer] = useState(false);

  const { fetchSquadAction, fetchPlayerAction } = props;
  // console.log(props);

  useEffect(() => {
    if (props.auth.handle && !auth) {
      setAuth(props.auth);
      setClub(router.query.club || props.auth.club);
      fetchSquadAction({ mass: props.auth.mass, club: router.query.club || props.auth.club });
    }
  }, [props.auth]);

  useEffect(() => {
    if (auth && props.squad?.length) {
      setSquad(
        props.squad.map((x) => {
          const { name, rating, value, ref, country } = playerStore(x.ref);
          return { country, name, rating, value, ref, ...x };
        })
      );
    }
  }, [props.squad]);

  const sortPlayers = (sortKey) => () => {
    setLastSort(lastSort === "ascd" ? "desc" : "ascd");
    setSquad(lastSort === "ascd" ? squad.sort((x, y) => x[sortKey] - y[sortKey]) : squad.sort((x, y) => y[sortKey] - x[sortKey]));
  };

  const viewPlayerHandler = (player) => () => {
    setViewPlayer(player);
    fetchPlayerAction({ mass: auth.mass, club: auth.club, player });
  };

  return squad ? (
    <div className={styles.squad}>
      <Paper elevation={3}>
        <div>
          <Image src={`/images/club/${club}.webp`} layout="fill" alt={club} />
        </div>
        <h1>{clubStore(club).title}</h1>
        <div>
          <p>
            <em>{squad.length}</em>
            <span>Players</span>
          </p>
          <p>
            <em>${Math.round(squad.reduce((x, y) => x + (10 / 100) * y.value, 0))}m</em>
            <span>Wages</span>
          </p>
          <p>
            <em>{Math.round(squad.reduce((x, y) => x + y.rating, 0) / squad.length)}</em>
            <span>Rating</span>
          </p>
        </div>
      </Paper>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="left" />
              <TableCell align="left">Name</TableCell>
              <TableCell align="center" onClick={sortPlayers("rating")}>
                OPR
              </TableCell>
              <TableCell align="center" onClick={sortPlayers("value")}>
                Val
              </TableCell>
              <TableCell align="center">Emotion</TableCell>
              <TableCell align="center" onClick={sortPlayers("goal")}>
                G
              </TableCell>
              <TableCell align="center" onClick={sortPlayers("assist")}>
                A
              </TableCell>
              <TableCell align="center" onClick={sortPlayers("cs")}>
                CS
              </TableCell>
              <TableCell align="center" onClick={sortPlayers("mp")}>
                MP
              </TableCell>
              <TableCell align="center" onClick={sortPlayers("red")}>
                R
              </TableCell>
              <TableCell align="center" onClick={sortPlayers("yellow")}>
                Y
              </TableCell>
              <TableCell align="center" onClick={sortPlayers("listed")}>
                TL
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {squad?.map(({ country, name, rating, value, ref, emotion, goal, assist, cs, mp, red, yellow, listed, forcedListed }) => (
              <TableRow key={ref}>
                <TableCell align="left">
                  <figure>
                    <Image src={`/images/country/${country.toLowerCase()}.png`} layout="fill" alt="Player's Country" />
                  </figure>
                </TableCell>
                <TableCell onClick={viewPlayerHandler(ref)}>{name}</TableCell>
                <TableCell align="center">{rating}</TableCell>
                <TableCell align="center">${value}m</TableCell>
                <TableCell align="center">{emotion}</TableCell>
                <TableCell align="center">{goal}</TableCell>
                <TableCell align="center">{assist}</TableCell>
                <TableCell align="center">{cs}</TableCell>
                <TableCell align="center">{mp}</TableCell>
                <TableCell align="center">{red}</TableCell>
                <TableCell align="center">{yellow}</TableCell>
                <TableCell align="center">{forcedListed || listed ? "true" : "false"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper elevation={3}>
        <span>Coach</span>
        <em>{clubStore(club).coach}</em>
        <Alert severity="info">
          <ol>
            <li>You can sort players based on any category, by clicking the tag</li>
            <li>OPR represents the player's rating</li>
            <li>Emotion represents the player's mode in the club. Emotion is highly affected by player's involvement in matches</li>
            <li>G: Goal, A: Assist, CS: Clean Sheet, MP: Match Played, R: Red, Y: Yellow, TL: Transfer Listed</li>
          </ol>
        </Alert>
      </Paper>
      <ViewPlayerContainer viewPlayer={viewPlayer} setViewPlayer={setViewPlayer} setSquad={setSquad} squad={squad} />
    </div>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = (state) => ({
    auth: state.profile.auth,
    squad: state.club.squad,
  }),
  mapDispatchToProps = { fetchSquadAction, fetchPlayerAction };

export default connect(mapStateToProps, mapDispatchToProps)(SquadContainer);
