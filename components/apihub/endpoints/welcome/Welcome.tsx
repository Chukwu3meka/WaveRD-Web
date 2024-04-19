import Image from "next/image";

import { Search } from ".";
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import { WelcomeProps } from "interfaces/components/apihub.interface";

const Welcome = ({
  showMenu,
  searchResult,
  onInputChange,
  inputValue,
  getEndpoint,
  onValueChange,
  centered,
  searchEndpoints,
}: WelcomeProps) => (
  <Box sx={{ flexGrow: 1, background: "var(--secondary-color)" }}>
    <Grid container spacing={2} maxWidth={1500} margin="auto">
      {showMenu ? <Grid item lg={3}></Grid> : <></>}
      <Grid item sm={12} md={12} lg={9}>
        <Stack direction="row" alignItems="center" justifyContent={centered ? "center" : "flex-start"} spacing={4} py={6} px={1}>
          {showMenu && (
            <Avatar sx={{ width: 100, height: 100 }}>
              <Image src="/images/layout/soccermass.webp" alt="SoccerMASS" width={100} height={100} />
            </Avatar>
          )}

          <Box maxWidth={540}>
            <Typography fontSize="1.5em" color="text.secondary">
              Unlimited Endpoints for your team
            </Typography>

            <Typography mb={1}>
              With our Football data and an infinite variety of APIs through our API Hub, discover a world of wonders in SoccerMASS.
            </Typography>

            <Search
              searchResult={searchResult}
              onInputChange={onInputChange}
              inputValue={inputValue}
              getEndpoint={getEndpoint}
              onValueChange={onValueChange}
              searchEndpoints={searchEndpoints}
            />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  </Box>
);

export default Welcome;
