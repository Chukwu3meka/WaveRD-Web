import { Box, Paper, Typography } from "@mui/material";

import { styles } from ".";
import { shortNumber } from "@utils/clientFuncs";
import { IAppUISummaryProps } from "@interface/appui/summary-interface";

const AppUISummary = ({ fullwidth, data }: IAppUISummaryProps) => (
  <Box className={`${styles.header} ${fullwidth && styles.fullwidth}`}>
    {data.map(({ title, value, icon, desc, color }) => (
      <Paper elevation={4} key={title} className={styles[color]}>
        <div>
          <Typography sx={{ fontSize: ".8em", fontWeight: 900, letterSpacing: ".1em" }}>{title}</Typography>
          <span>{icon}</span>
        </div>
        <Typography
          sx={{ fontSize: value < 1 ? "3em" : "4em", margin: "0 auto", fontWeight: 700, fontFamily: '"Cinzel Decorative", cursive' }}>
          {value < 1 ? "NONE" : shortNumber(value)}
        </Typography>
        <Typography sx={{ fontSize: ".7em", fontWeight: 700, letterSpacing: ".1em" }}>{desc}</Typography>
      </Paper>
    ))}
  </Box>
);

export default AppUISummary;
