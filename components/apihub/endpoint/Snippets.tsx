import SyntaxHighlighter from "react-syntax-highlighter";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { docco, darcula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { InputLabel, MenuItem, FormControl, Button, Select, Typography, Box, Stack } from "@mui/material";

const Snippets = ({ copyToCLipboardHandler, codeSnippet, optionChangeHandler, theme, options }) => (
  <Box py={3}>
    <Stack direction="row" justifyContent="space-between">
      <Box width="100%" maxWidth={300}>
        <FormControl fullWidth>
          <InputLabel id="code-format">Code Format</InputLabel>
          <Select labelId="code-format" id="code-format" value={codeSnippet.format} label="Code Format" onChange={optionChangeHandler}>
            {options?.map(({ value, title }) => (
              <MenuItem key={value} value={value}>
                <Typography fontSize="1.0em" variant="h5" color="text.secondary">
                  {title}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button onClick={copyToCLipboardHandler} endIcon={<ContentCopyIcon />}>
        {/* Copy Code Snippet */}
      </Button>
    </Stack>

    <Box sx={{ maxWidth: "calc(100vw - 25px)", overflowX: "auto" }}>
      <SyntaxHighlighter showLineNumbers language="javascript" style={theme === "dark" ? darcula : docco} customStyle={{ borderRadius: "10px" }}>
        {codeSnippet.snippet}
      </SyntaxHighlighter>
    </Box>
  </Box>
);

export default Snippets;
