import { Metadata } from "next";

import pageInfo from "utils/page-info";
import EndpointsContainer from "components/apihub/endpoints/EndpointsEntry";
import ComingSoonContainer from "components/shared/coming-soon";
import apihubService from "services/apihub.service";
import { ApiResponse } from "interfaces/services/shared.interface";
import { Avatar, Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import Categories, { CategoriesLoading } from "components/apihub/endpoints/categories";
import WelcomeContainer from "./welcome";

const EndpointsEntry = () => (
  <main>
    <WelcomeContainer />

    <Box maxWidth={1200} margin="auto" p={1} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <Suspense fallback={<CategoriesLoading />}>
            <Categories />
          </Suspense>
        </Grid>

        <Grid item lg={9}>
          <nav>
            main screem
            {/* <EndpointsContainer getEndpointsCategories={getEndpointsCategories} /> */}
            {/*  */}
            {/*  */}
          </nav>
        </Grid>
      </Grid>
    </Box>
  </main>
);

export default EndpointsEntry;
