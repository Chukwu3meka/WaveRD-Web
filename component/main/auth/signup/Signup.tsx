import Image from "next/image";
import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, PersonAddAlt1 as RegisterIcon } from "@mui/icons-material";
import {
  Box,
  Stack,
  Alert,
  Tooltip,
  TextField,
  AlertTitle,
  Typography,
  IconButton,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import { signupStyles } from ".";
import InputStatus from "@component/builder/inputStatus";

const Signup = ({ onInputChange, handleClickShowPassword, values, formStatus, registerHandler, currentError }: any) => (
  <Fade direction="down" triggerOnce={true} className={signupStyles.signup}>
    <Stack spacing={3} alignItems="center" p="40px 20px" component="form" noValidate autoComplete="off">
      <Image src="/images/layout/soccermass.webp" alt="SoccerMASS" width={60} height={60} />
      <Stack direction="row" width="100%" alignItems="center" position="relative">
        <TextField
          fullWidth
          id="fullName"
          disabled={values.buttonLoading}
          value={values.fullName}
          aria-describedby="fullName"
          label="Full Name"
          variant="outlined"
          placeholder="lastname firstname"
          onChange={onInputChange}
        />
        <InputStatus value={values.fullName} status={formStatus.fullName.status} pristine={formStatus.fullName.pristine} />
      </Stack>
      <Stack direction="row" width="100%" alignItems="center" position="relative">
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
        <InputStatus value={values.email} status={formStatus.email.status} pristine={formStatus.email.pristine} />
      </Stack>
      <Stack direction="row" width="100%" alignItems="center" position="relative">
        <TextField
          fullWidth
          id="handle"
          disabled={values.buttonLoading}
          value={values.handle}
          aria-describedby="handle"
          label="Handle"
          variant="outlined"
          placeholder="What would you like us to call you?"
          onChange={onInputChange}
        />
        <InputStatus value={values.handle} status={formStatus.handle.status} pristine={formStatus.handle.pristine} />
      </Stack>
      <Stack direction="row" width="100%" alignItems="center" position="relative">
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            disabled={values.buttonLoading}
            onChange={onInputChange}
            placeholder="Complex Password"
            label="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                  {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <InputStatus value={values.password} status={formStatus.password.status} pristine={formStatus.password.pristine} />
      </Stack>

      <Fade direction="up" triggerOnce={true} style={{ width: "100%", display: currentError ? "inherit" : "none" }}>
        <Alert severity="warning">
          <AlertTitle>Input Error</AlertTitle>
          {currentError}
        </Alert>
      </Fade>

      <Box sx={{ textAlign: "right", width: "100%" }}>
        <AttentionSeeker effect="bounce">
          <Tooltip title={formStatus.status && formStatus.errorMessages}>
            <LoadingButton
              onClick={registerHandler}
              size="large"
              disabled={!!formStatus.status}
              variant="outlined"
              endIcon={<RegisterIcon />}
              loading={!!values.buttonLoading}>
              <Typography sx={{ fontWeight: 900 }}>register</Typography>
            </LoadingButton>
          </Tooltip>
        </AttentionSeeker>
      </Box>
    </Stack>
  </Fade>
);

export default Signup;
