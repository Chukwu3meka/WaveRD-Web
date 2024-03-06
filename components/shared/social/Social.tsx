import Link from "next/link";
import { IconButton } from "@mui/material";

import {
  Call as PhoneIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";
import { Social } from "interfaces/components/shared.interface";

const Social = ({ account, link, fontSize }: Social) => {
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
    case "GitHub":
      icon = <GitHubIcon fontSize="inherit" />;
      break;
    case "Phone":
      icon = <PhoneIcon fontSize="inherit" />;
      break;

    default:
      icon = <></>;
  }

  return icon ? (
    <IconButton LinkComponent={Link} color="inherit" rel="noopener noreferrer" href={link} target="_blank" sx={{ fontSize }} aria-label={account.toLowerCase()}>
      {icon}
    </IconButton>
  ) : null;
};

export default Social;
