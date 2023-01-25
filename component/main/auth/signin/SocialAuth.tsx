import { useEffect, useState } from "react";
import { Chip, Avatar } from "@mui/material";

import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

import { styles } from ".";

const Social = () => {
  const [href, setHref] = useState(""),
    [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked && href) {
      setHref("");
      setClicked(false);
      window.open(href, "_self");
    }
  }, [clicked]);

  const oAuthHandler = (href: string) => () => {
    setClicked(true);
    setHref(href);
  };

  return (
    <section className={styles.social}>
      <Chip
        sx={{ "&>svg": { color: "#1DA1F2 !important" } }}
        icon={<TwitterIcon />}
        clickable
        label="Sign in with Twitter"
        variant="outlined"
        color="primary"
        onClick={oAuthHandler(`${process.env.NEXT_PUBLIC_BASE_SERVER}/auth/twitter`)}
      />
      <Chip
        icon={<GoogleIcon />}
        sx={{ "&>svg": { color: "#DB4437 !important" } }}
        clickable
        label="Sign in with Google"
        variant="outlined"
        color="primary"
        onClick={oAuthHandler(`${process.env.NEXT_PUBLIC_BASE_SERVER}/auth/google`)}
      />
      <Chip
        sx={{ "&>svg": { color: "#4267B2 !important" } }}
        icon={<FacebookIcon />}
        clickable
        label="Sign in with Facebook"
        variant="outlined"
        color="primary"
        onClick={oAuthHandler(`${process.env.NEXT_PUBLIC_BASE_SERVER}/auth/facebook`)}
      />
      {/* <SocialLink href={`http://127.0.0.1:5000/auth/twitter`} title="Continue with twitter" color="rgb(51, 133, 255)" /> */}
    </section>
  );
};

export default Social;
