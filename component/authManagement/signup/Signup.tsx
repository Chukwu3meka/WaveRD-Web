import Image from "next/image";
import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { Stack, TextField, Typography, InputLabel, IconButton, FormControl, OutlinedInput, InputAdornment, Button } from "@mui/material";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, PersonAddAlt1 as RegisterIcon } from "@mui/icons-material";

import { ConfirmMail, signupStyles } from ".";
import { ISignup } from "@interface/auth/signup-interface";
import Link from "next/link";

const Signup = ({ onInputChange, userForm, handleClickShowPassword, registerHandler, onBlurHandler }: ISignup) =>
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
            onBlur={(e) => onBlurHandler(e)}
            onChange={(e) => onInputChange(e)}
            disabled={userForm.options.loading}
          />
          <TextField
            fullWidth
            id="email"
            onBlur={(e) => onBlurHandler(e)}
            disabled={userForm.options.loading}
            value={userForm.email.value}
            aria-describedby="email"
            error={!userForm.email.valid}
            label="Email Address"
            variant="outlined"
            placeholder="firstname.lastname@soccermass.com"
            onChange={(e) => onInputChange(e)}
          />
          <TextField
            fullWidth
            id="handle"
            onBlur={(e) => onBlurHandler(e)}
            disabled={userForm.options.loading}
            value={userForm.handle.value}
            aria-describedby="handle"
            label="Handle"
            error={!userForm.handle.valid}
            variant="outlined"
            placeholder="What would you like us to call you?"
            onChange={(e) => onInputChange(e)}
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={userForm.options.showPassword ? "text" : "password"}
              value={userForm.password.value}
              onBlur={(e) => onBlurHandler(e)}
              disabled={userForm.options.loading}
              onChange={(e) => onInputChange(e)}
              placeholder="Complex Password"
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
