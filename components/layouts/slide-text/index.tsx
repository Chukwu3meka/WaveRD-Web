"use client";

import * as slides from "./slides";
import Carousel from "nuka-carousel";
import styles from "./index.module.scss";

interface SlidesProp {
  layout: "accounts";
}

export default function Slides({ layout }: SlidesProp) {
  return (
    <aside className={styles.slides}>
      <div>
        <Carousel wrapAround={true} slidesToShow={1} autoplay={true} withoutControls={true} adaptiveHeight={true} autoplayInterval={5000}>
          {slides[layout].map((slide: any) => (
            <div key={slide}>{slide}</div>
          ))}
        </Carousel>
      </div>
    </aside>
  );
}
