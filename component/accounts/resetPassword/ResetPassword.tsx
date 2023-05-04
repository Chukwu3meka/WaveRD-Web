import Link from "next/link";
import Image from "next/image";

import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Stack, Typography, IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment, Box, CircularProgress } from "@mui/material";

import { ResetPassword } from "@interface/accounts/resetPassword-interface";

const Signin = ({ resetPasswordHandler, form, onInputChange, handleClickShowPassword }: ResetPassword) => (
  <Stack spacing={3} alignItems="center" textAlign="center" component="form" noValidate sx={{ "& > *": { width: "100%", maxWidth: "460px" } }}>
    <Box>
      <Image src="/images/layout/password.png" alt="SoccerMASS" width={150} height={120} style={{ margin: "auto" }} />
    </Box>

    <Typography fontSize="1.3em" fontWeight={600}>
      Reset Password
    </Typography>

    <Typography fontSize=".8em" textAlign="center" sx={{ marginTop: "5px !important" }}>
      Please enter your email and new password to complete the password recovery process. The link sent to your email will expire after 3 hours
    </Typography>

    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Email Address</InputLabel>
      <OutlinedInput
        id="email"
        value={form.email.value}
        disabled={form.options.loading}
        onChange={(e) => onInputChange(e)}
        placeholder="firstname.lastname@soccermass.com"
        error={!form.email.valid}
        label="Email Address"
        autoComplete="off"
      />
    </FormControl>

    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
      <OutlinedInput
        id="password"
        type={form.options.showPassword ? "text" : "password"}
        value={form.password.value}
        disabled={form.options.loading}
        onChange={(e) => onInputChange(e)}
        placeholder="New Password"
        error={!form.password.valid}
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
