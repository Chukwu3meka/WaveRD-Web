import Link from "next/link";
import Image from "next/image";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack, Typography, IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment, Box } from "@mui/material";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";

import { ResetPasswordProp } from "interfaces/components/accounts.interfaces";

const ConfirmPasswordReset = ({ resetPasswordHandler, form, onInputChange, handleClickShowPassword }: ResetPasswordProp) => (
  <Stack spacing={3} component="form" noValidate>
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
        onBlur={(e) => onInputChange(e, true)}
        onChange={(e) => onInputChange(e, false)}
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
        onBlur={(e) => onInputChange(e, true)}
        onChange={(e) => onInputChange(e, false)}
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
      type="submit"
      onClick={(e) => resetPasswordHandler(e)}
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

export default ConfirmPasswordReset;
