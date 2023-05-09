import Link from "next/link";
import Image from "next/image";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Button, IconButton, Stack, Typography } from "@mui/material";

import styles from "./headerStyles.module.scss";
import { IHeader } from "@interface/main/header-interface";
import socialAccounts from "@source/constants/socialAccounts";

// const Header = ({ relativeHeader, authenticated, displayHeader }: IHeader) => (
const Header = ({ relativeHeader, signoutAction, authenticated, displayHeader, swapColorFn, color, titleOnly }: any) => (
  <div
    className={
      styles[
        titleOnly === "dark"
          ? "titleOnlyDark"
          : titleOnly === "light"
          ? "titleOnlyLight"
          : relativeHeader === "dark"
          ? "relativeHeaderDark"
          : relativeHeader === "light"
          ? "relativeHeaderLight"
          : displayHeader
          ? "header"
          : "headerHidden"
      ]
    }>
    <header>
      <div>
        <Link href="/">
          <Image src="/images/layout/soccermass.webp" alt="SoccerMASS" width={35} height={35} />
        </Link>

        <Stack direction="row" component="a" href="https://soccermass.com/" onMouseOver={swapColorFn} onMouseLeave={swapColorFn}>
          <Typography fontWeight={700} fontSize="1.7em" component="span" color={color.first}>
            Soccer
          </Typography>
          <Typography fontWeight={700} fontSize="1.7em" component="span" color={color.last}>
            MASS
          </Typography>
        </Stack>
      </div>

      <div>
        {navLinks.map(({ title, path }) => (
          <Typography variant="subtitle2" key={title} color="primary" fontWeight={700}>
            <Link href={path}>{title}</Link>
          </Typography>
        ))}
      </div>

      <div>
        <div>
          {socialAccounts
            .filter((acc) => ["twitter", "instagram", "whatsapp"].includes(acc.id))
            .map(({ title, id, href }) => (
              <SocialIcon key={id} account={title} link={href} color={color.social} />
            ))}
        </div>

        {!authenticated && (
          <Link href="/accounts/signin">
            <Button variant="outlined" size="small">
              Sign in
            </Button>
          </Link>
        )}
        {!authenticated && (
          <Link href="/accounts/signup">
            <Button variant="contained" size="small" color="primary">
              Sign up
            </Button>
          </Link>
        )}

        {authenticated && (
          <Button variant="outlined" size="small">
            <a
              href={process.env.NODE_ENV === "development" ? "http://localhost:5000/v1/accounts/signout" : "https://api.soccermass.com/v1/accounts/signout"}
              rel="noopener noreferrer">
              Sign out
            </a>
          </Button>
        )}
      </div>
    </header>
  </div>
);

export default Header;

const SocialIcon = ({ account, link, color }: { account: string; link: string; color: string }) => {
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
    <IconButton LinkComponent={Link} color="inherit" rel="noopener noreferrer" href={link} target="_blank" sx={{ fontSize: "16px", color }}>
      {icon}
    </IconButton>
  );
};

const navLinks = [
  { title: "Home", path: "/" },
  { title: "API Hub", path: "/apihub" },
  { title: "Manager", path: "/manager" },
];
