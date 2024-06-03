"use client";

import Link from "next/link";
import Image from "next/image";

import { managerStyles as styles } from ".";
import { COMPETITIONS } from "utils/constants";
import { Carousel, CarouselProps } from "antd";
import { Typography, Breadcrumbs, Box, Paper, Button } from "@mui/material";

const settings: CarouselProps = {
  dots: false,
  speed: 2000,
  infinite: true,
  autoplay: true,
  cssEase: "linear",
  autoplaySpeed: 2000,
  pauseOnHover: false,
  centerMode: false,
  arrows: false,
};

export default function Manager({ slidesToShow, deviceWidth }: { slidesToShow: number; deviceWidth: number }) {
  return (
    <div className={styles.manager}>
      <Box role="presentation" pl={2} py={3}>
        <Breadcrumbs aria-label="breadcrumb" separator="›">
          <Typography color="text.secondary">SoccerMASS</Typography>

          <Typography color="text.secondary">Core</Typography>

          <Link href="/manager">
            <Typography color="primary">Football Manager</Typography>
          </Link>
        </Breadcrumbs>
      </Box>

      {deviceWidth > 620 ? (
        <Box className={styles.carousel}>
          <Carousel {...settings} slidesToShow={slidesToShow}>
            {COMPETITIONS.map(({ id, image, title }) => (
              <figure key={id}>
                <Image src={image} alt={`SoccerMASS ${title}`} width={70} height={70} />
              </figure>
            ))}
          </Carousel>
        </Box>
      ) : (
        false
      )}

      <div className={styles.managerIntro}>
        <Paper elevation={2}>
          <div>
            <Image
              priority
              src="/images/layout/intro-signup.webp"
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              alt="SoccerMASS Clubs"
            />
          </div>
          <span>Step up to the challenge and beat the best managers. Take charge and steer your team to victory by joining now.</span>

          <Link href="/accounts/signup">
            <Button variant="contained" color="primary">
              Sign up
            </Button>
          </Link>
        </Paper>

        <Paper elevation={4}>
          <div>
            <Image
              priority
              src="/images/layout/intro-clubs.webp"
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              alt="SoccerMASS Clubs"
            />
          </div>
          <div>
            <Image
              priority
              src="/images/layout/intro-players.png"
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              alt="SoccerMASS Players"
            />
          </div>
        </Paper>

        <Paper elevation={2}>
          <div>
            <Image
              priority
              src="/images/layout/intro-signin.webp"
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              alt="SoccerMASS Clubs"
            />
          </div>
          <span>Assemble your team and manage club finances, your players are eager for your leadership.</span>
          <Link href="/accounts/signin">
            <Button variant="contained" color="primary">
              Sign in
            </Button>
          </Link>
        </Paper>
      </div>

      {deviceWidth > 620 ? (
        <Box className={styles.carousel}>
          <Carousel {...settings} slidesToShow={slidesToShow} rtl>
            {clubs.map((club, index) => (
              <figure key={club}>
                <Image src={`/images/clubs/${club}.webp`} alt={`SoccerMASS  club ${index + 1}`} width={70} height={70} />
              </figure>
            ))}
          </Carousel>
        </Box>
      ) : (
        false
      )}
    </div>
  );
}

const clubs = [
  "club000001",
  "club000043",
  "club000021",
  "club000031",
  "club000051",
  "club000024",
  "club000002",
  "club000026",
  "club000022",
  "club000042",
  "club000011",
  "club000025",
];
