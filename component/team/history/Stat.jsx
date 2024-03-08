import Image from "next/image";
import clubStore from "@source/clubStore";
import playerStore from "@source/playerStore";
import { styles } from ".";

import { Paper, Typography, Table, TableRow, TableBody, TableCell, TableHead, TableContainer, Button } from "@mui/material";

const Stat = ({ history: { club, squad, lastMatch, transfers } }) => {
  return (
    <Paper className={styles.stat} elevation={2}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Transfer</TableCell>
              <TableCell align="center">Club</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Fee</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transfers.map(({ player, club, date, fee, desc }, i) => (
              <TableRow key={i}>
                <TableCell>{desc}</TableCell>
                <TableCell align="center">
                  <figure style={{ marginLeft: "10px" }}>
                    <Image src={`/images/club/${club || "club000000"}.webp`} layout="fill" alt="Club" />
                  </figure>
                </TableCell>
                <TableCell align="center">{player ? playerStore(player).name : "No Player"}</TableCell>
                <TableCell align="center">${fee || 0}m</TableCell>
                <TableCell align="right">{date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Paper className={styles.schedule} elevation={2}>
          <span>Last Match</span>
          <main>
            <div>
              <Image src={`/images/club/${lastMatch.home || "club000000"}.webp`} layout="fill" alt="Home Club" />
            </div>
            <span>
              <i>{lastMatch.hg}</i> ~ <i>{lastMatch.ag}</i>
            </span>
            <div>
              <Image src={`/images/club/${lastMatch.away || "club000000"}.webp`} layout="fill" alt="Away Club" />
            </div>
          </main>
          <span>{lastMatch.home ? clubStore(lastMatch.home).stadium : "Not Played"}</span>
          <span>{new Date(lastMatch.date).toDateString()}</span>
        </Paper>
        <Paper elevation={2}>
          <p>
            <Typography variant="body2" color="colorSecondary" component="i">
              Player Wages:
            </Typography>
            <Typography variant="body1" component="span">
              $
              {squad
                .reduce((total, player) => total + (10 / 100) * playerStore(player).value, 0)
                .toFixed(2)
                .toLocaleString()}
              m
            </Typography>
          </p>
          <p>
            <Typography variant="body2" color="colorSecondary" component="i">
              Capacity:
            </Typography>
            <Typography variant="body1" component="span">
              {clubStore(club).capacity.toLocaleString()}
            </Typography>
          </p>
          <p>
            <Typography variant="body2" color="colorSecondary" component="i">
              Club Value:
            </Typography>
            <Typography variant="body1" component="span">
              $
              {squad
                .reduce((total, player) => total + playerStore(player).value, 0)
                .toFixed(2)
                .toLocaleString()}
              m
            </Typography>
          </p>
        </Paper>
      </div>
    </Paper>
  );
};

export default Stat;
