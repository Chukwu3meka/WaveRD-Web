import Image from "next/image";
import Ellipsis from "components/shared/ellipsis";

import { GetGameWorldClubsResponse } from "interfaces/services/games.interface";
import { Skeleton, Stack, Table, Paper, Button, Typography } from "@mui/material";
import { TableRow, TableBody, TableCell, TableHead, TableContainer } from "@mui/material";

interface SelectClubProps {
  division: string;
  loadingClubs: boolean;
  clubs: GetGameWorldClubsResponse[];
  viewClubHandler: (ref: string) => void;
  manageClubHandler: (ref: string) => void;
}

const SelectClub = ({ loadingClubs, division, clubs, viewClubHandler, manageClubHandler }: SelectClubProps) => (
  <TableContainer component={Paper} style={{ maxHeight: "calc(var(--visibleScreen) - var(--headerHeight) - 80px)" }}>
    <Table stickyHeader aria-label="Console Endpoints Table" size="small" sx={{ minWidth: 300 }}>
      <TableHead>
        <TableRow>
          <TableCell width={10} align="center"></TableCell>
          <TableCell width={250} align="left">
            Football Club
          </TableCell>
          <TableCell width={70} align="right">
            $udget
          </TableCell>
          <TableCell width={100} align="center"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loadingClubs || !division
          ? Array.from({ length: 20 }, (_, i) => i + 1).map((sn) => (
              <TableRow hover key={sn}>
                <TableCell sx={{ py: 1.3 }}>
                  <Typography>{sn}.</Typography>
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
              </TableRow>
            ))
          : clubs?.map(({ title, budget, ref }, sn) => (
              <TableRow key={ref}>
                <TableCell>
                  <Typography variant="caption" color="text.secondary">
                    {sn + 1}.
                  </Typography>
                </TableCell>

                <TableCell>
                  <Stack spacing={1} direction="row" alignItems="center">
                    <Image src={`/images/clubs/${ref}.webp`} width={20} height={20} alt="Club logo" />
                    <Ellipsis lines={1} onClick={() => viewClubHandler(ref)} sx={{ cursor: "pointer" }}>
                      {title}
                    </Ellipsis>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Ellipsis lines={1} variant="body2">
                    {`$${budget}m`}
                  </Ellipsis>
                </TableCell>
                <TableCell align="center">
                  <Button size="small" variant="contained" sx={{ height: 30 }} onClick={() => manageClubHandler(ref)}>
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default SelectClub;
