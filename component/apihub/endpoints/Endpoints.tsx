import { Grid, Stack } from "@mui/material";
import Image from "next/image";
import { styles, NavigationContainer, EndpointContainer, SearchContainer } from ".";

export default function ({ showEndpoints }: any) {
  return (
    <main className={styles.endpoints}>
      <Grid container spacing={3}>
        <Grid item sm={4}>
          <Stack alignItems="center" sx={{ maxWidth: 360, position: "sticky", top: "10px" }}>
            <figure>
              <Image
                src="/images/layout/intro-apihub.png"
                alt="SoccerMASS API HUB welcome image"
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              />
            </figure>
            <SearchContainer />
            {showEndpoints ? <NavigationContainer /> : false}
          </Stack>
        </Grid>
        <Grid item sm={8}>
          <EndpointContainer />
        </Grid>
      </Grid>
    </main>
  );
}
