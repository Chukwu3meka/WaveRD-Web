import Image from "next/image";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import OutlinedInput from "@mui/material/OutlinedInput";

import { styles } from ".";
import clubStore from "@source/clubStore";
import { formations } from "@source/formationStore";

const Header = ({ tactics: { club }, formation, openFormation, handleOpenFormation, handleFormationChange, invalidSquad }) => (
  <Paper className={styles.header} elevation={2}>
    <Image src={`/images/club/${club}.webp`} width={50} height={50} alt="SoccerMASS" />
    <div>
      <div>
        <Button onClick={handleOpenFormation(true)} variant="outlined">
          {formation}
        </Button>
        <Dialog open={openFormation} onClose={handleOpenFormation(false)}>
          {/* <DialogTitle>Select Formation</DialogTitle> */}
          <DialogContent>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <Select
                  labelId="demo-simple-select-disabled-label"
                  id="demo-simple-select-disabled"
                  value={formation}
                  input={<OutlinedInput />}
                  label="Age"
                  onChange={handleFormationChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        width: 250,
                      },
                    },
                  }}>
                  <MenuItem disabled value="">
                    <em>Formation</em>
                  </MenuItem>
                  {formations.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          {/* <DialogActions>
          <Button onClick={handleOpenFormation(false)}>Cancel</Button>
          <Button onClick={handleOpenFormation(false)}>Ok</Button>
        </DialogActions> */}
        </Dialog>

        <Typography variant="h5" component="h1">
          Starting IX
        </Typography>
      </div>
      <div>
        <Typography variant="body1"> {clubStore(club).title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {clubStore(club).stadium}
        </Typography>
      </div>
    </div>
    <div>
      {invalidSquad && (
        <Typography variant="body2" component="h1">
          {invalidSquad}
        </Typography>
      )}
    </div>
  </Paper>
);

export default Header;
