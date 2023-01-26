import Chip from "@mui/material/Chip";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

import { styles } from ".";

const Social = () => (
  <section className={styles.social}>
    <Chip
      component="a"
      sx={{ "&>svg": { color: "#1DA1F2 !important" } }}
      icon={<TwitterIcon />}
      clickable
      label="Sign in with Twitter"
      variant="outlined"
      color="primary"
      href={`${process.env.NEXT_PUBLIC_BASE_SERVER}/auth/twitter`}
    />
    <Chip
      icon={<GoogleIcon />}
      sx={{ "&>svg": { color: "#DB4437 !important" } }}
      clickable
      label="Sign in with Google"
      variant="outlined"
      color="primary"
      component="a"
      href={`${process.env.NEXT_PUBLIC_BASE_SERVER}/auth/google`}
    />
    <Chip
      sx={{ "&>svg": { color: "#4267B2 !important" } }}
      icon={<FacebookIcon />}
      clickable
      label="Sign in with Facebook"
      variant="outlined"
      color="primary"
      component="a"
      href={`${process.env.NEXT_PUBLIC_BASE_SERVER}/auth/facebook`}
    />
    {/* <SocialLink href={`http://127.0.0.1:5000/auth/twitter`} title="Continue with twitter" color="rgb(51, 133, 255)" /> */}
  </section>
);

export default Social;
