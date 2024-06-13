import { Metadata } from "next";
import { Suspense } from "react";
import { Box, Grid } from "@mui/material";
import { NonPaginatedResponse } from "interfaces/services/shared.interface";
import { Category } from "interfaces/components/apihub/endpoints.interface";

import pageInfo from "utils/page-info";
import ApihubService from "services/apihub.service";
import WelcomeContainer from "components/apihub/endpoints/welcome";
import CategoriesContainer, { CategoriesLoading } from "components/apihub/endpoints/categories";
import EndpointsContainer, { EndpointsLoadingContainer } from "components/apihub/endpoints/endpoints";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

const CategoriesSSR = async () => {
  const apihubService = new ApihubService();

  const categories: Category[] = await apihubService
    .getEndpointsCategories({ limit: 10 })
    .then(({ success, data }: NonPaginatedResponse<Category[]>) => {
      if (success && Array.isArray(data)) return data;
      return [];
    })
    .catch(() => []);

  return <CategoriesContainer categories={categories} />;
};

const EndpointsSSR = async () => {
  const apihubService = new ApihubService();

  const limit: 20 = 20,
    endpoints = await apihubService
      .getEndpoints({ filter: "all", size: limit, page: 0 })
      .then(({ success, data }) => {
        if (success && data && Array.isArray(data.content)) return data;
        return { page: 0, size: limit, totalElements: 0, content: [] };
      })
      .catch(() => ({ page: 0, size: limit, totalElements: 0, content: [] }));

  return <EndpointsContainer endpoints={endpoints} limit={limit} />;
};

const EndpointsPage = () => (
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

export default EndpointsPage;
