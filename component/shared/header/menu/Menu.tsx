import Link from "next/link";
import Image from "next/image";

import {
  Menu as MenuIcon,
  HomeRounded as HomeIcon,
  LoginOutlined as SignInIcon,
  CloseSharp as CloseSharpIcon,
  LogoutOutlined as SignOutIcon,
  PersonAddOutlined as SignUpIcon,
  SportsEsportsOutlined as ManagerIcon,
  ConnectWithoutContactOutlined as ApiHubIcon,
} from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Box, Divider, SwipeableDrawer, IconButton, Paper, Stack, Typography } from "@mui/material";

import { styles, Social } from ".";

export default ({ toggleMenuOpen, iOS, menuOpen, authenticated, profile }: any) => (
  <>
    <IconButton onClick={toggleMenuOpen(true)}>
      <MenuIcon color="action" />
    </IconButton>

    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor={"right"}
      open={menuOpen}
      onClose={toggleMenuOpen(false)}
      onOpen={toggleMenuOpen(true)}>
      <Stack
        height="100%"
        justifyContent="space-between"
        sx={{ width: "clamp(250px, 100vw, 300px)", padding: 2, overflow: "hidden" }}
        role="presentation"
        onKeyDown={toggleMenuOpen(false)}
        className={styles.menu}>
        <Stack>
          <Box textAlign="center">
            <IconButton onClick={toggleMenuOpen(true)}>
              <CloseSharpIcon color="disabled" />
            </IconButton>
          </Box>

          <Stack spacing={2} direction="row">
            <Box>
              <Image src={profile.image} alt="Profile Image" width={55} height={55} />
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical" }}>
                {profile.name}
              </Typography>
              <Typography
                noWrap
                variant="subtitle2"
                color="text.secondary"
                fontSize=".7em"
                sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical" }}>
                {profile.handle}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 4 }} />
          <Box>
            <List onClick={toggleMenuOpen(false)}>
              {navLinks
                .filter((nav) => (authenticated ? !["signup", "signin"].includes(nav.id) : !["signout"].includes(nav.id)))
                .flatMap(({ Icon, path, title, id }) => (
                  <Link key={id} href={path}>
                    <ListItem disablePadding sx={{ textAlign: "center" }}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon />
                        </ListItemIcon>
                        <ListItemText primary={title} sx={{ color: "var(--contrast)" }} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
            </List>
          </Box>
        </Stack>

        <Stack alignItems="center">
          <Box sx={{ mb: -4 }}>
            <Image
              src="/images/layout/soccermass.webp"
              alt="SoccerMASS"
              width={55}
              height={55}
              style={{
                position: "relative",
                zIndex: 5,
                border: "5px solid var(--primary)",
                borderRadius: "50%",
              }}
            />
          </Box>
          <Paper sx={{ width: "100%", pt: 5 }} elevation={2}>
            <Social />
            <section>
              <Typography component="span" variant="body2" fontSize=".7em">
                ● All rights reserved. All trademarks are the property of their respective owners ●
              </Typography>

              <Typography component="span" variant="body2" fontSize=".8em">
                ©SoccerMASS 2018 ~ {new Date().getFullYear()}
              </Typography>
            </section>
          </Paper>
        </Stack>
      </Stack>
    </SwipeableDrawer>
  </>
);

const navLinks = [
  { id: "home", title: "Home", Icon: HomeIcon, path: "/" },
  { id: "apihub", title: "API Hub", Icon: ApiHubIcon, path: "/apihub" },
  { id: "manager", title: "Manager", Icon: ManagerIcon, path: "/manager" },
  { id: "signup", title: "Sign Up", Icon: SignUpIcon, path: "/accounts/signup" },
  { id: "signin", title: "Sign In", Icon: SignInIcon, path: "/accounts/signin" },
  {
    id: "signout",
    title: "Sign Out",
    Icon: SignOutIcon,
    path: process.env.NODE_ENV === "development" ? "http://localhost:5000/v1/accounts/signout" : "https://api.soccermass.com/v1/accounts/signout",
  },
];
