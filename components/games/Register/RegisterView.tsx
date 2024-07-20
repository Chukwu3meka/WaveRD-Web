"use client";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { Badge, Box, ButtonGroup, CircularProgress, Divider, IconButton, Skeleton, Stack, Tooltip } from "@mui/material";
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
import { ObjectEntries, ordinalSuffix, transformDivision } from "utils/helpers";
import Ellipsis from "components/shared/ellipsis";
import { SelectClub, SelectGameDivision, SelectGameWorld, ViewClub } from ".";
import { GetGameWorldClubsResponse, GetGameWorldsResponse } from "interfaces/services/games.interface";
import { Result } from "antd";
// import { Badge, Card } from "antd";

interface Divisions {
  unmanaged: number;
  title: string;
  manager: null;
  budget: number;
}

const RegisterView = (props: any) => {
  const [clubData, setClubData] = useState<any>({}),
    [loadingClubs, setLoadingClubs] = useState(false),
    [loadingWorlds, setLoadingWorlds] = useState(false),
    [divisions, setDivisions] = useState<Divisions[]>([]),
    [showClub, setShowClub] = useState<string | null>(null),
    [clubs, setClubs] = useState<GetGameWorldClubsResponse[]>([]),
    [gameWorlds, setGameWorlds] = useState<GetGameWorldsResponse[]>([]),
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
    if (clubs) setClubs([]);
    if (divisions) setDivisions([]);
    setFormData((x) => ({ ...x, gameWorld: gameWorld?.ref || "", division: "", club: "" }));

    if (gameWorld)
      setDivisions(
        gameWorld.divisions
          .sort((a: any, b: any) => Number(a.division.split("_")[0].replace("tour", "")) - Number(b.division.split("_")[0].replace("tour", "")))
          .map(({ division, total }: any) => ({ title: transformDivision("ref", division), unmanaged: total }))
      );
  };

  const onGameWorldInputChange = async (event: Event, newInputValue: string) => {
    setFormData((formData) => ({ ...formData, gameWorldInput: newInputValue }));

    // Check if Current Input exists in already fetch game worlds list
    const exists = gameWorlds.find((world) => world.title === newInputValue);
    if (!exists) await getGameWorlds(newInputValue || null);
  };

  const onDivisionChange = async (event: any, divisionLabel: any | null) => {
    setClubs([]);
    if (!divisionLabel) setFormData((formData) => ({ ...formData, division: "", club: "" }));

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
          })
          .finally(() => setLoadingClubs(false));
      }
    }
  };

  const viewClubHandler = async (ref: string) => {
    console.log({ club: ref, world: formData.gameWorld });
    setShowClub(ref);
  };

  const manageClubHandler = async (ref: string) => {
    //

    console.log({ manageClubHandler: ref });
  };

  const showClubHandler = () => {
    setShowClub(null);
  };

  return (
    <main style={{ width: "100%", maxWidth: 1200, alignSelf: "start" }}>
      <Box sx={{ flexGrow: 1, mb: 1.5 }}>
        <Grid container spacing={1}>
          <Grid item sm={12} md={7} lg={7}>
            <SelectGameWorld {...{ gameWorlds, loadingWorlds, formData, onGameWorldChange, onGameWorldInputChange }} />
          </Grid>
          <Grid item sm={12} md={5} lg={5}>
            <SelectGameDivision {...{ onDivisionChange, divisions, division: formData.division }} />
          </Grid>
        </Grid>
      </Box>

      {formData.gameWorld && formData.division ? (
        <SelectClub {...{ loadingClubs, division: formData.division, clubs, viewClubHandler, manageClubHandler }} />
      ) : (
        <Result status="403" subTitle={formData.gameWorld ? "Kindly Select a Division to proceed" : "Kindly Select a Game World to proceed"} />
      )}

      <ViewClub
        {...{ showClub: !!showClub, showClubHandler, clubData, created: gameWorlds.find((world) => world.ref !== formData.gameWorld)!?.created }}
      />
    </main>
  );
};
export default RegisterView;
