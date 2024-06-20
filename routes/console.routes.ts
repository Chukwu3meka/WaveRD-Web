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
  Password,
  RequestPage,
  Today,
  ReportProblem,
} from "@mui/icons-material";

import { Routes } from "interfaces/utils/constants.interface";

const CONSOLE_ROUTES: Routes[] = [
  // ? Nav Route
  { research: null, title: "PROFILES", Icon: Engineering, path: "/console/console-profiles" },
  { research: null, title: "APIHUB CORE", Icon: Hub, path: "/console/console-apihub" },
  { research: null, title: "FOOTBALL MANAGER", Icon: SportsSoccer, path: "/console/console-games" },
  { research: null, title: "INSTANT TRANSLATION", Icon: Translate, path: "/console/console-translation" },
  { research: null, title: "CONTACT US / REPLY", Icon: ContactPhone, path: "/console/console-contact" },
  { research: null, title: "HOURLY JOBS", Icon: WorkHistory, path: "/console/console-jobs" },
  { research: null, title: "HOMES AND SPACES", Icon: AddHomeWork, path: "/console/console-spaces" },
  { research: null, title: "ADD TO CART MARKET", Icon: LocalGroceryStore, path: "/console/console-cart" },
  { research: null, title: "MODERATORS", Icon: AdminPanelSettings, path: "/console/console-moderator" },
  { research: null, title: "LOCAL BACKUP", Icon: CloudDownload, path: "/console/console-backup" },
  { research: null, title: "LAUNDRY SERVICES", Icon: AdminPanelSettings, path: "/console/console-laundry" },
  { research: null, title: "WAVE RESEARCH LOGS", Icon: Password, path: "/console/console-logs" },

  // ? Console Apihub Core
  { research: "apihub", title: "API Hub Endpoints", Icon: Insights, path: "/console/apihub/modify-endpoints" },
  { research: "apihub", title: "API Hub Home", Icon: Home, path: "/console/apihub/home" },

  // ? Console WAVE Logs
  { research: "logs", title: "All Requests", Icon: RequestPage, path: "/console/logs/all-requests" },
  { research: "logs", title: "Daily Statistics", Icon: Today, path: "/console/logs/daily-statistics" },
  { research: "logs", title: "Failed Requests", Icon: ReportProblem, path: "/console/logs/failed-requests" },
];

export default CONSOLE_ROUTES;
