import { Profile } from "interfaces/redux-store/account.interfaces";
import pageInfo from "./page-info";

import { Categories, Competition, ContactPreferences, ContactUsCategories, InfoLinks, SocialAccounts } from "interfaces/utils/constants.interface";

export const SOCIAL_ACCOUNTS: SocialAccounts[] = [
  // { id: "linkedin", title: "LinkedIn", image: "/images/social/linkedin.png", href: "https://www.linkedin.com/company/soccermass/" },
  { id: "linkedin", title: "LinkedIn", image: "/images/social/linkedin.png", href: "https://www.linkedin.com/in/chukwu3meka/" },
  // { id: "instagram", title: "Instagram", image: "/images/social/instagram.png", href: "https://www.instagram.com/SoccerMASSinc/" },
  { id: "instagram", title: "Instagram", image: "/images/social/instagram.png", href: "https://www.instagram.com/Chukwuemeka_Maduekwe" },
  // { id: "twitter", title: "Twitter", image: "/images/social/twitter.png", href: "https://twitter.com/SoccerMASSinc/" },
  { id: "twitter", title: "Twitter", image: "/images/social/twitter.png", href: "https://twitter.com/Chukwu3meka/" },
  // {id:"soccermass",title:"SoccerMASS",image:"/images/social/soccermass.png",href: "https://www.soccermass.com/"],
  // {id:"pinterest",title:"Pinterest",image:"/images/social/pinterest.png",href: "https://www.pinterest.com/viewcrunch/"],
  { id: "github", title: "Github", image: "/images/social/github.png", href: "https://github.com/Chukwu3meka/SoccerMASS-Web/issues" },
  // {id:"youtube",title:"YouTube",image:"/images/social/youtube.png",href: "https://www.youtube.com/channel/UCs_hSlk3N8bxP5xHSdKw3IQ/"],
  // {id:"fiverr",title:"Fiverr",image:"/images/social/fiverr.png",href: "https://www.fiverr.com/viewcrunch/"],
  { id: "whatsapp", title: "Whatsapp", image: "/images/social/whatsapp.png", href: "https://wa.me/qr/5KYEVNBVLVVSI1" },
  { id: "phone", title: "Phone", image: "/images/social/phone.png", href: "tel:+234(706)-441-7213" },
  { id: "facebook", title: "Facebook", image: "/images/social/facebook.png", href: "https://web.facebook.com/Chukwu3meka" },
];

export const INIT_PROFILE: Profile = {
  role: "dummy", // <= Init role is always a dummy user
  theme: "dark",
  name: "SoccerMASS",
  handle: "API Hub and Soccer Manager",
  avatar: "/images/layout/profile.webp",
};

export const GEAR_LENGTH = 300;
export const HEADER_HEIGHT = 74;
export const OAUTH_PROVIDERS = ["facebook", "twitter", "google"];

export const COMPETITIONS: Competition[] = [
  { title: "Bundesliga", id: "bundesliga", image: "/images/competitions/bundesliga.png" },
  { title: "Champions League", id: "championsLeague", image: "/images/competitions/champions-league.png" },
  { title: "Eredivisie", id: "eredivisie", image: "/images/competitions/eredivisie.png" },
  { title: "Europa League", id: "europaLeague", image: "/images/competitions/europa-league.png" },
  { title: "La Liga", id: "laLiga", image: "/images/competitions/la-liga.png" },
  { title: "Ligue 1", id: "ligue1", image: "/images/competitions/ligue-1.png" },
  { title: "Premier League", id: "premierLeague", image: "/images/competitions/premier-league.png" },
  { title: "Serie A", id: "serieA", image: "/images/competitions/serie-a.png" },
];

export const CONTACT_PREFERENCE: ContactPreferences = {
  email: "Email Address",
  whatsapp: "WhatsApp Number",
};

export const INFO_LINKS: InfoLinks[] = Object.values(pageInfo).reduce((total, page) => {
  if (page.path.startsWith("/info/")) {
    total = [...total, { label: page.title, path: page.path }];
  }
  return total;
}, []);

export const CONTACT_US_CATEGORIES: ContactUsCategories[] = [
  { value: "others", label: "Others" },
  { value: "technical", label: "Technical" },
  { value: "suggestion", label: "Suggestion" },
  { value: "advertising", label: "Advertising" },
  { value: "service", label: "Digital Service" },
];

export const CATEGORIES: Categories = {
  "": "football-referees",
  "": "football-countries",
  "": "football-competitions",
  "65fdaf6b3f0da305ed4306ad": "football-clubs",
  "65fdaf6b3f0da305ed4306ae": "football-players",
};

export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};
