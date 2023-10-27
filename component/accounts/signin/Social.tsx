import Chip from "@mui/material/Chip";
import { IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

import { socialStyles as styles } from ".";

import { Social } from "@interface/components/accounts/signinInterface";

const authData = [
  { color: "#1DA1F2", Icon: TwitterIcon, endpoint: `${process.env.API_URL}/v1/accounts/twitter`, label: "Twitter" },
  { color: "#DB4437", Icon: GoogleIcon, endpoint: `${process.env.API_URL}/v1/accounts/google`, label: "Google" },
  { color: "#4267B2", Icon: FacebookIcon, endpoint: `${process.env.API_URL}/v1/accounts/facebook`, label: "Facebook" },
];

export default ({ iconOnly }: Social) => (
  <section className={styles[iconOnly ? "iconOnly" : "social"]}>
    {authData.map(({ color, endpoint, Icon, label }) =>
      iconOnly ? (
        <IconButton key={label} aria-label="SoccerMASS oAuth Sign In" component="label" sx={{ color }}>
          <Icon fontSize="large" />
        </IconButton>
      ) : (
        <Chip
          clickable
          key={label}
          component="a"
          label={label}
          icon={<Icon />}
          href={endpoint}
          variant="outlined"
          sx={{ background: color, color: `#fff !important`, "&>svg": { color: `#fff !important` } }}
        />
      )
    )}
  </section>
);
