import Ellipsis from "components/shared/ellipsis";
import LoadingButton from "@mui/lab/LoadingButton";

import { format } from "date-fns";
import { capitalize } from "utils/helpers";
import { CATEGORIES } from "utils/constants";
import { Paper, Skeleton, TextField, Typography, Stack } from "@mui/material";
import { ConsoleEndpointsProps } from "interfaces/components/console/apihub.interface";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

const ConsoleEndpoints = ({
  data,
  filter,
  tableRef,
  setFilter,
  searching,
  searchHandler,
  handlePageChange,
  toggleViewRequest,
}: ConsoleEndpointsProps) => (
  <main style={{ alignSelf: "start" }}>
    <Stack mb={1} spacing={1} alignItems="center" direction="row">
      <Typography sx={{ fontWeight: 900 }}>Search</Typography>

      <TextField
        id="search"
        size="small"
        value={filter}
        variant="outlined"
        sx={{ minWidth: 350 }}
        aria-describedby="search"
        label="Search Endpoint title"
        placeholder="Search Endpoint title"
        disabled={data.loading || searching}
        onChange={(e) => setFilter(e.target.value)}
      />

      <LoadingButton
        id="signin"
        size="small"
        type="submit"
        color="primary"
        variant="contained"
        loading={searching}
        onClick={searchHandler}
        disabled={searching || data.loading}>
        Search
      </LoadingButton>
    </Stack>

    <Paper elevation={2} sx={{ width: "100%", overflow: "hidden", alignSelf: "start" }}>
      <TableContainer style={{ maxHeight: "calc(100vh - 140px)" }}>
        <Table stickyHeader aria-label="Console Endpoints table" size="small" ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell width={30}></TableCell>
              <TableCell width={350}>Title</TableCell>
              <TableCell width={150}>Path</TableCell>
              <TableCell width={50}>Latency</TableCell>
              <TableCell width={100}>Category</TableCell>
              <TableCell width={100}>Last Activity</TableCell>
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
                  </TableRow>
                ))
              : data.content?.map(({ title, path, latency, category, lastUpdated, id }, sn) => (
                  <TableRow sx={{ cursor: "pointer" }} hover key={id} onClick={(e) => toggleViewRequest(e, id)}>
                    <TableCell sx={{ py: 1.3 }}>
                      <Ellipsis lines={1}>{data.page * data.rows + (sn + 1)}.</Ellipsis>
                    </TableCell>
                    <TableCell>
                      <Ellipsis lines={1}>{title}</Ellipsis>
                    </TableCell>
                    <TableCell align="center">
                      <Ellipsis lines={1}>{path}</Ellipsis>
                    </TableCell>
                    <TableCell>
                      <Ellipsis lines={1}>{latency}</Ellipsis>
                    </TableCell>
                    <TableCell>
                      <Ellipsis lines={1}>{capitalize(CATEGORIES[category].replaceAll("-", " "))} </Ellipsis>
                    </TableCell>
                    <TableCell>
                      <Ellipsis lines={1}>
                        {format(new Date(lastUpdated), "iii")},&nbsp;{format(new Date(lastUpdated), "do")}&nbsp;
                        {format(new Date(lastUpdated), "LLL")}&nbsp;
                        {format(new Date(lastUpdated), "uuuu")}
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
        onPageChange={(event: unknown, newPage: number) => handlePageChange(newPage)}
        rowsPerPageOptions={[20, 50, 75, 100]}
        onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePageChange(0, +event.target.value)}
      />
    </Paper>
  </main>
);

export default ConsoleEndpoints;
