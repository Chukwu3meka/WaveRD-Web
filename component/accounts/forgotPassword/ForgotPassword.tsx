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

const Signin = ({ info, setInfo }: any) => (
  <Fade direction="down" triggerOnce={true} style={{ perspective: "100px" }}>
    <div className={styles.forgotPassword}>
      <Stack spacing={3} alignItems="flex-end" component="form" noValidate autoComplete="off" margin="auto" maxWidth={520}>
        <Alert variant="outlined" severity="success">
          Please provide your email address. If it exists in our database, we will send you a link to reset your password via email. Once you receive the mail
          to reset your password, kindly click on the link provided in the email. The link in the mail will become invalid after Three (3) hours
        </Alert>

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
          size="large"
          variant="contained"
          color="primary"
          // onClick={loginHandler()}
          // disabled={userForm.options.loading}
          // loading={userForm.options.loading}
        >
          <Typography sx={{ fontWeight: 900 }}>Send Link</Typography>
        </LoadingButton>
      </Stack>
    </div>
  </Fade>
);

export default Signin;
