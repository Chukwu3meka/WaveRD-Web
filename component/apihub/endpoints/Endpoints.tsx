import { Grid } from "@mui/material";
import { styles, NavigationContainer, EndpointContainer } from ".";

export default function ({ showEndpoints }: any) {
  return (
    <main className={styles.endpoints}>
      <Grid container spacing={3}>
        <Grid item sm={4}>
          {showEndpoints ? <NavigationContainer /> : false}
        </Grid>
        <Grid item sm={8}>
          <EndpointContainer />
        </Grid>
      </Grid>
    </main>
  );
}
