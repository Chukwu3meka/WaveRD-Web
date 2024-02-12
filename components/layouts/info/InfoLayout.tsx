"use client";

import { styles } from ".";
import Link from "next/link";
import Footer from "../footer";
import HeaderContainer from "../header";
import { Fade } from "react-awesome-reveal";
import { INFO_LINKS } from "utils/constants";
import { List, ListItem, ListItemButton, ListItemText, Box, TextField, Autocomplete } from "@mui/material";

import { InfoLinks } from "interfaces/utils/constants.interface";
import { InfoLayoutProps } from "interfaces/components/layouts.interface";

const InfoLayout = ({ activeRoute, deviceWidth, autoCompleteHandler, children }: InfoLayoutProps) => (
  <>
    <main className={styles.layout}>
      <HeaderContainer position="relative" />

      <div>
        <List component="nav">
          {INFO_LINKS.map(({ path, label }) => (
            <Link key={label} href={path}>
              <ListItem disablePadding sx={{ textAlign: "center" }} onClick={() => autoCompleteHandler(path)}>
                <ListItemButton selected={path === activeRoute}>
                  <ListItemText primary={label} sx={{ color: "var(--contrast)" }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>

        <Fade direction="down" triggerOnce={true} style={{ perspective: "100px" }}>
          <>
            {activeRoute && deviceWidth < 1200 ? (
              <Box width="100%" maxWidth={1200} p={1} mt={2}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  options={INFO_LINKS}
                  id="soccermass-info"
                  sx={{ zIndex: "100 !important" }}
                  value={INFO_LINKS.find(({ path }) => path === activeRoute)}
                  renderInput={(params) => <TextField {...params} label="SoccerMASS Info" />}
                  onChange={(event: any, newValue: InfoLinks | null) => autoCompleteHandler(newValue?.path)}
                />
              </Box>
            ) : null}

            {children}
          </>
        </Fade>
      </div>
    </main>
    <Footer />
  </>
);

export default InfoLayout;
