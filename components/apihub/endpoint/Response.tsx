import SyntaxHighlighter from "react-syntax-highlighter";

import { Box } from "@mui/material";
import { docco, darcula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { EndpointResponseProps } from "interfaces/components/apihub/endpoint.interface";

const EndpointResponse = ({ response, theme }: EndpointResponseProps) => (
  <Box sx={{ maxWidth: "calc(100vw - 25px)", overflowX: "auto" }}>
    <SyntaxHighlighter showLineNumbers language="json" style={theme === "dark" ? darcula : docco} customStyle={{ borderRadius: "10px" }}>
      {response}
    </SyntaxHighlighter>
  </Box>
);

export default EndpointResponse;
