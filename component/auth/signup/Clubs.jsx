import Image from "next/image";
import {
  Grid,
  Table,
  Paper,
  Alert,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  TableContainer,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import { styles } from "@component/layout";

const Clubs = ({
  mass,
  clubs,
  masses,
  setStep,
  division,
  massIntro,
  ManageClub,
  viewClubHandler,
  divisionOptions,
  sortClubsBudget,
  massChangeHandler,
  divisionChangeHandler,
}) => (
  <>
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} style={{ margin: "0 20px 10px", overflow: "visible" }}>
          <Autocomplete
            value={mass}
            noOptionsText="Loading..."
            options={masses}
            onChange={(_, value) => massChangeHandler(value)}
            getOptionLabel={(option) => `${option.sponsor} ~ ${option?.unmanaged?.total}`}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Mass"
                size="small"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "ViewCrunch",
                }}
              />
            )}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} style={{ margin: "0 20px 10px", overflow: "visible" }}>
          <Autocomplete
            value={division}
            noOptionsText="Loading..."
            onChange={(_, value) => divisionChangeHandler(value)}
            options={mass ? ["divisionOne", "divisionTwo", "divisionThree", "divisionFour"] : ["Select a Mass first"]}
            getOptionLabel={(option) =>
              mass ? `Division ${option.replace(/division/g, "")} ~ ${divisionOptions[option]}` : "Select a Mass first"
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Division"
                size="small"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "ViewCrunch",
                }}
              />
            )}
          />
        </Paper>
      </Grid>
    </Grid>

    <Paper>
      <Typography variant="body2" color="primary">
        {massIntro}
      </Typography>

      {!!clubs && (
        <TableContainer
          component={Paper}
          style={{ margin: "10px auto", overflow: "scroll", maxWidth: "100vw" }}
          className={styles.tableContainer}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">Club</TableCell>
                <TableCell align="center" onClick={sortClubsBudget}>
                  Budget
                </TableCell>
                <TableCell align="center">Manager</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clubs?.map(({ title, ref, budget, manager }) => {
                return (
                  <TableRow key={ref}>
                    <TableCell onClick={viewClubHandler(ref)}>
                      <figure>
                        <Image src={`/images/club/${ref}.webp`} layout="fill" alt="Club logo" />
                      </figure>
                      {title}
                    </TableCell>
                    <TableCell align="center">{`$${budget}m`}</TableCell>
                    <TableCell align="center">{manager || <ManageClub club={ref} />}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Button variant="contained" color="secondary" size="small" onClick={() => setStep(1)}>
        Back
      </Button>
      <Alert severity="info">
        <ol>
          <li>Currently, we have {masses.length} masses in SoccerMASS, each Mass has 64 Clubs, grouped into four divisions(league).</li>
          <li>The numbers next to the mass/division, shows how many clubs are unmanaged</li>
          <li>Each Mass serves as a unique game world and each division is made up of 16 clubs.</li>
          <li>Division One is the highest, while Division Four is the lowest in the hierarchy.</li>
          <li>
            It is to be noted that after each season, the first three clubs in a division are promoted to the upper division, while the
            last three are relegated.
          </li>
          <li>Once you click the 'manage club' button, You'll be assigned to the selected club</li>
        </ol>
      </Alert>
    </Paper>
  </>
);

export default Clubs;
