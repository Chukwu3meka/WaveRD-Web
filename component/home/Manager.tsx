import Link from "next/link";
import Image from "next/image";
import Carousel from "nuka-carousel";
import { Typography, Breadcrumbs, Box, Paper, Button } from "@mui/material";

import { competitions } from "@source/constants/competitions";

import { managerStyles as styles } from ".";

export default ({ slidesToShow }: { slidesToShow: number }) => (
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

    <Box className={styles.carousel}>
      <Carousel autoplay={true} withoutControls={true} wrapAround={true} slidesToShow={slidesToShow} autoplayInterval={2000} speed={10000} dragging={false}>
        {competitions.map(({ id, image, title }) => (
          <Image src={image} key={id} alt={`SoccerMASS ${title}`} width={70} height={70} />
        ))}
      </Carousel>
    </Box>

    <div className={styles.managerIntro}>
      <Paper elevation={2}>
        <div>
          <Image
            src="/images/layout/intro-signup.jpg"
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
            src="/images/layout/intro-clubs.jpg"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt="SoccerMASS Clubs"
          />
        </div>
        <div>
          <Image
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
            src="/images/layout/intro-signin.jpg"
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

    <Box className={styles.carousel}>
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
          <Image
            key={i}
            src={`/images/clubs/club${`${i + 1}`.padStart(6, "0")}.webp`}
            alt={`SoccerMASS  club${`${i + 1}`.padStart(6, "0")}`}
            width={70}
            height={70}
          />
        ))}
      </Carousel>
    </Box>
  </div>
);
