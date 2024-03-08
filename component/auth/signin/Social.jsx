import { useEffect, useState } from "react";
import { Chip, Avatar } from "@mui/material";

import { styles } from ".";
import API from "@utils/api";

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

  const oAuthHandler = (href) => () => {
    setClicked(true);
    setHref(href);
  };

  return (
    <section className={styles.social}>
      <div>
        <Chip
          avatar={<Avatar>T</Avatar>}
          clickable
          label="Twitter"
          variant="outlined"
          color="primary"
          onClick={oAuthHandler(`${API.mode}auth/twitter`)}
        />
        <Chip
          avatar={<Avatar>G</Avatar>}
          clickable
          label="Google"
          variant="outlined"
          color="primary"
          onClick={oAuthHandler(`${API.mode}auth/google`)}
        />
        <Chip
          avatar={<Avatar>F</Avatar>}
          clickable
          label="Facebook"
          variant="outlined"
          color="primary"
          onClick={oAuthHandler(`${API.mode}auth/facebook`)}
        />
        {/* <SocialLink href={`http://127.0.0.1:5000/auth/twitter`} title="Continue with twitter" color="rgb(51, 133, 255)" /> */}
      </div>
      <span>
        <i>eMail Signin</i>
      </span>
    </section>
  );
};

export default Social;
