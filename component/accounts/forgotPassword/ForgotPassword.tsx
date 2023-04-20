import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, Login as LoginIcon } from "@mui/icons-material";
import { Stack, TextField, Typography, IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment, Button } from "@mui/material";

import { ISignin } from "@interface/accounts/signin-interface";
import Link from "next/link";

import { styles } from ".";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Signin = ({ info, setInfo }: any) => (
  <Fade direction="down" triggerOnce={true} style={{ perspective: "100px" }}>
    <div className={styles.forgotPassword}>
      <Stack spacing={3} alignItems="center" component="form" noValidate autoComplete="off" margin="auto" maxWidth={520}>
        <Image src="/images/layout/password.png" alt="SoccerMASS" width={150} height={120} />

        <Typography fontSize="1.3em" fontWeight={600}>
          Forgot Password
        </Typography>

        <Typography fontSize=".8em" textAlign="center" sx={{ marginTop: "5px !important" }}>
          Kindly enter the email address associated with your account, and we'll send a link to reset your password
        </Typography>

        <TextField
          fullWidth
          id="email"
          variant="outlined"
          // value={userForm.email}
          label="Email Address"
          aria-describedby="email"
          // disabled={userForm.options.loading}
          // onChange={(e) => onInputChange(e)}
          placeholder="firstname.lastname@soccermass.com"
          autoComplete="off"
        />

        <LoadingButton
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          // onClick={loginHandler()}
          // disabled={userForm.options.loading}
          // loading={userForm.options.loading}
        >
          <Typography sx={{ fontWeight: 900 }}>Send Link</Typography>
        </LoadingButton>

        <Typography fontSize=".8em" textAlign="center">
          <Link href="/accounts/signin">
            <IconButton color="primary" sx={{ fontSize: "1.3em", mr: "-0px" }}>
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
            Back to Sign in
          </Link>
        </Typography>
      </Stack>
    </div>
  </Fade>
);

export default Signin;
