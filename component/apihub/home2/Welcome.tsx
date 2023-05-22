import Link from "next/link";
import Image from "next/image";
import Carousel from "nuka-carousel";
import { Typography, Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { welcomeStyles } from ".";
import { IWelcome } from "@interface/apihub/welcome-interface";

const Welcome = ({ setCurrColorFn, currColor, dataCovered }: IWelcome) => {
  return (
    <main className={welcomeStyles.welcome}>
      <section>
        <Carousel
          wrapAround={true}
          slidesToShow={1}
          autoplay={true}
          withoutControls={true}
          adaptiveHeight={true}
          autoplayInterval={5000}
          afterSlide={(index: number) => setCurrColorFn(index)}>
          {dataCovered.map(({ title, description, path }, index) => (
            <main key={index}>
              <Typography color={currColor}>{title}</Typography>
              <Typography color="#D4D4DE">{description} </Typography>
              <Link href={path}>
                <Button startIcon={<RemoveRedEyeIcon />} size="large" variant="contained" sx={{ backgroundColor: "rgb(30, 57, 82)", color: "#CCCCDC" }}>
                  View Documentation
                </Button>
              </Link>
            </main>
          ))}
        </Carousel>
      </section>
      <section>
        <Carousel
          wrapAround={true}
          slidesToShow={1}
          disableAnimation
          autoplay={true}
          defaultControlsConfig={{
            prevButtonStyle: { display: "none" },
            nextButtonStyle: { display: "none" },
            pagingDotsStyle: { position: "relative", top: "30px", fill: currColor },
          }}
          adaptiveHeight={true}
          autoplayInterval={5000}>
          {new Array(5).fill("").map((_, index: number) => (
            <figure key={index}>
              <Image
                src={`/images/layout/apihub-welcome-${index + 1}.jpg`}
                fill
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                alt="SoccerMASS APIHUB Welcome screen"
              />
            </figure>
          ))}
        </Carousel>
      </section>
    </main>
  );
};

export default Welcome;
