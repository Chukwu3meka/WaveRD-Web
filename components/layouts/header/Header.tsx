import Link from "next/link";
import { Button, IconButton, Stack, Typography, Box } from "@mui/material";
import { Login as LoginIcon, Logout as LogOutIcon, LightMode as LightIcon, DarkModeOutlined as DarkIcon } from "@mui/icons-material";

import styles from "./styles.module.scss";
import SocialContainer from "../../shared/social/SocialContainer";

import MenuContainer from "./mobile-menu";
import { Header } from "interfaces/components/layout.interface";

export default ({ position, authenticated, displayHeader, swapColorFn, color, theme, themeHandler, visible }: Header) => (
  <header id="header" className={styles[position === "relative" ? "relativeHeader" : displayHeader ? "stickyHeader" : "hiddenHeader"]}>
    <main>
      <IconButton onClick={() => themeHandler(theme)}>{theme === "light" ? <DarkIcon color="primary" /> : <LightIcon color="primary" />}</IconButton>
      <Box>
        <Stack direction="row" onMouseOver={() => swapColorFn()} onMouseLeave={() => swapColorFn()}>
          <Link href="/">
            <Typography fontWeight={700} fontSize="1.7em" component="span" color={color.first}>
              Soccer
            </Typography>
            <Typography fontWeight={700} fontSize="1.7em" component="span" color={color.last}>
              MASS
            </Typography>
          </Link>
        </Stack>
      </Box>

      <Box display={visible.nav ? "flex" : "none"}>
        {navLinks.map(({ title, path }) => (
          <Typography variant="subtitle2" key={title} color="primary" fontWeight={700}>
            <Link href={path}>{title}</Link>
          </Typography>
        ))}
      </Box>

      {visible.mobile ? (
        <MenuContainer />
      ) : (
        <Box display="flex">
          <SocialContainer filterParams={["twitter", "instagram", "whatsapp"]} />

          <Box>
            {!authenticated && (
              <Link href="/accounts/signin">
                <Button variant="contained" color="primary" startIcon={<LoginIcon />}>
                  Sign in
                </Button>
              </Link>
            )}

            {authenticated && (
              <a href={`${process.env.API_URL}/v1/accounts/signout`} rel="noopener noreferrer">
                <Button variant="outlined" startIcon={<LogOutIcon />}>
                  Sign out
                </Button>
              </a>
            )}
          </Box>
        </Box>
      )}
    </main>
  </header>
);

const navLinks = [
  { title: "Home", path: "/" },
  { title: "API Hub", path: "/apihub" },
  { title: "Manager", path: "/manager" },
];
