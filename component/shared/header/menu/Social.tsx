import {
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { Stack, IconButton } from "@mui/material";

import socialAccounts from "@source/constants/socialAccounts";

export default () => (
  <Stack direction="row" justifyContent="center">
    {socialAccounts
      .filter((acc) => ["twitter", "instagram", "whatsapp", "linkedin", "facebook"].includes(acc.id))
      .map(({ title, id, href }) => (
        <SocialIcon key={id} account={title} link={href} />
      ))}
  </Stack>
);

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
    case "Facebook":
      icon = <FacebookIcon fontSize="inherit" />;
      break;
    case "LinkedIn":
      icon = <LinkedInIcon fontSize="inherit" />;
      break;

    default:
      icon = <></>;
  }

  return icon ? (
    <IconButton LinkComponent={Link} color="inherit" rel="noopener noreferrer" href={link} target="_blank" sx={{ fontSize: "18px" }}>
      {icon}
    </IconButton>
  ) : (
    <></>
  );
};
