import Link from "next/link";
import { IconButton } from "@mui/material";

import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import socialAccounts from "@source/constants/socialAccounts";

export default ({ color }) =>
  socialAccounts
    .filter((acc) => ["twitter", "instagram", "whatsapp", "linkedin", "facebook"].includes(acc.id))
    .map(({ title, id, href }) => <SocialIcon key={id} account={title} link={href} color={color.social} />);

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
    case "Facebook":
      icon = <FacebookIcon fontSize="inherit" />;
      break;
    case "LinkedIn":
      icon = <LinkedInIcon fontSize="inherit" />;
      break;

    default:
      return false;
  }

  return icon ? (
    <IconButton LinkComponent={Link} color="inherit" rel="noopener noreferrer" href={link} target="_blank" sx={{ fontSize: "18px", color }}>
      {icon}
    </IconButton>
  ) : (
    <></>
  );
};
