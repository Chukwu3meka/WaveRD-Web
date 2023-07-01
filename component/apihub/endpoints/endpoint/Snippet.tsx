import { Button, Typography, Box } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco, darcula } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const CodeSnippet = ({ copyToCLipboardHandler, snippet, theme }) => (
  <Box py={3}>
    <Typography variant="h5" color="text.secondary">
      JavaScript Fetch API
    </Typography>

    <Box sx={{ maxWidth: "calc(100vw - 25px)", overflowX: "auto" }}>
      <SyntaxHighlighter showLineNumbers language="javascript" style={theme === "dark" ? darcula : docco} customStyle={{ borderRadius: "10px" }}>
        {snippet}
      </SyntaxHighlighter>
    </Box>

    <Button variant="outlined" onClick={copyToCLipboardHandler} endIcon={<ContentCopyIcon />}>
      Copy Code Snippet
    </Button>
  </Box>
);

export default CodeSnippet;
