import React from "react";
import Image from "next/image";

import { Avatar, Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { EndpointsIntroProps } from "interfaces/components/apihub.interface";

import { Fragment } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import ListItemText from "@mui/material/ListItemText";
import Autocomplete from "@mui/material/Autocomplete";
import ListItemButton from "@mui/material/ListItemButton";
import { styles } from ".";
import { SearchOutlined } from "@mui/icons-material";
import Ellipsis from "components/shared/ellipsis";
import SearchContainer from "../search";

const EndpointsIntro = ({ showMenu, getEndpoint }: EndpointsIntroProps) => (
  <Box margin="auto" p={1} sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      {showMenu ? <Grid item lg={3}></Grid> : null}
      <Grid item lg={9}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={4} py={8} px={1}>
            {showMenu && (
              <Avatar sx={{ width: 170, height: 170 }}>
                <Image src="/images/layout/soccermass.webp" alt="SoccerMASS" width={180} height={150} style={{ margin: "auto" }} />
              </Avatar>
            )}
            <Box maxWidth={600}>
              <Typography fontSize="1.5em" color="text.secondary">
                Unlimited Endpoints for your team
              </Typography>

              <span>
                Unlock the Power of possibilities with Football data using our API Hub with an endless list of APIs. Explore a World of
                wonders with football API's
              </span>

              <SearchContainer getEndpoint={getEndpoint} />
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default EndpointsIntro;
