"use client";

import Link from "next/link";
import Footer from "../footer";
import HeaderContainer from "../header";

import { styles } from ".";
import { Fade } from "react-awesome-reveal";
import { INFO_LINKS } from "utils/constants";
import { InfoLinks } from "interfaces/utils/constants.interface";
import { InfoLayoutProps } from "interfaces/components/layouts.interface";
import { List, ListItem, ListItemButton, ListItemText, Box, TextField, Autocomplete } from "@mui/material";

export default function InfoLayout({ activeRoute, deviceWidth, autoCompleteHandler, children }: InfoLayoutProps) {
  return (
    <>
      <main className={styles.layout}>
        <HeaderContainer position="relative" />

        <div>
          <List component="nav">
            {INFO_LINKS.map(({ path, label }) => (
              <Link key={label} href={path}>
                <ListItem disablePadding sx={{ textAlign: "center" }} onClick={() => autoCompleteHandler(path)}>
                  <ListItemButton selected={path === activeRoute}>
                    <ListItemText primary={label} sx={{ color: "var(--contrast-color)" }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>

          <Fade direction="down" triggerOnce={true} style={{ perspective: "100px" }}>
            {children}

            {activeRoute && deviceWidth < 1200 ? (
              <Box width="100%" maxWidth={1200} p={1} mt={2}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  options={INFO_LINKS}
                  id="soccermass-info"
                  value={INFO_LINKS.find(({ path }) => path === activeRoute)}
                  renderInput={(params) => <TextField {...params} label="SoccerMASS Info" />}
                  onChange={(event: any, newValue: InfoLinks | null) => autoCompleteHandler(newValue?.path)}
                />
              </Box>
            ) : null}
          </Fade>
        </div>
      </main>
      <Footer />
    </>
  );
}
