import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import { List, ListItem, ListItemButton, ListItemText, Box, TextField, Autocomplete } from "@mui/material";

import { styles } from ".";
import RelativeHeader from "@component/shared/header";
import Loading from "@component/shared/loading/Loading";

import { InfoLayout, NavLinks } from "@interface/components/layouts/layoutsInterface";

export default ({ Component, pageProps, loading, activeRoute, deviceWidth, autoCompleteHandler }: InfoLayout) => (
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
        {loading ? (
          <Loading height="calc(var(--visibleScreen) - var(--headerHeight))" />
        ) : (
          <>
            {activeRoute && deviceWidth < 1200 && (
              <Box width="100%" maxWidth={1200} p={1} mt={2}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  options={navLinks}
                  id="soccermass-info"
                  value={navLinks.find(({ path }) => path === activeRoute)}
                  renderInput={(params) => <TextField {...params} label="SoccerMASS Info" />}
                  onChange={(event: any, newValue: NavLinks) => autoCompleteHandler(newValue)}
                />
              </Box>
            )}

            <Component {...pageProps} />
          </>
        )}
      </Fade>
    </div>
  </main>
);

const navLinks: NavLinks[] = [
  { label: "Contact Us", path: "/info/contact" },
  { label: "Privacy Policy", path: "/info/privacy" },
  { label: "Terms & Conditions", path: "/info/terms" },
  { label: "Cookie Policy", path: "/info/cookie" },
  { label: "Advertisement", path: "/info/advertise" },
  { label: "Data Deletion", path: "/info/deletion" },
];
