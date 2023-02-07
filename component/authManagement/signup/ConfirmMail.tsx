import { Button, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
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
          <Image src="/images/layout/new-mail.png" alt="SoccermMASS Signup New Mail" fill />
        </div>

        <Stack direction="row">
          <Button fullWidth variant="outlined">
            <Link href="/auth/signin">Login</Link>
          </Button>
          &nbsp;
          <Button fullWidth variant="outlined">
            <Link href="/info/contact">Contact Us</Link>
          </Button>
        </Stack>
      </Paper>
    </Fade>
  );
};

export default ConfirmMail;
