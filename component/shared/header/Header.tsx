import Link from "next/link";
import Image from "next/image";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Button, IconButton, Stack, Typography } from "@mui/material";

import styles from "./styles.module.scss";

import { IHeader } from "@interface/main/header-interface";
import socialAccounts from "@source/constants/socialAccounts";
import Menu from "./menu";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box } from "@mui/material";

import SignInIcon from "@mui/icons-material/Login";
import SignOutIcon from "@mui/icons-material/Logout";

// const Header = ({ relative, authenticated, displayHeader }: IHeader) => (
export default ({ position, authenticated, displayHeader, swapColorFn, color, theme, themeHandler, visible }: any) => (
  <div className={styles[position === "relative" ? "relativeHeader" : displayHeader ? "stickyHeader" : "hiddenHeader"]}>
    <header id="header">
      <IconButton onClick={() => themeHandler(theme)}>
        {theme === "light" ? <DarkModeOutlinedIcon color="primary" /> : <LightModeIcon color="primary" />}
      </IconButton>
      <Box>
        <Stack direction="row" component="a" href="/" onMouseOver={swapColorFn} onMouseLeave={swapColorFn}>
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
          <Box>
            {socialAccounts
              .filter((acc) => ["twitter", "instagram", "whatsapp"].includes(acc.id))
              .map(({ title, id, href }) => (
                <SocialIcon key={id} account={title} link={href} color={color.social} />
              ))}
          </Box>

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

const SocialIcon = ({ account, link, color }: { account: string; link: string; color: string }) => {
  let icon;

  switch (account) {
    case "Whatsapp":
      icon = <WhatsAppIcon fontSize="inherit" />;
      break;
    case "Twitter":
      icon = <TwitterIcon fontSize="inherit" />;
      break;

    case "Instagram":
      icon = <InstagramIcon fontSize="inherit" />;
      break;
    default:
      return <></>;
  }

  return (
    <IconButton LinkComponent={Link} color="inherit" rel="noopener noreferrer" href={link} target="_blank" sx={{ fontSize: "16px", color }}>
      {icon}
    </IconButton>
  );
};

const navLinks = [
  { title: "Home", path: "/" },
  { title: "API Hub", path: "/apihub" },
  { title: "Manager", path: "/manager" },
];
