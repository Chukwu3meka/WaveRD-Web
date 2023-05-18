import { Card, CardContent, Divider } from "@mui/material";

import { Grid, Paper, Select, Hidden, Button, MenuItem, TextField, Typography, InputLabel, FormControl, FormHelperText, Box, Stack } from "@mui/material";
import { styles } from ".";
import Link from "next/link";
import Image from "next/image";

const Contact = ({ contactLinks, sectionHandler, setValues, values, submitHandler, commentRef, supportTeam }) => (
  <main className={styles.contact}>
    <Card sx={{ maxWidth: 1200, width: "calc(100% - 20px)", mx: "auto", my: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h1" textAlign="center">
          Privacy Policy
        </Typography>

        <Typography color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
          DATA DELETION INSTRUCTION
        </Typography>

        <Typography variant="body2" color="text.secondary">
          We only use Email for authentication (Signin purpose only) across social platforms(Twitter, Facebook and Google). To maintain a highly competitive
          online gaming experience, after a certain period of inactivity (currently 21 days) on our site, your profile and its data will be deleted by one of
          our moderators, with no way to recover your account.
        </Typography>
      </CardContent>
    </Card>

    <Paper elevation={2} className={styles.contactForm}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="section-id">Category</InputLabel>
              <Select labelId="section-id" id="section" value={values.section} onChange={sectionHandler} label="Section">
                <MenuItem value="others">Others</MenuItem>
                <MenuItem value="advertising">Advertising</MenuItem>
                <MenuItem value="technical">Technical</MenuItem>
                <MenuItem value="suggestion">Suggestion</MenuItem>
                <MenuItem value="service">Digital Service</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="eMail"
              value={values?.email}
              placeholder="We'll reach out to you soon"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Name"
              value={values?.name}
              placeholder="How do we address you"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Comment"
          variant="outlined"
          value={values?.comment}
          minRows={5}
          multiline
          inputRef={commentRef}
          placeholder={values?.section === "service" ? "What product will you like us to work on?" : "What will you like to tell us?"}
          onChange={(e) => setValues({ ...values, comment: e.target.value })}
        />

        <Button color="primary" variant="contained" onClick={submitHandler}>
          Submit
        </Button>
      </Stack>
    </Paper>
  </main>
);

export default Contact;
