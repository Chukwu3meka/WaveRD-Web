import Ellipsis from "components/shared/ellipsis";
import LoadingButton from "@mui/lab/LoadingButton";

import { format } from "date-fns";
import { shortNumber } from "utils/helpers";
import { MouseEventHandler, RefObject } from "react";
import { Paper, Skeleton, TextField, Stack, Box } from "@mui/material";
import { AllRequestsResponse } from "interfaces/services/console.interface";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

interface AllRequestViewProps {
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
    content: AllRequestsResponse[];
    total: number;
  };
}

const AllRequestView = ({ data, filter, tableRef, searching, setFilter, searchHandler, handlePageChange }: AllRequestViewProps) => (
  <Box maxWidth={3000}>
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
          label="Search All Request"
          placeholder="Search All Request"
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

    <TableContainer component={Paper} style={{ maxHeight: "calc(100vh - 230px)", maxWidth: "calc(100vw - (var(--console-nav-size) + 50px))" }}>
      <Table stickyHeader aria-label="Console All Requests Table" size="small" ref={tableRef} sx={{ minWidth: 1000 }}>
        <TableHead>
          <TableRow>
            <TableCell width={50}></TableCell>
            <TableCell width={180}>Time</TableCell>
            <TableCell width={120} align="left">
              Domain
            </TableCell>
            <TableCell width={400} align="center">
              Path
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
                </TableRow>
              ))
            : data.content?.map(({ time, domain, version, path }, sn) => (
                <TableRow key={sn} hover sx={{ cursor: "pointer" }}>
                  <TableCell sx={{ py: 1.3 }}>
                    <Ellipsis color="text.secondary" lines={1}>
                      {data.page * data.rows + (sn + 1)}.
                    </Ellipsis>
                  </TableCell>

                  <TableCell sx={{ py: 1.3 }}>
                    <Ellipsis color="text.secondary" lines={1}>
                      {format(new Date(time), "iiii")},&nbsp;{format(new Date(time), "do")}&nbsp;
                      {format(new Date(time), "LLLL")}&nbsp;
                      {format(new Date(time), "uuuu")}
                    </Ellipsis>
                  </TableCell>

                  <TableCell>
                    <Ellipsis color="text.secondary" lines={1} align="left">
                      {version?.toUpperCase()} - {domain}
                    </Ellipsis>
                  </TableCell>
                  <TableCell>
                    <Ellipsis color="text.secondary" lines={1} align="left">
                      {path}
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
  </Box>
);

export default AllRequestView;
