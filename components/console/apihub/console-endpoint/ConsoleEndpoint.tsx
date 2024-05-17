import SyntaxHighlighter from "react-syntax-highlighter";

import { Box, CircularProgress, InputAdornment, MenuItem, OutlinedInput } from "@mui/material";
import { docco, darcula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { EndpointResponseProps } from "interfaces/components/apihub/endpoint.interface";

import AddIcon from "@mui/icons-material/Add";
import Ellipsis from "components/shared/ellipsis";
import LoadingButton from "@mui/lab/LoadingButton";

import { Divider } from "antd";
import { format } from "date-fns";
import { capitalize } from "utils/helpers";
import { CATEGORIES, CATEGORIES_ARRAY } from "utils/constants";
import { ConsoleEndpointProps, ConsoleEndpointsProps } from "interfaces/components/console/apihub.interface";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { Paper, Skeleton, TextField, Stack, IconButton, Grid, FormControl, InputLabel, Select } from "@mui/material";

const ConsoleEndpoint = ({ formData, theme, onInputChange, onSelectChange, updateSnippet }: ConsoleEndpointProps) => (
  <main>
    <Divider orientation="left">Modify Existing API Hub Endpoint</Divider>
    {/* id  response snippets */}
    <Grid container spacing={3}>
      <Grid item xs={5} sm={5} md={5}>
        <FormControl fullWidth id="category">
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

      <Grid item xs={7} sm={7} md={7}>
        <FormControl fullWidth variant="outlined">
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
          minRows={5}
          id="description"
          variant="outlined"
          label="Description"
          value={formData.description.value}
          error={!formData.description.valid}
          // disabled={formData.options.composing}
          onBlur={(e) => onInputChange(e, true)}
          onChange={(e) => onInputChange(e, false)}
          placeholder="Endpoint Description"
        />
      </Grid>

      <Grid item xs={5} sm={5} md={5}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={9} sm={9} md={9}>
            <TextField
              fullWidth
              id="path"
              label="API/Endpoint Path"
              variant="outlined"
              value={formData.path.value}
              error={!formData.path.valid}
              // disabled={formData.options.composing}
              onBlur={(e) => onInputChange(e, true)}
              onChange={(e) => onInputChange(e, false)}
              placeholder="/ v1 / hub / ..."
              // InputProps={{ startAdornment: <InputAdornment position="start">/</InputAdornment> }}
            />
          </Grid>

          <Grid item xs={3} sm={3} md={3}>
            <TextField
              disabled
              fullWidth
              id="comment"
              label="Latency"
              variant="outlined"
              // value={formData.latency.value}
              // error={!formData.latency.valid}
              // onBlur={(e) => onInputChange(e, true)}
              // onChange={(e) => onInputChange(e, false)}
              value={formData.options.latency}
              InputProps={{ endAdornment: <InputAdornment position="end"> MS</InputAdornment> }}
            />
          </Grid>

          <Grid item xs={9} sm={9} md={9}>
            <FormControl fullWidth>
              <InputLabel id="method">Method</InputLabel>
              <Select id="method" name="method" label="Method" labelId="method" value={formData.method.value} onChange={(e) => onSelectChange(e)}>
                {["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"].map((method) => (
                  <MenuItem key={method} value={method}>
                    {method}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3} sm={3} md={3}>
            <LoadingButton
              id="signin"
              type="submit"
              size="large"
              fullWidth
              sx={{ height: 60 }}
              // color="secondary"
              variant="outlined"
              // loading={searching}
              // onClick={searchHandler}
              // disabled={searching || data.loading}
            >
              Compose
            </LoadingButton>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Box py={3}>
              <FormControl fullWidth>
                <InputLabel id="method">Snippet</InputLabel>
                <Select
                  id="snippet"
                  name="snippet"
                  label="Snippet"
                  labelId="snippet"
                  value={formData.snippet.value}
                  onChange={(e) => onSelectChange(e)}>
                  {formData.options.snippets.map(({ id, title }) => (
                    <MenuItem key={id} value={id}>
                      {title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                multiline
                minRows={5}
                id="snippet"
                variant="outlined"
                disabled={formData.options.composing}
                onBlur={(e) => updateSnippet(e.target.value, true)}
                onChange={(e) => updateSnippet(e.target.value, false)}
                value={formData.options.snippets.find((snippet) => snippet.id === formData.snippet.value)?.snippet || ""}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <LoadingButton
              id="signin"
              type="submit"
              size="large"
              fullWidth
              sx={{ mt: -5 }}
              color="primary"
              variant="contained"
              // loading={searching}
              // onClick={searchHandler}
              // disabled={searching || data.loading}
            >
              Submit
            </LoadingButton>{" "}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={7} sm={7} md={7}>
        <SyntaxHighlighter
          showLineNumbers
          language="json"
          style={theme === "dark" ? darcula : docco}
          customStyle={{ borderRadius: "10px", height: "100%", marginTop: -5 }}>
          {formData.options.response}
        </SyntaxHighlighter>
      </Grid>
    </Grid>
  </main>
);

export default ConsoleEndpoint;
