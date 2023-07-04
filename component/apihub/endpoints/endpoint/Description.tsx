import { Alert, Box, Typography, Divider } from "@mui/material";

const Description = ({ title, description }) => (
  <Box py={2}>
    <Typography variant="h5" color="text.secondary">
      {`API Overview: ${title}`}
    </Typography>

    <Typography variant="body1" py={2} dangerouslySetInnerHTML={{ __html: description }} />

    <Alert severity="warning">
      Please note that our APIs are currently in the experimental phase. —&nbsp;
      <strong>We are actively working on stabilizing our APIs for production use in your application.</strong>
      For testing purposes you can use <strong>`SoccerMASS-2018`</strong> as Developer's API host and <strong>`SoccerMASS-APIHUB-2023`</strong> as Developer's
      API key in your API calls
    </Alert>
  </Box>
);

export default Description;
