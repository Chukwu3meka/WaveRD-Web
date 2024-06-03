"use client";

import { Result } from "antd";
import { useRouter } from "next/navigation";
import { Fade } from "react-awesome-reveal";
import { Tab, Box, Button } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { Description, SnippetsContainer, Response } from ".";
import { EndpointViewProps } from "interfaces/components/apihub/endpoint.interface";

const NotFound = () => {
  const router = useRouter();

  return (
    <Box py={2} px={2}>
      <Result
        status={404}
        title="404"
        subTitle="Sorry, the page you have visited does not exist."
        extra={
          <Button onClick={() => router.back()} variant="contained">
            Back to API Hub
          </Button>
        }
      />
    </Box>
  );
};

const EndpointView = ({ endpoint, currentTab, handleTabChange, theme }: EndpointViewProps) => (
  <Fade>
    <Box sx={{ width: "100%", margin: "auto", maxWidth: 1000, overflow: "auto", minHeight: "500px" }}>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList centered onChange={(event: React.SyntheticEvent, newValue: string) => handleTabChange(event, newValue)} aria-label="endpoint">
            <Tab label="Description" value="1" />
            <Tab label="Code Snippet" value="2" />
            <Tab label="API Response" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {endpoint ? <Description title={endpoint.title} description={endpoint.description} theme={theme} /> : <NotFound />}
        </TabPanel>
        <TabPanel value="2">{endpoint ? <SnippetsContainer snippets={endpoint.snippets} theme={theme} /> : <NotFound />}</TabPanel>
        <TabPanel value="3">{endpoint ? <Response response={endpoint.response!} theme={theme} path={endpoint.path} /> : <NotFound />}</TabPanel>
      </TabContext>
    </Box>
  </Fade>
);

export default EndpointView;
