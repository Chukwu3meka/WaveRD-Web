"use client";

import { Tab, Box } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { Description, SnippetsContainer, Response } from ".";
import { EndpointViewProps } from "interfaces/components/apihub/endpoint.interface";

const EndpointView = ({ endpoint, currentTab, handleTabChange, theme }: EndpointViewProps) => (
  <Fade>
    <Box sx={{ margin: "auto", minHeight: "500px", maxWidth: { xs: "100vw", sm: "100vw", md: 1000, lg: 1200, xl: 1500 } }}>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(event: React.SyntheticEvent, newValue: string) => handleTabChange(event, newValue)}
            aria-label="endpoint"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile>
            <Tab label="Description" value="1" />
            <Tab label="Code Snippet" value="2" />
            <Tab label="API Response" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Description title={endpoint.title} description={endpoint.description} theme={theme} />
        </TabPanel>
        <TabPanel value="2">
          <SnippetsContainer snippets={endpoint.snippets} theme={theme} />
        </TabPanel>
        <TabPanel value="3">
          <Response response={endpoint.response!} theme={theme} path={endpoint.path} />
        </TabPanel>
      </TabContext>
    </Box>
  </Fade>
);

export default EndpointView;
