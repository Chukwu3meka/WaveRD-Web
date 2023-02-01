import { Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { confirmMailStyles } from ".";

const ConfirmMail = () => {
  return (
    <Fade direction="down" triggerOnce={true} className={confirmMailStyles.confirmMail}>
      <Paper elevation={4}>
        <Typography variant="h5">Verify Your Email</Typography>
        <Typography margin="10px 50px" variant="body2">
          Check your email & click the link to activate your account
        </Typography>
        <div>
          <Image src="/images/layout/new-mail.png" alt="SoccermMASS Signup New Mail" fill />
        </div>
        <Button fullWidth variant="outlined">
          Resend Email
        </Button>
      </Paper>
    </Fade>
  );
};

export default ConfirmMail;
