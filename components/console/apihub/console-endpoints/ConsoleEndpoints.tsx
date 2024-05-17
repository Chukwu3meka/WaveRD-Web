import Link from "next/link";
import Ellipsis from "components/shared/ellipsis";
import LoadingButton from "@mui/lab/LoadingButton";

import { Divider } from "antd";
import { format } from "date-fns";
import { CATEGORIES } from "utils/constants";
import { capitalize, shortNumber } from "utils/helpers";
import { Paper, Skeleton, TextField, Stack, IconButton } from "@mui/material";
import { ConsoleEndpointsProps } from "interfaces/components/console/apihub.interface";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { DeleteForever as DeleteEndpointIcon, Add as AddEndpointIcon, VisibilityOff as HideEndpointIcon } from "@mui/icons-material";

const ConsoleEndpoints = ({
  data,
  filter,
  tableRef,
  setFilter,
  searching,
  searchHandler,
  handlePageChange,
  toggleShowEndpoint,
}: ConsoleEndpointsProps) => (
  <main style={{ alignSelf: "start" }}>
    <Divider orientation="left">AVAILABLE API HUB ENDPOINTS</Divider>

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

      <nav style={{ border: "1px solid var(--secondary-color)", borderRadius: 10 }}>
        <IconButton>
          <AddEndpointIcon />
        </IconButton>

        <IconButton>
          <HideEndpointIcon />
        </IconButton>

        <IconButton>
          <DeleteEndpointIcon />
        </IconButton>
      </nav>
    </Stack>

    <Paper elevation={2} sx={{ width: "100%", overflow: "hidden", alignSelf: "start" }}>
      <TableContainer style={{ maxHeight: "calc(100vh - 200px)" }}>
        <Table stickyHeader aria-label="Console Endpoints table" size="small" ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell width={30}></TableCell>
              <TableCell width={350}>Title</TableCell>
              <TableCell width={150} align="center">
                Bookmarks
              </TableCell>
              <TableCell width={50} align="right">
                Latency
              </TableCell>
              <TableCell width={100}>Category</TableCell>
              <TableCell width={100} align="center">
                Last Activity
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
                  </TableRow>
                ))
              : data.content?.map(({ title, bookmarks, latency, category, lastUpdated, id }, sn) => (
                  <TableRow key={id} hover onClick={(e) => toggleShowEndpoint(e, id)} sx={{ cursor: "pointer" }}>
                    <TableCell sx={{ py: 1.3 }}>
                      <Link href={`/console/console-apihub/modify-endpoints/${id}`}>
                        <Ellipsis color="text.secondary" lines={1}>
                          {data.page * data.rows + (sn + 1)}.
                        </Ellipsis>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/console/console-apihub/modify-endpoints/${id}`}>
                        <Ellipsis color="text.secondary" lines={1}>
                          {title}
                        </Ellipsis>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link href={`/console/console-apihub/modify-endpoints/${id}`}>
                        <Ellipsis color="text.secondary" lines={1} align="right">
                          {shortNumber(bookmarks)}
                        </Ellipsis>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/console/console-apihub/modify-endpoints/${id}`}>
                        <Ellipsis color="text.secondary" lines={1} align="right">
                          {latency}
                        </Ellipsis>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/console/console-apihub/modify-endpoints/${id}`}>
                        <Ellipsis color="text.secondary" lines={1}>
                          {capitalize(CATEGORIES[category].replaceAll("-", " "))}{" "}
                        </Ellipsis>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link href={`/console/console-apihub/modify-endpoints/${id}`}>
                        <Ellipsis color="text.secondary" lines={1}>
                          {format(new Date(lastUpdated), "iii")},&nbsp;{format(new Date(lastUpdated), "do")}&nbsp;
                          {format(new Date(lastUpdated), "LLL")}&nbsp;
                          {format(new Date(lastUpdated), "uuuu")}
                        </Ellipsis>
                      </Link>
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
        rowsPerPageOptions={[10, 20, 50, 75, 100]}
        onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePageChange(0, +event.target.value)}
      />
    </Paper>
  </main>
);

export default ConsoleEndpoints;
