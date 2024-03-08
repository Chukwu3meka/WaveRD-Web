import Image from "next/image";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";

import clubStore from "@source/clubStore";
import playerStore from "@source/playerStore";

const PlayerStat = ({ tournament, competition, tab }) => {
  return (
    <Paper>
      <TableContainer>
        <Table size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="left" />
              <TableCell align="left">Player</TableCell>
              <TableCell align="center">{tab[0].toUpperCase()}</TableCell>
              <TableCell align="center">Pld</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tournament[competition][tab].map((x, index) => (
              <TableRow key={index}>
                <TableCell align="left">{index + 1}.</TableCell>
                <TableCell align="left">
                  <figure>
                    <Image src={`/images/club/${x.club}.webp`} layout="fill" alt={`${clubStore(x.club).title} SoccerMASS`} />
                  </figure>
                  {playerStore(x.player).name}
                </TableCell>
                <TableCell align="center">{x[tab]}</TableCell>
                <TableCell align="center">{x.mp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PlayerStat;
