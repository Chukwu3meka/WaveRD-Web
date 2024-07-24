"use client";

import { Result } from "antd";
import { Box, Grid } from "@mui/material";
import { Zoom } from "react-awesome-reveal";
import { SelectClub, SelectGameDivision, SelectGameWorld, ViewClub } from ".";
import { RegisterViewProps } from "interfaces/components/games.interface/register.interface";

const RegisterView = ({
  clubs,
  formData,
  clubData,
  divisions,
  gameWorlds,
  loadingClubs,
  loadingWorlds,
  viewClubHandler,
  onDivisionChange,
  onGameWorldChange,
  manageClubHandler,
  onGameWorldInputChange,
}: RegisterViewProps) => (
  <main style={{ width: "100%", maxWidth: 700, alignSelf: "start" }}>
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
      <Zoom>
        <SelectClub {...{ loadingClubs, division: formData.division, clubs, viewClubHandler, manageClubHandler }} />
      </Zoom>
    ) : (
      <Zoom>
        <Result status="403" subTitle={formData.gameWorld ? "Kindly Select a Division to proceed" : "Kindly Select a Game World to proceed"} />
      </Zoom>
    )}

    <ViewClub
      clubData={clubData}
      viewClubHandler={viewClubHandler}
      created={gameWorlds.find((world) => world.ref !== formData.gameWorld)!?.created}
    />
  </main>
);

export default RegisterView;
