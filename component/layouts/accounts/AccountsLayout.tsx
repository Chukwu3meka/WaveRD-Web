import Head from "next/head";
import ErrorPage from "next/error";
import dynamic from "next/dynamic";
import Carousel from "nuka-carousel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

import { BuilderRelativeHeader } from "@component/builder/header";
import authSlideText from "@source/constants/authSlideText";

import { styles } from ".";

import BuilderFooterContainer from "@component/builder/footer/BuilderFooterContainer";
import BuilderHeaderContainer from "@component/builder/header/BuilderHeaderContainer";
import BuilderLoadingContainer from "@component/builder/loading/BuilderLoadingContainer";

export default ({ cssVariable, pageLoading, authenticated, displayHeader, Component, pageProps }: any) => {
  return (
    <main className={styles.layout}>
      <aside>
        <div>
          <Carousel wrapAround={true} slidesToShow={1} autoplay={true} withoutControls={true} adaptiveHeight={true} autoplayInterval={5000}>
            {authSlideText.map((slideText: any) => (
              <div key={slideText}>{slideText}</div>
            ))}
          </Carousel>
        </div>
      </aside>
      <div>
        <BuilderRelativeHeader theme="light" titleOnly="light" />
        <Fade direction="down" triggerOnce={true} style={{ perspective: "100px" }}>
          {pageLoading ? <BuilderLoadingContainer /> : <Component {...pageProps} />}
        </Fade>
      </div>
    </main>
  );
};
