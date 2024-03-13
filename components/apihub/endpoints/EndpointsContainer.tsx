"use client";

import { connect } from "react-redux";
import { Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
import { Endpoints, EndpointsIntro, EndpointsMenu, styles } from ".";
import { EndpointsContainerProps } from "interfaces/components/apihub.interface";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const EndpointsContainer = (props: EndpointsContainerProps) => {
  const [showMenu, setShowMenu] = useState((props.deviceWidth || 0) > 900);

  useEffect(() => {
    setShowMenu(props.deviceWidth > 900);
  }, [props.deviceWidth]);

  const [endpoint, setEndpoint] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: false });

  const getEndpoint = async (id: string) => {
    setStatus((status) => ({ ...status, loading: true, error: false }));

    // await fetcher({ endpoint: `/apihub/endpoints/${id}`, method: "GET" })
    //   .then(({ success, data }) => {
    //     if (success) {
    //       setEndpoint(data);
    //       setStatus((status) => ({ ...status, error: false }));
    //     }
    //   })
    //   .catch((err) => {
    //     setEndpoint(null);
    //     setStatus((status) => ({ ...status, error: true }));
    //   })
    //   .finally(() => setStatus((status) => ({ ...status, loading: false })));
  };

  return (
    <main className={styles.endpoints}>
      <EndpointsIntro showMenu={showMenu} getEndpoint={getEndpoint} />

      <Box maxWidth={1200} margin="auto" p={1} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {showMenu ? (
            <Grid item lg={3}>
              <EndpointsMenu />
            </Grid>
          ) : null}
          <Grid item lg={9}>
            <Endpoints />
          </Grid>
        </Grid>
      </Box>
    </main>
  );
};

const mapStateToProps = (state: RootState) => ({
    deviceWidth: state.layout.width,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndpointsContainer);
