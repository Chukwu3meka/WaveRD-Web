import LoadingButton from "@mui/lab/LoadingButton";
import SyntaxHighlighter from "react-syntax-highlighter";

import { CATEGORIES_ARRAY, HTTP_METHODS } from "utils/constants";
import { docco, darcula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { ConsoleEndpointProps } from "interfaces/components/console/apihub.interface";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { CircularProgress, InputAdornment, MenuItem, OutlinedInput } from "@mui/material";
import { TextField, IconButton, Grid, FormControl, InputLabel, Select } from "@mui/material";

const EndpointForm = ({
  theme,
  exists,
  formData,
  saveEndpoint,
  updateSnippet,
  onInputChange,
  onSelectChange,
  composeEndpoint,
}: ConsoleEndpointProps) => (
  <Grid container spacing={1}>
    <Grid item xs={6} sm={6} md={6}>
      <Grid container spacing={1.5} alignItems="center">
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth id="category" size="small">
            <InputLabel id="category">Category</InputLabel>
            <Select
              id="category"
              labelId="category"
              onChange={(e) => onSelectChange(e)}
              value={formData.category.value}
              label="Category"
              name="category">
              {CATEGORIES_ARRAY.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">Endpoint Title</InputLabel>
            <OutlinedInput
              id="title"
              label="Endpoint Title"
              value={formData.title.value}
              onBlur={(e) => onInputChange(e, true)}
              onChange={(e) => onInputChange(e, false)}
              disabled={formData.options.composing}
              placeholder="Endpoint Title"
              error={!formData.title.valid && !formData.title.validating}
              inputProps={{ autoComplete: "new-password", form: { autoComplete: "off" } }}
              endAdornment={
                formData.title.validating ? (
                  <InputAdornment position="end">
                    <IconButton aria-label="validating title" edge="end" sx={{ ml: -1 }}>
                      <CircularProgress color="success" size={20} />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  <></>
                )
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            size="small"
            id="description"
            variant="outlined"
            label="Description"
            placeholder="Endpoint Description"
            value={formData.description.value}
            error={!formData.description.valid}
            onBlur={(e) => onInputChange(e, true)}
            onChange={(e) => onInputChange(e, false)}
          />
        </Grid>

        <Grid item xs={9} sm={9} md={9}>
          <TextField
            fullWidth
            id="path"
            size="small"
            variant="outlined"
            label="API/Endpoint Path"
            value={formData.path.value}
            error={!formData.path.valid}
            disabled={formData.options.composing}
            onBlur={(e) => onInputChange(e, true)}
            onChange={(e) => onInputChange(e, false)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0 }}>
                  {process.env.STABLE_VERSION}/public/
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={3} sm={3} md={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            id="comment"
            label="Latency"
            variant="outlined"
            value={formData.options.latency}
            InputProps={{ endAdornment: <InputAdornment position="end"> MS</InputAdornment> }}
          />
        </Grid>

        <Grid item xs={9} sm={9} md={9}>
          <FormControl fullWidth disabled={formData.options.composing} size="small">
            <InputLabel id="method">Method</InputLabel>
            <Select id="method" name="method" label="Method" labelId="method" value={formData.method.value} onChange={(e) => onSelectChange(e)}>
              {HTTP_METHODS.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3} sm={3} md={3}>
          <LoadingButton fullWidth id="compose" variant="outlined" sx={{ height: 45 }} loading={formData.options.composing} onClick={composeEndpoint}>
            Compose
          </LoadingButton>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth size="small">
            <InputLabel id="method">Snippet</InputLabel>
            <Select id="snippet" name="snippet" label="Snippet" labelId="snippet" value={formData.snippet.value} onChange={(e) => onSelectChange(e)}>
              {formData.options.snippets.map(({ title }) => (
                <MenuItem key={title} value={title}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            id="snippet"
            size="small"
            variant="outlined"
            disabled={formData.options.composing}
            onBlur={(e) => updateSnippet(e.target.value, true)}
            onChange={(e) => updateSnippet(e.target.value, false)}
            value={formData.options.snippets.find((snippet) => snippet.title === formData.snippet.value)?.code || ""}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <LoadingButton
            fullWidth
            id="signin"
            type="submit"
            color="primary"
            variant="contained"
            onClick={saveEndpoint}
            loading={formData.options.saving}>
            {`${exists ? "Modify existing" : "Create new"} Endpoint`}
          </LoadingButton>
        </Grid>
      </Grid>
    </Grid>

    <Grid item xs={6} sm={6} md={6}>
      <SyntaxHighlighter
        showLineNumbers
        language="json"
        style={theme === "dark" ? darcula : docco}
        customStyle={{ borderRadius: "10px", height: "calc(100vh - (var(--console-header-size) + 40px))", marginTop: -5 }}>
        {formData.options.response && JSON.stringify(formData.options.response, null, 2)}
      </SyntaxHighlighter>
    </Grid>
  </Grid>
);

export default EndpointForm;
