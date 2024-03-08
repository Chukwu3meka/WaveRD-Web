import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { styles } from ".";
import massStore from "@source/massStore";

const Competition = ({ mass, handleCompetitionChange }) => (
  <Paper className={styles.competition} elevation={2}>
    {[
      ["Division One", "divisionOne"],
      ["Division Two", "divisionTwo"],
      ["Division Three", "divisionThree"],
      ["Division Four", "divisionFour"],
      [`${massStore(mass)} League`, "league"],
      [`${massStore(mass)} Cup`, "cup"],
    ].map(([title, id]) => (
      <Button variant="outlined" color="secondary" key={id} onClick={handleCompetitionChange(id)}>
        {title}
      </Button>
    ))}
  </Paper>
);

export default Competition;
