import MenuIcon from "@mui/icons-material/Menu";

import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Fragment } from "react";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";

import Link from "next/link";
import Image from "next/image";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Button, IconButton, Stack, Typography } from "@mui/material";

import styles from "./styles.module.scss";

import { IHeader } from "@interface/main/header-interface";
import socialAccounts from "@source/constants/socialAccounts";
import Menu from "@component/shared/menu";

// const Header = ({ relativeHeader, authenticated, displayHeader }: IHeader) => (
const BuilderHeader = ({
  toggleMenuOpen,
  iOS,
  menuOpen,
  signoutAction,
  displayHeader,
  authenticated,
  relativeHeader,
  swapColorFn,
  color,
  titleOnly,
  theme,
  themeHandler,
}: any) => (
  <Fragment>
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
      <Box sx={{ width: "clamp(250px, 100vw, 400px)" }} role="presentation" onClick={toggleMenuOpen(false)} onKeyDown={toggleMenuOpen(false)}>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <div>
          {/* <div> */}
          {/* {socialAccounts
            .filter((acc) => ["twitter", "instagram", "whatsapp"].includes(acc.id))
            .map(({ title, id, href }) => (
              <SocialIcon key={id} account={title} link={href} color={color.social} />
            ))} */}

          {/* </div> */}
          {!authenticated && (
            <Link href="/accounts/signin">
              <Button variant="outlined" size="small">
                Sign in
              </Button>
            </Link>
          )}
          {!authenticated && (
            <Link href="/accounts/signup">
              <Button variant="contained" size="small" color="primary">
                Sign up
              </Button>
            </Link>
          )}
          {authenticated && (
            <Button variant="outlined" size="small">
              <a
                href={process.env.NODE_ENV === "development" ? "http://localhost:5000/v1/accounts/signout" : "https://api.soccermass.com/v1/accounts/signout"}
                rel="noopener noreferrer">
                Sign out
              </a>
            </Button>
          )}
        </div>

        <div>
          <IconButton onClick={() => themeHandler(theme)}>
            {theme === "light" ? <DarkModeOutlinedIcon color="primary" /> : <LightModeIcon color="primary" />}
          </IconButton>
        </div>
      </Box>
    </SwipeableDrawer>
  </Fragment>
);

export default BuilderHeader;

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
