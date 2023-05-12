import Chip from "@mui/material/Chip";
import { IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

import { socialStyles as styles } from ".";

import { Social } from "@interface/accounts/signin-interface";

const Social = ({ iconOnly }: Social) => (
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
          sx={{
            color: `${color} !important`,
            "&>svg": { color: `${color} !important` },
          }}
        />
      )
    )}
  </section>
);

export default Social;

const authData = [
  {
    color: "#1DA1F2",
    Icon: TwitterIcon,
    endpoint: process.env.NODE_ENV === "development" ? `http://localhost:5000/v1/accounts/twitter` : `https://api.soccermass.com/v1/accounts/twitter`,
    label: "Twitter",
  },
  {
    color: "#DB4437",
    Icon: GoogleIcon,
    endpoint: process.env.NODE_ENV === "development" ? `http://localhost:5000/v1/accounts/google` : `https://api.soccermass.com/v1/accounts/google`,
    label: "Google",
  },
  {
    color: "#4267B2",
    Icon: FacebookIcon,
    endpoint: process.env.NODE_ENV === "development" ? `http://localhost:5000/v1/accounts/facebook` : `https://api.soccermass.com/v1/accounts/facebook`,
    label: "Facebook",
  },
];
