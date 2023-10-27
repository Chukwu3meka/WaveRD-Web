import Link from "next/link";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, Login as LoginIcon } from "@mui/icons-material";
import { Stack, TextField, Typography, IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment, Box, Alert } from "@mui/material";

import { Social } from ".";
import { Signin } from "@interface/components/accounts/signinInterface";

export default ({ onInputChange, handleClickShowPassword, userForm, loginHandler, iconOnly, authenticated }: Signin) => (
  <Stack spacing={3} component="form" noValidate>
    {authenticated && <Alert>You're already logged in !!!</Alert>}

    <Social iconOnly={iconOnly} />

    <Box width="100%">
      <Divider sx={{ color: "#8C8C8C", fontSize: "0.8em" }}>or Sign in with Email</Divider>
    </Box>

    <TextField
      fullWidth
      id="email"
      variant="outlined"
      value={userForm.email}
      label="Email Address"
      aria-describedby="email"
      disabled={userForm.options.loading}
      onChange={(e) => onInputChange(e)}
      placeholder="firstname.lastname@soccermass.com"
    />

    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="password"
        label="Password"
        placeholder="Password"
        value={userForm.password}
        disabled={userForm.options.loading}
        onChange={(e) => onInputChange(e)}
        type={userForm.options.showPassword ? "text" : "password"}
        inputProps={{ autoComplete: "off", form: { autoComplete: "off" } }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword()} edge="end">
              {userForm.options.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>

    <Typography textAlign="right" sx={{ margin: "10px 0 -5px !important" }} fontSize={14}>
      <Link href="/accounts/forgot-password">Forgot Password</Link>
    </Typography>

    <AttentionSeeker effect="bounce">
      <LoadingButton fullWidth size="large" color="primary" variant="contained" endIcon={<LoginIcon />} onClick={() => loginHandler()} loading={userForm.options.loading}>
        <Typography sx={{ fontWeight: 900 }}>Sign in</Typography>
      </LoadingButton>
    </AttentionSeeker>

    <Typography sx={{ marginTop: "35px !important" }} fontSize={14}>
      New to SoccerMASS? <Link href="/accounts/signup">Create Account</Link>
    </Typography>
  </Stack>
);
