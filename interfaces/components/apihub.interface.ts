import { MouseEventHandler } from "react";

export interface Category {
  _id: string;
  icon: string;
  title: string;
}

export interface CategoriesViewProps {
  showMenu: boolean;
  displayHeader: boolean;
  categories: Category[];
}

export interface CategoriesContainerProps {
  displayHeader: boolean;
  deviceWidth: number;
  categories: Category[];
}
export interface WelcomeProps extends SearchProps {
  showMenu: boolean;
}

export interface SearchProps {
  loading: boolean;
  inputValue: string;
  getEndpoint: Function;
  onValueChange: Function;
  onInputChange: Function;
  searchResult: SearchResult[];
  searchEndpoints: MouseEventHandler<HTMLAnchorElement>;
}

// !!!!!!!!!!!!
export interface EndpointsContainerProps {
  deviceWidth: number;
  displayHeader: boolean;
}

export interface EndpointsIntroProps {
  showMenu: boolean;
}

export interface EndpointsMenuProps {
  // getEndpointsByCategory: Function;
  // displayHeader: boolean;
  endpoints: [];
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
}
