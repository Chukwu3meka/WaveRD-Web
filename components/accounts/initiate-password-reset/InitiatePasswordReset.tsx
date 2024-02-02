import Link from "next/link";
import Image from "next/image";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack, Typography, IconButton, InputLabel, FormControl, OutlinedInput, Box } from "@mui/material";

import { ForgotPasswordProps } from "interfaces/components/accounts.interfaces";

const InitiatePasswordReset = ({ resetPasswordHandler, form, onInputChange }: ForgotPasswordProps) => (
  <Stack spacing={3} component="form" noValidate>
    <Box>
      <Image src="/images/layout/password.png" alt="SoccerMASS" width={150} height={120} style={{ margin: "auto" }} />
    </Box>

    <Typography fontSize="1.3em" fontWeight={600}>
      Forgot Password
    </Typography>

    <Typography textAlign="center" sx={{ marginTop: "5px !important" }}>
      Kindly enter the email address associated with your account, and we'll send a link to reset your password
    </Typography>

    <FormControl fullWidth variant="outlined" sx={{ margin: "20px auto 10px !important" }}>
      <InputLabel htmlFor="outlined-adornment-password">Email Address</InputLabel>
      <OutlinedInput
        id="email"
        value={form.email.value}
        disabled={form.options.loading}
        onBlur={(e) => onInputChange(e, true)}
        onChange={(e) => onInputChange(e, false)}
        placeholder="firstname.lastname@soccermass.com"
        error={!form.email.valid}
        label="Email Address"
        autoComplete="off"
      />
    </FormControl>

    <LoadingButton
      fullWidth
      size="large"
      type="submit"
      color="primary"
      variant="contained"
      loading={form.options.loading}
      disabled={form.options.loading}
      onClick={(e) => resetPasswordHandler(e)}>
      <Typography sx={{ fontWeight: 900 }}>Send Link</Typography>
    </LoadingButton>

    <Typography fontSize=".8em" textAlign="center">
      <Link href="/accounts/signin">
        <IconButton color="primary" sx={{ fontSize: "1.3em", mr: "-0px" }}>
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        Back to Sign in
      </Link>
    </Typography>
  </Stack>
);

export default InitiatePasswordReset;
