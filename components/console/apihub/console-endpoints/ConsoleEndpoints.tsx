import Link from "next/link";
import Ellipsis from "components/shared/ellipsis";
import LoadingButton from "@mui/lab/LoadingButton";

import { format } from "date-fns";
import { CATEGORIES } from "utils/constants";
import { capitalize, shortNumber } from "utils/helpers";
import { Paper, Skeleton, TextField, Stack, IconButton, Box, Tooltip } from "@mui/material";
import { ConsoleEndpointsProps } from "interfaces/components/console/apihub.interface";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import {
  VisibilityOff,
  Add as AddIcon,
  VisibilityRounded,
  Refresh as RefreshIcon,
  EditCalendar as ModifyIcon,
  DeleteForever as DeleteForeverIcon,
} from "@mui/icons-material";

const ConsoleEndpoints = ({
  data,
  filter,
  tableRef,
  searching,
  setFilter,
  searchHandler,
  handlePageChange,
  refreshEndpoints,
  rowActionHandler,
}: ConsoleEndpointsProps) => (
  <>
    <Stack mb={2} spacing={1} justifyContent="space-between" direction="row">
      <Stack spacing={1} alignItems="center" direction="row">
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
          type="submit"
          color="primary"
          variant="contained"
          loading={searching}
          onClick={searchHandler}
          disabled={searching || data.loading}>
          Search
        </LoadingButton>
      </Stack>

      <Box component="nav" sx={{ border: "1px solid var(--secondary-color)", borderRadius: 2 }}>
        <Link href="/console/console-apihub/modify-endpoints/new">
          <IconButton>
            <AddIcon />
          </IconButton>
        </Link>

        <Link href="/console/console-apihub/modify-endpoints">
          <IconButton onClick={refreshEndpoints}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Link>
      </Box>
    </Stack>

    <TableContainer component={Paper} style={{ maxHeight: "calc(100vh - 230px)", maxWidth: "calc(100vw - (var(--console-nav-size) + 50px))" }}>
      <Table stickyHeader aria-label="Console Endpoints Table" size="small" ref={tableRef} sx={{ minWidth: 1000 }}>
        <TableHead>
          <TableRow>
            <TableCell width={50}></TableCell>
            <TableCell width={250}>Title</TableCell>
            <TableCell width={70} align="center">
              Bookmarks
            </TableCell>
            <TableCell width={100} align="right">
              Latency
            </TableCell>
            <TableCell width={150}>Category</TableCell>
            <TableCell width={180} align="center">
              Last Activity
            </TableCell>
            <TableCell width={80} align="center"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.loading
            ? new Array(data.rows).map((_: null, sn: number) => (
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
            : data.content?.map(({ title, bookmarks, latency, category, lastUpdated, visibility, id }, sn) => (
                <TableRow key={id} hover sx={{ cursor: "pointer" }}>
                  <TableCell sx={{ py: 1.3 }}>
                    <Ellipsis color="text.secondary" lines={1}>
                      {data.page * data.rows + (sn + 1)}.
                    </Ellipsis>
                  </TableCell>
                  <TableCell>
                    <Ellipsis color="text.secondary" lines={1}>
                      {title}
                    </Ellipsis>
                  </TableCell>
                  <TableCell align="center">
                    <Ellipsis color="text.secondary" lines={1} align="right">
                      {shortNumber(bookmarks)}
                    </Ellipsis>
                  </TableCell>
                  <TableCell>
                    <Ellipsis color="text.secondary" lines={1} align="right">
                      {latency} MS
                    </Ellipsis>
                  </TableCell>
                  <TableCell>
                    <Ellipsis color="text.secondary" lines={1}>
                      {capitalize(CATEGORIES[category].replaceAll("-", " "))}
                    </Ellipsis>
                  </TableCell>
                  <TableCell align="center">
                    <Ellipsis color="text.secondary" lines={1}>
                      {format(new Date(lastUpdated), "iii")},&nbsp;{format(new Date(lastUpdated), "do")}&nbsp;
                      {format(new Date(lastUpdated), "LLL")}&nbsp;
                      {format(new Date(lastUpdated), "uuuu")}
                    </Ellipsis>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
                      <IconButton onClick={rowActionHandler("delete", id)} sx={{ fontSize: "1.2em" }}>
                        <DeleteForeverIcon color="error" fontSize="inherit" />
                      </IconButton>

                      <Tooltip title={`${visibility ? "Hide" : "Show"} Endpoint`}>
                        <IconButton onClick={rowActionHandler("visibility", id)} sx={{ fontSize: "1.2em" }}>
                          {visibility ? (
                            <VisibilityOff color="secondary" fontSize="inherit" />
                          ) : (
                            <VisibilityRounded color="secondary" fontSize="inherit" />
                          )}
                        </IconButton>
                      </Tooltip>

                      <IconButton onClick={rowActionHandler("modify", id)} sx={{ fontSize: "1.2em" }}>
                        <ModifyIcon color="primary" fontSize="inherit" />
                      </IconButton>
                    </Stack>
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

export default ConsoleEndpoints;
