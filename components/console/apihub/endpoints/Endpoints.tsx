import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Ellipsis from "components/shared/ellipsis";
import { Button, Skeleton } from "@mui/material";
import { format } from "date-fns";

import { Button as B } from "antd";

import { Typography as T } from "antd";

const { Title } = T;

const Endpoints = ({
  page,
  endpoints,
  data,
  rowsPerPage,
  totalRequest,
  rowsPerPageFn,
  noOfSkelenton,
  fetchingRequests,
  handleChangePage,
  toggleViewRequest,
}: any) => (
  <Paper elevation={2} sx={{ width: "100%", overflow: "hidden", alignSelf: "start" }}>
    <TableContainer style={{ maxHeight: "calc(100vh - 80px)" }}>
      <Table stickyHeader aria-label="Endpoints table" size="small">
        <TableHead>
          <TableRow>
            <TableCell width={30}></TableCell>
            <TableCell width={400}>Title</TableCell>
            <TableCell width={150}>Path</TableCell>
            <TableCell width={50}>Latency</TableCell>
            <TableCell width={100}>Category</TableCell>
            <TableCell width={100}>Last Activity</TableCell>
            <TableCell width={50}></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.loading
            ? [...new Array(data.skeleton).fill("")].map((_: string, sn: number) => (
                <TableRow hover key={sn}>
                  <TableCell sx={{ py: 1.3 }}>
                    <Ellipsis lines={1}>{page * rowsPerPage + (sn + 1)}.</Ellipsis>
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
                    <Skeleton animation="wave" />
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
                    <Ellipsis lines={1}>{page * rowsPerPage + (sn + 1)}.</Ellipsis>
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
                    <Ellipsis lines={1}>{category} </Ellipsis>
                  </TableCell>
                  <TableCell>
                    <Ellipsis lines={1}>
                      {format(new Date(lastUpdated), "iii")},&nbsp;{format(new Date(lastUpdated), "do")}&nbsp;
                      {format(new Date(lastUpdated), "LLL")}&nbsp;
                      {format(new Date(lastUpdated), "uuuu")}
                    </Ellipsis>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small">
                      Modify
                    </Button>
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
      onPageChange={(event: unknown, newPage: number) => handleChangePage(newPage)}
      rowsPerPageOptions={[20, 50, 75, 100]}
      onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => rowsPerPageFn(+event.target.value)}
    />
  </Paper>
);

export default Endpoints;
