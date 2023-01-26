import Link from "next/link";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Button, IconButton, Stack, Typography } from "@mui/material";

import { styles } from ".";
import { IHeader } from "@interface/main/header-interface";
import thirdPartyAccounts from "@source/constants/thirdPartyAccounts";

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

const Header = ({ logoutHandler, authenticated, displayHeader }: IHeader) => (
  <Fade direction="down" className={styles[displayHeader ? "header" : "headerHidden"]}>
    <header>
      <div>
        <Link href="/">
          <Image src="/images/layout/soccermass.webp" alt="SoccerMASS" width={25} height={25} />
        </Link>

        <Stack direction="row" component="a" href="https://soccermass.com/">
          <Typography fontWeight={700} fontSize="1.7em" component="h1" color="white">
            Soccer
          </Typography>
          <Typography fontWeight={700} fontSize="1.7em" component="h1" color="primary">
            MASS
          </Typography>
        </Stack>
      </div>

      <div>
        {navLinks.map(({ title, path }) => (
          <Typography variant="subtitle2" key={title}>
            <Link href={path}>{title}</Link>
          </Typography>
        ))}
      </div>

      <div>
        <div>
          {thirdPartyAccounts
            .filter((acc) => ["Twitter", "Instagram", "Whatsapp"].includes(acc[0]))
            .map(([account, link = "https://soccermass.com/"]) => (
              <SocialIcon key={account} account={account} link={link} />
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
  </Fade>
);

export default Header;
