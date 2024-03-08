import Link from "next/link";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { styles } from ".";

const Navigation = ({ auth: { club } }) => {
  const FooterFunc = ({ href, icon }) => (
    <Link href={`/${href.toLowerCase()}`}>
      <div>
        <IconButton>{icon}</IconButton>
        <Typography variant="body1">{href}</Typography>
      </div>
    </Link>
  );

  return (
    <div className={styles.navigation}>
      {/* <FooterFunc href="Profile" icon={<PersonIcon />} /> */}
      <FooterFunc href="Home" icon={<HomeIcon />} />
      <FooterFunc href="Team" icon={<Image width={20} height={20} src={`/images/club/${club}.webp`} alt="SoccerMASS" />} />
      {/* <FooterFunc href="Mass" icon={<LocationOnIcon />} /> */}
    </div>
  );
};

export default Navigation;
