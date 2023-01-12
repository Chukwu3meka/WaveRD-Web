import Link from "next/link";
import Image from "next/image";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { Fade } from "react-awesome-reveal";

import { styles } from ".";
import { IHeader } from "@interface/main/header-interface";
import thirdPartyAccounts from "@source/thirdPartyAccounts";
import { IThirdPartyAccounts } from "@interface/source/thirdPartyAccounts-interface";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const SocialIcon = ({ account, link }: { account: string; link: string }) => {
  let icon;

  switch (account) {
    case "Whatsapp":
      icon = <WhatsAppIcon fontSize="inherit" />;
      break;
    case "Twitter":
      icon = <TwitterIcon fontSize="inherit" />;
      break;

    case "Instagram":
      icon = <InstagramIcon fontSize="inherit" />;
      break;
    default:
      return <></>;
  }

  return (
    <IconButton LinkComponent={Link} color="inherit" rel="noopener noreferrer" href={link} target="_blank" sx={{ fontSize: "16px" }}>
      {icon}
    </IconButton>
  );
};

const navLinks = [
  { title: "Home", path: "/" },
  { title: "API Hub", path: "/apihub" },
  { title: "Manager", path: "/manager" },
];

const Header = ({ logoutHandler, authenticated }: IHeader) => (
  <Fade direction="down">
    <div className={styles.header}>
      <header>
        <div>
          <Image src="/images/soccermass.webp" alt="SoccerMASS" width={25} height={25} placeholder="blur" blurDataURL="/images/soccermass.webp" />
          <Stack direction="row">
            <Typography fontWeight={700} fontSize="1.7em" component="h1">
              Soccer
            </Typography>
            <Typography fontWeight={700} fontSize="1.7em" component="h1" color="primary">
              MASS
            </Typography>
          </Stack>
        </div>

        <div>
          {navLinks.map(({ title, path }) => (
            <Typography variant="subtitle2">
              <Link href={path}>{title}</Link>
            </Typography>
          ))}
        </div>

        <div>
          <div>
            {thirdPartyAccounts
              .filter((acc) => ["Twitter", "Instagram", "Whatsapp"].includes(acc[0]))
              .map(([account, link = "https://alienforest.com/"]) => (
                <SocialIcon account={account} link={link} />
              ))}
          </div>

          {!authenticated && (
            <Link href="/auth/signin">
              <Button variant="outlined" size="small">
                Signin
              </Button>
            </Link>
          )}
          {!authenticated && (
            <Link href="/auth/signup">
              <Button variant="contained" size="small" color="primary">
                Signup
              </Button>
            </Link>
          )}
          {authenticated && (
            <Link href="/auth/signin" onClick={logoutHandler()}>
              <Button variant="outlined" size="small">
                Logout
              </Button>
            </Link>
          )}
        </div>
      </header>
    </div>
  </Fade>
);

export default Header;
