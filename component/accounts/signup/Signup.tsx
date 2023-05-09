import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, PersonAddAlt1 as RegisterIcon } from "@mui/icons-material";
import { Stack, TextField, Typography, InputLabel, IconButton, FormControl, OutlinedInput, InputAdornment, Box, CircularProgress } from "@mui/material";

import { ISignup } from "@interface/accounts/signup-interface";

const Signup = ({ onInputChange, userForm, handleClickShowPassword, registerHandler, onBlurHandler }: ISignup) => (
  <Stack spacing={3} textAlign="center" component="form" noValidate margin="auto" maxWidth={600}>
    <Image src="/images/layout/accounts.png" alt="SoccerMASS" width={150} height={120} style={{ margin: "auto" }} />

    <TextField
      fullWidth
      id="fullName"
      label="Full Name"
      variant="outlined"
      aria-describedby="fullName"
      value={userForm.fullName.value}
      placeholder="Firstname Lastname"
      error={!userForm.fullName.valid}
      onBlur={(e) => onBlurHandler(e)}
      onChange={(e) => onInputChange(e)}
      disabled={userForm.options.loading}
    />

    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Email Address</InputLabel>
      <OutlinedInput
        id="email"
        value={userForm.email.value}
        disabled={userForm.options.loading}
        onBlur={(e) => onBlurHandler(e)}
        onChange={(e) => onInputChange(e)}
        placeholder="firstname.lastname@soccermass.com"
        error={!userForm.email.valid}
        label="Email Address"
        autoComplete="off"
        endAdornment={
          userForm.email.validating ? (
            <InputAdornment position="end">
              <IconButton aria-label="validating email" edge="end" sx={{ ml: -1 }}>
                <CircularProgress color="success" size={20} />
              </IconButton>
            </InputAdornment>
          ) : (
            false
          )
        }
      />
    </FormControl>

    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Handle</InputLabel>
            <OutlinedInput
              id="handle"
              value={userForm.handle.value}
              disabled={userForm.options.loading}
              onChange={(e) => onInputChange(e)}
              onBlur={(e) => onBlurHandler(e)}
              placeholder="What would you like us to call you?"
              error={!userForm.handle.valid}
              label="Handle"
              endAdornment={
                userForm.handle.validating ? (
                  <InputAdornment position="end">
                    <IconButton aria-label="validating handle" edge="end" sx={{ ml: -1 }}>
                      <CircularProgress color="success" size={20} />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  false
                )
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={userForm.options.showPassword ? "text" : "password"}
              value={userForm.password.value}
              disabled={userForm.options.loading}
              onChange={(e) => onInputChange(e)}
              onBlur={(e) => onBlurHandler(e)}
              placeholder="Password"
              error={!userForm.password.valid}
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword()} edge="end">
                    {userForm.options.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>

    <AttentionSeeker effect="bounce">
      <LoadingButton
        onClick={() => registerHandler()}
        size="large"
        variant="contained"
        color="primary"
        endIcon={<RegisterIcon />}
        loading={!!userForm.options.loading}>
        <Typography sx={{ fontWeight: 900 }}>Create Account</Typography>
      </LoadingButton>
    </AttentionSeeker>

    <Typography fontSize={10} textAlign="center" sx={{ margin: "35px auto -10px !important" }}>
      By clicking CREATE ACCOUNT, you agree to our <Link href="/info/terms">Terms & Conditions</Link> and have read and acknowledge our&nbsp;
      <Link href="/info/privacy">Privacy Policy</Link>
    </Typography>

    <Typography fontSize={14}>
      Already on SoccerMASS? <Link href="/accounts/signin">Sign in</Link>
    </Typography>
  </Stack>
);

export default Signup;
