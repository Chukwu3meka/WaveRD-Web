import {
  Paper,
  Button,
  Divider,
  TextField,
  InputLabel,
  Typography,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { styles } from ".";

const ResetContainer = ({ invalidInput, userData, handleChange, setShowPassword, showPassword, classes, loading, sendOTPHandler }) => (
  <Paper elevation={4} className={styles.reset}>
    <Typography component="h1" variant="h4">
      Password Reset
    </Typography>
    <Divider />
    <Typography component="h3" variant="button">
      In order to verify you own this account, we need the following:
    </Typography>
    <div>
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        error={invalidInput.handle}
        label="Your manager handle"
        value={userData.handle}
        onChange={(e) => handleChange(e.target.value, "handle")}
      />
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        label="eMail address used to signup"
        value={userData.email}
        type="email"
        error={invalidInput.email}
        onChange={(e) => handleChange(e.target.value, "email")}
      />
      <FormControl variant="outlined" fullWidth size="small">
        <InputLabel htmlFor="password">Your new password</InputLabel>
        <OutlinedInput
          value={userData.password}
          onChange={(e) => handleChange(e.target.value, "password")}
          id="password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          // labelWidth={70}
          error={invalidInput.password}
        />
      </FormControl>

      <div className={classes.wrapper}>
        <Button size="small" color="secondary" variant="contained" onClick={sendOTPHandler} disabled={loading}>
          Send OTP
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>

      <Divider />
    </div>
    <div>
      {userData.otpSent && (
        <div style={{ border: "3px solid black" }}>
          <TextField
            variant="outlined"
            fullWidth
            label="Enter OTP to reset password"
            type="otp"
            value={userData.otp}
            onChange={(e) => handleChange(e.target.value, "otp")}
          />
        </div>
      )}
    </div>
  </Paper>
);

export default ResetContainer;
