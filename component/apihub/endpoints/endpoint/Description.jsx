import { styles } from ".";
import { Box, Typography, Divider, Button } from "@mui/material";

const Description = ({ handleTabChange, title, description }) => (
  <Box py={2}>
    <Typography variant="h5" color="text.secondary">
      {`API Overview: ${title}`}
    </Typography>

    <Divider variant="inset" />

    <Typography variant="body1" py={2} dangerouslySetInnerHTML={{ __html: description }} />

    <Button variant="outlined" sx={{ mt: 2 }} onClick={(e) => handleTabChange(e, 1)}>
      View API Implementation
    </Button>
  </Box>
);

export default Description;
