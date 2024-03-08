import Image from "next/image";
import { useState } from "react";
import clubStore from "@source/clubStore";
import { Table, TableRow, TableBody, TableCell, TableHead, Typography, TableContainer, TablePagination } from "@mui/material";
import playerStore from "@source/playerStore";

import { styles } from ".";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Calendar = ({ tournament, competition, calPage, setCalPage }) => {
  const handleChangePage = (event, newPage) => setCalPage(newPage);

  return (
    <>
      <Box>
        <Typography variant="button">
          Match day {calPage + 1} ~{" "}
          {tournament[competition].calendar[process.env.TOURNAMENT_ROWS_PER_PAGE[competition] * calPage + 1].date}
        </Typography>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Home</TableCell>
                <TableCell align="center">Score</TableCell>
                <TableCell align="right">Away</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tournament[competition].calendar
                .slice(
                  calPage * process.env.TOURNAMENT_ROWS_PER_PAGE[competition],
                  calPage * process.env.TOURNAMENT_ROWS_PER_PAGE[competition] + process.env.TOURNAMENT_ROWS_PER_PAGE[competition]
                )
                .map(({ ag, away, hg, home }, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <figure>
                        <Image src={`/images/club/${home}.webp`} layout="fill" alt={`${clubStore(home).title} SoccerMASS`} />
                      </figure>
                      {clubStore(home).title}
                    </TableCell>
                    <TableCell align="center">{`${hg === 0 ? hg : hg || "__"} : ${ag === 0 ? ag : ag || "__"} `}</TableCell>
                    <TableCell align="right">
                      {clubStore(away).title}
                      <figure style={{ marginLeft: "10px", marginRight: "0" }}>
                        <Image src={`/images/club/${away}.webp`} layout="fill" alt={`${clubStore(away).title} SoccerMASS`} />
                      </figure>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={tournament[competition].calendar.length}
          rowsPerPage={process.env.TOURNAMENT_ROWS_PER_PAGE[competition]}
          page={calPage}
          onPageChange={handleChangePage}
        />
      </Paper>

      {tournament[competition].knockOut ? (
        <Paper elevation={4} className={styles.calendar}>
          <Typography variant="button">KnockOut Stage</Typography>
        </Paper>
      ) : null}
    </>
  );
};

export default Calendar;
