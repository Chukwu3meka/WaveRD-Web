import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, Login as LoginIcon } from "@mui/icons-material";
import { Stack, TextField, Typography, IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment, CircularProgress, Box } from "@mui/material";

import { ISignin } from "@interface/accounts/signin-interface";
import Link from "next/link";

import { styles } from ".";
import Image from "next/image";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Signin = ({ resetPasswordHandler, form, onInputChange, handleClickShowPassword }: any) => (
  <Stack spacing={3} alignItems="center" textAlign="center" component="form" noValidate sx={{ "& > *": { width: "100%", maxWidth: "460px" } }}>
    <Box className={styles.rotation}>
      <Image src="/images/layout/reset-password.png" alt="SoccerMASS" width={100} height={80} style={{ margin: "auto" }} />
    </Box>

    <Typography fontSize="1.3em" fontWeight={600}>
      Reset Password
    </Typography>

    <Typography fontSize=".8em" textAlign="center" sx={{ marginTop: "5px !important" }}>
      Please enter the temporary password from the mail and a new password to complete the password recovery process. The link sent to your email will expire
      after 3 hours
    </Typography>

    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Temporary Password</InputLabel>
      <OutlinedInput
        id="password"
        type={form.options.showPassword ? "text" : "password"}
        value={form.tempPassword.value}
        disabled={form.options.loading}
        onChange={(e) => onInputChange(e)}
        placeholder="Temporary Password"
        error={!form.tempPassword.valid}
        label="Temporary Password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword()} edge="end">
              {form.options.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>

    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
      <OutlinedInput
        id="password"
        type={form.options.showPassword ? "text" : "password"}
        value={form.newPassword.value}
        disabled={form.options.loading}
        onChange={(e) => onInputChange(e)}
        placeholder="New Password"
        error={!form.newPassword.valid}
        label="New Password"
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
      <Typography sx={{ fontWeight: 900 }}>Reset Password</Typography>
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
);

export default Signin;
