"use client";

import { styles } from ".";
import { Fade } from "react-awesome-reveal";
import { Box, Avatar, Stack, Typography, Divider, List } from "@mui/material";
import { ConsoleLayoutProps } from "interfaces/components/others/layouts.interface";

import Link from "next/link";
import Image from "next/image";
import routes from "utils/routes";
import AppBar from "@mui/material/AppBar";
import { capitalize } from "utils/helpers";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Ellipsis from "components/shared/ellipsis";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FooterContainer from "components/shared/footer";
import ListItemButton from "@mui/material/ListItemButton";

const ConsoleLayout = ({ children, profile, activeRoute, themeHandler, thisYear }: ConsoleLayoutProps) => (
  <div className={styles.layout}>
    <nav className={styles.navigation}>
      <Stack alignItems="center">
        <Box position="relative">
          <Avatar alt={profile?.name} src={profile ? profile.avatar : "/images/default-user.png"} sx={{ width: 115, height: 115 }} />
          <Image className={styles.spinner} src="/images/layout/soccermass.webp" alt="SoccerMASS Avatar" width={35} height={35} />
        </Box>

        <Stack>
          <Ellipsis lines={1} fontWeight={600} fontSize="1em" textTransform="capitalize">
            {profile ? profile.name : "Full name"}
          </Ellipsis>
          <Ellipsis lines={1} ml="auto" textAlign="right" fontSize=".7em">
            {profile ? profile.role : "Role"}
          </Ellipsis>
        </Stack>

        <Divider sx={{ width: "100%", mt: 1, mb: 4 }} />
      </Stack>

      <Stack pr={2} mr={-1.5}>
        <List component="nav" aria-label="main mailbox folders">
          {routes
            .filter((route) => route.research === null)
            .map(({ title, path, Icon }, i) => (
              <Link key={i} href={path} className={styles[activeRoute.startsWith(path) ? "active" : ""]}>
                <ListItemButton selected={activeRoute.startsWith(path)}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={title.toUpperCase()} sx={{ color: "var(--contrast-color)" }} />
                </ListItemButton>
              </Link>
            ))}
        </List>
      </Stack>

      <Stack alignItems="center">
        <Divider sx={{ width: "100%", mt: 4, mb: 0.5 }} />

        <Typography mt={1} fontSize=".7em">
          Ireland | Nigeria | Israel | United States
        </Typography>

        <Typography fontFamily="Fredericka the Great" fontSize=".9em" letterSpacing=".009">
          ©{thisYear} Wave Research
        </Typography>
      </Stack>
    </nav>

    <div>
      <AppBar position="sticky" color="transparent" sx={{ background: "var(--secondary-color)", height: 70 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={themeHandler}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {capitalize(routes?.find((route) => route.path === activeRoute)?.title || "SoccerMASS Console")}
          </Typography>

          <Typography color="inherit" component="a" href={`${process.env.API_URL}/accounts/signout`} rel="noopener noreferrer">
            Logout
          </Typography>
        </Toolbar>
      </AppBar>

      <Fade direction="right">{children}</Fade>

      <FooterContainer />
    </div>
  </div>
);

export default ConsoleLayout;
