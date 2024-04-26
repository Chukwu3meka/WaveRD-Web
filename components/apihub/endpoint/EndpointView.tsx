"use client";

import { Tab, Box } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { Description, SnippetsContainer, Response } from ".";

const EndpointView = ({ endpoint, currentTab, handleTabChange, theme, handleClose }: any) => (
  <Box sx={{ width: "100%" }}>
    <TabContext value={currentTab}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleTabChange} aria-label="endpoint">
          <Tab label="Description" value="1" />
          <Tab label="Code Snippet" value="2" />
          <Tab label="API Response" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
        {endpoint ? <Description title={endpoint.title} description={endpoint.description} /> : <p>DataNotFound </p>}
      </TabPanel>
      <TabPanel value="2">{endpoint ? <SnippetsContainer snippets={endpoint.snippets} theme={theme} /> : <p>DataNotFound </p>}</TabPanel>
      <TabPanel value="3">{endpoint ? <Response response={endpoint.response} theme={theme} /> : <p>DataNotFound </p>}</TabPanel>
    </TabContext>
  </Box>
);

export default EndpointView;
