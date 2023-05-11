import Carousel from "nuka-carousel";
import { Typography } from "@mui/material";

import Image from "next/image";

import { peaksStyles } from ".";
import { competitions } from "@source/constants/competitions";

const Peaks = ({ slidesToShow }: { slidesToShow: number }) => {
  const peaksArray = [
    "Competitive transfer market",
    "Managers can't hoard Star Players in a particular team",
    "Real match simulation",
    "Advanced tactics and formation",
    "Players with rating over '89' are registered as Free agents",
  ];

  return (
    <div className={peaksStyles.transparent}>
      <div></div>
      <div>
        <Carousel autoplay={true} withoutControls={true} wrapAround={true} slidesToShow={slidesToShow} autoplayInterval={2000} speed={10000} dragging={false}>
          {competitions.map(({ id, image, title }) => (
            <div key={id} className={peaksStyles.firstImageCarousel}>
              <Image src={image} alt={`SoccerMASS ${title}`} width={70} height={70} />
            </div>
          ))}
        </Carousel>

        <Carousel autoplay={true} withoutControls={true} wrapAround={true} adaptiveHeight slidesToShow={1} autoplayInterval={2500} dragging={false}>
          {peaksArray.map((peak) => (
            <div key={peak} className={peaksStyles.peak}>
              <Typography fontSize={{ xs: "1.7em", sm: "1.9em", md: "2.1em" }} fontWeight={600}>
                {peak}
              </Typography>
            </div>
          ))}
        </Carousel>

        <Carousel
          speed={10000}
          autoplay={true}
          dragging={false}
          wrapAround={true}
          autoplayReverse={true}
          withoutControls={true}
          autoplayInterval={2000}
          slidesToShow={slidesToShow}>
          {[...new Array(64)].map((_, i) => (
            <div key={i} className={peaksStyles.lastImageCarousel}>
              <Image
                src={`/images/clubs/club${`${i + 1}`.padStart(6, "0")}.webp`}
                alt={`SoccerMASS  club${`${i + 1}`.padStart(6, "0")}`}
                width={70}
                height={70}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Peaks;
