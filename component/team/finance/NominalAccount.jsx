import Image from "next/image";
import clubStore from "@source/clubStore";
import massStore from "@source/massStore";
import playerStore from "@source/playerStore";
import { Paper, Button, Typography, Table, TableRow, TableBody, TableCell, TableHead, TableContainer } from "@mui/material";
import { styles } from ".";

const NominalAccount = ({ finance: { club, nominalAccount, squad }, mass }) => (
  <Paper className={styles.nominalAccount} elevation={2}>
    <Typography component="h2" variant="h5">
      {`${clubStore(club).nickname} Nominal Account`}
    </Typography>

    <Typography component="h3" variant="h6">
      Income Statement
    </Typography>

    <TableContainer component={Paper}>
      <Table size="small" aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Credit</TableCell>
            <TableCell align="center" align="center">
              Net
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Ticket per match</TableCell>
            <TableCell align="center">${Math.round((700 * clubStore(club).capacity) / 13.7).toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{`${massStore(mass)} (sponsor)`}</TableCell>
            <TableCell align="center">${nominalAccount.sponsor.toLocaleString()}m</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sales from Mall</TableCell>
            <TableCell align="center">
              $
              {Math.round(
                clubStore(club).capacity * 700.5 * squad.reduce((x, y) => x + (0.3 / 100) * playerStore(y).value, 0)
              ).toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Transfer Departure</TableCell>
            <TableCell align="center">${nominalAccount.departure.toLocaleString()}m</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    <Typography component="h3" variant="h6">
      Expense Statement
    </Typography>
    <TableContainer component={Paper}>
      <Table size="small" aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Debit</TableCell>
            <TableCell align="center" align="center">
              Net
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Weekly Maintainance</TableCell>
            <TableCell align="center">
              $
              {Math.round(
                clubStore(club).capacity * 1.5 * squad.reduce((x, y) => x + (0.3 / 100) * playerStore(y).value, 0)
              ).toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Transport fare</TableCell>
            <TableCell align="center">
              $
              {Math.round(
                clubStore(club).capacity * 20.7 * squad.reduce((x, y) => x + (0.3 / 100) * playerStore(y).value, 0)
              ).toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Annual Tax</TableCell>
            <TableCell align="center">
              $
              {Math.round(
                clubStore(club).capacity * 175.13 * squad.reduce((x, y) => x + (0.3 / 100) * playerStore(y).value, 0)
              ).toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Transfer Arrival</TableCell>
            <TableCell align="center">${nominalAccount.arrival.toLocaleString()}m</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

export default NominalAccount;
