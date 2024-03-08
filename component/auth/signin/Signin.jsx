import Link from "next/link";
import { styles, Social } from ".";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signin = ({ email, loading, setEmail, password, submitForm, setPassword, showPassword, setShowPassword }) => {
  return (
    <>
      <div className={styles.signin}>
        <Social />
        <Paper>
          <main>
            <TextField
              variant="outlined"
              fullWidth
              label="Email Address"
              alignitems="center"
              value={email}
              autoComplete="ViewCrunch"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                autoComplete="ViewCrunch"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Link href="/auth/reset">
              <Typography variant="subtitle2" color="primary" sx={{ cursor: "pointer" }}>
                Forgot Password
              </Typography>
            </Link>

            <LoadingButton loading={loading} variant="contained" onClick={submitForm} fullWidth>
              Submit
            </LoadingButton>
          </main>
        </Paper>
      </div>
    </>
  );
};

export default Signin;
