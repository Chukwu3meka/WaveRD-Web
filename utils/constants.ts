import { Profile } from "interfaces/store/user.interfaces";
import { ICompetition, ISocialAccounts } from "interfaces/utils/constants.interface";

export const SOCIAL_ACCOUNTS: ISocialAccounts[] = [
  // { id: "linkedin", title: "LinkedIn", image: "/images/social/linkedin.png", href: "https://www.linkedin.com/company/soccermass/" },
  { id: "linkedin", title: "LinkedIn", image: "/images/social/linkedin.png", href: "https://www.linkedin.com/in/chukwu3meka/" },
  // { id: "instagram", title: "Instagram", image: "/images/social/instagram.png", href: "https://www.instagram.com/SoccerMASSinc/" },
  { id: "instagram", title: "Instagram", image: "/images/social/instagram.png", href: "https://www.instagram.com/_chukwu3meka" },
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

export const INIT_PROFILE: Profile = { name: "SoccerMASS", handle: "API Hub and Soccer Manager", avatar: "/images/layout/profile.webp", role: "dummy", theme: "light" };

export const OAUTH_PROVIDERS = ["facebook", "twitter", "google"];

export const COMPETITIONS: ICompetition[] = [
  { title: "Bundesliga", id: "bundesliga", image: "/images/COMPETITIONS/bundesliga.png" },
  { title: "Champions League", id: "championsLeague", image: "/images/COMPETITIONS/champions-league.png" },
  { title: "Eredivisie", id: "eredivisie", image: "/images/COMPETITIONS/eredivisie.png" },
  { title: "Europa League", id: "europaLeague", image: "/images/COMPETITIONS/europa-league.png" },
  { title: "La Liga", id: "laLiga", image: "/images/COMPETITIONS/la-liga.png" },
  { title: "Ligue 1", id: "ligue1", image: "/images/COMPETITIONS/ligue-1.png" },
  { title: "Premier League", id: "premierLeague", image: "/images/COMPETITIONS/premier-league.png" },
  { title: "Serie A", id: "serieA", image: "/images/COMPETITIONS/serie-a.png" },
];

export const GEAR_LENGTH = 300;
export const HEADER_HEIGHT = 71.6;
