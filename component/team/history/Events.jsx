import Image from "next/image";
import clubStore from "@source/clubStore";
import { Paper, Button, Typography } from "@mui/material";
import { styles } from ".";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { varReplacer } from "@utils/clientFuncs";

const Events = ({ history: { club, events } }) => {
  return events?.length ? (
    <Paper className={styles.events} elevation={2}>
      <Typography variant="body1" color="primary">
        Club Events
      </Typography>
      <div>
        {events?.map(({ date, event }, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography variant="body2" color="textSecondary">
                On {new Date(date).toDateString()}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{varReplacer(event)}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Paper>
  ) : (
    ""
  );
};

export default Events;
