import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, Login as LoginIcon } from "@mui/icons-material";
import { Stack, TextField, Typography, IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment, CircularProgress } from "@mui/material";

import { ISignin } from "@interface/accounts/signin-interface";
import Link from "next/link";

import { styles } from ".";
import Image from "next/image";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Signin = ({ resetPasswordHandler, form, onInputChange, handleClickShowPassword }: any) => (
  <main className={styles.forgotPassword}>
    <Stack spacing={3} alignItems="center" component="form" noValidate autoComplete="off" margin="auto" maxWidth={520}>
      <Image src="/images/layout/password.png" alt="SoccerMASS" width={150} height={120} />

      <Typography fontSize="1.3em" fontWeight={600}>
        Reset Password
      </Typography>

      <Typography fontSize=".8em" textAlign="center" sx={{ marginTop: "5px !important" }}>
        Please enter a new password to complete the password recovery process. The link sent to your email will expire after 3 hours
      </Typography>

      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={form.options.showPassword ? "text" : "password"}
          value={form.password.value}
          disabled={form.options.loading}
          onChange={(e) => onInputChange(e)}
          placeholder="Password"
          error={!form.password.valid}
          label="Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword()} edge="end">
                {form.options.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <LoadingButton
        fullWidth
        size="large"
        variant="contained"
        color="primary"
        onClick={() => resetPasswordHandler()}
        disabled={form.options.loading}
        loading={form.options.loading}>
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
  </main>
);

export default Signin;
