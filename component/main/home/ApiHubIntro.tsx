import Link from "next/link";
import Image from "next/image";
import { Paper, Button, Typography, Stack, IconButton, Box } from "@mui/material";

import VpnLockIcon from "@mui/icons-material/VpnLock";
import DataObjectIcon from "@mui/icons-material/DataObject";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";

import { apiHubIntroStyles } from ".";

const ApiHubIntro = () => (
  <div className={apiHubIntroStyles.apihub}>
    <Stack direction="row" spacing={3} justifyContent="space-evenly">
      <div>
        <Image src="/images/layout/intro-apihub.png" alt="SoccerMASS API HUB welcome image" layout="fill" />
      </div>

      <main>
        <Typography color="primary">- WHY DO ANYTHING?</Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", marginY: 2 }}>
          <Typography fontSize="2em" fontWeight={700}>
            Maintaining Football data is
          </Typography>
          <Typography fontSize="2em" fontWeight={700} color="primary">
            &nbsp;not core&nbsp;
          </Typography>
          <Typography fontSize="2em" fontWeight={700}>
            to your businesss
          </Typography>
        </Box>

        <div>
          {apihubFeatures.map(({ icon, title, description }) => (
            <Stack direction="row" alignItems="flex-start" key={title} spacing={2} marginBottom={3}>
              <IconButton color="primary" sx={{ fontSize: "25px", marginTop: -0.5 }}>
                {icon}
              </IconButton>

              <Stack>
                <Typography fontWeight={800}>{title}</Typography>
                <Typography>{description}</Typography>
              </Stack>
            </Stack>
          ))}
        </div>

        <Link href="/apihub">
          <Typography>See all features</Typography>
        </Link>
      </main>
    </Stack>
  </div>
);

export default ApiHubIntro;

const apihubFeatures = [
  {
    icon: <NetworkCheckIcon fontSize="inherit" />,
    title: "Improve Performance",
    description: "Our Server is hosted on a reliable Cloud Provider to ensure 24/7 data availability and minimal response time with little to no down time",
  },
  {
    icon: <DataObjectIcon fontSize="inherit" />,
    title: "Massive data to consume",
    description:
      "Building and maintaining ever changing football data will stretch your budget and Team. Allow SoccerMASS handle this task as we provide a large pool of data to fetch from ranging from Players, Clubs, Countries, Leagues, e.t.c.",
  },
  {
    icon: <VpnLockIcon fontSize="inherit" />,
    title: "Create Robust App",
    description:
      "First to provide a full-text-search powered by the most powerful NoSQL Database 'MongoDB'. Overwhelming functionalities to consume, enough to solve your data worries.",
  },
];
