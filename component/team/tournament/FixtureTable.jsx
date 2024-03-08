import Image from "next/image";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";

import clubStore from "@source/clubStore";

const TableJSX = ({ table }) => (
  <Paper>
    <TableContainer>
      <Table size="small" aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">Club</TableCell>
            <TableCell align="center">PTS</TableCell>
            <TableCell align="center">Pld</TableCell>
            <TableCell align="center">W</TableCell>
            <TableCell align="center">D</TableCell>
            <TableCell align="center">L</TableCell>
            <TableCell align="center">GF</TableCell>
            <TableCell align="center">GA</TableCell>
            <TableCell align="center">GD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table.map(({ club, d, ga, gd, gf, l, pld, pts, w }, index) => (
            <TableRow key={index}>
              <TableCell align="left">{index + 1}.</TableCell>
              <TableCell align="left">
                <figure>
                  <Image src={`/images/club/${club}.webp`} layout="fill" alt={`${clubStore(club).title} SoccerMASS`} />
                </figure>
                {clubStore(club).title}
              </TableCell>
              <TableCell align="center">{pts}</TableCell>
              <TableCell align="center">{pld}</TableCell>
              <TableCell align="center">{w}</TableCell>
              <TableCell align="center">{d}</TableCell>
              <TableCell align="center">{l}</TableCell>
              <TableCell align="center">{gf}</TableCell>
              <TableCell align="center">{ga}</TableCell>
              <TableCell align="center">{gf - ga}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

const FixtureTable = ({ tournament, competition, tab }) => {
  const leagueCup = () => {
    const groupTable = [];
    for (const table of Object.values(tournament[competition][tab])) groupTable.push(table);
    return groupTable;
  };

  return (
    <>
      {["cup", "league"].includes(competition) ? (
        leagueCup()?.map((table, index) => (
          <Paper sx={{ width: "100%", overflow: "hidden", margin: 1 }} key={index}>
            <Typography sx={{ display: "block", textAlign: "center" }} variant="button">
              Group
              {index === 0
                ? " One"
                : index === 1
                ? " Two"
                : index === 2
                ? " Three"
                : index === 3
                ? " Four"
                : index === 4
                ? " Five"
                : index === 5
                ? " Six"
                : index === 6
                ? " Seven"
                : " Eight"}
            </Typography>
            <TableJSX table={table} />
          </Paper>
        ))
      ) : (
        <TableJSX table={tournament[competition][tab]} />
      )}
    </>
  );
};

export default FixtureTable;
