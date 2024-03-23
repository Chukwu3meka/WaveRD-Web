"use client";

import { connect } from "react-redux";
import { Grid, Box, Typography, List, Skeleton, Avatar, Stack } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
// import { EndpointsMenu } from ".";
import { Endpoints, EndpointsIntro, styles } from "../EndpointsEntry";
import { EndpointsContainerProps } from "interfaces/components/apihub.interface";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import apihubService from "services/apihub.service";
import { ApiResponse } from "interfaces/services/shared.interface";
import { AxiosError } from "axios";
import Loading from "components/shared/loading";

import dynamic from "next/dynamic";

const EndpointsMenu = dynamic(() => import("./EndpointsMenu"), {
  loading: () => (
    <>
      {new Array(10).fill(" ").map((_, i) => (
        <Stack direction="row" alignItems="center" gap={2} mb={2} key={i}>
          <Skeleton variant="circular">
            <Avatar sx={{ width: 25, height: 25 }} />
          </Skeleton>
          <Skeleton width="100%">
            <Typography fontSize="1.5em">.</Typography>
          </Skeleton>
        </Stack>
      ))}
    </>
  ),
});

const EndpointsContainer = (props: EndpointsContainerProps) => {
  const [loading, setLoading] = useState(false),
    [endpoints, setEndpoints] = useState<[]>([]),
    [showMenu, setShowMenu] = useState((props.deviceWidth || 0) > 900),
    [displayHeader, setDisplayHeader] = useState(!!props.displayHeader);

  // const { getEndpointsCategories } = props;

  useEffect(() => {
    setShowMenu(props.deviceWidth > 900);
  }, [props.deviceWidth]);

  useEffect(() => {
    setDisplayHeader(props.displayHeader);
  }, [props.displayHeader]);

  return (
    <main className={styles.endpoints}>
      <EndpointsIntro showMenu={showMenu} />

      <Box maxWidth={1200} margin="auto" p={1} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {showMenu ? (
            // getEndpointsByCategory={getEndpointsByCategory}

            <Grid item lg={3}>
              {/* <div className={styles["endpoints-menu"]} style={{ top: displayHeader ? "var(--headerHeight)" : "-10px" }}>
                <Suspense
                  fallback={}>
                  <EndpointsMenu />
                </Suspense>
              </div> */}
              {/* // getEndpointsCategories={getEndpointsCategories} */}
              <EndpointsMenu />
            </Grid>
          ) : null}
          <Grid item lg={9}>
            sadasdasd sadasdasd
            <p>safds</p>
            {/* {loading ? <Loading height="calc(var(--visibleScreen) - var(--headerHeight))" /> : <Endpoints endpoints={endpoints} />} */}
            {/* <Endpoints endpoints={endpoints} /> */}
            {/* <Suspense fallback={<p>Loading feed...</p>}>
            <Endpoints endpoints={endpoints} />
            </Suspense> */}
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
