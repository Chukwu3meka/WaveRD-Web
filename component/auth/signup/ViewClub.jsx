import Image from "next/image";
import HighlightOff from "@mui/icons-material/HighlightOff";
import { Table, Paper, TableRow, TableBody, TableCell, TableHead, Typography, IconButton, TableContainer } from "@mui/material";

import { styles } from ".";

const ViewClub = ({ club, squad, hideViewClub, sortPlayers, clubRating }) => (
  <div className={styles.viewClub}>
    <div>
      <IconButton onClick={hideViewClub}>
        <HighlightOff color="primary" />
      </IconButton>
      <div>
        <Image src={`/images/club/${club.ref}.webp`} layout="fill" alt={club.title} />
      </div>
      <Typography variant="h4"> {club.title}</Typography>
      <Typography variant="h6">{`Coach: ${club.coach}`}</Typography>
      <Typography variant="subtitle1">{`Location: ${club.location}`}</Typography>
      <Typography variant="subtitle2">{`Avg Rating: ${clubRating}`}</Typography>
      <TableContainer component={Paper} style={{ marginTop: "10px" }}>
        <Table size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center" onClick={sortPlayers("rating")}>
                Rating
              </TableCell>
              <TableCell align="center">POS</TableCell>
              <TableCell align="center" onClick={sortPlayers("age")}>
                AGE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {squad.map(({ name, rating, roles, age }, index) => (
              <TableRow key={index}>
                <TableCell style={{ textTransform: "capitalize" }}>{name}</TableCell>
                <TableCell align="center">{rating}</TableCell>
                <TableCell align="center">{roles.join(", ")}</TableCell>
                <TableCell align="center">{age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </div>
);

export default ViewClub;
