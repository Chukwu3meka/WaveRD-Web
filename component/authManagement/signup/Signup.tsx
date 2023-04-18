import Link from "next/link";
import Image from "next/image";
import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, PersonAddAlt1 as RegisterIcon } from "@mui/icons-material";
import { Stack, TextField, Typography, InputLabel, IconButton, FormControl, OutlinedInput, InputAdornment, Button, CircularProgress } from "@mui/material";

import { ConfirmMail, signupStyles } from ".";

import { ISignup } from "@interface/auth/signup-interface";

const Signup = ({ onInputChange, userForm, handleClickShowPassword, registerHandler }: ISignup) =>
  userForm.options.accountCreated ? (
    <ConfirmMail />
  ) : (
    <Fade direction="down" triggerOnce={true} className={signupStyles.signup}>
      <div>
        <Stack spacing={3} alignItems="center" component="form" noValidate autoComplete="off">
          <Image src="/images/layout/soccermass.webp" alt="SoccerMASS" width={60} height={60} />
          <TextField
            fullWidth
            id="fullName"
            label="Full Name"
            variant="outlined"
            aria-describedby="fullName"
            value={userForm.fullName.value}
            placeholder="Firstname Lastname"
            error={!userForm.fullName.valid}
            onChange={(e) => onInputChange(e)}
            disabled={userForm.options.loading}
            inputProps={{ autocomplete: "off", form: { autocomplete: "off" } }}
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Email Address</InputLabel>
            <OutlinedInput
              id="email"
              value={userForm.email.value}
              disabled={userForm.options.loading}
              onChange={(e) => onInputChange(e)}
              placeholder="firstname.lastname@soccermass.com"
              error={!userForm.email.valid}
              label="Email Address"
              inputProps={{ autocomplete: "off", form: { autocomplete: "off" } }}
              endAdornment={
                userForm.email.validating ? (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword()} edge="end" sx={{ ml: -1 }}>
                      <CircularProgress color="success" size={20} />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  false
                )
              }
            />
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={userForm.options.showPassword ? "text" : "password"}
              value={userForm.password.value}
              disabled={userForm.options.loading}
              onChange={(e) => onInputChange(e)}
              placeholder="Complex Password"
              error={!userForm.password.valid}
              label="Password"
              inputProps={{ autocomplete: "off", form: { autocomplete: "off" } }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword()} edge="end">
                    {userForm.options.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Handle</InputLabel>
            <OutlinedInput
              id="handle"
              value={userForm.handle.value}
              disabled={userForm.options.loading}
              onChange={(e) => onInputChange(e)}
              placeholder="What would you like us to call you?"
              error={!userForm.handle.valid}
              label="Handle"
              inputProps={{ autocomplete: "off", form: { autocomplete: "off" } }}
              endAdornment={
                userForm.handle.validating ? (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword()} edge="end" sx={{ ml: -1 }}>
                      <CircularProgress color="success" size={20} />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  false
                )
              }
            />
          </FormControl>

          <Stack direction="row" alignSelf="flex-end" spacing={2} sx={{ width: "max-content" }}>
            <AttentionSeeker effect="bounce">
              <Link href="/auth/signin">
                <Button variant="outlined" size="large">
                  login
                </Button>
              </Link>

              <LoadingButton
                onClick={() => registerHandler()}
                size="large"
                variant="contained"
                color="primary"
                endIcon={<RegisterIcon />}
                loading={!!userForm.options.loading}>
                <Typography sx={{ fontWeight: 900 }}>register</Typography>
              </LoadingButton>
            </AttentionSeeker>
          </Stack>
        </Stack>
      </div>
    </Fade>
  );

export default Signup;
