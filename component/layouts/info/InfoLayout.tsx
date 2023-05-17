import Carousel from "nuka-carousel";
import { Fade } from "react-awesome-reveal";

import RelativeHeader from "@component/shared/header";
import Loading from "@component/shared/loading/Loading";
import authSlideText from "@source/constants/authSlideText";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { styles } from ".";
import { SubLayout } from "@interface/components/layouts/layoutsInterface";
import Link from "next/link";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

export default ({ Component, pageProps, loading, activeRoute }: any) => (
  <main className={styles.subLayout}>
    <RelativeHeader position="relative" />
    <div>
      <List component="nav">
        {navLinks.map(({ path, label }) => (
          <Link key={label} href={path}>
            <ListItem disablePadding sx={{ textAlign: "center" }}>
              <ListItemButton selected={path === activeRoute}>
                <ListItemText primary={label} sx={{ color: "var(--contrast)" }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      <Fade direction="down" triggerOnce={true} style={{ perspective: "100px" }}>
        {loading ? <Loading height="calc(var(--visibleScreen) - var(--headerHeight))" /> : <Component {...pageProps} />}
      </Fade>
    </div>
  </main>
);

const navLinks = [
  { label: "Privacy Policy", path: "/info/privacy" },
  { label: "Advertisement", path: "/info/advertise" },
  { label: "Terms and Conditions", path: "/info/terms" },
  { label: "Cookie Policy", path: "/info/cookie" },
];
