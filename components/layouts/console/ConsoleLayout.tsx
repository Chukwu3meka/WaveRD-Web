"use client";

import Link from "next/link";
import Image from "next/image";
import routes from "utils/routes";
import Ellipsis from "components/shared/ellipsis";

import { styles } from ".";
import { Fade } from "react-awesome-reveal";
import { Contrast as ThemeIcon } from "@mui/icons-material";
import { ConsoleLayoutProps } from "interfaces/components/others/layouts.interface";
import { IconButton, ListItemIcon, ListItemText, ListItemButton, Avatar, Stack, Typography, Divider, List } from "@mui/material";

const ConsoleLayout = ({ children, profile, activeRoute, themeHandler }: ConsoleLayoutProps) => (
  <div className={styles.layout}>
    <nav className={styles.navigation}>
      <Stack alignItems="center">
        <Avatar alt={profile?.name} src={profile ? profile.avatar : "/images/default-user.png"} sx={{ width: 115, height: 115 }} />

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
                  <ListItemText>
                    <Typography sx={{ fontWeight: 600 }} color="var(--contrast-color) !important">
                      {title.toUpperCase()}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </Link>
            ))}

          <ListItemButton>
            <ListItemIcon>
              <IconButton aria-label="theme icon" sx={{ ml: -0.7 }} onClick={themeHandler}>
                <ThemeIcon />
              </IconButton>
            </ListItemIcon>
            <ListItemText>
              <Typography
                component="a"
                sx={{ fontWeight: 600 }}
                rel="noopener noreferrer"
                color="var(--contrast-color) !important"
                href={`${process.env.API_URL}/accounts/signout`}>
                LOGOUT
              </Typography>
            </ListItemText>
          </ListItemButton>
        </List>
      </Stack>

      <Stack alignItems="center">
        <Divider sx={{ width: "100%", mt: 4, mb: 1.5 }} />

        <Image className={styles.spinner} src="/images/layout/soccermass.webp" alt="SoccerMASS Avatar" width={25} height={25} />

        <Typography fontSize=".7em">Ireland | Nigeria | Israel | United States</Typography>

        <Typography fontFamily="Fredericka the Great" fontSize=".9em" letterSpacing=".009">
          ©{new Date().getFullYear()} Wave Research
        </Typography>
      </Stack>
    </nav>

    <Fade direction="right">{children}</Fade>
  </div>
);

export default ConsoleLayout;
