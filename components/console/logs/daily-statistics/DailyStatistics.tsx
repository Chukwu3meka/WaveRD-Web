import Ellipsis from "components/shared/ellipsis";
import LoadingButton from "@mui/lab/LoadingButton";

import { format } from "date-fns";
import { shortNumber } from "utils/helpers";
import { MouseEventHandler, RefObject } from "react";
import { Skeleton, TextField, Stack } from "@mui/material";
import { DailyStatResponse } from "interfaces/services/console.interface";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

interface DailyStatisticsProps {
  filter: string;
  searching: boolean;
  setFilter: Function;
  handlePageChange: Function;
  tableRef: RefObject<HTMLTableElement>;
  searchHandler: MouseEventHandler<HTMLButtonElement>;
  data: {
    filter: string;
    loading: boolean;
    page: number;
    rows: number;
    content: DailyStatResponse[];
    total: number;
  };
}

const DailyStatistics = ({ data, filter, tableRef, searching, setFilter, searchHandler, handlePageChange }: DailyStatisticsProps) => (
  <>
    <Stack my={2} spacing={1} justifyContent="space-between" direction="row">
      <Stack spacing={1} alignItems="center" direction="row" component="form">
        <TextField
          focused
          id="search"
          size="small"
          value={filter}
          variant="outlined"
          sx={{ minWidth: 350 }}
          aria-describedby="search"
          label="Search Daily Stat"
          placeholder="Search Daily Stat"
          disabled={data.loading || searching}
          onChange={(e) => setFilter(e.target.value)}
        />

        <LoadingButton
          id="signin"
          type="submit"
          color="primary"
          variant="contained"
          loading={searching}
          onClick={searchHandler}
          disabled={searching || data.loading}>
          Search
        </LoadingButton>
      </Stack>
    </Stack>

    <TableContainer style={{ maxHeight: "calc(100vh - 230px)", maxWidth: "calc(100vw - (var(--console-nav-size) + 50px))" }}>
      <Table stickyHeader aria-label="Console Daily Stat Table" size="small" ref={tableRef} sx={{ minWidth: 1200 }}>
        <TableHead>
          <TableRow>
            <TableCell width={30}></TableCell>
            <TableCell width={300}>Date</TableCell>
            <TableCell width={100} align="center">
              Accounts
            </TableCell>
            <TableCell width={100} align="right">
              API Hub
            </TableCell>
            <TableCell width={100}>Console</TableCell>
            <TableCell width={100} align="center">
              Manager
            </TableCell>
            <TableCell width={100} align="center">
              Info
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.loading
            ? new Array(data.rows).fill("").map((_: string, sn: number) => (
                <TableRow hover key={sn}>
                  <TableCell sx={{ py: 1.3 }}>
                    <Ellipsis lines={1}>{data.page * data.rows + (sn + 1)}.</Ellipsis>
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation={false} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))
            : data.content?.map(({ date, accounts, apihub, console, manager, info }, sn) => (
                <TableRow key={date} hover sx={{ cursor: "pointer" }}>
                  <TableCell sx={{ py: 1.3 }}>
                    <Ellipsis color="text.secondary" lines={1}>
                      {data.page * data.rows + (sn + 1)}.
                    </Ellipsis>
                  </TableCell>

                  <TableCell sx={{ py: 1.3 }}>
                    <Ellipsis color="text.secondary" lines={1}>
                      {format(new Date(date), "iiii")},&nbsp;{format(new Date(date), "do")}&nbsp;
                      {format(new Date(date), "LLLL")}&nbsp;
                      {format(new Date(date), "uuuu")}
                    </Ellipsis>
                  </TableCell>

                  <TableCell align="center">
                    <Ellipsis color="text.secondary" lines={1} align="right">
                      {shortNumber(accounts)}
                    </Ellipsis>
                  </TableCell>
                  <TableCell align="center">
                    <Ellipsis color="text.secondary" lines={1} align="right">
                      {shortNumber(apihub)}
                    </Ellipsis>
                  </TableCell>
                  <TableCell align="center">
                    <Ellipsis color="text.secondary" lines={1} align="right">
                      {shortNumber(console)}
                    </Ellipsis>
                  </TableCell>
                  <TableCell align="center">
                    <Ellipsis color="text.secondary" lines={1} align="right">
                      {shortNumber(manager)}
                    </Ellipsis>
                  </TableCell>
                  <TableCell align="center">
                    <Ellipsis color="text.secondary" lines={1} align="right">
                      {shortNumber(info)}
                    </Ellipsis>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      page={data.page}
      component="div"
      count={data.total}
      rowsPerPage={data.rows}
      rowsPerPageOptions={[10, 20, 50, 75, 100]}
      onPageChange={(event: unknown, newPage: number) => handlePageChange(newPage)}
      onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePageChange(0, +event.target.value)}
    />
  </>
);

export default DailyStatistics;
