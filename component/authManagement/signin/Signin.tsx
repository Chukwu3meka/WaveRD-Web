import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, Login as LoginIcon } from "@mui/icons-material";
import { Box, Stack, Tooltip, TextField, Typography, IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment } from "@mui/material";

import { SocialAuth, styles } from ".";
import InputStatus from "@component/builder/inputStatus";

const Signin = ({ signinFormMouseMoveCapture, onInputChange, handleClickShowPassword, values, formError, loginHandler }: any) => (
  <Fade direction="down" triggerOnce={true} style={{ perspective: "100px" }}>
    <div
      id="signin"
      className={styles.signin}
      // onMouseMoveCapture={signinFormMouseMoveCapture}
    >
      <SocialAuth />

      <div className={styles.divider}>
        <span />
        <span>or Signin with Email</span>
      </div>

      <Stack spacing={3} alignItems="center" p={2} component="form" noValidate autoComplete="off">
        <Stack direction="row" width="100%" alignItems="center">
          <TextField
            fullWidth
            id="email"
            disabled={values.buttonLoading}
            value={values.email}
            aria-describedby="email"
            label="Email Address"
            variant="outlined"
            placeholder="firstname.lastname@soccermass.com"
            onChange={onInputChange}
          />
          <InputStatus value={values.email} status={formError.email.status} pristine={formError.email.pristine} />
        </Stack>

        <Stack direction="row" width="100%" alignItems="center">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Admin Password</InputLabel>
            <OutlinedInput
              id="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              disabled={values.buttonLoading}
              // onChange={onInputChange("password")}
              onChange={onInputChange}
              placeholder="Complex Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label="Admin Password"
            />
          </FormControl>

          <InputStatus value={values.password} status={formError.password.status} pristine={formError.password.pristine} />
        </Stack>

        <Box sx={{ textAlign: "right", width: "100%" }}>
          <AttentionSeeker effect="bounce">
            <Tooltip title={formError.status && formError.errorMessages}>
              <LoadingButton onClick={loginHandler} size="large" disabled={!!formError.status} variant="outlined" endIcon={<LoginIcon />} loading={!!values.buttonLoading}>
                <Typography sx={{ fontWeight: 900 }}>Login</Typography>
              </LoadingButton>
            </Tooltip>
          </AttentionSeeker>
        </Box>
      </Stack>
    </div>
  </Fade>
);

export default Signin;