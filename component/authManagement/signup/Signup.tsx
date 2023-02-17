import Image from "next/image";
import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { Stack, TextField, Typography, InputLabel, IconButton, FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, PersonAddAlt1 as RegisterIcon } from "@mui/icons-material";

import { ConfirmMail, signupStyles } from ".";

const Signup = ({ onInputChange, userForm, handleClickShowPassword, registerHandler, currentError, onBlurHandler }: any) =>
  userForm.options.accountCreated ? (
    <ConfirmMail />
  ) : (
    <Fade direction="down" triggerOnce={true} className={signupStyles.signup}>
      <Stack spacing={3} alignItems="center" component="form" noValidate autoComplete="off">
        <Image src="/images/layout/soccermass.webp" alt="SoccerMASS" width={60} height={60} />
        <TextField
          fullWidth
          id="fullName"
          error={!userForm.fullName.valid}
          onBlur={onBlurHandler}
          disabled={userForm.options.loading}
          value={userForm.fullName.value}
          aria-describedby="fullName"
          label="Full Name"
          variant="outlined"
          placeholder="Firstname Lastname"
          onChange={onInputChange}
        />
        <TextField
          fullWidth
          id="email"
          onBlur={onBlurHandler}
          disabled={userForm.options.loading}
          value={userForm.email.value}
          aria-describedby="email"
          error={!userForm.email.valid}
          label="Email Address"
          variant="outlined"
          placeholder="firstname.lastname@soccermass.com"
          onChange={onInputChange}
        />
        <TextField
          fullWidth
          id="handle"
          onBlur={onBlurHandler}
          disabled={userForm.options.loading}
          value={userForm.handle.value}
          aria-describedby="handle"
          label="Handle"
          error={!userForm.handle.valid}
          variant="outlined"
          placeholder="What would you like us to call you?"
          onChange={onInputChange}
        />

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={userForm.options.showPassword ? "text" : "password"}
            value={userForm.password.value}
            onBlur={onBlurHandler}
            disabled={userForm.options.loading}
            onChange={onInputChange}
            placeholder="Complex Password"
            error={!userForm.password.valid}
            label="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                  {userForm.options.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <AttentionSeeker effect="bounce">
          <LoadingButton onClick={registerHandler} size="large" variant="outlined" endIcon={<RegisterIcon />} loading={!!userForm.options.loading}>
            <Typography sx={{ fontWeight: 900 }}>register</Typography>
          </LoadingButton>
        </AttentionSeeker>
      </Stack>
    </Fade>
  );

export default Signup;
