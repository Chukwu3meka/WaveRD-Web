"use client";

import { styles, slides } from ".";
import Carousel from "nuka-carousel";
import { Typography } from "@mui/material";

interface SlidesProp {
  layout: "accounts";
}

export default function Slides({ layout }: SlidesProp) {
  return (
    <aside className={styles.slides}>
      <div>
        <Carousel wrapAround={true} slidesToShow={1} autoplay={true} withoutControls={true} adaptiveHeight={true} autoplayInterval={5000}>
          {slides[layout].map((slide: any) => (
            <div key={slide}>
              <Typography fontSize="1.2em">{slide}</Typography>
            </div>
          ))}
        </Carousel>
      </div>
    </aside>
  );
}
