import Link from "next/link";
import Image from "next/image";
import Carousel from "nuka-carousel";
import { managerStyles as styles } from ".";
import { COMPETITIONS } from "utils/constants";
import { Typography, Breadcrumbs, Box, Paper, Button } from "@mui/material";

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
          <Carousel autoplay={true} withoutControls={true} wrapAround={true} slidesToShow={slidesToShow} autoplayInterval={2000} speed={10000} dragging={false}>
            {COMPETITIONS.map(({ id, image, title }) => (
              <Image src={image} key={id} alt={`SoccerMASS ${title}`} width={70} height={70} />
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

      {deviceWidth > 620 ? (
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
            {clubs.map((club, index) => (
              <Image key={club} src={`/images/clubs/${club}.webp`} alt={`SoccerMASS  club ${index + 1}`} width={70} height={70} />
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
