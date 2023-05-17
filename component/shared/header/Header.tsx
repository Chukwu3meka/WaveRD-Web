import Link from "next/link";
import { Button, IconButton, Stack, Typography, Box } from "@mui/material";
import { Login as SignInIcon, Logout as SignOutIcon, LightMode as LightModeIcon, DarkModeOutlined as DarkModeOutlinedIcon } from "@mui/icons-material";

import Menu from "../menu";
import SocialContainer from "../social/SocialContainer";

import styles from "./styles.module.scss";

import { Header } from "@interface/components/shared/headerInterface";

export default ({ position, authenticated, displayHeader, swapColorFn, color, theme, themeHandler, visible }: Header) => (
  <div className={styles[position === "relative" ? "relativeHeader" : displayHeader ? "stickyHeader" : "hiddenHeader"]}>
    <header id="header">
      <IconButton onClick={() => themeHandler(theme)}>
        {theme === "light" ? <DarkModeOutlinedIcon color="primary" /> : <LightModeIcon color="primary" />}
      </IconButton>
      <Box>
        <Stack direction="row" component="a" href="/" onMouseOver={() => swapColorFn} onMouseLeave={() => swapColorFn}>
          <Typography fontWeight={700} fontSize="1.7em" component="span" color={color.first}>
            Soccer
          </Typography>
          <Typography fontWeight={700} fontSize="1.7em" component="span" color={color.last}>
            MASS
          </Typography>
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
        <Menu />
      ) : (
        <Box display="flex">
          <SocialContainer filterParams={["twitter", "instagram", "whatsapp"]} />

          <Box>
            {!authenticated && (
              <Link href="/accounts/signin">
                <Button variant="contained" size="small" color="primary" startIcon={<SignInIcon />}>
                  Sign in
                </Button>
              </Link>
            )}

            {authenticated && (
              <Button variant="outlined" size="small" startIcon={<SignOutIcon />}>
                <a
                  href={process.env.NODE_ENV === "development" ? "http://localhost:5000/v1/accounts/signout" : "https://api.soccermass.com/v1/accounts/signout"}
                  rel="noopener noreferrer">
                  Sign out
                </a>
              </Button>
            )}
          </Box>
        </Box>
      )}
    </header>
  </div>
);

const navLinks = [
  { title: "Home", path: "/" },
  { title: "API Hub", path: "/apihub" },
  { title: "Manager", path: "/manager" },
];
