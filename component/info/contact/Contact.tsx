import Grid from "@mui/material/Grid";
import { TextField, Typography, InputLabel, FormControl, OutlinedInput, Select, Button, MenuItem, Paper, Stack } from "@mui/material";

import { styles } from ".";
import Image from "next/image";

const Contact = ({ sectionHandler, setValues, contact, values, submitHandler, commentRef, supportTeam, userForm, onInputChange, contactPrefHandler }: any) => (
  <main className={styles.contact}>
    <div className={styles.categories}>
      {supportTeam.map(({ supportType, image, description, buttonType }) => (
        <Paper elevation={2} key={supportType} onClick={() => sectionHandler({ target: { value: buttonType } })}>
          <Image src={image} alt={`SoccerMASS Contact Us - ${supportType}`} width={140} height={140} />

          <Typography variant="h6">{supportType}</Typography>

          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </Paper>
      ))}
    </div>

    <Paper elevation={2} className={styles.contactForm}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
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

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="name"
              label="Full Name"
              variant="outlined"
              aria-describedby="name"
              value={userForm.name.value}
              placeholder="How should we address you"
              error={!userForm.name.valid}
              onBlur={(e) => onInputChange(e, true)}
              onChange={(e) => onInputChange(e, false)}
              disabled={userForm.options.loading}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel id="contact-preference">Preference</InputLabel>
              <Select
                labelId="contact-preference"
                id="contact-preference"
                value={userForm.options.contact}
                label="Preference"
                onChange={(e) => contactPrefHandler(e)}>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="whatsapp">WhatsApp</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">{contact[userForm.options.contact]}</InputLabel>
              <OutlinedInput
                id="contact"
                value={userForm.contact.value}
                disabled={userForm.options.loading}
                onBlur={(e) => onInputChange(e, true)}
                onChange={(e) => onInputChange(e, false)}
                placeholder="How do we reach you"
                label={contact[userForm.options.contact]}
                autoComplete="off"
              />
            </FormControl>

            {/* <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Email Address</InputLabel>
              <OutlinedInput
                id="contact"
                value={userForm.contact.value}
                disabled={userForm.options.loading}
                onBlur={(e) => onInputChange(e, true)}
                onChange={(e) => onInputChange(e, false)}
                placeholder="firstname.lastname@soccermass.com"
                error={!userForm.contact.valid}
                label="Email Address"
                autoComplete="off"
              />
            </FormControl> */}
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
