import Image from "next/image";

import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const MassStat = ({ homeStyles, transfer, nextDivisionFixture }) => (
  <div className={homeStyles.massStat}>
    <Paper elevation={4}>
      {nextDivisionFixture && <h2>Division Match</h2>}
      <h4>{nextDivisionFixture ? nextDivisionFixture[0]?.date : "End of Season"}</h4>
      {nextDivisionFixture?.map(({ home, away, stadium, homeTitle, awayTitle }) => (
        <div key={home}>
          <main>
            <span>
              <Image src={`/images/club/${home}.webp`} layout="fill" alt="Player's country" />
            </span>
            <p>
              <b>{homeTitle}</b>
              <i>vs</i>
              <b>{awayTitle}</b>
            </p>
            <span>
              <Image src={`/images/club/${away}.webp`} layout="fill" alt="Player's country" />
            </span>
          </main>
          <i>{stadium}</i>
        </div>
      ))}
    </Paper>
    <Paper elevation={4}>
      <div>
        <span>
          <Image src="/images/layout/homeTransfer.png" layout="fill" alt="Transfer Image" />
        </span>
        <div />
        <div>
          <h2>Latest Transfers</h2>

          <TableContainer>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Transfer</TableCell>
                  <TableCell>Fee</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transfer?.map(({ from, to, fee, player }) => (
                  <TableRow key={player}>
                    <TableCell align="left">
                      <div>
                        <figure>
                          <Image src={`/images/club/${from}.webp`} layout="fill" alt="Club from" />
                        </figure>
                        <FlightTakeoffIcon fontSize="small" />
                        <figure>
                          <Image src={`/images/club/${to}.webp`} layout="fill" alt="Club from" />
                        </figure>
                        <b>{player}</b>
                      </div>
                    </TableCell>
                    <TableCell align="left">${fee}m</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Paper>
  </div>
);

export default MassStat;
