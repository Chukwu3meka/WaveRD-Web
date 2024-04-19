import { Metadata } from "next";
import { Suspense } from "react";
import { Box, Grid } from "@mui/material";

import pageInfo from "utils/page-info";
import ComingSoonContainer from "components/shared/coming-soon";
import WelcomeContainer from "components/apihub/endpoints/welcome";
import CategoriesSSR, { CategoriesLoading } from "components/apihub/endpoints/categories";
import EndpointsSSR, { EndpointsLoadingContainer } from "components/apihub/endpoints/endpoints";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

const EndpointsPage = () => {
  return process.env.NODE_ENV === "production" ? (
    <ComingSoonContainer header={true} finishDate={new Date("13 May 2024")} />
  ) : (
    <main>
      <WelcomeContainer />

      <Box maxWidth={1500} margin="auto" p={1} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item sm={12} lg={3}>
            <Suspense fallback={<CategoriesLoading />}>
              <CategoriesSSR />
            </Suspense>
          </Grid>

          <Grid item sm={12} lg={9}>
            <Suspense fallback={<EndpointsLoadingContainer items={20} />}>
              <EndpointsSSR />
            </Suspense>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
};

export default EndpointsPage;
