"use client";

import { styles } from ".";
import Link from "next/link";
import HeaderContainer from "../header";
import { Fade } from "react-awesome-reveal";
import { List, ListItem, ListItemButton, ListItemText, Box, TextField, Autocomplete } from "@mui/material";

import { InfoLayoutProps, InfoLinks } from "interfaces/components/layouts.interface";

export default ({ activeRoute, deviceWidth, autoCompleteHandler, children }: InfoLayoutProps) => (
  <main className={styles.layout}>
    <HeaderContainer position="relative" />

    <div>
      <List component="nav">
        {infoLinks.map(({ path, label }) => (
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
        <>
          {activeRoute && deviceWidth < 1200 ? (
            <Box width="100%" maxWidth={1200} p={1} mt={2}>
              <Autocomplete
                fullWidth
                disablePortal
                options={infoLinks}
                id="soccermass-info"
                sx={{ zIndex: "100 !important" }}
                value={infoLinks.find(({ path }) => path === activeRoute)}
                renderInput={(params) => <TextField {...params} label="SoccerMASS Info" />}
                onChange={(event: any, newValue: InfoLinks | null) => autoCompleteHandler(newValue)}
              />
            </Box>
          ) : null}

          {children}
        </>
      </Fade>
    </div>
  </main>
);

const infoLinks: InfoLinks[] = [
  { label: "Contact Us", path: "/info/contact" },
  { label: "Privacy Policy", path: "/info/privacy" },
  { label: "Terms & Conditions", path: "/info/terms" },
  { label: "Cookie Policy", path: "/info/cookie" },
  { label: "Advertisement", path: "/info/advertise" },
  { label: "Data Deletion", path: "/info/deletion" },
  { label: "Pricing", path: "/info/pricing" },
  { label: "FAQ Section", path: "/info/faq" },
];
