import { connect } from "react-redux";
import Image from "next/image";
import { styles } from ".";
import clubStore, { listOfClubs } from "@source/clubStore";
import playerStore from "@source/playerStore";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { addDays } from "@utils/clientFuncs";
import { fetchTransfersAction } from "@store/actions";

import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const Transfers = (props) => {
  const { fetchTransfersAction } = props;
  const [transfers, setTransfers] = useState([]);

  useEffect(() => fetchTransfersAction(), []);

  useEffect(() => {
    if (props.transfers?.length) setTransfers(props.transfers);
  }, [props.transfers]);

  return (
    <Paper className={styles.transfers}>
      <TableContainer>
        <Table aria-label="transfer-table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
              <TableCell align="center">Fee</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transfers?.map(({ from, to, fee, player, date }) => (
              <TableRow key={player}>
                <TableCell>{playerStore(player).name}</TableCell>
                <TableCell align="center">
                  <Image src={`/images/club/${from}.webp`} height={20} width={20} alt="Club from" />
                </TableCell>
                <TableCell align="center">
                  {/* <figure> */}
                  <Image src={`/images/club/${to}.webp`} height={20} width={20} alt="Club from" />
                  {/* </figure> */}
                </TableCell>
                <TableCell align="center">${fee}m</TableCell>
                <TableCell align="center">{new Date(date).toDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
    transfers: state.mass.transfers,
  }),
  mapDispatchToProps = { fetchTransfersAction };

export default connect(mapStateToProps, mapDispatchToProps)(Transfers);
