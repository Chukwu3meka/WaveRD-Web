"use client";

import { styles } from ".";
import Image from "next/image";
import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker } from "react-awesome-reveal";
import { Grid, TextField, Typography, InputLabel, FormControl, OutlinedInput, Select, MenuItem, Paper } from "@mui/material";

import { ContactUS } from "interfaces/components/info.interfaces";

export default function Contact({ sectionHandler, contactPreference, categories, submitHandler, categoryRef, userForm, onInputChange, contactPrefHandler }: ContactUS) {
  return (
    <main className={styles.contact}>
      <div className={styles.categories}>
        {supportTeam.map(({ supportType, image, description, buttonType }) => (
          <Paper elevation={2} key={supportType} onClick={() => sectionHandler(buttonType)}>
            <Image src={image} alt={`SoccerMASS Contact Us - ${supportType}`} width={100} height={100} />

            <div>
              <Typography variant="h6">{supportType}</Typography>

              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
            </div>
          </Paper>
        ))}
      </div>

      <Paper elevation={2} className={styles.contactForm}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select labelId="category" id="category" value={userForm.options.category} onChange={(e) => sectionHandler(e.target.value)} label="Category">
                {categories.map(({ value, label }) => (
                  <MenuItem key={label} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="name"
              label="Name"
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
              <Select labelId="contact-preference" id="contact-preference" value={userForm.options.contact} label="Preference" onChange={(e) => contactPrefHandler(e)}>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="whatsapp">WhatsApp</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">{contactPreference[userForm.options.contact]}</InputLabel>
              <OutlinedInput
                error={!userForm.contact.valid}
                id="contact"
                value={userForm.contact.value}
                disabled={userForm.options.loading}
                onBlur={(e) => onInputChange(e, true)}
                onChange={(e) => onInputChange(e, false)}
                placeholder="How do we reach you"
                label={contactPreference[userForm.options.contact]}
                autoComplete="off"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              multiline
              minRows={4}
              id="comment"
              label="Comment"
              variant="outlined"
              inputRef={categoryRef}
              value={userForm.comment.value}
              error={!userForm.comment.valid}
              disabled={userForm.options.loading}
              onBlur={(e) => onInputChange(e, true)}
              onChange={(e) => onInputChange(e, false)}
              placeholder={userForm.options.category === "service" ? "What product will you like us to work on?" : "What will you like to tell us?"}
            />
          </Grid>

          <Grid item xs={12} sm={12} sx={{ textAlign: "right" }}>
            <AttentionSeeker effect="bounce">
              <LoadingButton onClick={() => submitHandler()} variant="contained" color="primary" loading={userForm.options.loading}>
                <Typography sx={{ fontWeight: 900 }}>Submit</Typography>
              </LoadingButton>
            </AttentionSeeker>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
}

const supportTeam = [
  {
    supportType: "Advertising",
    image: "/images/layout/advertise.png",
    description: "Having a pricing question or need help managing your ads",
    buttonType: "advertising",
  },
  {
    supportType: "Technical Support",
    image: "/images/layout/support.png",
    description: "Already using SoccerMASS and experiencing issues on our platform",
    buttonType: "technical",
  },
  {
    supportType: "Others",
    image: "/images/layout/others.png",
    description: "Evaluating our service? Not related to Technical support or Advertising",
    buttonType: "others",
  },
];
