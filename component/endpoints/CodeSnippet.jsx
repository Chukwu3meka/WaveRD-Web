import Highlight from "react-highlight";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CodeSnippet = ({ activeTab, copyToCLipboardHandler, codeSnippet }) => (
  <div hidden={activeTab !== 1}>
    <Typography variant="h5" color="text.secondary">
      JavaScript Fetch API
    </Typography>

    <Highlight>{codeSnippet}</Highlight>

    <Button color="secondary" variant="outlined" onClick={copyToCLipboardHandler} endIcon={<ContentCopyIcon />}>
      Copy Code Snippet
    </Button>
  </div>
);

export default CodeSnippet;
