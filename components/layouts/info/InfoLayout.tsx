"use client";

import Link from "next/link";
import HeaderContainer from "../../shared/header";
import FooterContainer from "../../shared/footer";

import { styles } from ".";
import { Fade } from "react-awesome-reveal";
import { INFO_LINKS } from "utils/constants";
import { InfoLinks } from "interfaces/utils/constants.interface";
import { InfoLayoutProps } from "interfaces/components/others/layouts.interface";
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
            {activeRoute && deviceWidth < 1200 ? (
              <Box width="100%" maxWidth={1200} p={1} mt={2}>
                <Autocomplete
                  fullWidth
                  options={INFO_LINKS}
                  id="waverd-info"
                  value={INFO_LINKS.find(({ path }) => path === activeRoute)}
                  renderInput={(params) => <TextField {...params} label="Wave Research Info" />}
                  onChange={(event: any, newValue: InfoLinks | null) => autoCompleteHandler(newValue?.path)}
                />
              </Box>
            ) : null}

            {children}
          </Fade>
        </div>
      </main>
      <FooterContainer />
    </>
  );
}
