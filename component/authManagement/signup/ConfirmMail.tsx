import Link from "next/link";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import { Button, Paper, Stack, Typography } from "@mui/material";

import { confirmMailStyles } from ".";

const ConfirmMail = () => {
  return (
    <Fade direction="down" triggerOnce={true} className={confirmMailStyles.confirmMail}>
      <Paper elevation={4}>
        <Typography variant="h5">Verify Your Email</Typography>

        <Typography margin="10px 50px" variant="body2" maxWidth={450}>
          Congratulations, your account has been successfully created. Please check your email and follow the activation link.
        </Typography>

        <div>
          <Image
            src="/images/layout/new-mail.png"
            alt="SoccermMASS Signup New Mail"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>

        <Stack direction="row">
          <Link href="/auth/signin">
            <Button fullWidth variant="outlined">
              Login
            </Button>
          </Link>
          &nbsp;
          <Link href="/info/contact">
            <Button fullWidth variant="outlined">
              Contact Us
            </Button>
          </Link>
        </Stack>
      </Paper>
    </Fade>
  );
};

export default ConfirmMail;
