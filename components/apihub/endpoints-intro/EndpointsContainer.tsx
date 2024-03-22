"use client";

import { connect } from "react-redux";
import { Grid, Box, Typography } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
import { Endpoints, EndpointsIntro, EndpointsMenu, styles } from ".";
import { EndpointsContainerProps } from "interfaces/components/apihub.interface";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import apihubService from "services/apihub.service";
import { ApiResponse } from "interfaces/services/shared.interface";
import { AxiosError } from "axios";
import Loading from "components/shared/loading";

const EndpointsContainer = (props: EndpointsContainerProps) => {
  const [loading, setLoading] = useState(false),
    [endpoints, setEndpoints] = useState<[]>([]),
    [showMenu, setShowMenu] = useState((props.deviceWidth || 0) > 900),
    [displayHeader, setDisplayHeader] = useState(!!props.displayHeader);

  useEffect(() => {
    setShowMenu(props.deviceWidth > 900);
  }, [props.deviceWidth]);

  useEffect(() => {
    setDisplayHeader(props.displayHeader);
  }, [props.displayHeader]);

  const getEndpointsByCategory = async (reference: string) => {
    setLoading(true);

    await apihubService
      .getEndpointsCategories(reference)
      .then(({ success, data }: ApiResponse) => {
        if (success && Array.isArray(data)) setEndpoints(data);
      })
      .catch(() => setEndpoints([]))
      .finally(() => setLoading(false));
  };

  return (
    <main className={styles.endpoints}>
      <EndpointsIntro showMenu={showMenu} />

      <Box maxWidth={1200} margin="auto" p={1} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {showMenu ? (
            <Grid item lg={3}>
              <Typography></Typography>
              <EndpointsMenu getEndpointsByCategory={getEndpointsByCategory} displayHeader={displayHeader} />
            </Grid>
          ) : null}
          <Grid item lg={9}>
            {/* {loading ? <Loading height="calc(var(--visibleScreen) - var(--headerHeight))" /> : <Endpoints endpoints={endpoints} />} */}

            <Suspense fallback={<p>Loading feed...</p>}>
              <Endpoints endpoints={endpoints} />
            </Suspense>

            {/* {loading ? <Loading height="calc(var(--visibleScreen) - var(--headerHeight))" /> : } */}
          </Grid>
        </Grid>
      </Box>
    </main>
  );
};

const mapStateToProps = (state: RootState) => ({
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndpointsContainer);
