import { MetadataRoute } from "next";
import stylesVariables from "styles/variables.module.scss";

const manifest = (): MetadataRoute.Manifest => ({
  name: "Wave Research",
  short_name: "Wave Research",
  description:
    "Wave Research: Online Football Management Game and provider of Football data APIs, offering cutting-edge formations, tactics, a lifelike transfer market and so much more.",
  start_url: "/",
  display: "standalone",
  // background_color: "#fff",
  theme_color: stylesVariables.primaryColor,
  //
  icons: [
    {
      src: "/favicon.ico",
      // sizes: "any",
      sizes: "32x32",
      type: "image/x-icon",
    },
  ],
});

export default manifest;
