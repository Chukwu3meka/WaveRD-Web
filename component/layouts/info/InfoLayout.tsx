import Link from "next/link";
import Carousel from "nuka-carousel";
import { Fade } from "react-awesome-reveal";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import { styles } from ".";
import RelativeHeader from "@component/shared/header";
import Loading from "@component/shared/loading/Loading";

import { SubLayout } from "@interface/components/layouts/layoutsInterface";

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
  { label: "Contact Us", path: "/info/contact" },
  { label: "Privacy Policy", path: "/info/privacy" },
  { label: "Terms & Conditions", path: "/info/terms" },
  { label: "Cookie Policy", path: "/info/cookie" },
  { label: "Advertisement", path: "/info/advertise" },
];
