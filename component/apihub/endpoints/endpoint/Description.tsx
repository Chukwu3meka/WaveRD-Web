import { Alert, Box, Typography, Divider, Button } from "@mui/material";

const Description = ({ handleTabChange, title, description }) => (
  <Box py={2}>
    <Typography variant="h5" color="text.secondary">
      {`API Overview: ${title}`}
    </Typography>

    <Divider variant="inset" />

    <Typography variant="body1" py={2} dangerouslySetInnerHTML={{ __html: description }} />

    <Alert severity="warning">
      Please note that our APIs are currently in the experimental phase. —&nbsp;
      <strong>We are actively working on stabilizing our APIs for production use in your application.</strong>
      &nbsp;. For testing purposes you can use soccermass and apihub as host and key respectively in your API calls
    </Alert>

    <Button variant="outlined" sx={{ mt: 2 }} onClick={(e) => handleTabChange(e, 1)}>
      View API Implementation
    </Button>
  </Box>
);

export default Description;
