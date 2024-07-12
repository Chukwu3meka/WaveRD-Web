"use client";

import { Badge, Box, CircularProgress, Stack, Tooltip } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import { SvgIconComponent } from "@mui/icons-material";

import HeaderContainer from "../../shared/header";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { ReactChildren } from "interfaces/components/others/shared.interface";

import Image from "next/image";
import { Grid, Table, Paper, Alert, Button, TableRow, TableBody, TableCell, TableHead, TextField, Typography, TableContainer } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Fragment, useEffect, useState } from "react";
import GamesService from "services/games.service";
import { ObjectEntries, transformDivision } from "utils/helpers";
import Ellipsis from "components/shared/ellipsis";
import { SelectGameDivision, SelectGameWorld } from ".";
import { GetGameWorldClubsResponse, GetGameWorldsResponse } from "interfaces/services/games.interface";
// import { Badge, Card } from "antd";

interface Divisions {
  unmanaged: number;
  title: string;
  manager: null;
  budget: number;
}

const RegisterView = (props: any) => {
  const [clubs, setClubs] = useState<GetGameWorldClubsResponse[]>([]),
    [divisions, setDivisions] = useState<Divisions[]>([]),
    [gameWorlds, setGameWorlds] = useState<GetGameWorldsResponse[]>([]),
    [loadingWorlds, setLoadingWorlds] = useState(false),
    [loadingClubs, setLoadingClubs] = useState(false),
    [formData, setFormData] = useState({ gameWorld: "", gameWorldInput: "", division: "", club: "" });

  const gamesService = new GamesService();

  useEffect(() => {
    getGameWorlds(null);
  }, []);

  const getGameWorlds = async (title: null | string) => {
    setDivisions([]);
    setGameWorlds([]);
    setLoadingWorlds(true);

    await gamesService
      .getGameWorlds(title)
      .then(({ success, data }) => {
        if (success) return setGameWorlds(data);
        return setGameWorlds([]);
      })
      .finally(() => setLoadingWorlds(false));
  };

  const onGameWorldChange = async (event: any, gameWorld: any | null) => {
    if (gameWorld) {
      if (clubs) setClubs([]);
      if (divisions) setDivisions([]);
      setFormData((x) => ({ ...x, gameWorld: gameWorld.ref, division: "", club: "" }));

      setDivisions(
        gameWorld.divisions
          .sort((a: any, b: any) => Number(a.division.split("_")[0].replace("tour", "")) - Number(b.division.split("_")[0].replace("tour", "")))
          .map(({ division, total }: any) => ({ title: transformDivision("ref", division), unmanaged: total }))
      );
    }
  };

  const onGameWorldInputChange = async (event: Event, newInputValue: string) => {
    setFormData((formData) => ({ ...formData, gameWorldInput: newInputValue }));

    // Check if Current Input exists in already fetch game worlds list
    const exists = gameWorlds.find((world) => world.title === newInputValue);
    if (!exists) await getGameWorlds(newInputValue || null);
  };

  const onDivisionChange = async (event: any, divisionLabel: any | null) => {
    setClubs([]);
    if (divisionLabel) {
      const world = formData.gameWorld,
        division = transformDivision("tournament", divisionLabel) || "";

      setLoadingClubs(true);
      setFormData((formData) => ({ ...formData, division, club: "" }));

      if (world && division) {
        await gamesService
          .getGameWorldClubs({ world, division })
          .then(({ success, data }) => {
            if (success) return setClubs(data);
            return setClubs([]);
          })
          .finally(() => setLoadingClubs(false));
      }
    }
  };

  return (
    <main style={{ width: "100%", maxWidth: 1200, alignSelf: "start" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item sm={12} md={7} lg={7}>
            <SelectGameWorld {...{ gameWorlds, loadingWorlds, formData, onGameWorldChange, onGameWorldInputChange }} />
          </Grid>
          <Grid item sm={12} md={5} lg={5}>
            <SelectGameDivision {...{ onDivisionChange, divisions, division: formData.division }} />
          </Grid>
        </Grid>
      </Box>

      {formData.division && loadingClubs ? (
        "loading"
      ) : formData.division && !loadingClubs ? (
        <TableContainer
          component={Paper}
          style={{ margin: "10px auto", overflow: "scroll", maxWidth: "100vw", maxHeight: "calc(100vh - 300px)" }}
          // className={styles.tableContainer}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">Club</TableCell>
                <TableCell
                  align="center"
                  // onClick={sortClubsBudget}
                >
                  Budget
                </TableCell>
                <TableCell align="center">Manager</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clubs?.map(
                (
                  {
                    club,
                    divison,
                    // title,
                    // ref,
                    budget,
                    manager,
                    // ref,
                    //
                  },
                  i
                ) => (
                  <TableRow key={i}>
                    <TableCell
                    // onClick={viewClubHandler(ref)}
                    >
                      {/* <figure>
                        <Image src={`/images/club/${club}.webp`} layout="fill" alt="Club logo" />
                      </figure> */}

                      {/*  */}

                      {/* {title} */}
                    </TableCell>
                    <TableCell align="center">{`$${budget}m`}</TableCell>
                    <TableCell align="center">
                      {
                        manager || <button>manage club</button>
                        // <ManageClub club={ref} />
                      }
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </main>
  );
};
export default RegisterView;
