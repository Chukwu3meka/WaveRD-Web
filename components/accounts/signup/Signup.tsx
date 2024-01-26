import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, PersonAddAlt1 as RegisterIcon } from "@mui/icons-material";
import { Stack, TextField, Typography, InputLabel, IconButton, FormControl, OutlinedInput, InputAdornment, Box, CircularProgress } from "@mui/material";

import { SignupProps } from "interfaces/components/accounts.interfaces";

const Signup = ({ onInputChange, userForm, handleClickShowPassword, registerHandler, onBlurHandler }: SignupProps) => (
  <Stack spacing={{ xs: 2, sm: 2, md: 2, lg: 2 }} textAlign="center" component="form" noValidate margin="auto" maxWidth={600}>
    <Image src="/images/layout/accounts.png" alt="SoccerMASS" width={120} height={100} style={{ margin: "auto" }} />

    <TextField
      fullWidth
      id="fullName"
      label="Full Name"
      variant="outlined"
      aria-describedby="fullName"
      value={userForm.fullName.value}
      placeholder="Firstname Lastname"
      onBlur={(e) => onBlurHandler(e)}
      onChange={(e) => onInputChange(e)}
      disabled={userForm.options.loading}
      error={!userForm.fullName.valid && !userForm.fullName.validating}
      inputProps={{ autoComplete: "new-password", form: { autoComplete: "off" } }}
    />

    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Email Address</InputLabel>
      <OutlinedInput
        id="email"
        label="Email Address"
        value={userForm.email.value}
        onBlur={(e) => onBlurHandler(e)}
        onChange={(e) => onInputChange(e)}
        disabled={userForm.options.loading}
        placeholder="firstname.lastname@soccermass.com"
        error={!userForm.email.valid && !userForm.email.validating}
        inputProps={{ autoComplete: "new-password", form: { autoComplete: "off" } }}
        endAdornment={
          userForm.email.validating ? (
            <InputAdornment position="end">
              <IconButton aria-label="validating email" edge="end" sx={{ ml: -1 }}>
                <CircularProgress color="success" size={20} />
              </IconButton>
            </InputAdornment>
          ) : (
            <></>
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
              label="Handle"
              value={userForm.handle.value}
              onBlur={(e) => onBlurHandler(e)}
              onChange={(e) => onInputChange(e)}
              disabled={userForm.options.loading}
              placeholder="What would you like us to call you?"
              error={!userForm.handle.valid && !userForm.handle.validating}
              inputProps={{ autoComplete: "new-password", form: { autoComplete: "off" } }}
              endAdornment={
                userForm.handle.validating ? (
                  <InputAdornment position="end">
                    <IconButton aria-label="validating handle" edge="end" sx={{ ml: -1 }}>
                      <CircularProgress color="success" size={20} />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  <></>
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
              label="Password"
              placeholder="Password"
              value={userForm.password.value}
              onBlur={(e) => onBlurHandler(e)}
              onChange={(e) => onInputChange(e)}
              disabled={userForm.options.loading}
              error={!userForm.password.valid && !userForm.password.validating}
              type={!userForm.password.value && userForm.options.showPassword ? "text" : "password"}
              inputProps={{ autoComplete: "new-password", form: { autoComplete: "off" } }}
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
        fullWidth
        onClick={() => registerHandler()}
        size="large"
        variant="contained"
        color="primary"
        endIcon={<RegisterIcon />}
        loading={userForm.options.loading}>
        <Typography sx={{ fontWeight: 900 }}>Create Account</Typography>
      </LoadingButton>
    </AttentionSeeker>

    <Typography fontSize={10} textAlign="center" pt={2}>
      By clicking CREATE ACCOUNT, you agree to our <Link href="/info/terms">Terms & Conditions</Link> and have read and acknowledge our&nbsp;
      <Link href="/info/privacy">Privacy Policy</Link>
    </Typography>

    <Typography fontSize={14}>
      Already on SoccerMASS? <Link href="/accounts/signin">Sign in</Link>
    </Typography>
  </Stack>
);

export default Signup;
