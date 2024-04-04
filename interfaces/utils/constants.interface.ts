export interface SocialAccounts {
  title:
    | "Facebook"
    | "Twitter"
    | "Instagram"
    | "LinkedIn"
    | "SoccerMASS"
    | "Pinterest"
    | "Github"
    | "YouTube"
    | "Fiverr"
    | "Whatsapp"
    | "Phone";
  id: string;
  image: string;
  href: string;
}

export interface Competition {
  image: string;
  title: string;
  id: string;
}

export interface InfoLinks {
  label: string;
  path: string;
}

export interface ContactUsCategories {
  value: string;
  label: string;
}

export interface ContactPreferences {
  email: string;
  whatsapp: string;
}

export interface Categories {
  [key: string]: string;
}
