// !!! DON'T RE-ORDER THE ARRANGEMENT OF THIS FILE - iT WILL AFFECT ITS LAYOUT IN THE APP

import {
  Webhook,
  Engineering,
  Insights,
  Home,
  AddHomeWork,
  SportsSoccer,
  WorkHistory,
  Translate,
  Hub,
  LocalGroceryStore,
  ConnectWithoutContact,
  ContactPhone,
  AdminPanelSettings,
  CloudDownload,
} from "@mui/icons-material";

import { Routes } from "interfaces/utils/constants.interface";

const routes: Routes[] = [
  // ? Nav Route
  { research: null, title: "PROFILES", Icon: Engineering, path: "/console/profiles" },
  { research: null, title: "APIHUB CORE", Icon: Hub, path: "/console/apihub" },
  { research: null, title: "FOOTBALL MANAGER", Icon: SportsSoccer, path: "/console/manager" },
  { research: null, title: "INSTANT TRANSLATION", Icon: Translate, path: "/console/translation" },
  { research: null, title: "CONTACT US / REPLY", Icon: ContactPhone, path: "/console/contact" },
  { research: null, title: "HOURLY JOBS", Icon: WorkHistory, path: "/console/jobs" },
  { research: null, title: "HOMES AND SPACES", Icon: AddHomeWork, path: "/console/spaces" },
  { research: null, title: "ADD TO CART MARKET", Icon: LocalGroceryStore, path: "/console/cart" },
  { research: null, title: "MODERATORS", Icon: AdminPanelSettings, path: "/console/moderator" },
  { research: null, title: "LOCAL BACKUP", Icon: CloudDownload, path: "/console/backup" },
  { research: null, title: "LAUNDRY SERVICES", Icon: AdminPanelSettings, path: "/console/laundry" },

  // ? Console Apihub
  { research: "console-apihub", title: "Endpoints", Icon: Insights, path: "/console/console-apihub/modify-endpoints" },
  { research: "console-apihub", title: "API Hub Home", Icon: Home, path: "/console/console-apihub/home" },
];

export default routes;
