// !!! DON'T RE-ORDER THE ARRANGEMENT OF THIS FILE - iT WILL AFFECT ITS LAYOUT IN THE APP

import { Groups, Roofing, ElectricBike } from "@mui/icons-material";

import { Routes } from "interfaces/utils/constants.interface";

const GAMES_ROUTES: Routes[] = [
  // ? Nav Route
  { research: null, title: "HOME", Icon: Roofing, path: "/games" },
  { research: null, title: "TEAM", Icon: Groups, path: "/games/team" },
  { research: null, title: "INFO", Icon: ElectricBike, path: "/games/info" },

  // // ? Console Apihub Core
  // { research: "apihub", title: "API Hub Endpoints", Icon: Insights, path: "/console/apihub/modify-endpoints" },
  // { research: "apihub", title: "API Hub Home", Icon: Home, path: "/console/apihub/home" },
];

export default GAMES_ROUTES;
