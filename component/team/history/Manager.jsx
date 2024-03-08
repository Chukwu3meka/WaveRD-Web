import { styles } from ".";
import { Paper, Table, TableRow, TableBody, TableCell, TableHead, TableContainer } from "@mui/material";

const Manager = ({ history: { managers } }) =>
  managers.length ? (
    <Paper className={styles.club} elevation={2}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Manager</TableCell>
              <TableCell align="center">Arrival</TableCell>
              <TableCell align="center">Departure</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managers.map(({ manager, arrival, departure }, i) => (
              <TableRow key={i}>
                <TableCell>{manager}</TableCell>
                <TableCell align="center">{new Date(arrival).toDateString()}</TableCell>
                <TableCell align="center">{departure ? new Date(departure).toDateString() : "---"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  ) : (
    ""
  );

export default Manager;
