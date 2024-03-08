import Link from "next/link";
import Typography from "@mui/material/Typography";

import { styles } from ".";

const Header = () => {
  const navLinks = [
    { title: "Endpoints", link: "/endpoints" },
    { title: "Docs", link: "/docs" },
    { title: "Tutorials", link: "/tutorials" },
    { title: "About", link: "/about" },
  ];
  return (
    <header className={styles.header}>
      <Link href="/">
        <Typography component="h1" variant="h5">
          Soccer Atlas
        </Typography>
      </Link>

      <nav>
        {navLinks.map(({ title, link }) => (
          <Link href={link} key={link}>
            <a>{title}</a>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
