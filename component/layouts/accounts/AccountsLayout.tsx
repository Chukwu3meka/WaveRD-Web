import Head from "next/head";
import ErrorPage from "next/error";
import dynamic from "next/dynamic";
import Carousel from "nuka-carousel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

import RelativeHeader from "@component/shared/header";
import authSlideText from "@source/constants/authSlideText";

import { styles } from ".";

import BuilderFooterContainer from "@component/shared/footer/FooterContainer";
import BuilderHeaderContainer from "@component/shared/header/HeaderContainer";
import Loading from "@component/shared/loading/Loading";

export default ({ Component, pageProps, loading }: any) => (
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
      {/* <RelativeHeader position="relative" /> */}
      {/* <Fade direction="down" triggerOnce={true} style={{ perspective: "100px" }}>
        {loading ? <Loading /> : <Component {...pageProps} />}
      </Fade> */}
    </div>
  </main>
);
