import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { fetcher } from "@utils/clientFuncs";
import { styles, Endpoints, Endpoint, EndpointDialog } from ".";

const Container = ({ initialEndpoints }) => {
  const router = useRouter(),
    { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [activeTab, setActiveTab] = useState(0),
    [endpoint, setEndpoint] = useState(null),
    [ratingHover, setRatingHover] = useState(0),
    [selectedID, setSelectedID] = useState(null),
    [endpoints, setEndpoints] = useState(initialEndpoints);

  const [displayDialog, setDisplayDialog] = useState(false);

  const hideEndpointDialogHandler = () => {
    setDisplayDialog(false);
    setSelectedID(null);
    if (endpoint) setEndpoint(null); //reset endpoint to null;
    if (activeTab !== 0) setActiveTab(0); //reset tab to Description
  };

  const copyToCLipboardHandler = async () => {
    // first time a user runs this function, a confirmation dialog is sent to confirm action
    if (navigator && navigator.clipboard) {
      // copy codeSnippet to clipboard
      await navigator.clipboard.writeText(endpoint.codeSnippet);

      // read content of clipboard
      // await navigator.clipboard.readText();

      enqueueSnackbar("Copied!!!", { variant: "success" });
    } else {
      enqueueSnackbar("Failed to copy!!!", { variant: "error" });
    }
  };

  const handleTabChange = async (event, newValue) => {
    setActiveTab(typeof event === "number" ? event : newValue);
  };

  const selectAPIHandler = (id) => async () => {
    setLoading(true); // display a loading bar on click
    setSelectedID(id);
    if (window && window.innerWidth < 600) setDisplayDialog(true);
    if (endpoint) setEndpoint(null); //reset endpoint to null;
    if (activeTab !== 0) setActiveTab(0); //reset tab to Description
    // const res = await fetcher(`/api/client/getEndpoint`, JSON.stringify({ id }));
    const res = {
      _id: { $oid: "6240870dc540da47dd9346f7" },
      title: "Get Random Clubs",
      latency: "Normal",
      rating: { $numberInt: "4" },
      description:
        "This endpoint will return a random list of football clubs in no particular order. To improve performance and scaling, we've added a limit to the number of player documents returned, currently, it is 20, these number might change in the future, but no worries, we'll send mails months before modifying result of API.<br/>A popular use case will be in a situation where by in your app, you want to display a random list of footballers, for users to pick a player who will be added to their team without transfer fee. <br/>If you've not created a developer account, please do to avoid uninterupted usage of our service. API calls without your developer key would return null in the future.<br/>In each objects in the array, you will have access to the reference, title, nickname, founded, stadium, capacity, location,manager",
      codeSnippet:
        'const endpoint = "https://www.socceratlas.com/api/v1/getRandomClubs";\n\nconst options = {\n  method: "POST",\n  headers: new Headers({\n    "X-APIKey": "<developer\'s API key>",\n    // ensure to pass Content-Type, else our Server won\'t parse your request\n    "Content-Type": "application/json",\n  }),\n  body: JSON.stringify({ limit: 3 }), //default limit is 20,\n};\n\nfetch(endpoint, options)\n  .then((response) => response.json())\n  .then((response) => console.log(response))\n  .catch((err) => console.error(err));\n};',
      successResponse: [
        {
          ref: "club47",
          title: "Roma",
          nickname: "Giallorossi",
          founded: { $numberInt: "1927" },
          stadium: "Stadio Olimpico",
          capacity: { $numberInt: "73261" },
          location: "Rome, Italy",
          manager: "José Mourinho",
        },
        {
          ref: "club3",
          title: "Atlético de Madrid",
          nickname: "Los Rojiblancos",
          founded: { $numberInt: "1903" },
          stadium: "Wanda Metropolitano",
          capacity: { $numberInt: "68000" },
          location: "Madrid, Spain",
          manager: "Diego Simeone",
        },
        {
          ref: "club54",
          title: "AZ",
          nickname: "Alkmaar",
          founded: { $numberInt: "1967" },
          stadium: "AFAS Stadion",
          capacity: { $numberInt: "17023" },
          location: "Alkmaar, Netherlands",
          manager: "Unknown",
        },
      ],
    };

    setEndpoint(res);
    setLoading(false);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "rgb(30, 57, 82)" }} className={styles.endpoints}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Endpoints endpoints={endpoints} selectedID={selectedID} selectAPIHandler={selectAPIHandler} />
        </Grid>
        <Grid item sm={9}>
          <EndpointDialog
            displayDialog={displayDialog}
            hideEndpointDialogHandler={hideEndpointDialogHandler}
            ratingHover={ratingHover}
            setRatingHover={setRatingHover}
            loading={loading}
            endpoint={endpoint}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            copyToCLipboardHandler={copyToCLipboardHandler}
          />
          <Box sx={{ display: { xs: "none", sm: "block" }, height: "100%" }}>
            <Endpoint
              ratingHover={ratingHover}
              setRatingHover={setRatingHover}
              loading={loading}
              endpoint={endpoint}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              copyToCLipboardHandler={copyToCLipboardHandler}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Container;
