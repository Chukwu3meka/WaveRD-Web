import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, Login as LoginIcon } from "@mui/icons-material";
import { Stack, TextField, Typography, IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment, Button } from "@mui/material";

import { SocialAuth, styles } from ".";
import { ISignin } from "@interface/accounts/signin-interface";
import Link from "next/link";

const Signin = ({ onInputChange, handleClickShowPassword, userForm, loginHandler }: ISignin) => (
  <Fade direction="down" triggerOnce={true} style={{ perspective: "100px" }}>
    <div id="signin" className={styles.signin}>
      <div className={styles.divider}>
        <span />
        <span>Social Sign in</span>
      </div>

      <SocialAuth />

      <div className={styles.divider}>
        <span />
        <span>or Sign in with Email</span>
      </div>

      <Stack spacing={3} alignItems="center" component="form" noValidate autoComplete="off" margin="auto" maxWidth={520}>
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
          autoComplete="off"
        />

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            type={userForm.options.showPassword ? "text" : "password"}
            onChange={(e) => onInputChange(e)}
            disabled={userForm.options.loading}
            placeholder="Password"
            value={userForm.password}
            label="Password"
            id="password"
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

        <Typography alignSelf="flex-end" sx={{ margin: "10px 0 -5px !important" }} fontSize={14}>
          <Link href="/accounts/forgotPassword">Forgot Password</Link>
        </Typography>

        {/* <Stack direction="row" alignSelf="flex-end" spacing={2} sx={{ width: "max-content" }}> */}
        <AttentionSeeker effect="bounce">
          {/* <Link href="/accounts/signup">
              <Button variant="outlined" size="large">
                register
              </Button>
            </Link> */}

          <LoadingButton
            size="large"
            variant="contained"
            color="primary"
            onClick={loginHandler()}
            endIcon={<LoginIcon />}
            disabled={userForm.options.loading}
            loading={userForm.options.loading}>
            <Typography sx={{ fontWeight: 900 }}>Login</Typography>
          </LoadingButton>
        </AttentionSeeker>
        {/* </Stack> */}

        <Typography sx={{ marginTop: "15px !important" }} fontSize={14}>
          New to SoccerMASS? <Link href="/accounts/forgotPassword">Create Account</Link>
        </Typography>
      </Stack>
    </div>
  </Fade>
);

export default Signin;
