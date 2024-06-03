import SyntaxHighlighter from "react-syntax-highlighter";

import { Alert, Box, Typography } from "@mui/material";
import { docco, darcula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { DescriptionProps } from "interfaces/components/apihub/endpoint.interface";

const Description = ({ theme, title, description }: DescriptionProps) => (
  <Box>
    <Typography variant="h5" color="text.secondary">
      {`API Overview: ${title}`}
    </Typography>

    <SyntaxHighlighter wrapLines wrapLongLines language="markdown" customStyle={{ borderRadius: "10px" }} style={theme === "dark" ? darcula : docco}>
      {description}
    </SyntaxHighlighter>

    <Alert severity="warning">
      Please note that our APIs are currently in the experimental phase. —&nbsp;
      <strong>We are actively working on stabilizing our APIs for production use in your application. </strong>
      For testing purposes you can use <strong>`SoccerMASS-2018`</strong> as Developer's API host and <strong>`SoccerMASS-APIHUB-2023`</strong> as
      Developer's API key in your API calls
    </Alert>
  </Box>
);

export default Description;
