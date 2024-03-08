import Image from "next/image";
import { Grid, Typography, Button } from "@mui/material";

import { styles } from ".";

const Verify = ({ verified, msg, redirectHandler }) => (
  <Grid item xs={12} sm={12} md={7} lg={7}>
    <div className={styles.verify}>
      <div>
        <Image src={`/images/layout/${verified ? "official" : "notVerified"}.png`} layout="fill" alt="Account Verification" />
      </div>

      <Typography component="p" variant="body1" align="center">
        {msg}
      </Typography>

      <Button variant="contained" color="primary" onClick={redirectHandler}>
        Signin
      </Button>
    </div>
  </Grid>
);

export default Verify;
