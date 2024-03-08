import Image from "next/image";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";

import { styles } from ".";
import slideText from "@source/slideText";
import Slider from "@component/others/Slider";
import Spinner from "@component/others/Spinner";

const AuthSlider = (props) => {
  const [slide, setSlide] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { Component, pageReady, pageProps, handleScroll } = props;

  useEffect(() => setSlide(props.slide), [props.slide]);

  useEffect(() => {
    if (props.error.includes("AUTH_SLIDE_TEXT")) enqueueSnackbar("Slide text missing", { variant: "warning" });
  }, [props.error]);

  return (
    <Grid container className={styles.noAuthRoute}>
      <Hidden smDown>
        <Grid item xs={12} sm={12} md={5} lg={5} className={styles.noAuthRouteSlider}>
          <div>
            <Image src="/images/soccermass.webp" alt="SoccerMASS background" layout="fill" priority />
          </div>
          <div>
            {slide === "signin" ? (
              <div>
                <Slider slides={slideText[slide]} />
              </div>
            ) : (
              <div>{slideText[slide]}</div>
            )}
          </div>
        </Grid>
      </Hidden>

      <Grid item xs={12} sm={12} md={7} lg={7} onScroll={handleScroll}>
        <div>{pageReady ? <Component {...pageProps} /> : <Spinner />}</div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  slide: state.layout.slideText,
  error: state.error,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthSlider);
