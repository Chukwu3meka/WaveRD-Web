"use client";

import { connect } from "react-redux";
import { Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
import { Endpoints, EndpointsIntro, EndpointsMenu, styles } from ".";
import { EndpointsContainerProps } from "interfaces/components/apihub.interface";

const EndpointsContainer = (props: EndpointsContainerProps) => {
  const [showMenu, setShowMenu] = useState((props.deviceWidth || 0) >= 1200);

  useEffect(() => {
    setShowMenu(props.deviceWidth >= 720);
  }, [props.deviceWidth]);

  return (
    <main className={styles.endpoints}>
      <EndpointsIntro />

      <Box maxWidth={1200} margin="auto" sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {showMenu ? (
            <Grid item lg={2}>
              <EndpointsMenu />
            </Grid>
          ) : null}
          <Grid item lg={10}>
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
