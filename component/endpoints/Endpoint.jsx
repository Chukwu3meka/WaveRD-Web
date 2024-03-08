import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import { SuccessResponse, CodeSnippet, Description } from ".";

const Endpoint = ({ loading, activeTab, handleTabChange, endpoint, copyToCLipboardHandler, ratingHover, setRatingHover }) =>
  loading ? (
    <Box display="flex" alignItems="center" justifyContent="center" height="100%" component={Paper}>
      <CircularProgress size={50} />
    </Box>
  ) : endpoint ? (
    <Box borderColor="divider" minHeight="100%" component={Paper}>
      <Box pb={1}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          textColor="secondary"
          variant="scrollable"
          scrollButtons={false}
          indicatorColor="secondary">
          <Tab label="Description" />
          <Tab label="Code Snippet" />
          <Tab label="API Response" />
        </Tabs>
      </Box>
      <>
        <Description
          handleTabChange={handleTabChange}
          activeTab={activeTab}
          endpoint={endpoint}
          ratingHover={ratingHover}
          setRatingHover={setRatingHover}
        />

        <CodeSnippet
          copyToCLipboardHandler={copyToCLipboardHandler}
          activeTab={activeTab}
          codeSnippet={endpoint.codeSnippet}
          handleTabChange={handleTabChange}
        />

        <SuccessResponse handleTabChange={handleTabChange} activeTab={activeTab} endpoint={endpoint} />
      </>
    </Box>
  ) : (
    <Box pb={1} m={"auto"} height="100%" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} component={Paper}>
      <TravelExploreIcon />
      <Typography mt={2}>Select an Endpoint</Typography>
    </Box>
  );

export default Endpoint;
