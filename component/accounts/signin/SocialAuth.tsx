import Chip from "@mui/material/Chip";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

import { styles } from ".";

const Social = () => (
  <section className={styles.social}>
    <Chip
      sx={{ "&>svg": { color: "#1DA1F2 !important" } }}
      icon={<TwitterIcon />}
      clickable
      label="Twitter"
      variant="outlined"
      color="primary"
      component="a"
      href={
        process.env.NODE_ENV === "development" ? `http://localhost:5000/api/accounts/personal/twitter` : `https://accounts.soccermass.com/api/personal/twitter`
      }
    />
    <Chip
      icon={<GoogleIcon />}
      sx={{ "&>svg": { color: "#DB4437 !important" } }}
      clickable
      label="Google"
      variant="outlined"
      color="primary"
      component="a"
      href={
        process.env.NODE_ENV === "development" ? `http://localhost:5000/api/accounts/personal/google` : `https://accounts.soccermass.com/api/personal/google`
      }
    />
    <Chip
      sx={{ "&>svg": { color: "#4267B2 !important" } }}
      icon={<FacebookIcon />}
      clickable
      label="Facebook"
      variant="outlined"
      color="primary"
      component="a"
      href={
        process.env.NODE_ENV === "development"
          ? `http://localhost:5000/api/accounts/personal/facebook`
          : `https://accounts.soccermass.com/api/personal/facebook`
      }
    />
  </section>
);

export default Social;
