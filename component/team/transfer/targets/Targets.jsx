import { connect } from "react-redux";
import { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { styles } from ".";
import playerStore from "@source/playerStore";
import { fetchTargetsAction } from "@store/actions";
import { Typography } from "@mui/material";

const Market = (props) => {
  const { fetchTargetsAction, viewPlayerHandler } = props,
    [page, setPage] = useState(0),
    [targets, setTargets] = useState([]);

  useEffect(() => fetchTargetsAction(), []);

  useEffect(() => {
    if (!targets?.lenght && props.targets?.length) setTargets(props.targets);
  }, [props.targets]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  return (
    <>
      {!targets.length ? (
        <Typography>No Player added yet</Typography>
      ) : (
        <Paper className={styles.targets} elevation={2} sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="targets table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center">Age</TableCell>
                  <TableCell align="center">Rating</TableCell>
                  <TableCell align="center">Value</TableCell>
                  <TableCell align="center">Roles</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {targets?.length
                  ? targets.slice(page * 25, page * 25 + 25).map((player) => (
                      <TableRow key={player}>
                        <TableCell align="left">{targets.indexOf(player) + 1}</TableCell>
                        <TableCell align="left" onClick={viewPlayerHandler(player)} sx={{ cursor: "pointer" }}>
                          {playerStore(player).name}
                        </TableCell>
                        <TableCell align="center">{playerStore(player).age}yrs</TableCell>
                        <TableCell align="center">{playerStore(player).rating}&deg;</TableCell>
                        <TableCell align="center">${playerStore(player).value}m</TableCell>
                        <TableCell align="center">
                          {playerStore(player).roles.map((role, i, arr) => (i === arr.length - 1 ? `${role}` : `${role} `))}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={targets?.length}
            rowsPerPage={25}
            page={page}
            onPageChange={handleChangePage}
          />
        </Paper>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
    targets: state.club.targets,
  }),
  mapDispatchToProps = { fetchTargetsAction };

export default connect(mapStateToProps, mapDispatchToProps)(Market);
