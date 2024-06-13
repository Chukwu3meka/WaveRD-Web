import Ellipsis from "components/shared/ellipsis";
import LoadingButton from "@mui/lab/LoadingButton";
import SyntaxHighlighter from "react-syntax-highlighter";

import { Divider } from "antd";
import { format } from "date-fns";
import { Fragment, MouseEventHandler, RefObject } from "react";
import { Theme } from "interfaces/components/others/layouts.interface";
import { Collapse, Box, Skeleton, TextField, Stack } from "@mui/material";
import { docco, darcula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { FailedRequestsResponse } from "interfaces/services/console.interface";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

interface FailedRequestsViewProps {
  theme: Theme;
  filter: string;
  searching: boolean;
  setFilter: Function;
  viewRow: null | string;
  handlePageChange: Function;
  tableRef: RefObject<HTMLTableElement>;
  viewHandler: (id: string | null) => () => void;
  searchHandler: MouseEventHandler<HTMLButtonElement>;
  data: { filter: string; loading: boolean; page: number; rows: number; content: FailedRequestsResponse[]; total: number };
}

const FailedRequestsView = ({
  data,
  filter,
  theme,
  tableRef,
  searching,
  setFilter,
  searchHandler,
  viewHandler,
  viewRow,
  handlePageChange,
}: FailedRequestsViewProps) => (
  <main style={{ alignSelf: "start" }}>
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
          label="Search Failed Requests"
          placeholder="Search Failed Requests"
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
      <Table stickyHeader aria-label="Console Failed Requests Table" size="small" ref={tableRef} sx={{ minWidth: 1200 }}>
        <TableHead>
          <TableRow>
            <TableCell width={50}></TableCell>
            <TableCell width={260} align="center">
              Date
            </TableCell>
            <TableCell width={600} align="center">
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
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation={false} />
                  </TableCell>
                </TableRow>
              ))
            : data.content?.map(({ date, data: desc, error, request, time, id }, sn) => (
                <Fragment key={sn}>
                  <TableRow hover sx={{ cursor: "pointer" }} onClick={viewHandler(id)}>
                    <TableCell sx={{ py: 1.3 }}>
                      <Ellipsis color="text.secondary" lines={1}>
                        {data.page * data.rows + (sn + 1)}.
                      </Ellipsis>
                    </TableCell>

                    <TableCell sx={{ py: 1.3 }}>
                      <Ellipsis color="text.secondary" lines={1}>
                        {format(new Date(time), "PPPPpp")}
                      </Ellipsis>
                    </TableCell>

                    <TableCell align="center">
                      <Ellipsis color="text.secondary" lines={1} align="left">
                        {request.endpoint}
                      </Ellipsis>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={!!viewRow && viewRow === id} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Divider orientation="left">Request</Divider>
                          <SyntaxHighlighter
                            language="json"
                            wrapLines
                            wrapLongLines
                            customStyle={{ borderRadius: "10px" }}
                            style={theme === "dark" ? darcula : docco}>
                            {JSON.stringify(request, undefined, 4)}
                          </SyntaxHighlighter>
                          <Divider orientation="left">Data</Divider>
                          <SyntaxHighlighter
                            language="json"
                            wrapLines
                            wrapLongLines
                            customStyle={{ borderRadius: "10px" }}
                            style={theme === "dark" ? darcula : docco}>
                            {JSON.stringify(desc, undefined, 4)}
                          </SyntaxHighlighter>
                          <Divider orientation="left">Error</Divider>
                          <SyntaxHighlighter
                            language="json"
                            wrapLines
                            wrapLongLines
                            customStyle={{ borderRadius: "10px" }}
                            style={theme === "dark" ? darcula : docco}>
                            {JSON.stringify(error, undefined, 4)}
                          </SyntaxHighlighter>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
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
  </main>
);

export default FailedRequestsView;
