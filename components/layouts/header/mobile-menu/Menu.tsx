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

import { styles } from ".";
import Link from "next/link";
import Image from "next/image";
import SocialContainer from "components/shared/social";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Box, Divider, SwipeableDrawer, IconButton, Paper, Stack, Typography } from "@mui/material";

import { MenuProps } from "interfaces/components/layouts.interface";

const navLinks = [
  { id: "home", title: "Home", Icon: HomeIcon, path: "/" },
  { id: "apihub", title: "Football API Hub", Icon: ApiHubIcon, path: "/apihub" },
  { id: "manager", title: "Soccer Manager", Icon: ManagerIcon, path: "/manager" },
  { id: "signup", title: "Register/Create an Account", Icon: SignUpIcon, path: "/accounts/signup" },
  { id: "signin", title: "Login to your Account", Icon: SignInIcon, path: "/accounts/signin" },
  { id: "signout", title: "Sign Out from SoccerMASS", Icon: SignOutIcon, path: `${process.env.API_URL}/accounts/signout` },
];

const Menu = ({ toggleMenuOpen, iOS, menuOpen, profile, authenticated }: MenuProps) => {
  return (
    <>
      <IconButton onClick={(e) => toggleMenuOpen(e)} aria-label="mobile-menu">
        <MenuIcon color="action" />
      </IconButton>

      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor={"right"}
        open={menuOpen}
        onClose={(e) => toggleMenuOpen(e)}
        onOpen={(e) => toggleMenuOpen(e)}>
        <Stack
          height="100%"
          justifyContent="space-between"
          sx={{ width: "100%", padding: 2, overflow: "hidden" }}
          role="presentation"
          onKeyDown={(e) => toggleMenuOpen(e)}
          className={styles.menu}>
          <Stack>
            <Box textAlign="center" mb={2}>
              <IconButton onClick={(e) => toggleMenuOpen(e)}>
                <CloseSharpIcon color="disabled" fontSize="large" />
              </IconButton>
            </Box>

            <Stack spacing={2} direction="row">
              <Box>
                <Image src={profile.avatar} alt="Profile Image" width={55} height={55} />
              </Box>

              <Box>
                <Typography variant="h6" sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical" }}>
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

            <Divider sx={{ my: 2 }} />

            <Box>
              <List onClick={(e) => toggleMenuOpen(e)}>
                {navLinks
                  .filter((nav) => (authenticated ? !["signup", "signin"].includes(nav.id) : !["signout"].includes(nav.id)))
                  .flatMap(({ Icon, path, title, id }) => (
                    <Link key={id} href={path}>
                      <ListItem disablePadding sx={{ textAlign: "center" }}>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon />
                          </ListItemIcon>
                          <ListItemText primary={title} sx={{ color: "var(--contrast-color)" }} />
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
                width={60}
                height={60}
                style={{
                  position: "relative",
                  zIndex: 5,
                  border: "5px solid var(--primary-color)",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Paper sx={{ width: "100%", pt: 5 }} elevation={2}>
              <SocialContainer filterParams={["twitter", "instagram", "whatsapp", "linkedin", "facebook"]} fontSize="30px" />

              <section>
                <Typography component="span" variant="body2" fontSize=".9em">
                  ● All rights reserved. All trademarks are the property of their respective owners ●
                </Typography>

                <Typography component="span" variant="body2">
                  ©SoccerMASS 2018 ~ {new Date().getFullYear()}
                </Typography>
              </section>
            </Paper>
          </Stack>
        </Stack>
      </SwipeableDrawer>
    </>
  );
};

export default Menu;
