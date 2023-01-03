import { IAppUITableProps } from "@interface/builder/table-interface";
import {
  Box,
  Paper,
  Stack,
  Table,
  Skeleton,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TablePagination,
} from "@mui/material";

import { styles } from ".";

const AppUITable = ({
  page,
  tableRef,
  activeEntry,
  rowsPerPage,
  totalEntries,
  fetchingEntries,
  customTableHead,
  customTableBody,
  handlePageChange,
}: IAppUITableProps) => (
  <Box p={1}>
    <TableContainer
      component={Paper}
      sx={{ p: 0, maxHeight: "calc(100vh - 230px)", borderRadius: 2, width: activeEntry ? "calc(100% - 200px)" : "100%" }}>
      <Table aria-label="customized table" stickyHeader size="small" className={styles.table} ref={tableRef}>
        <TableHead>
          <TableRow>
            {customTableHead.map(
              ({ display, title, align = "left" }, index) =>
                display && (
                  <TableCell
                    key={index}
                    align={align}
                    sx={{ fontFamily: '"Rubik Microbe", cursive', fontSize: "1em", letterSpacing: ".05em" }}>
                    {title}
                  </TableCell>
                )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {fetchingEntries
            ? [...new Array(rowsPerPage)].map((x, index) => (
                <TableRow key={index}>
                  <TableCell width={1} sx={{ verticalAlign: "top", position: "relative" }}>
                    <span className={styles.numbering}>{page * rowsPerPage + index + 1}</span>
                  </TableCell>
                  <TableCell width={1} sx={{ verticalAlign: "top" }}>
                    <Skeleton width={120} height={30} />
                  </TableCell>
                  <TableCell align="center" sx={{ verticalAlign: "top", width: "100%" }}>
                    <Stack spacing={0.7}>
                      <Skeleton animation="wave" height={30} />
                      <Skeleton animation={false} height={30} />
                    </Stack>
                  </TableCell>
                  <TableCell align="center" sx={{ verticalAlign: "top" }}>
                    <Skeleton width={120} height={45} sx={{ my: -0.8 }} />
                    <Skeleton width={120} height={45} />
                  </TableCell>
                </TableRow>
              ))
            : customTableBody.map(({ cells, id }, index) => (
                <TableRow hover key={index} className={activeEntry === id ? styles.activeEntry : ""}>
                  <TableCell width={5} sx={{ verticalAlign: "top", position: "relative" }}>
                    <span className={styles.numbering}>{page * rowsPerPage + index + 1}</span>
                  </TableCell>
                  {cells.map(({ jsx, style, align = "left" }, index: number) => (
                    <TableCell align={align} sx={style} key={index}>
                      {jsx}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      sx={{ height: 38 }}
      rowsPerPageOptions={[]}
      component="div"
      count={totalEntries}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={(e, p) => handlePageChange(e, p)}
    />
  </Box>
);

export default AppUITable;
