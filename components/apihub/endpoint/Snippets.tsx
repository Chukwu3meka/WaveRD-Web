import SyntaxHighlighter from "react-syntax-highlighter";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { docco, darcula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { SnippetsProps } from "interfaces/components/apihub/endpoint.interface";
import { InputLabel, MenuItem, FormControl, Button, Select, Typography, Box, Stack, SelectChangeEvent } from "@mui/material";

const Snippets = ({ copyToCLipboardHandler, codeSnippet, optionChangeHandler, theme, options }: SnippetsProps) => (
  <Box py={3}>
    <Stack direction="row" justifyContent="space-between">
      <Box width="100%" maxWidth={300}>
        <FormControl fullWidth>
          <InputLabel id="code-format">Code Format</InputLabel>
          <Select
            labelId="code-format"
            id="code-format"
            value={codeSnippet.format}
            label="Code Format"
            onChange={(event: SelectChangeEvent) => optionChangeHandler(event)}>
            {options?.map(({ snippet, title }) => (
              <MenuItem key={snippet} value={snippet}>
                <Typography fontSize="1.0em" variant="h5" color="text.secondary">
                  {title}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button onClick={copyToCLipboardHandler} endIcon={<ContentCopyIcon />} disabled={!codeSnippet.snippet} />{" "}
    </Stack>

    {codeSnippet.snippet ? (
      <Box sx={{ maxWidth: "calc(100vw - 25px)", overflowX: "auto" }}>
        <SyntaxHighlighter showLineNumbers language="javascript" style={theme === "dark" ? darcula : docco} customStyle={{ borderRadius: "10px" }}>
          {codeSnippet.snippet}
        </SyntaxHighlighter>
      </Box>
    ) : (
      <></>
    )}
  </Box>
);

export default Snippets;
