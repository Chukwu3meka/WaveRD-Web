"use client";

import { Carousel, CarouselProps } from "antd";

import { styles, features } from ".";
import { Typography } from "@mui/material";
import { SlidesProp } from "interfaces/components/others/layouts.interface";

const settings: CarouselProps = {
  speed: 5000,
  arrows: false,
  infinite: true,
  autoplay: true,
  slidesToShow: 1,
  cssEase: "linear",
  slidesToScroll: 1,
  autoplaySpeed: 2000,
  pauseOnHover: false,
};

export default function Slides({ layout }: SlidesProp) {
  return (
    <aside className={styles.slides}>
      <Carousel {...settings}>
        {features[layout].map((slide: any) => (
          <Typography key={slide} component="div" fontSize="1.2em">
            {slide}
          </Typography>
        ))}
      </Carousel>
    </aside>
  );
}
