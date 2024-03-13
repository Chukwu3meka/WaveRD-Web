import Chip from "@mui/material/Chip";
import { IconButton } from "@mui/material";
import { socialStyles as styles } from ".";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

import { SocialSignin } from "interfaces/components/accounts.interfaces";

const authData = [
  { color: "#1DA1F2", Icon: TwitterIcon, endpoint: `${process.env.API_URL}/accounts/twitter`, label: "Twitter" },
  { color: "#DB4437", Icon: GoogleIcon, endpoint: `${process.env.API_URL}/accounts/google`, label: "Google" },
  { color: "#4267B2", Icon: FacebookIcon, endpoint: `${process.env.API_URL}/accounts/facebook`, label: "Facebook" },
];

const SocialSignin = ({ iconOnly }: SocialSignin) => (
  <section className={styles[iconOnly ? "iconOnly" : "social"]}>
    {authData.map(({ color, endpoint, Icon, label }) =>
      iconOnly ? (
        <a href={endpoint} key={label}>
          <IconButton aria-label="SoccerMASS oAuth Sign In" component="label" sx={{ color }}>
            <Icon fontSize="large" />
          </IconButton>
        </a>
      ) : (
        <Chip
          clickable
          key={label}
          component="a"
          label={label}
          icon={<Icon />}
          href={endpoint}
          variant="outlined"
          sx={{
            background: color,
            color: `#fff !important`,
            "&>svg": { color: `#fff !important` },

            ":hover": {
              color: `#fff !important`,
              background: `${color} !important`,
              "&>svg": { color: `#fff !important` },
            },
          }}
        />
      )
    )}
  </section>
);

export default SocialSignin;
