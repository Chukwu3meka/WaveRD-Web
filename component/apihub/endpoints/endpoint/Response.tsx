import { Box, Button } from "@mui/material";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco, darcula } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const ApiResponse = ({ response, handleTabChange, theme }) => (
  <Box>
    <Box sx={{ maxWidth: "calc(100vw - 25px)", overflowX: "auto" }}>
      <SyntaxHighlighter showLineNumbers language="json" style={theme === "dark" ? darcula : docco} customStyle={{ borderRadius: "10px" }}>
        {response}
      </SyntaxHighlighter>
    </Box>

    <Button variant="outlined" onClick={(e) => handleTabChange(e, 0)}>
      API Description
    </Button>
  </Box>
);

export default ApiResponse;
