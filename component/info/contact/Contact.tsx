import { Grid, Paper, Select, Hidden, Button, MenuItem, TextField, Typography, InputLabel, FormControl, FormHelperText, Box, Stack } from "@mui/material";
import { styles } from ".";
import Link from "next/link";
import Image from "next/image";

const Contact = ({ contactLinks, sectionHandler, setValues, values, submitHandler, commentRef, supportTeam }) => (
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
