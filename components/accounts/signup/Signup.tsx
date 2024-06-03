"use client";

import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";

import { AttentionSeeker } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, PersonAddAlt1 as RegisterIcon } from "@mui/icons-material";
import {
  Stack,
  TextField,
  Typography,
  InputLabel,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Box,
  CircularProgress,
} from "@mui/material";

import { SignupProps } from "interfaces/components/others/accounts.interfaces";
import pageInfo from "utils/page-info";

const Signup = ({ onChangeHandler, userForm, handleClickShowPassword, registerHandler }: SignupProps) => (
  <Stack spacing={{ xs: 2, sm: 2, md: 2, lg: 2 }} textAlign="center" component="form" noValidate margin="auto" maxWidth={600}>
    <Image src="/images/layout/accounts.png" alt="Wave Research" width={120} height={100} style={{ margin: "auto" }} />

    <TextField
      fullWidth
      id="name"
      label="Name"
      variant="outlined"
      aria-describedby="name"
      value={userForm.name.value}
      placeholder="Firstname Middlename Lastname"
      onBlur={(e) => onChangeHandler(e, true)}
      onChange={(e) => onChangeHandler(e, false)}
      disabled={userForm.options.loading}
      error={!userForm.name.valid && !userForm.name.validating}
      inputProps={{ autoComplete: "new-password", form: { autoComplete: "off" } }}
    />

    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Email Address</InputLabel>
      <OutlinedInput
        id="email"
        label="Email Address"
        value={userForm.email.value}
        onBlur={(e) => onChangeHandler(e, true)}
        onChange={(e) => onChangeHandler(e, false)}
        disabled={userForm.options.loading}
        placeholder="firstname.lastname@waverd.com"
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
              onBlur={(e) => onChangeHandler(e, true)}
              onChange={(e) => onChangeHandler(e, false)}
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
              onBlur={(e) => onChangeHandler(e, true)}
              onChange={(e) => onChangeHandler(e, false)}
              disabled={userForm.options.loading}
              type={userForm.options.showPassword ? "text" : "password"}
              error={!userForm.password.valid && !userForm.password.validating}
              inputProps={{ autoComplete: "new-password", form: { autoComplete: "off" } }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword()}
                    edge="end"
                    disabled={!userForm.password.value}>
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
        size="large"
        type="submit"
        color="primary"
        variant="contained"
        endIcon={<RegisterIcon />}
        onClick={(e) => registerHandler(e)}
        loading={userForm.options.loading}>
        <Typography sx={{ fontWeight: 900 }}>Create Account</Typography>
      </LoadingButton>
    </AttentionSeeker>

    <Typography fontSize={10.9} textAlign="center" pt={2}>
      By clicking CREATE ACCOUNT, you agree to our <Link href={pageInfo.termsAndCondition.path}>Terms & Conditions</Link> and have read and
      acknowledge our&nbsp;
      <Link href={pageInfo.privacyPolicy.path}>Privacy Policy</Link>
    </Typography>

    <Typography fontSize={14}>
      Already on Wave Research? <Link href="/accounts/signin">Sign in</Link>
    </Typography>
  </Stack>
);

export default Signup;
