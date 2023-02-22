import { Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { styles } from ".";

interface IIMageText {
  title: string;
  body: string;
  src?: string;
  link?: string;
  reverse?: boolean;
}

const ImageText = ({ title, body, src, link = "/", reverse }: IIMageText) => (
  <></>
  // <section id={styles[src ? (reverse ? "reverseImageText" : "imageText") : "noImageText"]}>
  //   <main>
  //     <Typography>{title}</Typography>
  //     <Typography textAlign="justify">{body} </Typography>
  //     <Link href={link}>
  //       {/* <a>See all features</a> */}
  //       See all features
  //     </Link>
  //   </main>
  //   {src && (
  //     <figure>
  //       <Image src={src} alt={title} layout="fill" />
  //     </figure>
  //   )}
  // </section>
);

export default ImageText;
