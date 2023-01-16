import Link from "next/link";
import Image from "next/image";
import { Paper, Button, Typography, Stack, IconButton } from "@mui/material";

import VpnLockIcon from "@mui/icons-material/VpnLock";
import DataObjectIcon from "@mui/icons-material/DataObject";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";

import { apiHubIntroStyles } from ".";

const ApiHubIntro = () => (
  <div className={apiHubIntroStyles.apihub}>
    <Stack direction="row" spacing={2} justifyContent="space-evenly">
      <Paper elevation={4}>
        <Image src="/images/layout/intro-apihub.jpg" alt="SoccerMASS API HUB welcome image" layout="fill" />
      </Paper>

      <main>
        <Typography>- WHY DO ANYTHING?</Typography>
        <Typography textAlign="justify">Maintaining Football data is not core to your businesss</Typography>

        <Stack direction="row">
          <IconButton>
            <NetworkCheckIcon />
          </IconButton>

          <Stack>
            <Typography fontWeight={600}>Improve Performance</Typography>
            <Typography>Our Server is hosted on a reliable Cloud Provider to ensure 24/7 data availability and minimal response time with little to no down time</Typography>
          </Stack>
        </Stack>

        <Stack direction="row">
          <IconButton>
            <DataObjectIcon />
          </IconButton>

          <Stack>
            <Typography fontWeight={600}>Massive data to fetch</Typography>
            <Typography>
              Building and maintaining ever changing football data will stretch your budget and Team. Allow SoccerMASS handle this task as we provide a large pool of data to fetch
              from ranging from Players, Clubs, Countries, Leagues, e.t.c.
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row">
          <IconButton>
            <VpnLockIcon />
          </IconButton>

          <Stack>
            <Typography fontWeight={600}>Create Robust App</Typography>
            <Typography>
              First to provide a full-text-search powered by the most powerful NoSQL Database 'MongoDB'. Overwhelming functionalities to consume, enough to solve your data worries.
            </Typography>
          </Stack>
        </Stack>

        <Link href="/apihub">See all features</Link>
      </main>
    </Stack>
  </div>
);

export default ApiHubIntro;
