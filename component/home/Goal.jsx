import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";

const GoalTableContainer = ({ goal }) => (
  <TableContainer component={Paper}>
    <Table size="small" aria-label="goal table">
      <TableHead>
        <TableRow>
          <TableCell align="left" />
          <TableCell align="left">Player</TableCell>
          <TableCell align="center">MP</TableCell>
          <TableCell align="center">G</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {goal?.map(({ player, goal, mp, name }, index) => (
          <TableRow key={index}>
            <TableCell align="left">{index + 1}.</TableCell>
            <TableCell align="left">{name}</TableCell>
            <TableCell align="center">{mp}</TableCell>
            <TableCell align="center">{goal}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default GoalTableContainer;
