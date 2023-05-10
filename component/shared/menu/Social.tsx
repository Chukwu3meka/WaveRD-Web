import Link from "next/link";
import Image from "next/image";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Button, IconButton, Stack, Typography } from "@mui/material";

import styles from "./styles.module.scss";

import { IHeader } from "@interface/main/header-interface";
import socialAccounts from "@source/constants/socialAccounts";

export default () =>
  socialAccounts
    .filter((acc) => ["twitter", "instagram", "whatsapp"].includes(acc.id))
    .map(({ title, id, href }) => <SocialIcon key={id} account={title} link={href} />);

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
