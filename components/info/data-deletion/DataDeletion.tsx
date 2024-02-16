"use client";

import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, DeleteForever as DeleteForeverIcon } from "@mui/icons-material";
import { TextField, Typography, InputLabel, IconButton, FormControl, OutlinedInput, InputAdornment, Card, CardContent, Divider } from "@mui/material";

import { DataDeletion } from "interfaces/components/info.interfaces";

export default function DataDeletion({ onInputChange, userForm, handleClickShowPassword, deleteDataHandler, authenticated }: DataDeletion) {
  return (
    <Card sx={{ width: "calc(100% - 20px)", mx: "auto", my: 2 }} component="main">
      <CardContent>
        <Typography gutterBottom variant="h5" component="h1" textAlign="center">
          Data Deletion Instruction
        </Typography>

        <Typography color="text.secondary">
          We only use Email for authentication (Signin purpose only) across social platforms (Twitter, Facebook and Google). To maintain a highly competitive online
          gaming experience, after a certain period of inactivity (currently {process.env.INACTIVITY_PERIOD} days) on our site, your profile and its data will be deleted
          by one of our moderators, with no way to recover your account.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
          What is data deletion?
        </Typography>

        <Typography color="text.secondary">
          Data deletion is the process of removing personal information from a website or online service. This can be done for a variety of reasons, such as when a user
          requests that their data be deleted, when a user's account is deactivated or deleted, or when a website or online service is no longer in use.
        </Typography>

        <Typography color="text.secondary">
          Once you delete your data from a website, it is usually removed from the website's servers. However, it is important to note that your data may not be
          completely deleted immediately. In some cases, your data may be stored in backup or archive files for a period of time. Additionally, we may retain certain
          pieces of your data, such as your previous login details or other logs, for the purpose of preventing abuse and improving our sites.
        </Typography>
        <Typography color="text.secondary"></Typography>

        <Typography color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
          Why should I delete my data from websites?
        </Typography>
        <Typography color="text.secondary">
          There are a few reasons why you might want to delete your data from websites. For example, you may want to delete your data if you are concerned about your
          privacy or if you no longer use the website. Additionally, deleting your data can help to protect you from identity theft and other forms of fraud.
        </Typography>

        <Typography color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
          How can I protect my data from being deleted?
        </Typography>
        <Typography color="text.secondary">- Be careful about what information you share online.</Typography>
        <Typography color="text.secondary">- Use strong passwords and security measures.</Typography>
        <Typography color="text.secondary">- Checking for regular security updates from you relating to my account.</Typography>

        <Divider sx={{ mt: 5, mb: 2 }}>
          <Typography color="primary">Request Account deletion</Typography>
        </Divider>

        {authenticated ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Email Address</InputLabel>
                <OutlinedInput
                  id="email"
                  value={userForm.email.value}
                  disabled={userForm.options.loading}
                  onBlur={(e) => onInputChange(e, true)}
                  onChange={(e) => onInputChange(e, false)}
                  placeholder="firstname.lastname@soccermass.com"
                  error={!userForm.email.valid}
                  label="Email Address"
                  autoComplete="off"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Handle</InputLabel>
                <OutlinedInput
                  id="handle"
                  value={userForm.handle.value}
                  disabled={userForm.options.loading}
                  onChange={(e) => onInputChange(e, false)}
                  onBlur={(e) => onInputChange(e, true)}
                  placeholder="What would you like us to call you?"
                  error={!userForm.handle.valid}
                  label="Handle"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={userForm.options.showPassword ? "text" : "password"}
                  value={userForm.password.value}
                  disabled={userForm.options.loading}
                  onChange={(e) => onInputChange(e, false)}
                  onBlur={(e) => onInputChange(e, true)}
                  placeholder="Password"
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
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                id="comment"
                fullWidth
                label="Comment"
                variant="outlined"
                error={!userForm.comment.valid}
                value={userForm.comment.value}
                disabled={userForm.options.loading}
                onChange={(e) => onInputChange(e, false)}
                onBlur={(e) => onInputChange(e, true)}
                minRows={5}
                multiline
                placeholder="We are sorry to hear that you are deleting your account. We value your membership and would like to know if there is anything we can do to improve your experience. Please let us know what we can do to better serve you by visiting our contact us page."
              />
            </Grid>

            <Grid item xs={12} md={12} sx={{ textAlign: "right" }}>
              <AttentionSeeker effect="bounce">
                <LoadingButton
                  onClick={() => deleteDataHandler()}
                  size="large"
                  variant="contained"
                  color="primary"
                  endIcon={<DeleteForeverIcon />}
                  loading={userForm.options.loading}>
                  <Typography sx={{ fontWeight: 900 }}>Delete Account</Typography>
                </LoadingButton>
              </AttentionSeeker>
            </Grid>
          </Grid>
        ) : (
          <Typography color="text.secondary">You need to signin in order to initiate Data Deletion.</Typography>
        )}
      </CardContent>
    </Card>
  );
}
