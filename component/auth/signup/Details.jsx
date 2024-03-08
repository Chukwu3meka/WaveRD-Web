import {
  Alert,
  Button,
  TextField,
  InputLabel,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { styles } from ".";

const Details = ({ email, handle, classes, proceed, loading, password, handleChange, showPassword, invalidInput, setShowPassword }) => {
  return (
    <div className={styles.details}>
      <TextField
        variant="outlined"
        fullWidth
        error={invalidInput.handle}
        label="Nickname"
        value={handle}
        inputProps={{
          autoComplete: "ViewCrunch",
          form: {
            autoComplete: "off",
          },
        }}
        onChange={(e) => handleChange(e.target.value, "handle", "setHandle")}
      />
      <TextField
        variant="outlined"
        fullWidth
        label="Email Address"
        value={email}
        type="email"
        inputProps={{
          autoComplete: "ViewCrunch",
          form: {
            autoComplete: "off",
          },
        }}
        error={invalidInput.email}
        onChange={(e) => handleChange(e.target.value, "email", "setEmail")}
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          value={password}
          onChange={(e) => handleChange(e.target.value, "password", "setPassword")}
          id="password"
          inputProps={{
            autoComplete: "ViewCrunch",
            form: { autoComplete: "off" },
          }}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          error={invalidInput.password}
          label="Password"
        />
      </FormControl>
      <div className={classes.wrapper}>
        <Button variant="contained" onClick={proceed} color="primary" disabled={loading}>
          NEXT
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>

      <Alert severity="info">
        <ol>
          <li>Try to remember your eMail and Nickname; you will be asked for it, incase you need to reset your password</li>
          <li>Password cannot be less than 7 characters and must contain number(s) and letter(s).</li>
        </ol>
      </Alert>
    </div>
  );
};

export default Details;
