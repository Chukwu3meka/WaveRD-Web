import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, Login as LoginIcon } from "@mui/icons-material";
import { Box, Stack, TextField, Typography, IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment } from "@mui/material";

import { SocialAuth, styles } from ".";
import { ISignin } from "@interface/auth/signin-interface";

const Signin = ({ onInputChange, handleClickShowPassword, values, loginHandler }: ISignin) => (
  <Fade direction="down" triggerOnce={true} style={{ perspective: "100px" }}>
    <div id="signin" className={styles.signin}>
      <SocialAuth />

      <div className={styles.divider}>
        <span />
        <span>or Signin with Email</span>
      </div>

      <Stack spacing={3} alignItems="center" component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          id="email"
          variant="outlined"
          value={values.email}
          label="Email Address"
          aria-describedby="email"
          disabled={values.buttonLoading}
          onChange={(e) => onInputChange(e)}
          placeholder="firstname.lastname@soccermass.com"
        />

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Admin Password</InputLabel>
          <OutlinedInput
            type={values.showPassword ? "text" : "password"}
            onChange={(e) => onInputChange(e)}
            disabled={values.buttonLoading}
            placeholder="Complex Password"
            value={values.password}
            label="Admin Password"
            id="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword()} edge="end">
                  {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Box sx={{ textAlign: "right", width: "100%" }}>
          <AttentionSeeker effect="bounce">
            <LoadingButton
              size="large"
              variant="outlined"
              onClick={loginHandler()}
              endIcon={<LoginIcon />}
              disabled={!!values.buttonLoading}
              loading={!!values.buttonLoading}>
              <Typography sx={{ fontWeight: 900 }}>Login</Typography>
            </LoadingButton>
          </AttentionSeeker>
        </Box>
      </Stack>
    </div>
  </Fade>
);

export default Signin;
