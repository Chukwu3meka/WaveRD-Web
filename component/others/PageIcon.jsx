import { styles } from "/";
import Link from "next/link";
import Image from "next/image";
import { Paper } from "@mui/material";

const PageIcon = ({ src = "/soccermass.webp", title = "SoccerMASS", href = "/home" }) => {
  return (
    <Link href={href}>
      <Paper className={styles.pageIcon} elevation={4}>
        <Image src={`/images${src}`} layout="fill" alt={title} />
        <span>{title}</span>
      </Paper>
    </Link>
  );
};

export default PageIcon;
