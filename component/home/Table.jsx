import Image from "next/image";

import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";

const LeagueTableContainer = ({ table }) => (
  <TableContainer component={Paper}>
    <Table size="small" aria-label="customized table">
      <TableHead>
        <TableRow>
          <TableCell align="left" />
          <TableCell align="left">Club</TableCell>
          <TableCell align="center">GF</TableCell>
          <TableCell align="center">PTS</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {table?.map(({ club, pts, gf, title }, index) => (
          <TableRow key={index}>
            <TableCell align="left">{index + 1}.</TableCell>
            <TableCell align="left">
              <figure>
                <Image src={`/images/club/${club}.webp`} layout="fill" alt="Away Club" />
              </figure>
              {title}
            </TableCell>
            <TableCell align="center">{gf}</TableCell>
            <TableCell align="center">{pts}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default LeagueTableContainer;
