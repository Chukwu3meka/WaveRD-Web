import Loading from "@component/shared/loading";
import ErrorContainer from "@component/shared/error";
import { Grid, Stack } from "@mui/material";
import { styles, NavigationContainer, EndpointContainer, SearchContainer } from ".";

export default function ({ getEndpoint, endpoint, status }: any) {
  return (
    <main className={styles.endpoints}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={3}>
          <Stack alignItems="center" spacing={2} sx={{ position: "sticky", top: "85px" }}>
            <SearchContainer getEndpoint={getEndpoint} />
            <NavigationContainer getEndpoint={getEndpoint} />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          {status.loading ? (
            <Loading height="100%" />
          ) : status.error ? (
            <p>"Error"</p>
          ) : endpoint ? (
            <EndpointContainer endpoint={endpoint} />
          ) : (
            <ErrorContainer
              title="Endpoint not selected"
              description="Select an endpoint from the side pane to display its API Documentation, Code Snippte, and Sample Response. Alternatively you can search endpoints using the search box."
              style={{ height: "100%" }}
            />
          )}
        </Grid>
      </Grid>
    </main>
  );
}
