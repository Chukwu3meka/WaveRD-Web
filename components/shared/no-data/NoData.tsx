import { Stack, Typography } from "@mui/material";
import DataIcon from "@mui/icons-material/Folder";

const NoData = () => (
  <Stack height={200} alignItems="center" justifyContent="center">
    <DataIcon fontSize="inherit" color="disabled" sx={{ fontSize: "5em" }} />
    <Typography>No Data Available</Typography>
  </Stack>
);

export default NoData;
