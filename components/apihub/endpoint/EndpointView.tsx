"use client";

import { Tab, Box } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { Description, SnippetsContainer, Response } from ".";
import { EndpointViewProps } from "interfaces/components/apihub/endpoint.interface";

const EndpointView = ({ endpoint, currentTab, handleTabChange, theme }: EndpointViewProps) => (
  <Fade>
    <Box sx={{ width: "100%" }}>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList centered onChange={(event: React.SyntheticEvent, newValue: string) => handleTabChange(event, newValue)} aria-label="endpoint">
            <Tab label="Description" value="1" />
            <Tab label="Code Snippet" value="2" />
            <Tab label="API Response" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">{endpoint ? <Description title={endpoint.title} description={endpoint.description} /> : <p>DataNotFound </p>}</TabPanel>
        <TabPanel value="2">{endpoint ? <SnippetsContainer snippets={endpoint.snippets} theme={theme} /> : <p>DataNotFound </p>}</TabPanel>
        <TabPanel value="3">{endpoint ? <Response response={endpoint.response!} theme={theme} /> : <p>DataNotFound </p>}</TabPanel>
      </TabContext>
    </Box>
  </Fade>
);

export default EndpointView;
