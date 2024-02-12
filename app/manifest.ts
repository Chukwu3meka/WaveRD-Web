import { MetadataRoute } from "next";
import stylesVariables from "styles/variables.module.scss";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SoccerMASS",
    short_name: "SoccerMASS",
    description:
      "SoccerMASS: Online Football Management Game and provider of Football data APIs, offering cutting-edge formations, tactics, a lifelike transfer market and so much more.",
    start_url: "/",
    display: "standalone",
    // background_color: "#fff",
    theme_color: stylesVariables.primaryColor,
    //
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        // sizes: "32x32",
        type: "image/x-icon",
      },
    ],
  };
}
