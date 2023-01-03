import { styles } from ".";
import { Typography } from "@mui/material";

const Footer = () => (
  <footer className={styles.footer}>
    <Typography variant="body2">● ©{new Date().getFullYear()} Soccer Atlas, Inc. ●</Typography>
    <Typography variant="body1">The Home of Soccer Data. All Rights Reserved.</Typography>
  </footer>
);

export default Footer;
