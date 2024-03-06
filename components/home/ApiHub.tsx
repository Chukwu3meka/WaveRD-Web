"use client";

import Link from "next/link";
import Image from "next/image";
import { apiHubStyles } from ".";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import DataObjectIcon from "@mui/icons-material/DataObject";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import { Breadcrumbs, Typography, Stack, IconButton, Box } from "@mui/material";
import { stringToId } from "utils/helpers";

const ApiHub = () => (
  <div className={apiHubStyles.apihub}>
    <Box role="presentation" pl={2} py={3}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.secondary">SoccerMASS</Typography>

        <Typography color="text.secondary">Core</Typography>

        <Link href="/apihub">
          <Typography color="primary">API HUB</Typography>
        </Link>
      </Breadcrumbs>
    </Box>

    <Stack spacing={3} justifyContent="space-evenly">
      <div>
        <Image
          src="/images/layout/intro-apihub.png"
          alt="SoccerMASS API HUB welcome image"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </div>

      <main>
        <Typography fontWeight={600} color="primary">
          - WHY DO ANYTHING?
        </Typography>

        <div style={{ margin: "20px auto", textAlign: "center", fontSize: "2em", fontWeight: 800, lineHeight: 1.2 }}>
          <span>Let's handle the</span>
          <span style={{ color: "green" }}>&nbsp;Football data&nbsp;</span>
          <span>for your business</span>
        </div>

        <div>
          {apihubFeatures.map(({ icon, title, description }) => (
            <Stack direction="row" alignItems="flex-start" key={title} spacing={2} marginBottom={3}>
              <IconButton aria-label={stringToId(title)} color="primary" sx={{ fontSize: "25px", marginTop: -0.5 }}>
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

export default ApiHub;

const apihubFeatures = [
  {
    icon: <NetworkCheckIcon fontSize="inherit" />,
    title: "Improve Performance",
    description: "Our Server is hosted on 'Render'; A reliable Cloud Provider to ensure 24/7 data availability and minimal response time with little to no down time",
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
      "First API provider to offer full-text-search powered by the most robust and flexible NoSQL Database 'MongoDB'. Overwhelming functionalities to consume, as we are here to solve your data worries.",
  },
];
